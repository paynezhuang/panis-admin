<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteOrgUnits, fetchGetOrgUnitsPageList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { transDeleteParams } from '@/utils/common';
import { useDict } from '@/hooks/business/dict';
import OrgUnitsOperateDrawer, { type OperateType } from './modules/org-units-operate-drawer.vue';
import OrgUnitsSearch from './modules/org-units-search.vue';

defineOptions({
  name: 'OrgUnitsPage'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

const operateType = ref<OperateType>('add');

const editingData: Ref<Api.SystemManage.OrgUnits | null> = ref(null);

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetOrgUnitsPageList,
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
      title: $t('page.manage.orgUnits.name'),
      align: 'center',
      width: 150,
      minWidth: 150
    },
    {
      key: 'code',
      title: $t('page.manage.orgUnits.code'),
      align: 'center',
      width: 100,
      minWidth: 100
    },
    {
      key: 'abbr',
      title: $t('page.manage.orgUnits.abbr'),
      align: 'center',
      width: 100,
      minWidth: 100
    },
    {
      key: 'description',
      title: $t('page.manage.orgUnits.description'),
      align: 'center',
      width: 120,
      minWidth: 120
    },
    {
      key: 'sort',
      title: $t('page.manage.orgUnits.sort'),
      align: 'center',
      width: 50,
      minWidth: 50
    },
    {
      key: 'status',
      title: $t('page.manage.orgUnits.status'),
      align: 'center',
      width: 60,
      minWidth: 60,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 40,
      minWidth: 240,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:org:units:add') && (
            <NButton type="primary" quaternary size="small" onClick={() => handleAddChildOrgUnits(row)}>
              {$t('page.manage.orgUnits.addChildDepart')}
            </NButton>
          )}
          {hasAuth('sys:org:units:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => edit(row)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:org:units:delete') && (
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

const { drawerVisible, openDrawer, checkedRowKeys, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

function handleAdd() {
  operateType.value = 'add';
  openDrawer();
}

function edit(item: Api.SystemManage.OrgUnits) {
  operateType.value = 'edit';
  editingData.value = { ...item };
  openDrawer();
}

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeleteOrgUnits(transDeleteParams([id]));
  if (!error && result) {
    await onDeleted();
  }
}

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteOrgUnits(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}

async function handleAddChildOrgUnits(item: Api.SystemManage.OrgUnits) {
  operateType.value = 'addChild';
  editingData.value = { ...item };
  openDrawer();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <OrgUnitsSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:org:units:add"
        delete-auth="sys:org:units:delete"
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
      <OrgUnitsOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
  </div>
</template>
