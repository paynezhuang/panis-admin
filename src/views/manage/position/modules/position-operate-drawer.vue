<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { fetchAddPosition, fetchUpdatePosition } from '@/service/api';

defineOptions({
  name: 'PositionOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Position | null;
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
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.position.addPosition'),
    edit: $t('page.manage.position.editPosition')
  };
  return titles[props.operateType];
});

type Model = Api.SystemManage.PositionEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    code: '',
    i18nKey: '',
    abbr: '',
    description: '',
    sort: 1,
    status: '1'
  };
}

type RuleKey = Exclude<keyof Model, 'description' | 'abbr' | 'i18nKey' | 'sort'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule,
  status: defaultRequiredRule
};

const isEdit = computed(() => props.operateType === 'edit');

function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  const func = isEdit.value ? fetchUpdatePosition : fetchAddPosition;
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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.position.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.position.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.position.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.manage.position.form.code')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.position.abbr')" path="abbr">
          <NInput v-model:value="model.abbr" :placeholder="$t('page.manage.position.form.abbr')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.position.i18nKey')" path="i18nKey">
          <NInput v-model:value="model.i18nKey" :placeholder="$t('page.manage.position.form.i18nKey')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.position.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.position.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.position.form.sort')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.position.description')" path="description">
          <NInput v-model:value="model.description" :placeholder="$t('page.manage.position.form.description')" />
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
