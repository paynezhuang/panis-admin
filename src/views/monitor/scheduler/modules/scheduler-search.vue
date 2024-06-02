<script setup lang="ts">
import { useBoolean } from '@sa/hooks';
import { $t } from '@/locales';

const { bool: visible, toggle: toggleVisible } = useBoolean();

defineOptions({
  name: 'SchedulerSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Monitor.SchedulerSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.monitor.scheduler.jobName')" path="jobName">
              <NInput v-model:value="model.jobName" size="small" :placeholder="$t('page.monitor.scheduler.form.jobName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:8 m:6" :label="$t('page.monitor.scheduler.jobGroup')" path="jobGroup">
              <NInput v-model:value="model.jobGroup" size="small" :placeholder="$t('page.monitor.scheduler.form.jobGroup')" />
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
          </NSpace>
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
