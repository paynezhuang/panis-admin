<script setup lang="ts">
import type { VNode } from 'vue';

declare module 'naive-ui' {
  interface TabPaneSlots {
    tab?: () => VNode[];
  }
}

defineOptions({
  name: 'UserCenter'
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <NTabs type="bar" animated placement="left">
        <NTabPane name="chap1">
          <template #tab>
            <NButton size="small" quaternary>
              <template #icon>
                <icon-ic:round-refresh class="text-icon" />
              </template>
              Default
            </NButton>
          </template>
          <template #suffix><NDivider /></template>
        </NTabPane>
        <NTabPane name="chap2" tab="第二章">
          <div>555</div>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped></style>
