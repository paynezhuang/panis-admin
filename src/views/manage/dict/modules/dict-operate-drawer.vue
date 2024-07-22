<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { dictTypeOptions, enableStatusOptions } from '@/constants/business';
import { fetchAddDict, fetchGetEditDict, fetchUpdateDict } from '@/service/api';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'DictOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  dictId?: string;
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
    add: $t('page.manage.dict.addDict'),
    edit: $t('page.manage.dict.editDict')
  };
  return titles[props.operateType];
});

type Model = Api.SystemManage.DictEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    code: '',
    type: '1',
    description: '',
    sort: 1,
    status: '1'
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'code'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule
};

const isEdit = computed(() => props.operateType === 'edit');

async function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.dictId) {
    const { error, data } = await fetchGetEditDict(props.dictId);
    if (!error) {
      Object.assign(model, data);
    }
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  const func = isEdit.value ? fetchUpdateDict : fetchAddDict;
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
        <NFormItem :label="$t('page.manage.dict.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.dict.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.manage.dict.form.code')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.type')" path="type">
          <NSelect v-model:value="model.type" :options="translateOptions(dictTypeOptions)" :placeholder="$t('page.manage.dict.form.type')"></NSelect>
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.dict.form.sort')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.description')" path="description">
          <NInput v-model:value="model.description" :placeholder="$t('page.manage.dict.form.description')" />
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
