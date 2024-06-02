<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddScheduler, fetchGetEditScheduler, fetchUpdateSchedulerInfo } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'SchedulerOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Monitor.Scheduler | null;
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
    add: $t('page.monitor.scheduler.addJob'),
    edit: $t('page.monitor.scheduler.editJob')
  };
  return titles[props.operateType];
});

type Model = Api.Monitor.SchedulerEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    jobName: '',
    jobGroup: '',
    jobClassName: '',
    description: '',
    cronExpression: '',
    jobData: [],
    triggerName: '',
    triggerGroup: '',
    triggerDescription: '',
    triggerData: []
  };
}

type RuleKey = Extract<keyof Model, 'jobName' | 'jobGroup' | 'jobClassName' | 'triggerName' | 'triggerGroup'>;

const rules: Record<RuleKey, App.Global.FormRule[]> = {
  jobName: [defaultRequiredRule],
  jobGroup: [defaultRequiredRule],
  jobClassName: [defaultRequiredRule],
  triggerName: [defaultRequiredRule],
  triggerGroup: [defaultRequiredRule]
};

const isEdit = computed(() => props.operateType === 'edit');

async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    const { error, data } = await fetchGetEditScheduler(props.rowData?.id);
    if (!error) {
      Object.assign(model, data);
    }
  }
  if (!model.jobData) {
    model.jobData = [];
  }
  if (!model.triggerData) {
    model.triggerData = [];
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  const func = isEdit.value ? fetchUpdateSchedulerInfo : fetchAddScheduler;
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
  <NDrawer v-model:show="visible" display-directive="show" width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.monitor.scheduler.jobName')" path="jobName">
          <NInput v-model:value="model.jobName" :placeholder="$t('page.monitor.scheduler.form.jobName')" :disabled="isEdit" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.jobGroup')" path="jobGroup">
          <NInput v-model:value="model.jobGroup" :placeholder="$t('page.monitor.scheduler.form.jobGroup')" :disabled="isEdit" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.jobClassName')" path="jobClassName">
          <NInput v-model:value="model.jobClassName" :placeholder="$t('page.monitor.scheduler.form.jobClassName')" />
        </NFormItem>
        <NFormItem span="24" :label="$t('page.monitor.scheduler.jobData')">
          <NDynamicInput
            v-model:value="model.jobData"
            preset="pair"
            :key-placeholder="$t('page.monitor.scheduler.form.jobDataKey')"
            :value-placeholder="$t('page.monitor.scheduler.form.jobDataValue')"
          >
            <template #action="{ index, create, remove }">
              <NSpace class="ml-8px">
                <NButton size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </NSpace>
            </template>
          </NDynamicInput>
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.cronExpression')" path="cronExpression">
          <NInput v-model:value="model.cronExpression" :placeholder="$t('page.monitor.scheduler.form.cronExpression')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.description')" path="description">
          <NInput v-model:value="model.description" :placeholder="$t('page.monitor.scheduler.form.description')" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.triggerName')" path="triggerName">
          <NInput v-model:value="model.triggerName" :placeholder="$t('page.monitor.scheduler.form.triggerName')" :disabled="isEdit" />
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.triggerGroup')" path="triggerGroup">
          <NInput v-model:value="model.triggerGroup" :placeholder="$t('page.monitor.scheduler.form.triggerGroup')" :disabled="isEdit" />
        </NFormItem>
        <NFormItem span="24" :label="$t('page.monitor.scheduler.triggerData')">
          <NDynamicInput
            v-model:value="model.triggerData"
            preset="pair"
            :key-placeholder="$t('page.monitor.scheduler.form.triggerDataKey')"
            :value-placeholder="$t('page.monitor.scheduler.form.triggerDataValue')"
          >
            <template #action="{ index, create, remove }">
              <NSpace class="ml-8px">
                <NButton size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </NSpace>
            </template>
          </NDynamicInput>
        </NFormItem>
        <NFormItem :label="$t('page.monitor.scheduler.triggerDescription')" path="triggerDescription">
          <NInput v-model:value="model.triggerDescription" :placeholder="$t('page.monitor.scheduler.form.triggerDescription')" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
