<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddNotice, fetchUpdateNoticeInfo } from '@/service/api';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'SysNoticeOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Manage.Notice | null;
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
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('common.add'),
    edit: $t('common.edit')
  };
  return titles[props.operateType];
});

type Model = Api.Manage.NoticeEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    category: '1',
    title: '',
    content: '',
    releaseTime: Date.now(),
    remark: '',
    status: '1'
  };
}

type RuleKey = Extract<keyof Model, 'title' | 'content' | 'releaseTime'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  title: defaultRequiredRule,
  content: defaultRequiredRule,
  releaseTime: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

const isAdd = computed(() => props.operateType === 'add');

async function handleSubmit() {
  await validate();
  const func = isAdd.value ? fetchAddNotice : fetchUpdateNoticeInfo;
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
        <NFormItem :label="$t('page.manage.notice.category')" path="category">
          <NSelect v-model:value="model.category" :options="dictOptions('notice_category')" :placeholder="$t('page.manage.notice.form.category')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.notice.title')" path="title">
          <NInput v-model:value="model.title" :placeholder="$t('page.manage.notice.form.title')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.notice.content')" path="content">
          <NInput v-model:value="model.content" type="textarea" :placeholder="$t('page.manage.notice.form.content')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.notice.releaseTime')" path="releaseTime">
          <NDatePicker v-model:value="model.releaseTime" type="datetime" :placeholder="$t('page.manage.notice.form.releaseTime')" clearable />
        </NFormItem>
        <NFormItem :label="$t('page.manage.notice.remark')" path="remark">
          <NInput v-model:value="model.remark" type="textarea" :placeholder="$t('page.manage.notice.form.remark')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.notice.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio
              v-for="item in dictOptions('status')"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :placeholder="$t('page.manage.notice.form.status')"
            />
          </NRadioGroup>
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
