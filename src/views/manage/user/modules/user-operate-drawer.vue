<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddUser, fetchGetAllRoles, fetchGetEditUserInfo, fetchUpdateUserInfo } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.User | null;
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
const { defaultRequiredRule, formRules } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Api.SystemManage.UserEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    userName: '',
    gender: '0',
    nickName: '',
    realName: '',
    phone: '',
    email: '',
    roleIds: [],
    status: '1'
  };
}

type RuleKey = Extract<keyof Model, 'userName' | 'status' | 'realName' | 'phone' | 'email'>;

const rules: Record<RuleKey, App.Global.FormRule[]> = {
  userName: formRules.userName,
  status: [defaultRequiredRule],
  realName: formRules.userName,
  phone: formRules.phone,
  email: formRules.email
};

/** the enabled role options */
const roleOptions = ref<CommonType.Option[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    roleOptions.value = data;
  }
}

const isAdd = computed(() => props.operateType === 'add');

async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    const { error, data } = await fetchGetEditUserInfo(props.rowData?.id);
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
  // request
  const func = isAdd.value ? fetchAddUser : fetchUpdateUserInfo;
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
    getRoleOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.user.userName')" path="userName">
          <NInput v-model:value="model.userName" :placeholder="$t('page.manage.user.form.userName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.gender')" path="gender">
          <NRadioGroup v-model:value="model.gender">
            <NRadio v-for="item in userGenderOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.nickName')" path="nickName">
          <NInput v-model:value="model.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.realName')" path="realName">
          <NInput v-model:value="model.realName" :placeholder="$t('page.manage.user.form.realName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.phone')" path="phone">
          <NInput v-model:value="model.phone" :placeholder="$t('page.manage.user.form.phone')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.email')" path="email">
          <NInput v-model:value="model.email" :placeholder="$t('page.manage.user.form.email')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userRole')" path="roles">
          <NSelect v-model:value="model.roleIds" multiple :options="roleOptions" :placeholder="$t('page.manage.user.form.userRole')" />
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
