<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from 'vue';
import { fetchAddRolePermission, fetchGetMenuPermission, fetchGetRolePermissionIds } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'ButtonAuthModal'
});

interface Props {
  /** the roleId */
  roleId: string;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const title = computed(() => $t('common.edit') + $t('page.manage.role.buttonAuth'));

/** tree checks */
const checks = shallowRef<string[]>([]);

/** menu auth model */
const model: Api.SystemManage.RolePermission = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.RolePermission {
  return {
    roleId: props.roleId,
    permissionIds: []
  };
}

/** menu permission data */
const permissionData = shallowRef<Api.SystemManage.MenuPermission[]>([]);

async function getPermissionData() {
  const { error, data } = await fetchGetMenuPermission();
  if (!error) {
    permissionData.value = data;
  }
}

/** init get permissionIds for roleId, belong checks */
async function getPermissionIds() {
  const { error, data } = await fetchGetRolePermissionIds(props.roleId);
  if (!error) {
    checks.value = data;
    getPermissionData();
  }
}

function closeModal() {
  visible.value = false;
}

async function handleSubmit() {
  model.permissionIds = checks.value;
  const { error, data } = await fetchAddRolePermission(model);
  if (!error && data) {
    window.$message?.success?.($t('common.modifySuccess'));
    closeModal();
  }
}

watch(visible, () => {
  if (visible.value) {
    Object.assign(model, createDefaultModel());
    getPermissionIds();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" :segmented="false" class="w-1080px">
    <NCheckboxGroup v-model:value="checks" class="h-500px overflow-auto" size="small">
      <NDescriptions label-placement="left" bordered :column="1">
        <NDescriptionsItem v-for="item in permissionData" :key="item.menuId" :label="$t(item.i18nKey)">
          <NGrid :y-gap="8" :cols="4">
            <NGridItem v-for="button in item.buttons" :key="button.id">
              <NCheckbox :value="button.id" :label="button.name" />
            </NGridItem>
          </NGrid>
        </NDescriptionsItem>
      </NDescriptions>
    </NCheckboxGroup>
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
