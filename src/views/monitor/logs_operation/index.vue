<script setup lang="tsx">
import { NCard, NSpace, NText } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetOperationLogList } from '@/service/api';
import LogsOperationSearch from './modules/operation-search.vue';

defineOptions({
  name: 'MonitorLogsOperation'
});

const appStore = useAppStore();

const { columns, columnChecks, data, loading, getData, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetOperationLogList,
  apiParams: {
    page: 1,
    pageSize: 20,
    createUser: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      type: 'expand',
      expandable: () => true,
      renderExpand: rowData => {
        return (
          <NSpace vertical>
            <NText>
              {$t('page.monitor.logs.operation.ip')}: {rowData.ip}
            </NText>
            <NText>
              {$t('page.monitor.logs.operation.ipAddr')}: {rowData.ipAddr}
            </NText>
            <NText>
              {$t('page.monitor.logs.operation.requestId')}: {rowData.requestId}
            </NText>
            <NText>
              {$t('page.monitor.logs.operation.userAgent')}: {rowData.userAgent}
            </NText>
            <NText>
              {$t('page.monitor.logs.operation.requestUri')}: {rowData.requestUri}
            </NText>
            <NText>
              {$t('page.monitor.logs.operation.contentType')}: {rowData.contentType}
            </NText>
            <NText>
              {$t('page.monitor.logs.operation.methodParams')}: {rowData.methodParams}
            </NText>
          </NSpace>
        );
      }
    },
    {
      key: 'createUser',
      title: $t('page.monitor.logs.operation.createUser'),
      align: 'center',
      width: 140
    },
    {
      key: 'createTime',
      title: $t('page.monitor.logs.operation.createTime'),
      align: 'center',
      width: 200
    },
    {
      key: 'ip',
      title: $t('page.monitor.logs.operation.ip'),
      align: 'center',
      width: 140
    },
    {
      key: 'ipAddr',
      title: $t('page.monitor.logs.operation.ipAddr'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'requestUri',
      title: $t('page.monitor.logs.operation.requestUri'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'requestMethod',
      title: $t('page.monitor.logs.operation.requestMethod'),
      align: 'center',
      width: 80
    },
    {
      key: 'methodName',
      title: $t('page.monitor.logs.operation.methodName'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'operation',
      title: $t('page.monitor.logs.operation.operation'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'useTime',
      title: $t('page.monitor.logs.operation.useTime'),
      align: 'center',
      width: 100
    }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LogsOperationSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation v-model:columns="columnChecks" :checked-row-keys="checkedRowKeys" :loading="loading" @refresh="getData" />
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="702"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :single-column="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
  </div>
</template>
