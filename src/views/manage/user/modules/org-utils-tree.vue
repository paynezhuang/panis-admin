<script setup lang="ts">
import type { Ref } from 'vue';
import { h, onMounted, ref, shallowRef } from 'vue';
import type { TreeOption } from 'naive-ui';
import { NButton, NButtonGroup, NFlex, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { useAuth } from '@/hooks/business/auth';
import { fetchDeleteOrgUnits, fetchGetOrgUnits, fetchGetOrgUnitsTree } from '@/service/api';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { $t } from '@/locales';
import OrgUnitsOperateDrawer from '@/views/manage/org/modules/org-units-operate-drawer.vue';
import { transDeleteParams } from '@/utils/common';
import type { OperateType } from './shared';

defineOptions({
  name: 'UserOrgUnitsTree'
});

const name = ref<string>('');

type Emits = {
  (e: 'select', visible: boolean, item: Api.SystemManage.OrgUnitsTree): void;
};

const emit = defineEmits<Emits>();

const { hasAuth } = useAuth();

const operateType = ref<OperateType>('add');

const orgUnitsTreeData = shallowRef<Api.SystemManage.OrgUnitsTree[]>([]);

const { bool: visible, setTrue: openDrawer } = useBoolean();

const { bool: userItemVisible, setBool: setUserItemVisible } = useBoolean();

const editingData: Ref<Api.SystemManage.OrgUnits | null> = ref(null);

/** init */
const init = async () => {
  const { data, error } = await fetchGetOrgUnitsTree();
  if (!error && data) {
    orgUnitsTreeData.value = data;
    orgUnitsTreeData.value.unshift({
      id: '-1',
      name: $t('page.manage.orgUnits.unassigned'),
      code: 'unassigned'
    });
  }
};

/** add */
const handleAdd = () => {
  operateType.value = 'add';
  openDrawer();
};

/** add child */
const handleAddChild = async (item: Api.SystemManage.OrgUnitsTree) => {
  const { error, data } = await fetchGetOrgUnits(item.id);
  if (!error && data) {
    operateType.value = 'addChild';
    editingData.value = { ...data };
    openDrawer();
  }
};

/** edit */
const handleEdit = async (item: Api.SystemManage.OrgUnitsTree) => {
  const { error, data } = await fetchGetOrgUnits(item.id);
  if (!error && data) {
    operateType.value = 'edit';
    editingData.value = { ...data };
    openDrawer();
  }
};

/** delete */
const handleDelete = async (item: Api.SystemManage.OrgUnitsTree) => {
  const { error, data: result } = await fetchDeleteOrgUnits(transDeleteParams([item.id]));
  if (!error && result) {
    window.$message?.success($t('common.deleteSuccess'));
    await init();
  }
};

/** render suffix */
function renderSuffix({ option }: { option: TreeOption }) {
  const item = option as Api.SystemManage.OrgUnitsTree;
  if (item.id === '-1') return null;
  return h(
    NButtonGroup,
    {},
    {
      default: () => [
        hasAuth('sys:org:units:add') &&
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              onClick: event => {
                event.stopPropagation();
                handleAddChild(item);
              }
            },
            { icon: () => h(SvgIcon, { icon: 'ic:round-playlist-add' }) }
          ),
        hasAuth('sys:org:units:update') &&
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              onClick: event => {
                event.stopPropagation();
                handleEdit(item);
              }
            },
            { icon: () => h(SvgIcon, { icon: 'ic:round-edit' }) }
          ),
        hasAuth('sys:org:units:delete') &&
          h(
            NPopconfirm,
            {
              onPositiveClick: () => handleDelete(item)
            },
            {
              default: () => $t('common.confirmDelete'),
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'tiny',
                    quaternary: true,
                    onClick: event => {
                      event.stopPropagation();
                    }
                  },
                  { icon: () => h(SvgIcon, { icon: 'ic:round-delete' }) }
                )
            }
          )
      ]
    }
  );
}

/** tree select handle */
function handleSelectKeys(node: NaiveUI.TreeOption | null, action: string) {
  setUserItemVisible(action === 'select');
  emit('select', userItemVisible.value, node as Api.SystemManage.OrgUnitsTree);
}

onMounted(() => init());
</script>

<template>
  <div class="h-full-hidden">
    <NCard :title="$t('page.manage.orgUnits.title')" :bordered="false" size="small" class="h-full sm:flex-1-hidden" content-class="h-full-hidden">
      <template #header-extra>
        <NFlex>
          <NButton v-if="hasAuth('sys:org:units:add')" ghost type="primary" @click="handleAdd()">
            {{ $t('common.add') }}
          </NButton>
          <NButton quaternary>
            <template #icon>
              <SvgIcon icon="ic:round-refresh" />
            </template>
          </NButton>
        </NFlex>
      </template>
      <div class="h-full flex flex-col">
        <NInput v-model:value="name" class="mb-2" clearable :placeholder="$t('common.keywordSearch')" />
        <NTree
          :pattern="name"
          :data="orgUnitsTreeData"
          accordion
          block-line
          key-field="id"
          label-field="name"
          virtual-scroll
          :show-irrelevant-nodes="false"
          :render-suffix="renderSuffix"
          class="p-tree my-3 flex-col-stretch"
          @update-selected-keys="(_key, _option, { node, action }) => handleSelectKeys(node, action)"
        />
      </div>
    </NCard>
    <OrgUnitsOperateDrawer v-model:visible="visible" :operate-type="operateType" :row-data="editingData" @submitted="init" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.n-tree) {
  .n-tree-node-content__suffix {
    display: none;
  }
  .n-tree-node-content:hover .n-tree-node-content__suffix {
    display: inline-flex;
  }
}
</style>
