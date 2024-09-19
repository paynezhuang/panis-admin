<script setup lang="tsx">
import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { NButton, NFormItemGi, NInput, NSelect, NSpace, NSwitch } from 'naive-ui';
import { useLoading } from '@sa/hooks';
import { $t } from '@/locales';
import {
  fetchAddGeneratorTable,
  fetchCleanGeneratorTableColumn,
  fetchGetAllDataTable,
  fetchGetAllDictOptionsList,
  fetchGetEditGeneratorTable,
  fetchGetGeneratorTableColumnList,
  fetchSyncDatabaseColumns,
  fetchUpdateGeneratorTableInfo,
  fetchUpdateGeneratorTableList,
  fetchZipCodeGenerate
} from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { renderTypeOptions, searchTypeOptions } from '@/constants/common';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { downloadBlob } from '@/utils/download';
import { getPrefix } from './shared';

defineOptions({
  name: 'GenerateTableOperateModalPage'
});

interface Props {
  id?: string;
  tableName?: string | null;
  operateType: NaiveUI.TableOperateType;
}

const props = defineProps<Props>();

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { loading, startLoading, endLoading } = useLoading();

const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const visible = defineModel<boolean>('visible', {
  default: false
});

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.tools.generateTable.addGenerate'),
    edit: $t('page.tools.generateTable.editGenerate', { tableName: props.tableName })
  };
  return titles[props.operateType];
});

/** current tab index */
const tabIndex = ref(1);

/** current operate type */
// const currentOperateType = ref<NaiveUI.TableOperateType>(props.operateType);

/** has saved */
const hasSaved = ref(false);

/** is edit */
const isEdit = computed(() => props.operateType === 'edit' || hasSaved.value);

/** edit model */
type Model = Api.Tools.GeneratorTableEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '0',
    tableName: null,
    tableComment: '',
    tablePrefix: '',
    parentPackage: 'com.izpan',
    moduleName: '',
    parentMenuId: 0,
    author: '',
    status: '1'
  };
}

type TableColumnModel = Api.Tools.GeneratorTableColumnEdit;

/** table data */
const tableData = ref<Api.Tools.GeneratorTableColumnEdit[]>([]);

/** dict options */
const tableDictOptions = shallowRef<CommonType.Option[]>([]);

/** the enabled role options */
const dataTableOptions = shallowRef<Api.Tools.DataTable[]>([]);

/** rules */
type RuleKey = Extract<keyof Model, 'tableName' | 'parentPackage' | 'moduleName' | 'author'>;
const rules: Record<RuleKey, App.Global.FormRule> = {
  tableName: defaultRequiredRule,
  parentPackage: defaultRequiredRule,
  moduleName: defaultRequiredRule,
  author: defaultRequiredRule
};

/** init model */
async function handleInitModel() {
  tabIndex.value = 1;
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'add') {
    const { error, data } = await fetchGetAllDataTable();
    if (!error) {
      hasSaved.value = false;
      dataTableOptions.value = data;
    }
  }

  if (props.operateType === 'edit' && props.id) {
    const { error, data } = await fetchGetEditGeneratorTable(props.id);
    if (!error) {
      Object.assign(model, data);
    }
  }
}

/** get all dict list */
async function initAllDictList() {
  const { error, data } = await fetchGetAllDictOptionsList();
  if (!error) {
    tableDictOptions.value = data;
  }
}

// columns
const columns: NaiveUI.TableColumn<Api.Tools.GeneratorTableColumnEdit>[] = [
  {
    key: 'ordinalPosition',
    title: $t('page.tools.generateTableColumn.ordinalPosition'),
    align: 'center',
    width: 100,
    fixed: 'left'
  },
  {
    key: 'columnName',
    title: $t('page.tools.generateTableColumn.columnName'),
    fixed: 'left',
    titleAlign: 'center',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    key: 'propertyName',
    title: $t('page.tools.generateTableColumn.propertyName'),
    fixed: 'left',
    titleAlign: 'center',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    key: 'columnComment',
    title: $t('page.tools.generateTableColumn.columnComment'),
    width: 100,
    titleAlign: 'center',
    align: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    key: 'dataType',
    title: $t('page.tools.generateTableColumn.dataType'),
    align: 'center',
    width: 150
  },
  {
    key: 'javaType',
    title: $t('page.tools.generateTableColumn.javaType'),
    align: 'center',
    width: 150
  },
  {
    key: 'typeScriptType',
    title: $t('page.tools.generateTableColumn.typescriptType'),
    align: 'center',
    width: 150
  },
  {
    key: 'list',
    title: $t('page.tools.generateTableColumn.list'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => {
      return <NSwitch v-model:value={row.list} checkedValue="1" uncheckedValue="0" size="small"></NSwitch>;
    }
  },
  {
    key: 'search',
    title: $t('page.tools.generateTableColumn.search'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => {
      return <NSwitch v-model:value={row.search} checkedValue="1" uncheckedValue="0" size="small"></NSwitch>;
    }
  },
  {
    key: 'searchType',
    title: $t('page.tools.generateTableColumn.searchType'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => <NSelect v-model:value={row.searchType} size="small" clearable options={searchTypeOptions}></NSelect>
  },
  {
    key: 'required',
    title: $t('page.tools.generateTableColumn.required'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => {
      return <NSwitch v-model:value={row.required} checkedValue="1" uncheckedValue="0" size="small"></NSwitch>;
    }
  },
  {
    key: 'added',
    title: $t('page.tools.generateTableColumn.added'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => {
      return <NSwitch v-model:value={row.added} checkedValue="1" uncheckedValue="0" size="small"></NSwitch>;
    }
  },
  {
    key: 'edit',
    title: $t('page.tools.generateTableColumn.edit'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => {
      return <NSwitch v-model:value={row.edit} checkedValue="1" uncheckedValue="0" size="small"></NSwitch>;
    }
  },
  {
    key: 'renderType',
    title: $t('page.tools.generateTableColumn.renderType'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => <NSelect v-model:value={row.renderType} size="small" clearable options={renderTypeOptions}></NSelect>
  },
  {
    key: 'dictCode',
    title: $t('page.tools.generateTableColumn.dictCode'),
    align: 'center',
    width: 200,
    render: (row: TableColumnModel) => (
      <NSelect v-model:value={row.dictCode} size="small" filterable clearable options={tableDictOptions.value}></NSelect>
    )
  },
  {
    key: 'status',
    title: $t('page.tools.generateTableColumn.status'),
    align: 'center',
    width: 150,
    render: (row: TableColumnModel) => {
      return <NSwitch v-model:value={row.status} checkedValue="1" uncheckedValue="0" size="small"></NSwitch>;
    }
  }
];

/**
 * table name options click
 *
 * @param value table name
 * @param option table name object
 */
async function hanldeClickTableNameOptions(value: string, option: Api.Tools.DataTable) {
  model.tableComment = option.tableComment;
  model.tablePrefix = getPrefix(value);
}

/** tabs previous */
function handlePrevious() {
  tabIndex.value -= 1;
}

/** tabs next */
async function handleNext() {
  if (tabIndex.value === 1) {
    await validate();
    tabIndex.value += 1;
    startLoading();
    // save or update table info
    const func = isEdit.value ? fetchUpdateGeneratorTableInfo : fetchAddGeneratorTable;
    func(model)
      .then(({ error, data }) => {
        if (!error) {
          Object.assign(model, data);
          // Always set to 'edit' after successful save
          hasSaved.value = true;
          // currentOperateType.value = 'edit';
        }
        return fetchGetGeneratorTableColumnList(model.id);
      })
      .then(({ error, data }) => {
        if (!error && data) {
          tableData.value = data;
          endLoading();
        }
      });
  } else if (tabIndex.value === 2) {
    const { error, data } = await fetchUpdateGeneratorTableList(tableData.value);
    if (!error && data) {
      tabIndex.value += 1;
    }
  }
}

/** clean table columns */
async function handleCleanTableColumns() {
  window.$dialog?.error({
    title: $t('page.tools.generateTableColumn.cleanColumns'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    content: $t('page.tools.generateTableColumn.cleanColumnsConfirm'),
    onPositiveClick: async () => {
      const { error, data } = await fetchCleanGeneratorTableColumn(model.id);
      if (!error && data) {
        window.$message?.success($t('page.tools.generateTableColumn.cleanSuccess'));
        tableData.value = [];
      }
    }
  });
}

/** sync database columns */
async function handleSyncDatabaseColumns() {
  window.$dialog?.warning({
    title: $t('page.tools.generateTableColumn.syncColumns'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    content: $t('page.tools.generateTableColumn.syncColumnsConfirm'),
    onPositiveClick: async () => {
      const { error, data } = await fetchSyncDatabaseColumns(model.id);
      if (!error && data) {
        window.$message?.success($t('page.tools.generateTableColumn.syncSuccess'));
        tableData.value = data;
      }
    }
  });
}

/** code generate */
async function handleCodeGenerate() {
  const { error, response } = await fetchZipCodeGenerate(model.id);
  if (!error && response) {
    downloadBlob(response);
    window.$message?.success($t('page.tools.generateTableColumn.generateSuccess'));
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    initAllDictList();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="h-[80vh] w-4/5">
    <NTabs v-model:value="tabIndex" type="segment" animate size="small" class="h-full">
      <NTabPane :name="1" :tab="$t('page.tools.generateTableColumn.baseInfo')" disabled>
        <NForm ref="formRef" label-placement="left" :label-width="80" :model="model" :rules="rules">
          <NGrid :x-gap="8" :y-gap="8">
            <NFormItemGi span="8 m:6" :label="$t('page.tools.generateTable.tableName')" path="tableName">
              <NSelect
                v-model:value="model.tableName"
                filterable
                clearable
                label-field="tableName"
                value-field="tableName"
                :options="dataTableOptions"
                :placeholder="$t('page.tools.generateTable.form.tableNameSelect')"
                :disabled="isEdit"
                @update:value="hanldeClickTableNameOptions"
              />
            </NFormItemGi>
            <NFormItemGi span="8 m:6" :label="$t('page.tools.generateTable.tableComment')" path="tableComment">
              <NInput v-model:value="model.tableComment" :placeholder="$t('page.tools.generateTable.form.tableComment')" :disabled="isEdit" />
            </NFormItemGi>
            <NFormItemGi span="8 m:6" :label="$t('page.tools.generateTable.tablePrefix')" path="tablePrefix">
              <NInput v-model:value="model.tablePrefix" :placeholder="$t('page.tools.generateTable.form.tablePrefix')" :disabled="isEdit" />
            </NFormItemGi>
            <NFormItemGi span="8 m:6" :label="$t('page.tools.generateTable.parentPackage')" path="parentPackage">
              <NInput v-model:value="model.parentPackage" :placeholder="$t('page.tools.generateTable.form.parentPackage')" />
            </NFormItemGi>
            <NFormItemGi span="8 m:6" :label="$t('page.tools.generateTable.moduleName')" path="moduleName">
              <NInput v-model:value="model.moduleName" :placeholder="$t('page.tools.generateTable.form.moduleName')" />
            </NFormItemGi>
            <NFormItemGi span="8 m:6" :label="$t('page.tools.generateTable.author')" path="author">
              <NInput v-model:value="model.author" :placeholder="$t('page.tools.generateTable.form.author')" />
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NTabPane>
      <NTabPane :name="2" :tab="$t('page.tools.generateTableColumn.columnInfo')" disabled class="h-full flex flex-col">
        <NSpace>
          <NButton v-if="hasAuth('tools:generator:table:column:clean:columns')" type="error" class="mb-8px" @click="handleCleanTableColumns">
            {{ $t('page.tools.generateTableColumn.cleanColumns') }}
          </NButton>
          <NButton v-if="hasAuth('tools:generator:table:column:sync:columns')" type="warning" class="mb-8px" @click="handleSyncDatabaseColumns">
            {{ $t('page.tools.generateTableColumn.syncColumns') }}
          </NButton>
        </NSpace>
        <div class="flex flex-grow">
          <NDataTable
            :loading="loading"
            :columns="columns"
            :scroll-x="962"
            size="small"
            class="sm:h-full"
            :flex-height="!appStore.isMobile"
            :data="tableData"
            :row-key="(row: TableColumnModel) => row.id"
          />
        </div>
      </NTabPane>
      <NTabPane :name="3" :tab="$t('page.tools.generateTableColumn.resultInfo')" disabled class="flex flex-1 items-center justify-center">
        <NResult status="success" title="成功">
          <template #footer>
            <NSpace>
              <NButton @click="handleCodeGenerate">{{ $t('page.tools.generateTableColumn.downloadZip') }}</NButton>
            </NSpace>
          </template>
        </NResult>
      </NTabPane>
    </NTabs>
    <template #footer>
      <NSpace justify="end">
        <NButton v-if="tabIndex > 1 && tabIndex <= 2" type="tertiary" @click="handlePrevious">
          {{ $t('page.tools.generateTableColumn.previous') }}
        </NButton>
        <NButton v-if="tabIndex <= 2" type="primary" :disabled="tableData.length === 0 && tabIndex === 2" @click="handleNext">
          {{ $t('page.tools.generateTableColumn.next') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>
