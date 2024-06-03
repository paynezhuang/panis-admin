<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { fetchGetSchedulerAllJobNames } from '@/service/api';

defineOptions({
  name: 'LogsSchedulerSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Monitor.SchedulerLogSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

/** the job name options */
const jobNameOptions = ref<CommonType.Option[]>([]);

async function getJobNameOptions() {
  const { error, data } = await fetchGetSchedulerAllJobNames();

  if (!error) {
    jobNameOptions.value = data;
  }
}

onMounted(() => {
  getJobNameOptions();
});
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NForm :model="model" label-placement="left" :show-feedback="false" :label-width="80">
      <NGrid responsive="screen" item-responsive :x-gap="8" :y-gap="8" cols="1 s:1 m:5 l:5 xl:5 2xl:5">
        <NGridItem span="4">
          <NGrid responsive="screen" item-responsive :x-gap="8">
            <NFormItemGi span="24 s:8 m:8" :label="$t('page.monitor.logs.scheduler.jobName')" path="jobName">
              <NSelect
                v-model:value="model.jobName"
                size="small"
                clearable
                filterable
                :placeholder="$t('page.monitor.logs.scheduler.form.jobName')"
                :options="jobNameOptions"
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
