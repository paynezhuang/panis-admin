<script setup lang="tsx">
import { ref } from 'vue';
import type { UploadCustomRequestOptions, UploadInst } from 'naive-ui';
import { NButton, NDropdown, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { fetchDeleteRole, fetchExportRoleData, fetchGetRoleList, fetchImportRoleData } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { transDeleteParams } from '@/utils/common';
import { downloadBlob } from '@/utils/download';
import { $t } from '@/locales';
import RoleOperateDrawer from './modules/role-operate-drawer.vue';
import RoleSearch from './modules/role-search.vue';
import MenuAuthModal from './modules/menu-auth-modal.vue';
import ButtonAuthModal from './modules/button-auth-modal.vue';
import DataScopeAuthModal from './modules/data-scope-auth-modal.vue';

const appStore = useAppStore();

const { bool: menuModalVisible, setTrue: openMenuModal } = useBoolean();

const { bool: buttonModalVisible, setTrue: openButtonModal } = useBoolean();

const { bool: dataScopeModalVisible, setTrue: openDataScopeModal } = useBoolean();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

// 定义上传组件的 ref
const uploadRef = ref<UploadInst | null>(null);

// 定义操作项权限映射表
const operationMap = [
  {
    key: 'edit',
    label: $t('common.edit'),
    auth: hasAuth('sys:role:update'),
    handler: (id: string) => edit(id)
  },
  {
    key: 'menuAuth',
    label: $t('page.manage.role.menuAuth'),
    auth: hasAuth('sys:role:menu:add'),
    handler: (id: string) => handleMenuAuth(id)
  },
  {
    key: 'buttonAuth',
    label: $t('page.manage.role.buttonAuth'),
    auth: hasAuth('sys:role:permission:add'),
    handler: (id: string) => handleButtonAuth(id)
  },
  {
    key: 'dataScopeAuth',
    label: $t('page.manage.role.dataScopeAuth'),
    auth: hasAuth('sys:role:data:scope:add'),
    handler: (id: string) => handleDataScopeAuth(id)
  }
] as const;

// 定义下拉菜单选项
const getDropdownOptions = () => {
  return operationMap
    .filter(item => item.auth)
    .map(item => ({
      label: item.label,
      key: item.key
    }));
};

// 处理下拉菜单选择
const handleSelect = (key: string, id: string) => {
  const operation = operationMap.find(item => item.key === key);
  if (operation) {
    operation.handler(id);
  }
};

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
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
      render: row => dictTag('status', row.status)
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
      width: 120,
      render: row => {
        const options = getDropdownOptions();
        return (
          <div class="flex-center gap-8px">
            {options.length > 0 && (
              <NDropdown trigger="hover" options={options} onSelect={key => handleSelect(key, row.id)}>
                <NButton type="primary" quaternary size="small">
                  {$t('common.operate')}
                </NButton>
              </NDropdown>
            )}
            {hasAuth('sys:role:delete') && (
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
        );
      }
    }
  ]
});

const { drawerVisible, operateType, editingId, editingData, handleId, handleData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
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

function handleDataScopeAuth(id: string) {
  handleData(id);
  openDataScopeModal();
}

// export role data
async function exportData() {
  const { error, response } = await fetchExportRoleData();
  if (!error && response) {
    downloadBlob(response);
  }
}

// custom request upload
async function customRequest({ file, onFinish }: UploadCustomRequestOptions) {
  const formData = new FormData();
  formData.append('file', file.file as File);
  fetchImportRoleData(formData)
    .then(({ error, data: result }) => {
      if (!error && result) {
        onFinish();
        uploadRef.value?.clear();
        getData();
        window.$message?.success($t('common.uploadSuccess'));
      }
    })
    .catch(() => uploadRef.value?.clear());
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <RoleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:role:add"
        delete-auth="sys:role:delete"
        export-auth="sys:role:export"
        @add="handleAdd"
        @delete="handleBatchDelete"
        @refresh="getData"
        @export="exportData"
      >
        <template #suffix>
          <NUpload v-if="hasAuth('sys:role:import')" ref="uploadRef" :custom-request="customRequest" :max="1" :show-file-list="false">
            <NButton size="small" type="primary" ghost>
              <template #icon>
                <icon-ic:baseline-cloud-upload class="text-icon" />
              </template>
              {{ $t('page.monitor.file.upload') }}
            </NButton>
          </NUpload>
        </template>
      </TableHeaderOperation>
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
      <RoleOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
      <MenuAuthModal v-model:visible="menuModalVisible" :role-id="editingId" />
      <ButtonAuthModal v-model:visible="buttonModalVisible" :role-id="editingId" />
      <DataScopeAuthModal v-model:visible="dataScopeModalVisible" :role-id="editingData?.id || ''" :role-name="editingData?.roleName || ''" />
    </NCard>
  </div>
</template>

<style scoped></style>
