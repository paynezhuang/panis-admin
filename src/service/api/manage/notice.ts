import { request } from '@/service/request';

// =============== Notice Begin ===============

/** get notice list */
export function fetchGetNoticeList(params?: Api.Manage.NoticeSearchParams) {
  return request<Api.Manage.NoticeList>({
    url: '/sys_notice/page',
    method: 'GET',
    params
  });
}

/** add notice info */
export function fetchAddNotice(data: Api.Manage.NoticeEdit) {
  return request<boolean>({
    url: '/sys_notice/',
    method: 'POST',
    data
  });
}

/** update notice info */
export function fetchUpdateNoticeInfo(data: Api.Manage.NoticeEdit) {
  return request<boolean>({
    url: '/sys_notice/',
    method: 'PUT',
    data
  });
}

/** edit delete notice */
export function fetchDeleteNotice(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_notice/',
    method: 'DELETE',
    data
  });
}

// =============== Notice End  ===============
