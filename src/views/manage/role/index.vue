<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { fetchDeleteRole, fetchGetRoleList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { enableStatusRecord, enableStatusTag } from '@/constants/business';
import { transDeleteParams } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import RoleOperateDrawer from './modules/role-operate-drawer.vue';
import RoleSearch from './modules/role-search.vue';
import MenuAuthModal from './modules/menu-auth-modal.vue';
import ButtonAuthModal from './modules/button-auth-modal.vue';

const appStore = useAppStore();

const { bool: menuModalVisible, setTrue: openMenuModal } = useBoolean();

const { bool: buttonModalVisible, setTrue: openButtonModal } = useBoolean();

const { hasAuth } = useAuth();

const { columns, columnChecks, data, loading, getData, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetRoleList,
  apiParams: {
    page: 1,
    pageSize: 20,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    roleName: null,
    roleCode: null
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
      key: 'roleName',
      title: $t('page.manage.role.roleName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'roleCode',
      title: $t('page.manage.role.roleCode'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: $t('page.manage.role.status'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const label = $t(enableStatusRecord[row.status]);

        return <NTag type={enableStatusTag[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'sort',
      title: $t('page.manage.role.sort'),
      align: 'center',
      width: 64
    },
    {
      key: 'description',
      title: $t('page.manage.role.description'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 300,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:role:menu:add') && (
            <NButton type="primary" ghost size="small" onClick={() => handleMenuAuth(row.id)}>
              {$t('page.manage.role.menuAuth')}
            </NButton>
          )}
          {hasAuth('sys:role:permission:add') && (
            <NButton type="primary" ghost size="small" onClick={() => handleButtonAuth(row.id)}>
              {$t('page.manage.role.buttonAuth')}
            </NButton>
          )}
          {hasAuth('sys:role:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:role:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
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

const { drawerVisible, operateType, editingId, editingData, handleId, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteRole(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
  }
}

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeleteRole(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

function edit(id: string) {
  handleEdit(id);
}

function handleMenuAuth(id: string) {
  handleId(id);
  openMenuModal();
}

function handleButtonAuth(id: string) {
  handleId(id);
  openButtonModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <RoleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:role:add"
        delete-auth="sys:role:delete"
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
        :single-column="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
      <RoleOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getData" />
      <MenuAuthModal v-model:visible="menuModalVisible" :role-id="editingId" />
      <ButtonAuthModal v-model:visible="buttonModalVisible" :role-id="editingId" />
    </NCard>
  </div>
</template>

<style scoped></style>
