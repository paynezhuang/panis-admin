<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchDeletePosition, fetchGetPositionPageList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import PositionSearch from './modules/position-search.vue';
import PositionOperateDrawer from './modules/position-operate-drawer.vue';

defineOptions({
  name: 'PositionPage'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetPositionPageList,
  apiParams: {
    page: 1,
    pageSize: 20,
    name: null,
    status: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'name',
      title: $t('page.manage.position.name'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'code',
      title: $t('page.manage.position.code'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'abbr',
      title: $t('page.manage.position.abbr'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'description',
      title: $t('page.manage.position.description'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'sort',
      title: $t('page.manage.position.sort'),
      align: 'center',
      width: 80,
      minWidth: 80
    },
    {
      key: 'status',
      title: $t('page.manage.position.status'),
      align: 'center',
      width: 80,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 200,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:position:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:position:delete') && (
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

const { drawerVisible, operateType, handleAdd, handleEdit, editingData, checkedRowKeys, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

function edit(id: string) {
  handleEdit(id);
}

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeletePosition(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeletePosition(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <PositionSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="card-wrapper sm:flex-1-hidden" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:position:add"
        delete-auth="sys:position:delete"
        @add="handleAdd"
        @delete="handleBatchDelete"
        @refresh="getData"
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
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
      <PositionOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
  </div>
</template>
