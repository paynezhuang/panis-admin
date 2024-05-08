<script setup lang="ts">
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'RoleSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.RoleSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NForm :model="model" label-placement="left" :show-feedback="false" :label-width="80">
      <NGrid responsive="screen" item-responsive :x-gap="8" :y-gap="8" cols="1 s:1 m:5 l:5 xl:5 2xl:5">
        <NGridItem span="4">
          <NGrid responsive="screen" item-responsive :x-gap="8">
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.role.roleName')" path="roleName">
              <NInput v-model:value="model.roleName" size="small" :placeholder="$t('page.manage.role.form.roleName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.role.roleCode')" path="roleCode">
              <NInput v-model:value="model.roleCode" size="small" :placeholder="$t('page.manage.role.form.roleCode')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.role.status')" path="status">
              <NSelect
                v-model:value="model.status"
                size="small"
                :placeholder="$t('page.manage.role.form.status')"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
            </NFormItemGi>
          </NGrid>
        </NGridItem>
        <NGridItem>
          <NFormItemGi span="24 s:8 m:6">
            <NSpace class="w-full" justify="end">
              <NButton type="primary" ghost @click="search">
                <template #icon>
                  <icon-ic-round-search class="text-icon" />
                </template>
                {{ $t('common.search') }}
              </NButton>
              <NButton quaternary @click="reset">
                <template #icon>
                  <icon-ic-round-refresh class="text-icon" />
                </template>
                {{ $t('common.reset') }}
              </NButton>
            </NSpace>
          </NFormItemGi>
        </NGridItem>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
