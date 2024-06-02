<script setup lang="tsx">
import { NCard, NSpace, NText } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetErrorLogList } from '@/service/api';

defineOptions({
  name: 'MonitorLogsError'
});

const appStore = useAppStore();

const { columns, columnChecks, data, loading, getData, mobilePagination } = useTable({
  apiFn: fetchGetErrorLogList,
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
              {$t('page.monitor.logs.error.ip')}: {rowData.ip}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.ipAddr')}: {rowData.ipAddr}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.requestId')}: {rowData.requestId}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.userAgent')}: {rowData.userAgent}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.requestUri')}: {rowData.requestUri}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.contentType')}: {rowData.contentType}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.methodParams')}: {rowData.methodParams}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.exceptionMessage')}: {rowData.exceptionMessage}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.line')}: {rowData.line}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.exceptionClass')}: {rowData.exceptionClass}
            </NText>
            <NText>
              {$t('page.monitor.logs.error.stackTrace')}: {rowData.stackTrace}
            </NText>
          </NSpace>
        );
      }
    },
    {
      key: 'createUser',
      title: $t('page.monitor.logs.error.createUser'),
      align: 'center',
      width: 100
    },
    {
      key: 'createTime',
      title: $t('page.monitor.logs.error.createTime'),
      align: 'center',
      width: 200
    },
    {
      key: 'ip',
      title: $t('page.monitor.logs.error.ip'),
      align: 'center',
      width: 100
    },
    {
      key: 'ipAddr',
      title: $t('page.monitor.logs.error.ipAddr'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'requestUri',
      title: $t('page.monitor.logs.error.requestUri'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'requestMethod',
      title: $t('page.monitor.logs.error.requestMethod'),
      align: 'center',
      width: 80
    },
    {
      key: 'methodName',
      title: $t('page.monitor.logs.error.methodName'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'operation',
      title: $t('page.monitor.logs.error.operation'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'exceptionMessage',
      title: $t('page.monitor.logs.error.exceptionMessage'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'exceptionClass',
      title: $t('page.monitor.logs.error.exceptionClass'),
      align: 'center',
      width: 250,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'line',
      title: $t('page.monitor.logs.error.line'),
      align: 'center',
      width: 100
    },
    {
      key: 'useTime',
      title: $t('page.monitor.logs.error.useTime'),
      align: 'center',
      width: 100
    }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation v-model:columns="columnChecks" :checked-row-keys="checkedRowKeys" :loading="loading" @refresh="getData" />
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
        :single-column="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
  </div>
</template>
