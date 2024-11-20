import { request } from '@/service/request';

// =============== FileRecord Begin ===============

/** get fileRecord list */
export function fetchGetFileRecordList(params?: Api.Monitor.FileRecordSearchParams) {
  return request<Api.Monitor.FileRecordList>({
    url: '/mon_file_record/page',
    method: 'GET',
    params
  });
}

// =============== FileRecord End  ===============
