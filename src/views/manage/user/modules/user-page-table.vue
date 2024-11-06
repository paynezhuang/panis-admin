<script setup lang="tsx">
import { NButton, useModal } from 'naive-ui';
import { computed, reactive, watch } from 'vue';
import { fetchDeleteUser, fetchGetUserList, fetchResetUserPassword } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { transDeleteParams } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import { useButtonAuthDropdown } from '@/hooks/common/button-auth-dropdown';
import UserResponsibilitiesSetting from '@/views/manage/user/modules/user-responsibilities-modal.vue';
import { useBoolean } from '~/packages/hooks';
import { useDict } from '@/hooks/business/dict';
import UserOperateDrawer from './user-operate-drawer.vue';
import UserSearch from './user-search.vue';
import { collectIdsFromItem } from './shared';

defineOptions({
  name: 'UserPageListTable'
});

interface Props {
  orgUnits: Api.SystemManage.OrgUnitsTree;
}

const props = defineProps<Props>();

const orgIds = computed(() => collectIdsFromItem(props.orgUnits));

const modal = useModal();

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

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

/** api params */
const apiParams = reactive({
  page: 1,
  pageSize: 10,
  userName: null,
  realName: null,
  email: null,
  orgIds: orgIds.value
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination, searchParams, updateSearchParams, resetSearchParams } =
  useTable({
    apiFn: fetchGetUserList,
    apiParams,
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
        render: row => dictTag('gender', row.gender)
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
        render: row => dictTag('status', row.status)
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        fixed: 'right',
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

/** edit User */
function edit(id: string) {
  handleEdit(id);
}

/** delete User */
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

/** batch delete User */
async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteUser(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
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

/** user responsibilities */
async function handleResponsibilities(id: string) {
  handleId(id);
  setRespModelVisible();
}

watch(orgIds, () => {
  console.log('watch orgUnits:', props.orgUnits);
  updateSearchParams({ orgIds: orgIds.value });
  apiParams.orgIds = orgIds.value;
  getDataByPage();
});
</script>

<template>
  <div class="h-full flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
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
    </NCard>
    <UserOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    <UserResponsibilitiesSetting v-model:visible="respModelVisible" :user-id="editingId" @submitted="getDataByPage" />
  </div>
</template>
