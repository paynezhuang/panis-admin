<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { logicTypeOptions } from '@/constants/common';
import { fetchAddDataScope, fetchGetDataScopeInfo, fetchGetVariableConditions, fetchUpdateDataScopeInfo } from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
import { getOperatorsForVariable, getPermissionScopeTypeName, getResourceWithPermission, transformToSelectOptions } from './shared';

// 组件名称定义
defineOptions({
  name: 'PermissionDataScopeOperateModal'
});

// Props 类型定义
interface Props {
  /** 操作类型 */
  operateType: NaiveUI.TableOperateType;
  /** 菜单数据 */
  menuData?: Pick<Api.SystemManage.Menu, 'id' | 'name'>;
  /** 权限数据 */
  permissionData?: Pick<Api.SystemManage.Permission, 'id' | 'name' | 'resource'>;
  /** 编辑行数据 */
  rowData?: Api.SystemManage.DataScope | null;
}

const props = defineProps<Props>();

// 事件定义
interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

// 模态框显示状态
const visible = defineModel<boolean>('visible', {
  default: false
});

// 字典选项
const { dictOptions } = useDict();

// 表单相关
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

// 标题计算
const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: `${props.permissionData?.name} - ${$t('common.add')}${$t('page.manage.dataScope.form.title')}`,
    edit: `${props.permissionData?.name} - ${$t('common.edit')}${$t('page.manage.dataScope.form.title')}`
  };
  return titles[props.operateType];
});

// 表单模型类型
type Model = Api.SystemManage.DataScopeEdit;

// 表单数据
const model = reactive<Model>(createDefaultModel());

// 创建默认表单数据
function createDefaultModel(): Model {
  return {
    id: '',
    name: '',
    code: '',
    menuId: props.menuData?.id || '',
    menuName: props.menuData?.name || '',
    permissionId: props.permissionData?.id || '',
    permissionResource: props.permissionData?.resource || '',
    permissionName: props.permissionData?.name || '',
    scopeType: '6',
    scopeTypeName: '',
    customRules: [],
    description: '',
    sort: 1,
    status: '1'
  };
}

// 表单验证规则
type RuleKey = Extract<keyof Model, 'name' | 'code'>;

const rules: Record<RuleKey, App.Global.FormRule[]> = {
  name: [defaultRequiredRule],
  code: [defaultRequiredRule]
};

// 是否为编辑模式
const isEdit = computed(() => props.operateType === 'edit');

// 变量和操作符数据
const variables = ref<Api.SystemManage.VariableCondition[]>([]);
const conditions = ref<Api.SystemManage.OperatorCondition[]>([]);

// 获取操作符选项
function getOperatorOptions(variableCode: string | null) {
  return getOperatorsForVariable(variables.value, conditions.value, variableCode);
}

// 初始化变量和操作符数据
async function initVariableConditions() {
  const { error, data } = await fetchGetVariableConditions();
  if (!error && data) {
    variables.value = data.variables;
    conditions.value = data.conditions;
  }
}

// 初始化表单数据
async function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.rowData) {
    const { error, data } = await fetchGetDataScopeInfo(props.rowData.id);
    if (!error && data) {
      Object.assign(model, data);
    }
  }
  await initVariableConditions();
}

// 关闭模态框
function closeModal() {
  visible.value = false;
}

// 提交表单
async function handleSubmit() {
  await validate();

  model.scopeTypeName = getPermissionScopeTypeName(model.scopeType);
  model.permissionResource = getResourceWithPermission(model.permissionResource);

  const func = isEdit.value ? fetchUpdateDataScopeInfo : fetchAddDataScope;
  const { error, data } = await func(model);
  if (!error && data) {
    window.$message?.success(isEdit.value ? $t('common.updateSuccess') : $t('common.addSuccess'));
    closeModal();
    emit('submitted');
  }
}

// 创建新的规则项
function onCreate() {
  return {
    field: '',
    operator: 'equal',
    value: '',
    logic: 'and',
    variable: null
  };
}

// 处理变量变更
function handleVariableChange(value: string | null, index: number) {
  const condition = model.customRules[index];
  // 重置操作符和值
  condition.operator = 'equal';
  condition.value = '';
  // 如果变量有默认操作符，则设置默认值
  if (value) {
    const variable = variables.value.find(v => v.code === value);
    if (variable?.conditions.length) {
      condition.operator = variable.conditions[0];
      condition.value = `#{${value}}`;
    }
  }
}

// 监听模态框显示状态
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NModal v-model:show="visible" preset="card" :segmented="false" :title="title" class="h-[55vh] w-3/5 overflow-x-hidden overflow-y-auto">
    <NForm ref="formRef" label-placement="left" :label-width="80" :model="model" :rules="rules">
      <NGrid :x-gap="8">
        <!-- 名称 -->
        <NFormItemGi span="12" :label="$t('page.manage.dataScope.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.dataScope.form.name')" :disabled="isEdit" />
        </NFormItemGi>
        <!-- 状态 -->
        <NFormItemGi span="6" :label="$t('page.manage.dataScope.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in dictOptions('status')" :key="item.value" :value="item.value" :label="item.label" />
          </NRadioGroup>
        </NFormItemGi>
        <!-- 排序 -->
        <NFormItemGi span="6" :label="$t('page.manage.dataScope.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.dataScope.form.sort')" />
        </NFormItemGi>
        <!-- 编码 -->
        <NFormItemGi span="12" :label="$t('page.manage.dataScope.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.manage.dataScope.form.code')" :disabled="isEdit" />
        </NFormItemGi>
        <!-- 数据范围类型 -->
        <NFormItemGi span="12" :label="$t('page.manage.dataScope.scopeType')" path="scopeType">
          <NSelect
            v-model:value="model.scopeType"
            :options="dictOptions('data_scope_type')"
            :placeholder="$t('page.manage.dataScope.form.scopeType')"
          />
        </NFormItemGi>

        <!-- 自定义规则 -->
        <NFormItemGi v-if="model.scopeType === '5'" span="24" :label="$t('page.manage.dataScope.customRules')">
          <NDynamicInput v-model:value="model.customRules" :on-create="onCreate">
            <template #default="{ value, index }">
              <NGrid :x-gap="12" :cols="3">
                <NGi :span="2" class="flex flex-col gap-1">
                  <!-- 字段 -->
                  <NInput v-model:value="value.field" :placeholder="$t('page.manage.dataScope.form.field')" />
                  <!-- 值和变量 -->
                  <NInputGroup>
                    <NInput v-model:value="value.value" :placeholder="$t('page.manage.dataScope.form.value')" :disabled="!!value.variable" />
                    <NSelect
                      v-model:value="value.variable"
                      class="w-80"
                      clearable
                      :options="transformToSelectOptions(variables)"
                      :placeholder="$t('page.manage.dataScope.form.variable')"
                      @update:value="val => handleVariableChange(val, index)"
                    />
                  </NInputGroup>
                </NGi>
                <NGi :span="1" class="flex flex-col gap-1">
                  <!-- 操作符 -->
                  <NInputGroup>
                    <NSelect
                      v-model:value="value.operator"
                      :options="getOperatorOptions(value.variable)"
                      :placeholder="$t('page.manage.dataScope.form.operator')"
                    />
                    <NPopover trigger="hover" placement="left">
                      <template #trigger>
                        <NButton quaternary size="medium">
                          <icon-ic:round-help-outline class="text-icon" />
                        </NButton>
                      </template>
                      <!-- 操作符说明 -->
                      <NDescriptions bordered size="small" label-placement="left">
                        <NDescriptionsItem v-for="condition in conditions" :key="condition.code" :label="condition.description" :span="1">
                          {{ condition.operator }}
                        </NDescriptionsItem>
                      </NDescriptions>
                    </NPopover>
                  </NInputGroup>
                  <!-- 逻辑 -->
                  <NSelect v-model:value="value.logic" :options="logicTypeOptions" :placeholder="$t('page.manage.dataScope.form.logic')" />
                </NGi>
              </NGrid>
            </template>

            <!-- 操作按钮 -->
            <template #action="{ index, create, remove }">
              <div class="ml-8px flex flex-col justify-center gap-1">
                <NButton size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </div>
            </template>
          </NDynamicInput>
        </NFormItemGi>

        <!-- 描述 -->
        <NFormItemGi span="24" :label="$t('page.manage.dataScope.description')" path="description">
          <NInput v-model:value="model.description" type="textarea" :placeholder="$t('page.manage.dataScope.form.description')" />
        </NFormItemGi>
      </NGrid>
    </NForm>
    <!-- 底部按钮 -->
    <template #footer>
      <NSpace :size="12" justify="end">
        <NButton quaternary @click="closeModal">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
