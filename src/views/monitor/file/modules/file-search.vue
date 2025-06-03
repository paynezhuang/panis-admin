<script setup lang="ts">
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'MonFileSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Monitor.FileSearchParams>('model', { required: true });

const { dictOptions } = useDict();

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
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.monitor.file.orderNo')" path="orderNo">
              <NInput v-model:value="model.orderNo" size="small" :placeholder="$t('page.monitor.file.form.orderNo')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.monitor.file.category')" path="category">
              <NSelect
                v-model:value="model.category"
                size="small"
                :placeholder="$t('page.monitor.file.form.category')"
                :options="dictOptions('file_record_category')"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.monitor.file.location')" path="location">
              <NSelect
                v-model:value="model.location"
                size="small"
                :placeholder="$t('page.monitor.file.form.location')"
                :options="dictOptions('file_record_location')"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.monitor.file.name')" path="name">
              <NInput v-model:value="model.name" size="small" :placeholder="$t('page.monitor.file.form.name')" />
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
