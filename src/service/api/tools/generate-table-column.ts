import { request } from '@/service/request';

// =============== Generate Table Columns Begin ===============

/** get generate table column list */
export function fetchGetGeneratorTableColumnList(tableId: string) {
  return request<Api.Tools.GeneratorTableColumn[]>({
    url: `/tool_generator_table_column/list/${tableId}`,
    method: 'GET'
  });
}

/** update generate table list */
export function fetchUpdateGeneratorTableList(data: Api.Tools.GeneratorTableColumnEdit[]) {
  return request<boolean>({
    url: '/tool_generator_table_column/',
    method: 'PUT',
    data
  });
}

/** clean table columns */
export function fetchCleanGeneratorTableColumn(tableId: string) {
  return request<Api.Tools.GeneratorTableColumnEdit[]>({
    url: `/tool_generator_table_column/clean_columns/${tableId}`,
    method: 'PUT'
  });
}

/** Synchronize database fields and get the latest column information */
export function fetchSyncDatabaseColumns(tableId: string) {
  return request<Api.Tools.GeneratorTableColumnEdit[]>({
    url: `/tool_generator_table_column/sync_columns/${tableId}`,
    method: 'PUT'
  });
}

// =============== Generate Table Columns End ===============
