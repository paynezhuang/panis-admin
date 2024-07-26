import { request } from '@/service/request';

// =============== Role Begin ===============

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/sys_role/page',
    method: 'GET',
    params
  });
}

/** add role info */
export function fetchAddRole(data: Api.SystemManage.RoleEdit) {
  return request<boolean>({
    url: '/sys_role/',
    method: 'POST',
    data
  });
}

/** update role info */
export function fetchUpdateRoleInfo(data: Api.SystemManage.RoleEdit) {
  return request<boolean>({
    url: '/sys_role/',
    method: 'PUT',
    data
  });
}

/** edit delete role */
export function fetchDeleteRole(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_role/',
    method: 'DELETE',
    data
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<CommonType.Option<string>[]>({
    url: '/sys_role/all_roles',
    method: 'GET'
  });
}

// =============== Role End  ===============

// =============== Role Menu Begin ===============

/** get role menu ids data */
export function fetchGetRoleMenuIds(roleId: string) {
  return request<string[]>({
    url: `/sys_role_menu/menu/${roleId}`,
    method: 'GET'
  });
}

/** add role menu data */
export function fetchAddRoleMenu(data: Api.SystemManage.RoleMenu) {
  return request<boolean>({
    url: '/sys_role_menu/',
    method: 'POST',
    data
  });
}

// =============== Role Menu End  ===============

// =============== Role Permission Begin ===============

/** get role permission ids data */
export function fetchGetRolePermissionIds(roleId: string) {
  return request<string[]>({
    url: `/sys_role_permission/permission/${roleId}`,
    method: 'GET'
  });
}

/** add role permission data */
export function fetchAddRolePermission(data: Api.SystemManage.RolePermission) {
  return request<boolean>({
    url: '/sys_role_permission/',
    method: 'POST',
    data
  });
}

// =============== Role Permission End  ===============
