<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { formatDateTime } from '@/utils/date';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { transDeleteParams } from '@/utils/common';
import { fetchDeleteNotice, fetchGetNoticeList } from '@/service/api';
import { useDict } from '@/hooks/business/dict';
import NoticeSearch from './modules/notice-search.vue';
import NoticeOperateDrawer from './modules/notice-operate-drawer.vue';

defineOptions({
  name: 'SysNoticePage'
});

const operateType = ref<NaiveUI.TableOperateType>('add');

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { dictTag } = useDict();

const editingData: Ref<Api.Manage.Notice | null> = ref(null);

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetNoticeList,
  apiParams: {
    page: 1,
    pageSize: 20,
    category: null,
    title: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'category',
      title: $t('page.manage.notice.category'),
      align: 'center',
      width: 80,
      minWidth: 80,
      render: row => dictTag('notice_category', row.category)
    },
    {
      key: 'title',
      title: $t('page.manage.notice.title'),
      align: 'center',
      width: 100,
      minWidth: 100
    },
    {
      key: 'content',
      title: $t('page.manage.notice.content'),
      align: 'center',
      width: 200,
      minWidth: 200,
      props: {
        ellipsis: true
      }
    },
    {
      key: 'releaseTime',
      title: $t('page.manage.notice.releaseTime'),
      align: 'center',
      width: 180,
      minWidth: 180,
      render: row => formatDateTime(row.releaseTime)
    },
    {
      key: 'remark',
      title: $t('page.manage.notice.remark'),
      align: 'center',
      width: 200,
      minWidth: 200,
      props: {
        ellipsis: true
      }
    },

    {
      key: 'status',
      title: $t('page.manage.notice.status'),
      align: 'center',
      width: 80,
      minWidth: 80,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'createUser',
      title: $t('common.createUser'),
      align: 'center',
      width: 80,
      minWidth: 80
    },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'center',
      width: 180,
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
          {hasAuth('sys:notice:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => edit(row)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:notice:delete') && (
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

const { drawerVisible, openDrawer, checkedRowKeys, handleAdd, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

function edit(item: Api.Manage.Notice) {
  operateType.value = 'edit';
  editingData.value = { ...item };
  openDrawer();
}

async function handleDelete(id: string) {
  // request
  const { error, data: result } = await fetchDeleteNotice(transDeleteParams([id]));
  if (!error && result) {
    await onDeleted();
  }
}

async function handleBatchDelete() {
  // request
  const { error, data: result } = await fetchDeleteNotice(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NoticeSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:notice:add"
        delete-auth="sys:notice:delete"
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
      <NoticeOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
  </div>
</template>
