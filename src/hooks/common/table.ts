import { computed, effectScope, onScopeDispose, reactive, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { type PaginationProps } from 'naive-ui';
import { useBoolean, useHookTable } from '@sa/hooks';
import { cloneDeep } from 'lodash-es';
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';
type TableData = NaiveUI.TableData;
type GetTableData<A extends NaiveUI.TableApiFn> = NaiveUI.GetTableData<A>;
type TableColumn<T> = NaiveUI.TableColumn<T>;

export function useTable<A extends NaiveUI.TableApiFn>(config: NaiveUI.NaiveTableConfig<A>) {
  const scope = effectScope();
  const appStore = useAppStore();
  const isMobile = computed(() => appStore.isMobile);

  const { apiFn, apiParams, immediate, showTotal } = config;

  const SELECTION_KEY = '__selection__';

  const EXPAND_KEY = '__expand__';

  const { loading, empty, data, columns, columnChecks, reloadColumns, getData, searchParams, updateSearchParams, resetSearchParams } = useHookTable<
    A,
    GetTableData<A>,
    TableColumn<NaiveUI.TableDataWithIndex<GetTableData<A>>>
  >({
    apiFn,
    apiParams,
    columns: config.columns,
    transformer: res => {
      const { records = [], page = 1, pageSize = 20, total = 0 } = res.data || {};
      const recordsWithIndex = records.map((item, index) => {
        return {
          ...item,
          index: (page - 1) * pageSize + index + 1
        };
      });

      return {
        data: recordsWithIndex,
        pageNum: page,
        pageSize,
        total
      };
    },
    getColumnChecks: cols => {
      const checks: NaiveUI.TableColumnCheck[] = [];

      cols.forEach(column => {
        if (isTableColumnHasKey(column)) {
          checks.push({
            key: column.key as string,
            title: column.title as string,
            checked: true
          });
        } else if (column.type === 'selection') {
          checks.push({
            key: SELECTION_KEY,
            title: $t('common.check'),
            checked: true
          });
        } else if (column.type === 'expand') {
          checks.push({
            key: EXPAND_KEY,
            title: $t('common.expandColumn'),
            checked: true
          });
        }
      });

      return checks;
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map<string, TableColumn<GetTableData<A>>>();

      cols.forEach(column => {
        if (isTableColumnHasKey(column)) {
          columnMap.set(column.key as string, column);
        } else if (column.type === 'selection') {
          columnMap.set(SELECTION_KEY, column);
        } else if (column.type === 'expand') {
          columnMap.set(EXPAND_KEY, column);
        }
      });
      const filteredColumns = checks.filter(item => item.checked).map(check => columnMap.get(check.key) as TableColumn<GetTableData<A>>);
      return filteredColumns;
    },
    onFetched: async transformed => {
      const { pageNum, pageSize, total } = transformed;
      updatePagination({
        page: pageNum,
        pageSize,
        itemCount: total
      });
    },
    immediate
  });

  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 20,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [20, 40, 60, 80, 100],
    onUpdatePage: async (page: number) => {
      pagination.page = page;

      updateSearchParams({
        page,
        pageSize: pagination.pageSize!
      });

      getData();
    },
    onUpdatePageSize: async (pageSize: number) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;

      updateSearchParams({
        page: pagination.page,
        pageSize
      });

      getData();
    },
    ...(showTotal
      ? {
          prefix: page => $t('datatable.itemCount', { total: page.itemCount })
        }
      : {})
  });

  // this is for mobile, if the system does not support mobile, you can use `pagination` directly
  const mobilePagination = computed(() => {
    const p: PaginationProps = {
      ...pagination,
      pageSlot: isMobile.value ? 3 : 9,
      showQuickJumper: !isMobile.value,
      prefix: !isMobile.value && showTotal ? pagination.prefix : undefined
    };

    return p;
  });

  function updatePagination(update: Partial<PaginationProps>) {
    Object.assign(pagination, update);
  }

  scope.run(() => {
    watch(
      () => appStore.locale,
      () => {
        reloadColumns();
      }
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    reloadColumns,
    pagination,
    mobilePagination,
    updatePagination,
    getData,
    searchParams,
    updateSearchParams,
    resetSearchParams
  };
}

export function useTableOperate<T extends TableData = TableData>(data: Ref<T[]>, getData: () => Promise<void>) {
  const { bool: drawerVisible, setTrue: openDrawer, setFalse: closeDrawer } = useBoolean();

  const operateType = ref<NaiveUI.TableOperateType>('add');

  function handleAdd() {
    operateType.value = 'add';
    openDrawer();
  }

  /** the editing row data id */
  const editingId: Ref<string> = ref('0');

  /** the editing row data */
  const editingData: Ref<T | null> = ref(null);

  /** the checked row key of table */
  const checkedRowKey: Ref<string> = ref('0');

  /** the checked row keys of table */
  const checkedRowKeys: Ref<string[]> = ref([]);

  /** the checked row data of table */
  const checkedRowData: Ref<T | null> = ref(null);

  /** the checked row datas of table */
  const checkedRowDatas: Ref<T[]> = ref([]);

  /** Get data by id */
  function handleEdit(id: T['id']) {
    operateType.value = 'edit';

    editingId.value = id;

    const findItem = data.value.find(item => item.id === id) || null;
    editingData.value = cloneDeep(findItem);
    openDrawer();
  }

  /** set row data id */
  function handleId(id?: T['id']) {
    editingId.value = getTargetId(id);
  }

  /** set checked row data */
  function handleCheckedRow() {
    checkedRowKey.value = checkedRowKeys.value.length > 0 ? checkedRowKeys.value[0] : '0';
    checkedRowData.value = data.value.find(item => item.id === checkedRowKey.value) || null;
    checkedRowDatas.value = data.value.filter(item => checkedRowKeys.value.includes(item.id));
  }

  /** set row data */
  function handleData(id?: T['id']) {
    const targetId = getTargetId(id);
    if (targetId === '0') {
      editingData.value = null;
      return;
    }
    const findItem = data.value.find(item => item.id === targetId) || null;
    editingData.value = cloneDeep(findItem);
  }

  /** get the target id , If no ID is entered, retrieve the row key; otherwise, it is 0 */
  function getTargetId(id?: string) {
    return id ?? (checkedRowKeys.value.length > 0 ? checkedRowKeys.value[0] : '0');
  }

  /** the hook after the batch delete operation is completed */
  async function onBatchDeleted() {
    window.$message?.success($t('common.deleteSuccess'));

    checkedRowKeys.value = [];

    await getData();
  }

  /** the hook after the delete operation is completed */
  async function onDeleted() {
    window.$message?.success($t('common.deleteSuccess'));

    await getData();
  }

  /** Remote operation is complete, displaying the message action. */
  async function onMessage(message?: string, immediate: boolean = true) {
    window.$message?.success(message || $t('common.actionSuccess'));

    checkedRowKeys.value = [];

    if (immediate) await getData();
  }

  return {
    drawerVisible,
    openDrawer,
    closeDrawer,
    operateType,
    handleAdd,
    editingId,
    editingData,
    handleEdit,
    handleId,
    handleData,
    checkedRowKey,
    checkedRowKeys,
    checkedRowData,
    checkedRowDatas,
    handleCheckedRow,
    onBatchDeleted,
    onDeleted,
    onMessage
  };
}

function isTableColumnHasKey<T>(column: TableColumn<T>): column is NaiveUI.TableColumnWithKey<T> {
  return Boolean((column as NaiveUI.TableColumnWithKey<T>).key);
}
