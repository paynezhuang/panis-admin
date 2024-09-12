<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddOrgUnits, fetchUpdateOrgUnits } from '@/service/api';
import { getLevelAndAncestors } from '@/views/manage/org/modules/shared';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'OrgUnitsOperateDrawer'
});

export type OperateType = NaiveUI.TableOperateType | 'addChild';

interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.OrgUnits | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { dictOptions } = useDict();

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.manage.orgUnits.addOrgUnits'),
    edit: $t('page.manage.orgUnits.editOrgUnits'),
    addChild: $t('page.manage.orgUnits.addChildOrgUnits')
  };
  return titles[props.operateType];
});

type Model = Api.SystemManage.OrgUnitsEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '0',
    parentId: 0,
    name: '',
    code: '',
    abbr: '',
    level: 1,
    ancestors: '0',
    description: '',
    sort: 1,
    status: '1'
  };
}

type RuleKey = Exclude<keyof Model, 'id' | 'parentId' | 'abbr' | 'level' | 'ancestors' | 'description' | 'i18nKey' | 'sort'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  code: defaultRequiredRule,
  name: defaultRequiredRule,
  status: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }

  if (props.operateType === 'addChild') {
    const { id } = props.rowData;
    const { level, ancestors } = getLevelAndAncestors(props.rowData);
    Object.assign(model, { parentId: id, level, ancestors });
  }
}

function closeDrawer() {
  visible.value = false;
}

const isAdd = computed(() => props.operateType === 'add' || props.operateType === 'addChild');

async function handleSubmit() {
  await validate();
  const func = isAdd.value ? fetchAddOrgUnits : fetchUpdateOrgUnits;
  const { error, data } = await func(model);
  if (!error && data) {
    window.$message?.success(isAdd.value ? $t('common.addSuccess') : $t('common.updateSuccess'));
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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.orgUnits.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.orgUnits.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.orgUnits.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.manage.orgUnits.form.code')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.orgUnits.abbr')" path="abbr">
          <NInput v-model:value="model.abbr" :placeholder="$t('page.manage.orgUnits.form.abbr')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.orgUnits.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in dictOptions('status')" :key="item.value" :value="item.value" :label="item.label" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.orgUnits.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.orgUnits.form.sort')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.orgUnits.description')" path="description">
          <NInput v-model:value="model.description" :placeholder="$t('page.manage.orgUnits.form.description')" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace>
          <NButton quaternary @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
