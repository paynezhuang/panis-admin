<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { h } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteScheduler, fetchGetSchedulerList } from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { useButtonAuthDropdown } from '@/hooks/common/button-auth-dropdown';
import { useDict } from '@/hooks/business/dict';
import SchedulerSearch from './modules/scheduler-search.vue';
import SchedulerOperateDrawer from './modules/scheduler-operate-drawer.vue';
import type { ButtonDropdownKey } from './modules/shared';
import { getOperationConfig } from './modules/shared';

defineOptions({
  name: 'MonScheduler'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

/** operation options */
const options: CommonType.ButtonDropdown<ButtonDropdownKey, Api.Monitor.Scheduler>[] = [
  {
    key: 'immediate',
    label: $t('page.monitor.scheduler.immediateJob'),
    show: hasAuth('mon:scheduler:immediate'),
    icon: () => h(SvgIcon, { icon: 'ic:baseline-play-arrow' }),
    handler: (key, row) => handleOperation(key, row)
  },
  {
    key: 'pause',
    show: hasAuth('mon:scheduler:pause'),
    label: $t('page.monitor.scheduler.pauseJob'),
    icon: () => h(SvgIcon, { icon: 'ic:baseline-pause' }),
    handler: (key, row) => handleOperation(key, row)
  },
  {
    key: 'pauseGroup',
    show: hasAuth('mon:scheduler:pauseGroup'),
    label: $t('page.monitor.scheduler.pauseJobGroup'),
    icon: () => h(SvgIcon, { icon: 'ic:baseline-pause-circle' }),
    handler: (key, row) => handleOperation(key, row)
  },
  {
    key: 'resume',
    show: hasAuth('mon:scheduler:resume'),
    label: $t('page.monitor.scheduler.resumeJob'),
    icon: () => h(SvgIcon, { icon: 'ic:baseline-wifi-protected-setup' }),
    handler: (key, row) => handleOperation(key, row)
  },
  {
    key: 'resumeGroup',
    show: hasAuth('mon:scheduler:resumeGroup'),
    label: $t('page.monitor.scheduler.resumeJobGroup'),
    icon: () => h(SvgIcon, { icon: 'ic:round-auto-awesome-motion' }),
    handler: (key, row) => handleOperation(key, row)
  }
];

const { renderDropdown } = useButtonAuthDropdown(options);

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
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
      render: row => dictTag('scheduler_trigger_status', row.triggerState)
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
            <NButton type="primary" quaternary size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('mon:scheduler:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" quaternary size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
          {renderDropdown(row)}
        </div>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onDeleted, onBatchDeleted, onMessage } = useTableOperate(
  data,
  getData
);

function edit(id: string) {
  handleEdit(id);
}

// handle operation
function handleOperation(key: ButtonDropdownKey, row: Api.Monitor.Scheduler) {
  // get config
  const config = getOperationConfig(key, row);
  // show dialog
  window.$dialog?.warning({
    ...config,
    onPositiveClick: async () => {
      const res = await config.onPositiveClick();
      if (!res.error && res.data) {
        onMessage(config.message);
      }
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
    <SchedulerSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
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
        <template #suffix></template>
      </TableHeaderOperation>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="1500"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :single-column="true"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
      <SchedulerOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
  </div>
</template>
