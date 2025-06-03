<script setup lang="ts">
import { ref } from 'vue';
import { fetchGetSystemInfo } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'MonitorSystem'
});

const systemInfo = ref<Api.Monitor.SystemInfo>();

async function getSystemInfo() {
  const { error, data } = await fetchGetSystemInfo();
  if (!error) {
    systemInfo.value = data;
  }
}

function init() {
  getSystemInfo();
}

init();
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-2">
    <NCard :title="$t('page.monitor.system.status')" size="small" content-class="text-center">
      <NGrid :x-gap="8" item-responsive responsive="screen" cols="2 s:2 m:4 l:4 xl:4 2xl:4">
        <NGridItem>
          <NProgress
            type="dashboard"
            gap-position="bottom"
            color="rgb(var(--primary-color))"
            :percentage="systemInfo?.centralProcessor.userPercent"
          />
          <NH4 class="m-3">{{ $t('page.monitor.system.cpuUserUsage') }}</NH4>
        </NGridItem>
        <NGridItem>
          <NProgress
            type="dashboard"
            gap-position="bottom"
            color="rgb(var(--success-color))"
            :percentage="systemInfo?.centralProcessor.systemPercent"
          />
          <NH4 class="m-3">{{ $t('page.monitor.system.cpuSystemUsage') }}</NH4>
        </NGridItem>
        <NGridItem>
          <NProgress
            type="dashboard"
            gap-position="bottom"
            color="rgb(var(--primary-500-color))"
            :percentage="systemInfo?.globalMemory.memoryUsedRate"
          />
          <NH4 class="m-3">{{ $t('page.monitor.system.systemMemoryUsage') }}</NH4>
        </NGridItem>
        <NGridItem>
          <NProgress type="dashboard" gap-position="bottom" color="rgb(var(--success-500-color))" :percentage="systemInfo?.jvm.memoryUsageRate" />
          <NH4 class="m-3">{{ $t('page.monitor.system.jvmMemoryUsage') }}</NH4>
        </NGridItem>
      </NGrid>
    </NCard>
    <NCard :title="$t('page.monitor.system.operatingSystem.title')" size="small">
      <NDescriptions label-placement="left" bordered :column="2">
        <NDescriptionsItem :label="$t('page.monitor.system.operatingSystem.name')">
          {{ systemInfo?.operatingSystem.name }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.system.operatingSystem.arch')">{{ systemInfo?.operatingSystem.arch }}</NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.system.operatingSystem.systemBootTime')">
          {{ systemInfo?.operatingSystem.systemBootTime }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.monitor.system.operatingSystem.systemUptime')" label-style="color:red;" content-style="color:red;">
          {{ systemInfo?.operatingSystem.systemUptime }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
    <NGrid x-gap="8" y-gap="8" item-responsive responsive="screen" cols="1 s:1 m:2 l:2 xl:2 2xl:2">
      <NGridItem>
        <NCard :title="$t('page.monitor.system.globalMemory.title')" size="small">
          <NDescriptions label-placement="left" bordered :column="1">
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.total')">{{ systemInfo?.globalMemory.total }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.used')">{{ systemInfo?.globalMemory.used }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.available')">{{ systemInfo?.globalMemory.available }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.memoryUsedRate')" label-style="color:red;" content-style="color:red;">
              {{ $t('page.monitor.percentage', { value: systemInfo?.globalMemory.memoryUsedRate }) }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.swapTotal')">{{ systemInfo?.globalMemory.swapTotal }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.swapUsed')">{{ systemInfo?.globalMemory.swapUsed }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.swapFree')">{{ systemInfo?.globalMemory.swapFree }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.globalMemory.swapUsedRate')" label-style="color:red;" content-style="color:red;">
              {{ $t('page.monitor.percentage', { value: systemInfo?.globalMemory.swapUsedRate }) }}
            </NDescriptionsItem>
          </NDescriptions>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard :title="$t('page.monitor.system.jvm.title')" size="small">
          <NDescriptions label-placement="left" bordered :column="1">
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.vmName')">{{ systemInfo?.jvm.vmName }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.vmVersion')">{{ systemInfo?.jvm.vmVersion }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.vmVendor')">{{ systemInfo?.jvm.vmVendor }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.uptime')" label-style="color:red;" content-style="color:red;">
              {{ systemInfo?.jvm.uptime }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.heapMemoryMax')">{{ systemInfo?.jvm.heapMemoryMax }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.heapMemoryUsed')">{{ systemInfo?.jvm.heapMemoryUsed }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.nonHeapMemoryUsed')">{{ systemInfo?.jvm.nonHeapMemoryUsed }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.jvm.memoryUsageRate')" label-style="color:red;" content-style="color:red;">
              {{ $t('page.monitor.percentage', { value: systemInfo?.jvm.memoryUsageRate }) }}
            </NDescriptionsItem>
          </NDescriptions>
        </NCard>
      </NGridItem>
    </NGrid>
    <NGrid x-gap="8" y-gap="8" item-responsive responsive="screen" cols="1 s:1 m:2 l:2 xl:2 2xl:2">
      <NGridItem>
        <NCard title="CPU" size="small">
          <NDescriptions label-placement="left" bordered :column="1">
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.name')">{{ systemInfo?.centralProcessor.name }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.physicalProcessorCount')">
              {{ systemInfo?.centralProcessor.physicalProcessorCount }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.logicalProcessorCount')">
              {{ systemInfo?.centralProcessor.logicalProcessorCount }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.vendorFreq')">
              {{ systemInfo?.centralProcessor.vendorFreq }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.userPercent')">
              {{ $t('page.monitor.percentage', { value: systemInfo?.centralProcessor.userPercent }) }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.systemPercent')">
              {{ $t('page.monitor.percentage', { value: systemInfo?.centralProcessor.systemPercent }) }}
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.monitor.system.centralProcessor.idlePercent')" label-style="color:red;" content-style="color:red;">
              {{ $t('page.monitor.percentage', { value: systemInfo?.centralProcessor.idlePercent }) }}
            </NDescriptionsItem>
          </NDescriptions>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard :title="$t('page.monitor.system.process.title')" size="small" content-class="overflow-auto">
          <NTable :single-line="false" striped>
            <thead>
              <tr>
                <th>{{ $t('page.monitor.system.process.processID') }}</th>
                <th>{{ $t('page.monitor.system.process.name') }}</th>
                <th>{{ $t('page.monitor.system.process.cpuLoad') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="process in systemInfo?.processes" :key="process.processID">
                <td>{{ process.processID }}</td>
                <td>{{ process.name }}</td>
                <td>{{ $t('page.monitor.percentage', { value: process.cpuLoad }) }}</td>
              </tr>
            </tbody>
          </NTable>
        </NCard>
      </NGridItem>
    </NGrid>
    <NCard :title="$t('page.monitor.system.fileStore.title')" size="small" class="" content-class="overflow-auto">
      <NTable :single-line="false" striped>
        <thead>
          <tr>
            <th>{{ $t('page.monitor.system.fileStore.name') }}</th>
            <th>{{ $t('page.monitor.system.fileStore.mount') }}</th>
            <th>{{ $t('page.monitor.system.fileStore.type') }}</th>
            <th>{{ $t('page.monitor.system.fileStore.totalSpace') }}</th>
            <th>{{ $t('page.monitor.system.fileStore.usedSpace') }}</th>
            <th>{{ $t('page.monitor.system.fileStore.usableSpace') }}</th>
            <th>{{ $t('page.monitor.system.fileStore.usedPercentage') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="disk in systemInfo?.fileStores" :key="disk.name">
            <td>{{ disk.name }}</td>
            <td>{{ disk.mount }}</td>
            <td>{{ disk.type }}</td>
            <td>{{ disk.totalSpace }}</td>
            <td>{{ disk.usedSpace }}</td>
            <td>{{ disk.usableSpace }}</td>
            <td>{{ $t('page.monitor.percentage', { value: disk.usedPercentage }) }}</td>
          </tr>
        </tbody>
      </NTable>
    </NCard>
  </div>
</template>
