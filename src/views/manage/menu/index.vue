<script setup lang="tsx">
import type { Ref } from 'vue';
import { h, reactive, ref, shallowRef } from 'vue';
import { useBoolean } from '@sa/hooks';
import { NTag } from 'naive-ui';
import { $t } from '@/locales';
import { fetchDeleteMenu, fetchGetAllPages, fetchGetMenuTree } from '@/service/api';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { transDeleteParams } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import PermissionListTable from './modules/permission-list-table.vue';
import MenuOperateDrawer, { type OperateType } from './modules/menu-operate-drawer.vue';

const { bool: detailVisible, setBool: setDetailVisible, setFalse: hideDetail } = useBoolean();

const { bool: menuDrawerVisible, setTrue: openMenuDrawer } = useBoolean();

const { hasAuth } = useAuth();

const { dcitType, dictLabel } = useDict();

const operateType = ref<OperateType>('add');

type MenuTreeModel = Api.SystemManage.MenuTreeData;

/** tree data */
const tree = shallowRef<MenuTreeModel[]>([]);

/** tree pattern name , use tree search */
const name: Ref<string> = ref('');

/** the select menu data */
const showData: MenuTreeModel = reactive({
  id: '0',
  type: '1',
  name: '',
  routeName: '',
  routePath: '',
  icon: '',
  iconType: '1',
  status: '1',
  hide: 'N',
  sort: 0,
  parentId: '0'
});

/** get tree data */
async function getTree() {
  const { error, data } = await fetchGetMenuTree();
  if (!error) {
    tree.value = data.map(recursive);
  }
}

/** recursive menu tree data, add prefix transform treeOption format */
function recursive(item: Api.SystemManage.Menu): MenuTreeModel {
  const result: MenuTreeModel = {
    ...item,
    label: $t(item.i18nKey as App.I18n.I18nKey),
    prefix: () => {
      const icon = item.iconType === '1' ? item.icon : undefined;
      const localIcon = item.iconType === '2' ? item.icon : undefined;
      return h(SvgIcon, {
        icon,
        localIcon,
        class: 'text-icon'
      });
    }
  };
  if (item.children) {
    result.children = item.children.map(recursive);
  }
  return result;
}

/** tree select handle */
function handleSelectKeys(node: NaiveUI.TreeOption | null, action: string) {
  setDetailVisible(action === 'select');
  if (detailVisible) {
    Object.assign(showData, node);
  }
}

const allPages = shallowRef<string[]>([]);

async function getAllPages() {
  const { data: pages } = await fetchGetAllPages();
  allPages.value = pages || [];
}

function handleAddMenu() {
  operateType.value = 'add';
  openMenuDrawer();
}

function handleAddChildMenu() {
  operateType.value = 'addChild';
  openMenuDrawer();
}

function handleEditMenu() {
  operateType.value = 'edit';
  openMenuDrawer();
}

async function handleDeleteMenu() {
  // request
  const { error, data: result } = await fetchDeleteMenu(transDeleteParams([showData.id]));
  if (!error && result) {
    window.$message?.success($t('common.deleteSuccess'));
    init(null);
    hideDetail();
  }
}

function init(data: Api.SystemManage.MenuEdit | null) {
  if (data) {
    Object.assign(showData, data);
  }
  getTree();
  getAllPages();
}

init(null);
</script>

<template>
  <div class="flex">
    <NGrid :x-gap="8" :y-gap="8" item-responsive responsive="screen" cols="1 s:1 m:5 l:5 xl:5 2xl:5" class="h-full-hidden">
      <NGridItem span="1" class="h-full-hidden">
        <NCard :title="$t('page.manage.menu.title')" :bordered="false" size="small" class="h-full sm:flex-1-hidden" content-class="h-full-hidden">
          <template #header-extra>
            <NButton quaternary @click="init(null)">
              <template #icon>
                <SvgIcon icon="ic:round-refresh" />
              </template>
            </NButton>
          </template>
          <NInput v-model:value="name" :placeholder="$t('page.manage.menu.form.name')" clearable />
          <NTree
            :data="tree"
            :pattern="name"
            block-line
            class="flex-col-stretch py-3"
            key-field="id"
            virtual-scroll
            :show-irrelevant-nodes="false"
            @update-selected-keys="(_key, _option, { node, action }) => handleSelectKeys(node, action)"
          />
        </NCard>
      </NGridItem>
      <NGridItem v-if="detailVisible" span="4" class="flex flex-col">
        <NCard :title="$t('page.manage.menu.detail')" :bordered="false" size="small" class="mb-2">
          <template #header-extra>
            <NSpace>
              <NButton v-if="showData.type === '1' && hasAuth('sys:menu:add')" type="primary" quaternary size="small" @click="handleAddChildMenu()">
                {{ $t('page.manage.menu.addChildMenu') }}
              </NButton>
              <NButton v-if="hasAuth('sys:menu:add')" ghost type="primary" size="small" @click="handleAddMenu()">
                {{ $t('common.add') }}
              </NButton>
              <NButton v-if="hasAuth('sys:menu:update')" ghost type="primary" size="small" @click="handleEditMenu()">
                {{ $t('common.edit') }}
              </NButton>
              <NPopconfirm v-if="hasAuth('sys:menu:delete')" placement="bottom" @positive-click="handleDeleteMenu">
                <template #trigger>
                  <NButton ghost type="error" size="small">
                    {{ $t('common.delete') }}
                  </NButton>
                </template>
                {{ $t('common.confirmDelete') }}
              </NPopconfirm>
            </NSpace>
          </template>
          <NDescriptions label-placement="left" size="small" bordered :column="2">
            <NDescriptionsItem :label="$t('page.manage.menu.type')">
              <NTag :type="dcitType('menu_type', showData.type)">{{ dictLabel('menu_type', showData.type) }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.status')">
              <NTag :type="dcitType('status', showData.status)">{{ dictLabel('status', showData.status) }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.name')">{{ showData.name }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.i18nKey')">{{ showData.i18nKey }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.routeName')">{{ showData.routeName }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.routePath')">{{ showData.routePath }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.hideInMenu')">
              <NTag :type="dcitType('feature_status', showData.hide)">{{ dictLabel('feature_status', showData.hide) }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.keepAlive')">
              <NTag :type="dcitType('feature_status', showData.keepAlive || 'N')">{{ dictLabel('feature_status', showData.keepAlive || 'N') }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.href')" :span="2">{{ showData.href }}</NDescriptionsItem>
          </NDescriptions>
        </NCard>
        <PermissionListTable :show-data="showData" :all-pages="allPages" />
      </NGridItem>
      <NGridItem v-else span="4">
        <NCard :bordered="false" size="small" class="h-full">
          <NEmpty :description="$t('page.manage.menu.selectTreeIsEmptyTip')" class="h-full justify-center" />
        </NCard>
      </NGridItem>
    </NGrid>
    <MenuOperateDrawer
      v-model:visible="menuDrawerVisible"
      :row-data="showData"
      :operate-type="operateType"
      :all-pages="allPages"
      @submitted="data => init(data)"
    />
  </div>
</template>

<style scoped></style>
