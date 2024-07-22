<script setup lang="tsx">
import { NButton, NTag, useModal } from 'naive-ui';
import { fetchDeleteUser, fetchGetUserList, fetchResetUserPassword } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { enableStatusRecord, enableStatusTag, userGenderRecord, userGenderTag } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { transDeleteParams } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import { useButtonAuthDropdown } from '@/hooks/common/button-auth-dropdown';
import UserResponsibilitiesSetting from '@/views/manage/user/modules/user-responsibilities-modal.vue';
import { useBoolean } from '~/packages/hooks';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();

const { hasAuth } = useAuth();

const modal = useModal();

const { bool: respModelVisible, setTrue: setRespModelVisible } = useBoolean();

type ButtonDropdownKey = 'delete' | 'resetPassword' | 'userResponsibilities';

/** operation options */
const options: CommonType.ButtonDropdown<ButtonDropdownKey, Api.SystemManage.User>[] = [
  {
    key: 'delete',
    label: $t('common.delete'),
    show: hasAuth('sys:user:delete'),
    handler: (_key, row) => handleDelete(row.id)
  },
  {
    key: 'resetPassword',
    label: $t('page.manage.user.resetPwd'),
    show: hasAuth('sys:user:resetPassword'),
    handler: (_key, row) => handleResetPassword(row.id)
  },
  {
    key: 'userResponsibilities',
    show: hasAuth('sys:user:responsibilities'),
    label: $t('page.manage.user.responsibilities'),
    handler: (_key, row) => handleResponsibilities(row.id)
  }
];

const { renderDropdown } = useButtonAuthDropdown(options);

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetUserList,
  apiParams: {
    page: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    userName: null,
    realName: null,
    email: null
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
      align: 'center',
      width: 64
    },
    {
      key: 'userName',
      title: $t('page.manage.user.userName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'nickName',
      title: $t('page.manage.user.nickName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'realName',
      title: $t('page.manage.user.realName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'gender',
      title: $t('page.manage.user.gender'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.gender === null) {
          return null;
        }
        const label = $t(userGenderRecord[row.gender]);
        return <NTag type={userGenderTag[row.gender]}>{label}</NTag>;
      }
    },
    {
      key: 'phone',
      title: $t('page.manage.user.phone'),
      align: 'center',
      width: 120
    },
    {
      key: 'email',
      title: $t('page.manage.user.email'),
      align: 'center',
      minWidth: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'status',
      title: $t('page.manage.user.status'),
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
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 150,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:user:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {renderDropdown(row)}
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingId,
  editingData,
  handleAdd,
  handleEdit,
  handleId,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteUser(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}

function edit(id: string) {
  handleEdit(id);
}

async function handleDelete(id: string) {
  modal.create({
    title: $t('common.delete'),
    content: $t('common.confirmDelete'),
    preset: 'dialog',
    negativeText: $t('common.cancel'),
    positiveText: $t('common.confirm'),
    onPositiveClick: async () => {
      // request
      const { error, data: result } = await fetchDeleteUser(transDeleteParams([id]));
      if (!error && result) {
        await onDeleted();
      }
    }
  });
}

/** reset user password */
async function handleResetPassword(id: string) {
  modal.create({
    title: $t('page.manage.user.resetPwd'),
    content: $t('page.manage.user.confirmResetPwd'),
    preset: 'dialog',
    negativeText: $t('common.cancel'),
    positiveText: $t('common.confirm'),
    onPositiveClick: async () => {
      // request
      const { error, data: password } = await fetchResetUserPassword(id);
      if (!error) {
        modal.create({
          title: '',
          content: password,
          preset: 'dialog'
        });
      }
    }
  });
}

async function handleResponsibilities(id: string) {
  handleId(id);
  setRespModelVisible();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:user:add"
        delete-auth="sys:user:delete"
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
      <UserOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
      <UserResponsibilitiesSetting v-model:visible="respModelVisible" :user-id="editingId" />
    </NCard>
  </div>
</template>

<style scoped></style>
