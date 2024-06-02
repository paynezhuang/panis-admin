<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';
import { useTable, useTableOperate } from '@/hooks/common/table';
import {
  fetchDeleteScheduler,
  fetchGetSchedulerList,
  fetchImmediateJob,
  fetchPauseJob,
  fetchPauseJobGroup,
  fetchResumeJob,
  fetchResumeJobGroup
} from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { schedulerTriggerStateRecord, schedulerTriggerStateTag } from '@/constants/business';
import SchedulerSearch from './modules/scheduler-search.vue';
import SchedulerOperateDrawer from './modules/scheduler-operate-drawer.vue';

defineOptions({
  name: 'MonScheduler'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { columns, columnChecks, data, loading, getData, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetSchedulerList,
  apiParams: {
    page: 1,
    pageSize: 20,
    jobName: null,
    jobGroup: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,
      fixed: 'left'
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'triggerState',
      title: $t('page.monitor.scheduler.triggerState'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.triggerState === null) {
          return null;
        }

        const label = $t(schedulerTriggerStateRecord[row.triggerState]);

        return <NTag type={schedulerTriggerStateTag[row.triggerState]}>{label}</NTag>;
      }
    },
    {
      key: 'jobName',
      title: $t('page.monitor.scheduler.jobName'),
      align: 'center',
      width: 140,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'jobGroup',
      title: $t('page.monitor.scheduler.jobGroup'),
      align: 'center',
      width: 140,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'jobClassName',
      title: $t('page.monitor.scheduler.jobClassName'),
      align: 'center',
      width: 300,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'cronExpression',
      title: $t('page.monitor.scheduler.cronExpression'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'description',
      title: $t('page.monitor.scheduler.description'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'triggerName',
      title: $t('page.monitor.scheduler.triggerName'),
      align: 'center',
      width: 140,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'triggerGroup',
      title: $t('page.monitor.scheduler.triggerGroup'),
      align: 'center',
      width: 140,
      ellipsis: {
        tooltip: true
      },
      resizable: true
    },
    {
      key: 'triggerDescription',
      title: $t('page.monitor.scheduler.triggerDescription'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'createUser',
      title: $t('common.createUser'),
      align: 'center',
      width: 120
    },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'center',
      width: 200
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 200,
      fixed: 'right',
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('mon:scheduler:update') && (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('mon:scheduler:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKey,
  checkedRowKeys,
  checkedRowData,
  handleCheckedRow,
  onDeleted,
  onBatchDeleted,
  onMessage
} = useTableOperate(data, getData);

const hasCheckOne = computed(() => (checkedRowKeys?.value.length ?? 0) !== 1);

function edit(id: string) {
  handleEdit(id);
}

/** immediate job */
function handleImmediateJob() {
  handleCheckedRow();
  window.$dialog?.warning({
    title: $t('page.monitor.scheduler.ImmediateJob'),
    icon: () => <SvgIcon icon="ic:baseline-play-arrow" />,
    content: () =>
      $t('page.monitor.scheduler.confirmOperate', { operation: $t('page.monitor.scheduler.ImmediateJob'), name: checkedRowData.value?.jobName }),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      fetchImmediateJob(checkedRowKey.value).then(res => {
        if (!res.error && res.data) {
          onMessage($t('page.monitor.scheduler.ImmediateSuccess'));
        }
      });
    }
  });
}

/** pause job */
function handlePauseJob() {
  handleCheckedRow();
  window.$dialog?.warning({
    title: $t('page.monitor.scheduler.pauseJob'),
    icon: () => <SvgIcon icon="ic:baseline-pause" />,
    content: () =>
      $t('page.monitor.scheduler.confirmOperate', { operation: $t('page.monitor.scheduler.pauseJob'), name: checkedRowData.value?.jobName }),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      fetchPauseJob(checkedRowKey.value).then(res => {
        if (!res.error && res.data) {
          onMessage($t('page.monitor.scheduler.pauseSuccess'));
        }
      });
    }
  });
}

/** pause job group */
function handlePauseJobGroup() {
  handleCheckedRow();
  window.$dialog?.warning({
    title: $t('page.monitor.scheduler.pauseJobGroup'),
    icon: () => <SvgIcon icon="ic:baseline-pause-circle" />,
    content: () =>
      $t('page.monitor.scheduler.confirmOperate', { operation: $t('page.monitor.scheduler.pauseJobGroup'), name: checkedRowData.value?.jobGroup }),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      fetchPauseJobGroup(checkedRowKey.value).then(res => {
        if (!res.error && res.data) {
          onMessage($t('page.monitor.scheduler.pauseSuccess'));
        }
      });
    }
  });
}

/** resume job */
function handleResumeJob() {
  handleCheckedRow();
  window.$dialog?.warning({
    title: $t('page.monitor.scheduler.resumeJob'),
    icon: () => <SvgIcon icon="ic:baseline-wifi-protected-setup" />,
    content: () =>
      $t('page.monitor.scheduler.confirmOperate', { operation: $t('page.monitor.scheduler.resumeJob'), name: checkedRowData.value?.jobName }),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      fetchResumeJob(checkedRowKey.value).then(res => {
        if (!res.error && res.data) {
          onMessage($t('page.monitor.scheduler.resumeSuccess'));
        }
      });
    }
  });
}

/** resume job group */
function handleResumeJobGroup() {
  handleCheckedRow();
  window.$dialog?.warning({
    title: $t('page.monitor.scheduler.resumeJobGroup'),
    icon: () => <SvgIcon icon="ic:round-auto-awesome-motion" />,
    content: () =>
      $t('page.monitor.scheduler.confirmOperate', { operation: $t('page.monitor.scheduler.resumeJobGroup'), name: checkedRowData.value?.jobGroup }),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      fetchResumeJobGroup(checkedRowKey.value).then(res => {
        if (!res.error && res.data) {
          onMessage($t('page.monitor.scheduler.resumeSuccess'));
        }
      });
    }
  });
}

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeleteScheduler(transDeleteParams([id]));
  if (!error && result) {
    await onDeleted();
  }
}

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteScheduler(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <SchedulerSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="mon:scheduler:add"
        delete-auth="mon:scheduler:delete"
        @add="handleAdd"
        @delete="handleBatchDelete"
        @refresh="getData"
      >
        <template #suffix>
          <NButton v-if="hasAuth('mon:scheduler:immediate')" size="small" ghost :disabled="hasCheckOne" @click="handleImmediateJob()">
            <template #icon>
              <icon-ic:baseline-play-arrow class="text-icon" />
            </template>
            {{ $t('page.monitor.scheduler.ImmediateJob') }}
          </NButton>
          <NButton v-if="hasAuth('mon:scheduler:pause')" size="small" ghost :disabled="hasCheckOne" @click="handlePauseJob()">
            <template #icon>
              <icon-ic:baseline-pause class="text-icon" />
            </template>
            {{ $t('page.monitor.scheduler.pauseJob') }}
          </NButton>
          <NButton v-if="hasAuth('mon:scheduler:pause')" size="small" ghost :disabled="hasCheckOne" @click="handlePauseJobGroup()">
            <template #icon>
              <icon-ic:baseline-pause-circle class="text-icon" />
            </template>
            {{ $t('page.monitor.scheduler.pauseJobGroup') }}
          </NButton>
          <NButton v-if="hasAuth('mon:scheduler:pause')" size="small" ghost :disabled="hasCheckOne" @click="handleResumeJob()">
            <template #icon>
              <icon-ic:baseline-wifi-protected-setup class="text-icon" />
            </template>
            {{ $t('page.monitor.scheduler.resumeJob') }}
          </NButton>
          <NButton v-if="hasAuth('mon:scheduler:pause')" size="small" ghost :disabled="hasCheckOne" @click="handleResumeJobGroup()">
            <template #icon>
              <icon-ic:round-auto-awesome-motion class="text-icon" />
            </template>
            {{ $t('page.monitor.scheduler.resumeJobGroup') }}
          </NButton>
        </template>
      </TableHeaderOperation>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :single-column="true"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
      <SchedulerOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getData" />
    </NCard>
  </div>
</template>
