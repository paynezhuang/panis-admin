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

/** upload file */
export function fetchUploadFile(data: FormData) {
  return request<boolean>({
    url: '/mon_file/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
}

/** preview file */
export function fetchPreviewFile(id: string) {
  return request<string>({
    url: `/mon_file/preview/${id}`,
    method: 'GET'
  });
}

// =============== File End  ===============
