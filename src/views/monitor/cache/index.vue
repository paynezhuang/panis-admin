<script setup lang="ts">
import { onActivated, ref, watch } from 'vue';
import { $t } from '@/locales';
import { fetchGetCacheRedisInfo } from '@/service/api';
import { useEcharts } from '@/hooks/common/echarts';
import { useAppStore } from '@/store/modules/app';

defineOptions({
  name: 'MonitorCacheRedis'
});

const redisInfo = ref<Api.Monitor.RedisInfo>();

const appStore = useAppStore();

// echarts options
const { domRef, updateOptions } = useEcharts(() => ({
  title: {
    text: $t('page.monitor.cache.redis.echartsTitle'),
    subtext: $t('page.monitor.cache.redis.echartsSubTitle'),
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '1%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [] as { name: string; value: number }[]
    }
  ]
}));

// get cache redis info
async function getCacheRedis() {
  const { error, data } = await fetchGetCacheRedisInfo();
  if (!error) {
    redisInfo.value = data;
    updateOptions(opts => {
      opts.series[0].data = data.commandStats;
      return opts;
    });
  }
}

// changed locale need update text and subText
function updateLocale() {
  updateOptions((opts, factory) => {
    const originOpts = factory();

    opts.title.text = originOpts.title.text;
    opts.title.subtext = originOpts.title.subtext;

    opts.series[0].data = redisInfo.value?.commandStats || [];

    return opts;
  });
}

function init() {
  getCacheRedis();
}

watch(
  () => appStore.locale,
  () => {
    updateLocale();
  }
);

onActivated(() => {
  init();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-2">
    <NCard :title="$t('page.monitor.cache.redis.title')" size="small">
      <NDescriptions label-placement="left" bordered :column="2">
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.version')">
          {{ redisInfo?.version }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.uptime')">{{ redisInfo?.uptime }}</NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.connectedClients')">
          {{ redisInfo?.connectedClients }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.totalCommandsProcessed')">
          {{ redisInfo?.totalCommandsProcessed }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.usedMemory')" label-style="color:red;" content-style="color:red;">
          {{ redisInfo?.usedMemory }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.maxMemory')">{{ redisInfo?.maxMemory }}</NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.memFragmentationRatio')" label-style="color:red;" content-style="color:red;">
          {{ $t('page.monitor.percentage', { value: redisInfo?.memFragmentationRatio }) }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.cache.redis.memoryUsageRate')" label-style="color:red;" content-style="color:red;">
          {{ $t('page.monitor.percentage', { value: redisInfo?.memoryUsageRate }) }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
    <NCard class="h-full">
      <div ref="domRef" class="h-full overflow-hidden" />
    </NCard>
  </div>
</template>
