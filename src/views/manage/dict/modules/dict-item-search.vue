<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'DictItemSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.DictItemSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:8" :label="$t('page.manage.dictItem.zhCN')" path="zhCN">
              <NInput v-model:value="model.zhCN" size="small" clearable :placeholder="$t('page.manage.dictItem.form.zhCN')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8" :label="$t('page.manage.dictItem.enUS')" path="enUS">
              <NInput v-model:value="model.enUS" size="small" clearable :placeholder="$t('page.manage.dictItem.form.enUS')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8" :label="$t('page.manage.dictItem.description')" path="description">
              <NInput v-model:value="model.description" size="small" clearable :placeholder="$t('page.manage.dictItem.form.description')" />
            </NFormItemGi>
          </NGrid>
        </NGridItem>
        <NGridItem>
          <NFormItemGi span="24 s:8">
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
