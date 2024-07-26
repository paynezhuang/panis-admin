import { request } from '@/service/request';

// =============== Permission Begin ===============

/** get permission page list */
export function fetchGetPermissionList(params?: Api.SystemManage.PermissionSearchParams) {
  return request<Api.SystemManage.PermissionList>({
    url: '/sys_permission/page',
    method: 'GET',
    params
  });
}

/** add permission button */
export function fetchAddPermission(data: Api.SystemManage.PermissionEdit) {
  return request<boolean>({
    url: '/sys_permission/',
    method: 'POST',
    data
  });
}

/** edit update permission button info */
export function fetchUpdatePermissionInfo(data: Api.SystemManage.PermissionEdit) {
  return request<boolean>({
    url: '/sys_permission/',
    method: 'PUT',
    data
  });
}

/** edit delete permission button */
export function fetchDeletePermission(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_permission/',
    method: 'DELETE',
    data
  });
}

/** get permission tree data */
export function fetchGetPermissionTree() {
  return request<Api.SystemManage.PermissionTree[]>({
    url: '/sys_permission/tree',
    method: 'GET'
  });
}

// =============== Permission End  ===============
