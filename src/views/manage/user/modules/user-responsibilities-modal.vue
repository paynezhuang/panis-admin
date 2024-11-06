<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from 'vue';
import {
  fetchGetAllPositions,
  fetchGetAllRoles,
  fetchGetOrgUnitsTree,
  fetchGetUserResponsibilities,
  fetchSaveUserResponsibilities
} from '@/service/api';
import { $t } from '@/locales';
import { extractOptionsFromTree } from '../modules/shared';

defineOptions({
  name: 'UserResponsibilitiesSetting'
});

interface Props {
  userId: string;
}

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

type Model = Api.SystemManage.UserResponsibilities;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    userId: props.userId,
    roleIds: [],
    positionIds: [],
    orgUnitsIds: [],
    orgUnitsPrincipalIds: []
  };
}

/** org units type */
type OrgUnitsTree = Api.SystemManage.OrgUnitsTree;

/** the enabled role options */
const roleOptions = shallowRef<CommonType.Option[]>([]);

/** the enabled position options */
const positionOptions = shallowRef<CommonType.Option[]>([]);

/** org units tree data */
const orgUnitsTree = shallowRef<OrgUnitsTree[]>([]);

/** org units principal options */
const orgUnitsPrincipalOptions = computed(() => extractOptionsFromTree(orgUnitsTree.value, model.orgUnitsIds));

/** init options */
async function handleInitOptions() {
  fetchGetAllRoles()
    .then(({ error, data }) => {
      if (!error && data) {
        roleOptions.value = data;
      }
      return fetchGetAllPositions();
    })
    .then(({ error, data }) => {
      if (!error && data) {
        positionOptions.value = data;
      }
      return fetchGetOrgUnitsTree();
    })
    .then(({ error, data }) => {
      if (!error && data) {
        orgUnitsTree.value = data;
      }
    });
}

/** init model */
async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  await handleInitOptions();

  await handleUseResponsibilities();
}

/** get user responsibilities */
async function handleUseResponsibilities() {
  const { error, data } = await fetchGetUserResponsibilities(props.userId);
  if (!error && data) {
    Object.assign(model, data);
  }
}

/** update org units principal ids */
function handleOrgUnitsPrincipalIdsUpdate(value: string[]) {
  model.orgUnitsPrincipalIds = model.orgUnitsPrincipalIds.filter(id => value.includes(id));
}

/** submit */
async function handleSubmit() {
  const { error, data } = await fetchSaveUserResponsibilities(model);
  if (!error && data) {
    window.$message?.success($t('common.updateSuccess'));
    emit('submitted');
    closeModal();
  }
}

function closeModal() {
  visible.value = false;
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
  }
});
</script>

<template>
  <NModal v-model:show="visible" preset="card" :segmented="false" class="w-800px">
    <NGrid :x-gap="8" :y-gap="8">
      <NFormItemGi span="12 s:8 m:6" :label="$t('page.manage.user.userRole')">
        <NSelect
          v-model:value="model.roleIds"
          multiple
          filterable
          :options="roleOptions"
          :max-tag-count="3"
          :placeholder="$t('page.manage.user.form.userRole')"
        />
      </NFormItemGi>
      <NFormItemGi span="12 s:8 m:6" :label="$t('page.manage.user.userPosition')">
        <NSelect
          v-model:value="model.positionIds"
          multiple
          filterable
          :options="positionOptions"
          :max-tag-count="3"
          :placeholder="$t('page.manage.user.form.userPosition')"
        />
      </NFormItemGi>
      <NFormItemGi span="24" :label="$t('page.manage.user.userOrgUnits')">
        <NTreeSelect
          v-model:value="model.orgUnitsIds"
          :options="orgUnitsTree"
          multiple
          checkable
          filterable
          key-field="id"
          label-field="name"
          default-expand-all
          :max-tag-count="7"
          :on-update-value="handleOrgUnitsPrincipalIdsUpdate"
          :placeholder="$t('page.manage.user.form.userOrgUnits')"
        />
      </NFormItemGi>
      <NFormItemGi span="24" :label="$t('page.manage.user.manageOrganization')">
        <NSelect
          v-model:value="model.orgUnitsPrincipalIds"
          multiple
          filterable
          :max-tag-count="7"
          :options="orgUnitsPrincipalOptions"
          :placeholder="$t('page.manage.user.form.userOrgUnits')"
        />
      </NFormItemGi>
    </NGrid>
    <template #footer>
      <NSpace justify="end">
        <NButton quaternary @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>
