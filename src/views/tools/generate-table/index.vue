<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteGeneratorTable, fetchGetGeneratorTableList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import { useAuth } from '@/hooks/business/auth';
import { transDeleteParams } from '@/utils/common';
import { formatDateTime } from '@/utils/date';
import GenerateTableSearch from './modules/generate-table-search.vue';
import GenerateTableOperateModal from './modules/generate-table-operate-modal.vue';

defineOptions({
  name: 'ToolGenerateTablePage'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

const { bool: modalVisible, setTrue: openModalVisible } = useBoolean();

type TableColumn = Api.Tools.GeneratorTableColumn;

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetGeneratorTableList,
  apiParams: {
    page: 1,
    pageSize: 20,
    tableName: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,
      fixed: 'left'
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'tableName',
      title: $t('page.tools.generateTable.tableName'),
      align: 'center',
      width: 120
    },
    {
      key: 'tableComment',
      title: $t('page.tools.generateTable.tableComment'),
      align: 'center',
      width: 200
    },
    {
      key: 'tablePrefix',
      title: $t('page.tools.generateTable.tablePrefix'),
      align: 'center',
      width: 120
    },
    {
      key: 'parentPackage',
      title: $t('page.tools.generateTable.parentPackage'),
      align: 'center',
      width: 200
    },
    {
      key: 'moduleName',
      title: $t('page.tools.generateTable.moduleName'),
      align: 'center',
      width: 150
    },
    {
      key: 'author',
      title: $t('page.tools.generateTable.author'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'status',
      title: $t('page.tools.generateTable.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'center',
      width: 200,
      render: row => formatDateTime(row.createTime)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 200,
      fixed: 'right',
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('tools:generator:table:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('tools:generator:table:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" quaternary size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const { checkedRowKeys, handleData, editingData, operateType, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeleteGeneratorTable(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

function handleAdd() {
  if (!envCheck()) {
    return;
  }
  operateType.value = 'add';
  openModalVisible();
}

function edit(id: string) {
  if (!envCheck()) {
    return;
  }
  handleData(id);
  operateType.value = 'edit';
  openModalVisible();
}

function envCheck() {
  const isDev = import.meta.env.DEV;
  if (!isDev) {
    window.$message?.error($t('page.tools.generateTable.isNotDevEnvTip'));
    return false;
  }
  return true;
}

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteGeneratorTable(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <GenerateTableSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="tools:generator:table:add"
        delete-auth="tools:generator:table:delete"
        @refresh="getData"
        @add="handleAdd"
        @delete="handleBatchDelete"
      />
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="(row: TableColumn) => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
    <GenerateTableOperateModal
      :id="editingData?.id"
      v-model:visible="modalVisible"
      :operate-type="operateType"
      :table-name="editingData?.tableName"
    />
  </div>
</template>
