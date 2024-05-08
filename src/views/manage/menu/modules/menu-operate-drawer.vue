<script setup lang="tsx">
import type { SelectOption } from 'naive-ui';
import { computed, reactive, watch } from 'vue';
import type { LastLevelRouteKey } from '@elegant-router/types';
import { getLocalIcons } from '@/utils/icon';
import { enableStatusOptions, menuIconTypeOptions, menuTypeOptions } from '@/constants/business';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { $t } from '@/locales';
import { fetchAddMenu, fetchGetEditMenuInfo, fetchUpdateMenuInfo } from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { yesOrNoOptions } from '@/constants/common';
import {
  getLayoutAndPage,
  getPathParamFromRoutePath,
  getRoutePathByRouteName,
  getRoutePathWithParam,
  transformLayoutAndPageToComponent
} from './shared';

defineOptions({
  name: 'MenuOperateDrawer'
});

export type OperateType = NaiveUI.TableOperateType | 'addChild';

interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** the edit menu data or the parent menu data when adding a child menu */
  rowData?: Api.SystemManage.MenuTreeData | null;
  /** all pages */
  allPages: string[];
}

const props = defineProps<Props>();

type Model = Api.SystemManage.MenuEdit;

interface Emits {
  (e: 'submitted', data: Model): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.manage.menu.addMenu'),
    addChild: $t('page.manage.menu.addChildMenu'),
    edit: $t('page.manage.menu.editMenu')
  };
  return titles[props.operateType];
});

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    type: '1',
    name: '',
    i18nKey: null,
    routeName: '',
    routePath: '',
    pathParam: '',
    icon: '',
    iconType: '1',
    layout: '',
    page: '',
    status: '1',
    hide: 'N',
    sort: 0,
    href: '',
    keepAlive: 'Y',
    parentId: '0',
    multiTab: 'N',
    activeMenu: '' as LastLevelRouteKey,
    fixedIndexInTab: -1,
    query: []
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'status' | 'routeName' | 'routePath'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  status: defaultRequiredRule,
  routeName: defaultRequiredRule,
  routePath: defaultRequiredRule
};

const disabledMenuType = computed(() => props.operateType === 'edit');

const localIcons = getLocalIcons();
const localIconOptions = localIcons.map<SelectOption>(item => ({
  label: () => (
    <div class="flex-y-center gap-16px">
      <SvgIcon localIcon={item} class="text-icon" />
      <span>{item}</span>
    </div>
  ),
  value: item
}));

const showLayout = computed(() => model.parentId === '0');

const showPage = computed(() => model.type === '2');

const pageOptions = computed(() => {
  const allPages = [...props.allPages];

  if (model.routeName && !allPages.includes(model.routeName)) {
    allPages.unshift(model.routeName);
  }

  const opts: CommonType.Option[] = allPages.map(page => ({
    label: page,
    value: page
  }));

  return opts;
});

const layoutOptions: CommonType.Option[] = [
  {
    label: 'base',
    value: 'base'
  },
  {
    label: 'blank',
    value: 'blank'
  }
];

const isEdit = computed(() => props.operateType === 'edit');

async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'addChild') {
    const { id } = props.rowData;
    Object.assign(model, { parentId: id });
    return;
  }

  if (props.operateType === 'edit') {
    const { error, data } = await fetchGetEditMenuInfo(props.rowData?.id);
    if (!error) {
      const { component, ...rest } = data;
      const { layout, page } = getLayoutAndPage(component);
      const { path, param } = getPathParamFromRoutePath(rest.routePath);
      Object.assign(model, rest, { layout, page, routePath: path, pathParam: param });
    }
  }

  if (!model.query) {
    model.query = [];
  }
}

function closeDrawer() {
  visible.value = false;
}

function handleUpdateRoutePathByRouteName() {
  if (model.routeName) {
    model.routePath = getRoutePathByRouteName(model.routeName);
  } else {
    model.routePath = '';
  }
}

function handleUpdateI18nKeyByRouteName() {
  if (model.routeName) {
    model.i18nKey = `route.${model.routeName}` as App.I18n.I18nKey;
  } else {
    model.i18nKey = null;
  }
}

function getSubmitParams() {
  const { layout, page, pathParam, ...params } = model;

  const component = transformLayoutAndPageToComponent(layout, page);
  const routePath = getRoutePathWithParam(model.routePath, pathParam);

  params.component = component;
  params.routePath = routePath;

  return params;
}

async function handleSubmit() {
  await validate();

  getSubmitParams();

  // request
  const func = isEdit.value ? fetchUpdateMenuInfo : fetchAddMenu;
  const { error, data } = await func(model);
  if (!error && data) {
    window.$message?.success(isEdit.value ? $t('common.updateSuccess') : $t('common.addSuccess'));
    closeDrawer();
    emit('submitted', model);
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});

watch(
  () => model.routeName,
  () => {
    handleUpdateRoutePathByRouteName();
    handleUpdateI18nKeyByRouteName();
  }
);
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" width="sm:450 s:360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
        <NGrid>
          <NFormItemGi span="12" :label="$t('page.manage.menu.type')" path="type">
            <NRadioGroup v-model:value="model.type" :disabled="disabledMenuType">
              <NRadio v-for="item in menuTypeOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.sort')" path="sort">
            <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.menu.form.sort')" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.status')" path="status">
            <NRadioGroup v-model:value="model.status">
              <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.hideInMenu')" path="hide">
            <NRadioGroup v-model:value="model.hide">
              <NRadio v-for="item in yesOrNoOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.keepAlive')" path="keepAlive">
            <NRadioGroup v-model:value="model.keepAlive">
              <NRadio v-for="item in yesOrNoOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.multiTab')" path="multiTab">
            <NRadioGroup v-model:value="model.multiTab">
              <NRadio v-for="item in yesOrNoOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.fixedIndexInTab')" path="fixedIndexInTab">
            <NInputNumber v-model:value="model.fixedIndexInTab" :placeholder="$t('page.manage.menu.form.fixedIndexInTab')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.name')" path="name">
            <NInput v-model:value="model.name" :placeholder="$t('page.manage.menu.form.name')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.i18nKey')" path="i18nKey">
            <NInput v-model:value="model.i18nKey" :placeholder="$t('page.manage.menu.form.i18nKey')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.iconTypeTitle')" path="iconType">
            <NRadioGroup v-model:value="model.iconType">
              <NRadio v-for="item in menuIconTypeOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.icon')" path="icon">
            <template v-if="model.iconType === '1'">
              <NInput v-model:value="model.icon" :placeholder="$t('page.manage.menu.form.icon')" class="flex-1">
                <template #suffix>
                  <SvgIcon v-if="model.icon" :icon="model.icon" class="text-icon" />
                </template>
              </NInput>
            </template>
            <template v-if="model.iconType === '2'">
              <NSelect v-model:value="model.icon" :placeholder="$t('page.manage.menu.form.localIcon')" :options="localIconOptions" />
            </template>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.routeName')" path="routeName">
            <NInput v-model:value="model.routeName" :placeholder="$t('page.manage.menu.form.routeName')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.routePath')" path="routePath">
            <NInput v-model:value="model.routePath" :placeholder="$t('page.manage.menu.form.routePath')" />
          </NFormItemGi>
          <NFormItemGi v-if="showLayout" span="24" :label="$t('page.manage.menu.layout')" path="layout">
            <NSelect v-model:value="model.layout" :options="layoutOptions" :placeholder="$t('page.manage.menu.form.layout')" />
          </NFormItemGi>
          <NFormItemGi v-if="showPage" span="24" :label="$t('page.manage.menu.page')" path="page">
            <NSelect v-model:value="model.page" :options="pageOptions" :placeholder="$t('page.manage.menu.form.page')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.href')" path="href">
            <NInput v-model:value="model.href" :placeholder="$t('page.manage.menu.form.href')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.query')">
            <NDynamicInput
              v-model:value="model.query"
              preset="pair"
              :key-placeholder="$t('page.manage.menu.form.queryKey')"
              :value-placeholder="$t('page.manage.menu.form.queryValue')"
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
          </NFormItemGi>
        </NGrid>
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
