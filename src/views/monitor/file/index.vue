<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { transDeleteParams } from '@/utils/common';
import { fetchDeleteFile, fetchGetFileList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import { formatDateTime } from '@/utils/date';
import FileSearch from './modules/file-search.vue';

defineOptions({
  name: 'MonFilePage'
});

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetFileList,
  apiParams: {
    page: 1,
    pageSize: 20,
    orderNo: null,
    category: null,
    location: null,
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
      title: $t('page.monitor.file.orderNo'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'category',
      title: $t('page.monitor.file.category'),
      align: 'center',
      minWidth: 100,
      render: row => dictTag(row.category, 'file_record_category')
    },
    {
      key: 'location',
      title: $t('page.monitor.file.location'),
      align: 'center',
      minWidth: 100,
      render: row => dictTag(row.location, 'file_record_location')
    },
    {
      key: 'name',
      title: $t('page.monitor.file.name'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'suffix',
      title: $t('page.monitor.file.suffix'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'path',
      title: $t('page.monitor.file.path'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'size',
      title: $t('page.monitor.file.size'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'uuid',
      title: $t('page.monitor.file.uuid'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'contentType',
      title: $t('page.monitor.file.contentType'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'remark',
      title: $t('page.monitor.file.remark'),
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
      minWidth: 180,
      render: row => formatDateTime(row.createTime)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 200,
      minWidth: 200,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('mon:file:delete') && (
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
        </div>
      )
    }
  ]
});

const { checkedRowKeys, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

function handleAdd() {}

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeleteFile(transDeleteParams([id]));
  if (!error && result) {
    await onDeleted();
  }
}

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteFile(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <FileSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="mon:file:add"
        delete-auth="mon:file:delete"
        @add="handleAdd"
        @delete="handleBatchDelete"
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
