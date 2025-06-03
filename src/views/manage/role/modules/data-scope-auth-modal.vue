<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from 'vue';
import type { TreeOption } from 'naive-ui';
import { fetchAddRoleDataScope, fetchGetDataScopeTree, fetchGetRoleDataScopeIds } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'DataScopeAuthModal'
});

interface Props {
  /** the roleId */
  roleId: string;
  /** the roleName */
  roleName: string;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { dictTag } = useDict();

const title = computed(() => {
  return `${$t('common.edit')}${$t('page.manage.role.dataScopeAuth')} - ${props.roleName}`;
});

/** tree data */
const treeData = shallowRef<TreeOption[]>([]);

/** tree checks */
const checks = shallowRef<string[]>([]);

/** menu auth model */
const model: Api.SystemManage.RoleDataScope = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.RoleDataScope {
  return {
    roleId: props.roleId,
    dataScopeIds: []
  };
}

/**
 * 将后端数据转换为 NTree 组件所需的树形结构
 *
 * @param data 后端返回的数据权限树数据
 * @returns 符合 NTree 组件要求的 TreeOption 数组
 */
function convertToTreeData(data: Api.SystemManage.DataScopeTree[]): TreeOption[] {
  return data.map(menu => {
    // 第一层：菜单层
    const menuNode: TreeOption = {
      key: `menu_${menu.menuId}`,
      label: menu.menuName,
      children: []
    };

    // 第二层：权限资源层
    if (menu.children) {
      menuNode.children = menu.children.map(permission => {
        const permissionNode: TreeOption = {
          key: `permission_${permission.permissionId}`,
          label: `${permission.permissionName} (${permission.permissionResource})`,
          children: []
        };

        // 第三层：权限规则层（可选择的叶子节点）
        if (permission.children) {
          permissionNode.children = permission.children.map(scope => ({
            key: scope.id,
            label: `${scope.name} - ${scope.code}`,
            suffix: () => dictTag('data_scope_type', scope.scopeType)
          }));
        }

        return permissionNode;
      });
    }

    return menuNode;
  });
}

/**
 * 从选中的节点中筛选出叶子节点（权限规则） 过滤掉菜单层和权限资源层的选中项，只保留权限规则层的选中项
 *
 * @param checkedKeys 树形组件选中的所有节点key数组
 * @returns 只包含权限规则ID的数组
 */
function filterLeafNodes(checkedKeys: string[]): string[] {
  return checkedKeys.filter(key => {
    // 过滤掉菜单层节点（以 menu_ 开头）
    if (key.startsWith('menu_')) return false;
    // 过滤掉权限资源层节点（以 permission_ 开头）
    if (key.startsWith('permission_')) return false;
    // 保留权限规则层节点（直接是 scope.id）
    return true;
  });
}

/** 获取数据权限树数据 从后端获取完整的数据权限树结构并转换为树形组件数据 */
async function getDataScopeData() {
  const { error, data } = await fetchGetDataScopeTree();
  if (!error) {
    // 保存原始数据用于后续处理
    // dataScopeData.value = data;
    // 转换为树形组件数据
    treeData.value = convertToTreeData(data);
  }
}

/** 获取角色已有的数据权限ID列表 用于初始化树形组件的选中状态 */
async function getDataScopeIds() {
  const { error, data } = await fetchGetRoleDataScopeIds(props.roleId);
  if (!error) {
    checks.value = data; // 设置已选中的权限规则ID
    getDataScopeData(); // 获取树形数据
  }
}

function closeModal() {
  visible.value = false;
}

/** handle submit */
async function handleSubmit() {
  // 从选中的节点中筛选出叶子节点（权限规则）
  const leafNodeIds = filterLeafNodes(checks.value);
  model.dataScopeIds = leafNodeIds;
  const { error, data } = await fetchAddRoleDataScope(model);
  if (!error && data) {
    window.$message?.success?.($t('common.modifySuccess'));
    closeModal();
  }
}

watch(visible, () => {
  if (visible.value) {
    Object.assign(model, createDefaultModel());
    getDataScopeIds();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" :segmented="false" class="w-1/2">
    <div class="h-600px">
      <NTree v-model:checked-keys="checks" :data="treeData" show-line block-line expand-on-click checkable cascade virtual-scroll class="h-full" />
    </div>
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" quaternary @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
