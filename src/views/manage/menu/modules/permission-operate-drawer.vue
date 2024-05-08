<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { NFormItem, NText } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddPermission, fetchUpdatePermissionInfo } from '@/service/api';
import { enableStatusOptions } from '@/constants/business';
import { $t } from '@/locales';

defineOptions({
  name: 'PermissionOperateDrawer'
});
export type OperateType = NaiveUI.TableOperateType | 'add';

interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** menu data */
  menuData: Api.SystemManage.MenuTreeData;
  /** edit row data */
  rowData?: Api.SystemManage.Permission | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.manage.permission.addButton'),
    edit: $t('page.manage.permission.editButton')
  };
  return titles[props.operateType];
});

type Model = Api.SystemManage.PermissionEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '0',
    menuId: '0',
    menuName: '',
    name: '',
    resource: '',
    description: '',
    status: '1',
    sort: 0
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'resource' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  resource: defaultRequiredRule,
  status: defaultRequiredRule
};

const isEdit = computed(() => props.operateType === 'edit');

async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'add') {
    const { id, name } = props.menuData;
    Object.assign(model, { menuId: id, menuName: name });
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  // request
  const func = isEdit.value ? fetchUpdatePermissionInfo : fetchAddPermission;
  const { error, data } = await func(model);
  if (!error && data) {
    window.$message?.success(isEdit.value ? $t('common.updateSuccess') : $t('common.addSuccess'));
    closeDrawer();
    emit('submitted');
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="400">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
        <NFormItem :label="$t('page.manage.permission.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.permission.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.permission.resource')" path="resource">
          <NInput v-model:value="model.resource" type="textarea" :placeholder="$t('page.manage.permission.form.resource')" />
        </NFormItem>
        <NFormItem>
          <NText depth="3">{{ $t('page.manage.permission.form.resourceIntroduction') }}</NText>
        </NFormItem>
        <NFormItem span="24" :label="$t('page.manage.permission.description')" path="description">
          <NInput v-model:value="model.description" type="textarea" :placeholder="$t('page.manage.permission.form.description')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.permission.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItemGi :label="$t('page.manage.permission.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.permission.form.sort')" />
        </NFormItemGi>
      </NForm>
      <template #footer>
        <NSpace :size="12" justify="end">
          <NButton quaternary @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
