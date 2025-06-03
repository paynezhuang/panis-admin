<script setup lang="tsx">
import { computed, reactive, watch } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchDeleteDataScope, fetchGetDataScopeList } from '@/service/api';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import PermissionDataScopeOperateModal from './permission-data-scope-operate-modal.vue';
import { useBoolean } from '~/packages/hooks/src';

defineOptions({
  name: 'PermissionDataRulesModal'
});

interface Props {
  /** menu data */
  menuData: Api.SystemManage.MenuTreeData;
  /** permission data */
  permissionData?: Api.SystemManage.Permission | null;
}

const props = defineProps<Props>();

const { dictTag } = useDict();

const { hasAuth } = useAuth();

const { bool: dataScopeOperateModalVisible, setTrue: openDataScopeOperateModalVisible } = useBoolean();

const visible = defineModel<boolean>('visible', {
  default: false
});

const title = computed(() => `${props.permissionData?.name} - ${$t('page.manage.dataScope.title')}`);

type Model = {
  menu: Pick<Api.SystemManage.Menu, 'id' | 'name'>;
  permission: Pick<Api.SystemManage.Permission, 'id' | 'name' | 'resource'>;
};

const model = reactive<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    menu: {
      id: '',
      name: ''
    },
    permission: {
      id: '',
      name: '',
      resource: ''
    }
  };
}

const { columns, data, loading, mobilePagination, updateSearchParams, getData, getDataByPage } = useTable({
  apiFn: fetchGetDataScopeList,
  immediate: false,
  apiParams: {
    page: 1,
    pageSize: 20,
    permissionId: model.permission.id,
    status: null
  },
  columns: () => [
    {
      key: 'name',
      title: $t('page.manage.dataScope.name'),
      align: 'center',
      width: 150
    },
    {
      key: 'code',
      title: $t('page.manage.dataScope.code'),
      align: 'center',
      width: 150
    },
    {
      key: 'scopeTypeName',
      title: $t('page.manage.dataScope.scopeTypeName'),
      align: 'center',
      width: 150
    },
    {
      key: 'description',
      title: $t('page.manage.dataScope.description'),
      align: 'center',
      width: 150
    },
    {
      key: 'status',
      title: $t('page.manage.dataScope.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'sort',
      title: $t('page.manage.dataScope.sort'),
      align: 'center',
      width: 64
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 100,
      fixed: 'right',
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:permission:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => handleEditButton(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:permission:delete') && (
            <NPopconfirm onPositiveClick={() => handleDeleteButton(row.id)}>
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

/** init model */
async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.menuData) {
    Object.assign(model.menu, props.menuData);
  }

  if (props.permissionData) {
    Object.assign(model.permission, props.permissionData);
  }

  updateSearchParams({ permissionId: model.permission.id });
  await getDataByPage();
}

const { operateType, handleData, onDeleted, editingData } = useTableOperate(data, getData);

/** add data scope button */
function handleAddButton() {
  operateType.value = 'add';
  openDataScopeOperateModalVisible();
}

/** edit data scope button */
function handleEditButton(id: string) {
  operateType.value = 'edit';
  handleData(id);
  openDataScopeOperateModalVisible();
}

/** delete data scope button */
async function handleDeleteButton(id: string) {
  const { error, data: result } = await fetchDeleteDataScope(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
  }
});
</script>

<template>
  <NModal v-model:show="visible" preset="card" :segmented="false" :title="title" class="h-[65vh] w-2/3">
    <div class="h-full flex flex-col">
      <NSpace class="mb-8px">
        <NButton type="primary" ghost size="small" @click="handleAddButton()">
          {{ $t('common.add') }}
        </NButton>
      </NSpace>
      <div class="flex-1 overflow-hidden">
        <NDataTable
          remote
          striped
          size="small"
          class="sm:h-full"
          :data="data"
          :scroll-x="962"
          :columns="columns"
          :loading="loading"
          :single-line="false"
          :row-key="row => row.id"
          :pagination="mobilePagination"
        />
      </div>
      <PermissionDataScopeOperateModal
        v-model:visible="dataScopeOperateModalVisible"
        :operate-type="operateType"
        :menu-data="model.menu"
        :permission-data="model.permission"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </div>
  </NModal>
</template>
