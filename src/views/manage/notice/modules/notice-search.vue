<script setup lang="ts">
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'SysNoticeSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Manage.NoticeSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.notice.category')" path="category">
              <NSelect
                v-model:value="model.category"
                :options="dictOptions('notice_category')"
                size="small"
                clearable
                :placeholder="$t('page.manage.notice.form.category')"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.notice.title')" path="title">
              <NInput v-model:value="model.title" size="small" :placeholder="$t('page.manage.notice.form.title')" />
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
