<script setup lang="tsx">
import { NTag } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetLoginLogList } from '@/service/api';
import { logsLoginStatusRecord, logsLoginStatusTag } from '@/constants/business';
import LogsLoginSearch from './modules/login-search.vue';

defineOptions({
  name: 'MonitorLogsLogin'
});

const appStore = useAppStore();

const { columns, columnChecks, data, loading, getData, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetLoginLogList,
  apiParams: {
    page: 1,
    pageSize: 20,
    userName: null,
    userRealName: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'userName',
      title: $t('page.monitor.logs.login.userName'),
      align: 'center',
      width: 140
    },
    {
      key: 'userRealName',
      title: $t('page.monitor.logs.login.userRealName'),
      align: 'center',
      width: 100
    },
    {
      key: 'status',
      title: $t('page.monitor.logs.login.status'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const label = $t(logsLoginStatusRecord[row.status]);

        return <NTag type={logsLoginStatusTag[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'ip',
      title: $t('page.monitor.logs.login.ip'),
      align: 'center',
      width: 140
    },
    {
      key: 'ipAddr',
      title: $t('page.monitor.logs.login.ipAddr'),
      align: 'center',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'userAgent',
      title: $t('page.monitor.logs.login.userAgent'),
      align: 'center',
      minWidth: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'message',
      title: $t('page.monitor.logs.login.message'),
      align: 'center',
      minWidth: 120,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'createUser',
      title: $t('page.monitor.logs.login.createUser'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'createTime',
      title: $t('page.monitor.logs.login.createTime'),
      align: 'center',
      width: 200
    }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <LogsLoginSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
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
