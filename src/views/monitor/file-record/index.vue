<script setup lang="tsx">
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetFileRecordList } from '@/service/api';
import { formatDateTime } from '@/utils/date';
import { useDict } from '@/hooks/business/dict';
import FileRecordSearch from './modules/file-record-search.vue';

defineOptions({
  name: 'MonFileRecordPage'
});

const appStore = useAppStore();

const { dictTag } = useDict();

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetFileRecordList,
  apiParams: {
    page: 1,
    pageSize: 20,
    orderNo: null,
    category: null,
    name: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'orderNo',
      title: $t('page.monitor.fileRecord.orderNo'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'category',
      title: $t('page.monitor.fileRecord.category'),
      align: 'center',
      minWidth: 100,
      render: row => dictTag(row.category, 'mon_file_record_category')
    },
    {
      key: 'name',
      title: $t('page.monitor.fileRecord.name'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'path',
      title: $t('page.monitor.fileRecord.path'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'length',
      title: $t('page.monitor.fileRecord.length'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'uuid',
      title: $t('page.monitor.fileRecord.uuid'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'contentType',
      title: $t('page.monitor.fileRecord.contentType'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'remark',
      title: $t('page.monitor.fileRecord.remark'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'createUser',
      title: $t('common.createUser'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'center',
      width: 180,
      minWidth: 180,
      render: row => formatDateTime(row.createTime)
    }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <FileRecordSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="mon:file:record:add"
        delete-auth="mon:file:record:delete"
        @refresh="getData"
      />
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
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
  </div>
</template>
