import { request } from '@/service/request';

// =============== File Begin ===============

/** get file list */
export function fetchGetFileList(params?: Api.Monitor.FileSearchParams) {
  return request<Api.Monitor.FileList>({
    url: '/mon_file/page',
    method: 'GET',
    params
  });
}

/** edit delete file */
export function fetchDeleteFile(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/mon_file/',
    method: 'DELETE',
    data
  });
}

// =============== File End  ===============
