<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';

defineOptions({
  name: 'TableHeaderOperation'
});

interface Props {
  loading?: boolean;
  checkedRowKeys?: string[];
  addAuth?: string;
  deleteAuth?: string;
}

interface Emits {
  (e: 'add'): void;
  (e: 'delete'): void;
  (e: 'refresh'): void;
}

const appsotre = useAppStore();

const isMobile = computed(() => appsotre.isMobile);

const { hasAuth } = useAuth();

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const hasCheck = computed(() => (props.checkedRowKeys?.length ?? 0) > 0);

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  default: () => []
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}
</script>

<template>
  <NGrid x-gap="8" y-gap="8" :cols="12" class="mb-2">
    <NGridItem span="10">
      <NSpace justify="start">
        <slot name="prefix"></slot>
        <slot name="default">
          <NButton v-if="addAuth && hasAuth(addAuth)" size="small" ghost type="primary" @click="add">
            <template #icon>
              <icon-ic-round-plus class="text-icon" />
            </template>
            {{ $t('common.add') }}
          </NButton>
          <NPopconfirm v-if="deleteAuth && hasAuth(deleteAuth)" placement="bottom" @positive-click="batchDelete">
            <template #trigger>
              <NButton size="small" ghost type="error" :disabled="!hasCheck">
                <template #icon>
                  <icon-ic-round-delete class="text-icon" />
                </template>
                {{ $t('common.batchDelete') }}
              </NButton>
            </template>
            {{ $t('common.confirmBatchDelete') }}
          </NPopconfirm>
        </slot>
        <slot name="suffix"></slot>
      </NSpace>
    </NGridItem>
    <NGi v-if="!isMobile" span="2">
      <NSpace justify="end">
        <slot name="extra-prefix"></slot>
        <slot name="default">
          <NButton size="small" quaternary @click="refresh">
            <template #icon>
              <icon-ic:outline-refresh class="text-icon" :class="{ 'animate-spin': loading }" />
            </template>
          </NButton>
          <TableColumnSetting v-model:columns="columns" />
        </slot>
        <slot name="extra-suffix"></slot>
      </NSpace>
    </NGi>
  </NGrid>
</template>
