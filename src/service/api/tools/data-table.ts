import { request } from '@/service/request';

// =============== DataTable Begin ===============

/** get data table list */
export function fetchGetAllDataTable() {
  return request<Api.Tools.DataTable[]>({
    url: '/data_table/all_tables',
    method: 'GET'
  });
}

// =============== DataTable End ===============
