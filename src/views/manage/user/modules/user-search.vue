<script setup lang="ts">
import { useBoolean } from '@sa/hooks';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

const { bool: visible, toggle: toggleVisible } = useBoolean();

defineOptions({
  name: 'UserSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.UserSearchParams>('model', { required: true });

async function reset() {
  emit('reset');
}

async function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NForm :model="model" label-placement="left" :show-feedback="false" :label-width="80">
      <NGrid responsive="screen" item-responsive :x-gap="8" :y-gap="8" cols="1 s:1 m:5 l:5 xl:5 2xl:5">
        <NGridItem span="4">
          <NGrid responsive="screen" item-responsive :x-gap="8">
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.user.userName')" path="userName">
              <NInput v-model:value="model.userName" size="small" :placeholder="$t('page.manage.user.form.userName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.user.realName')" path="realName">
              <NInput v-model:value="model.realName" size="small" :placeholder="$t('page.manage.user.form.realName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.user.status')" path="status">
              <NSelect
                v-model:value="model.status"
                size="small"
                :placeholder="$t('page.manage.user.form.status')"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi v-if="visible" span="24 s:8 m:6" :label="$t('page.manage.user.email')" path="email">
              <NInput v-model:value="model.email" size="small" :placeholder="$t('page.manage.user.form.email')" />
            </NFormItemGi>
          </NGrid>
        </NGridItem>

        <NFormItemGi>
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
            <NButton v-if="visible" quaternary @click="toggleVisible">
              {{ $t('common.putAway') }}
              <icon-ic:round-keyboard-arrow-up class="m-1.5 mr-0 text-icon" />
            </NButton>
            <NButton v-else quaternary @click="toggleVisible">
              {{ $t('common.openUp') }}
              <icon-ic:round-keyboard-arrow-down class="m-1.5 mr-0 text-icon" />
            </NButton>
          </NSpace>
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
