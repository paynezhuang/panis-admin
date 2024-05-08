import { request } from '../request';

// =============== User Begin ===============

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/sys_user/page',
    method: 'get',
    params
  });
}

/** user drawer get user info */
export function fetchGetEditUserInfo(id: string) {
  return request<Api.SystemManage.User>({
    url: `/sys_user/${id}`,
    method: 'get'
  });
}

/** add user info */
export function fetchAddUser(data: Api.SystemManage.UserEdit) {
  return request<boolean>({
    url: '/sys_user/',
    method: 'post',
    data
  });
}

/** edit update user info */
export function fetchUpdateUserInfo(data: Api.SystemManage.UserEdit) {
  return request<boolean>({
    url: '/sys_user/',
    method: 'put',
    data
  });
}

/** edit delete user */
export function fetchDeleteUser(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_user/',
    method: 'delete',
    data
  });
}

/** edit delete user */
export function fetchResetUserPassword(userId: string) {
  return request<string>({
    url: `/sys_user/reset_password/${userId}`,
    method: 'put'
  });
}

// ===============  User End  ===============

// =============== Role Begin ===============

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/sys_role/page',
    method: 'get',
    params
  });
}

/** add role info */
export function fetchAddRole(data: Api.SystemManage.RoleEdit) {
  return request<boolean>({
    url: '/sys_role/',
    method: 'post',
    data
  });
}

/** update role info */
export function fetchUpdateRoleInfo(data: Api.SystemManage.RoleEdit) {
  return request<boolean>({
    url: '/sys_role/',
    method: 'put',
    data
  });
}

/** edit delete role */
export function fetchDeleteRole(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_role/',
    method: 'delete',
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
    method: 'get'
  });
}

// ===============  Role End  ===============

// =============== Menu Begin ===============

/** get menu page list */
export function fetchGetMenuList(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/sys_menu/page',
    method: 'get',
    params
  });
}

/** add menu */
export function fetchAddMenu(data: Api.SystemManage.MenuEdit) {
  return request<boolean>({
    url: '/sys_menu/',
    method: 'post',
    data
  });
}

/** menu drawer get menu info */
export function fetchGetEditMenuInfo(id: string) {
  return request<Api.SystemManage.Menu>({
    url: `/sys_menu/${id}`,
    method: 'get'
  });
}

/** edit update menu info */
export function fetchUpdateMenuInfo(data: Api.SystemManage.MenuEdit) {
  return request<boolean>({
    url: '/sys_menu/',
    method: 'put',
    data
  });
}

/** edit delete menu button */
export function fetchDeleteMenu(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_menu/',
    method: 'delete',
    data
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.Menu[]>({
    url: '/sys_menu/tree',
    method: 'get'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/sys_menu/all_pages',
    method: 'get'
  });
}

/** get menu permission */
export function fetchGetMenuPermission() {
  return request<Api.SystemManage.MenuPermission[]>({
    url: '/sys_menu/permission',
    method: 'get'
  });
}

// ===============  Menu End  ===============

// =============== Role Menu Begin ===============

/** get role menu ids data */
export function fetchGetRoleMenuIds(roleId: string) {
  return request<string[]>({
    url: `/sys_role_menu/menu/${roleId}`,
    method: 'get'
  });
}

/** add role menu data */
export function fetchAddRoleMenu(data: Api.SystemManage.RoleMenu) {
  return request<boolean>({
    url: '/sys_role_menu/',
    method: 'post',
    data
  });
}

// ===============  Role Menu End  ===============

// =============== Permission Begin ===============

/** get permission page list */
export function fetchGetPermissionList(params?: Api.SystemManage.PermissionSearchParams) {
  return request<Api.SystemManage.PermissionList>({
    url: '/sys_permission/page',
    method: 'get',
    params
  });
}

/** add permission button */
export function fetchAddPermission(data: Api.SystemManage.PermissionEdit) {
  return request<boolean>({
    url: '/sys_permission/',
    method: 'post',
    data
  });
}

/** edit update permission button info */
export function fetchUpdatePermissionInfo(data: Api.SystemManage.PermissionEdit) {
  return request<boolean>({
    url: '/sys_permission/',
    method: 'put',
    data
  });
}

/** edit delete permission button */
export function fetchDeletePermission(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_permission/',
    method: 'delete',
    data
  });
}

/** get permission tree data */
export function fetchGetPermissionTree() {
  return request<Api.SystemManage.PermissionTree[]>({
    url: '/sys_permission/tree',
    method: 'get'
  });
}

// ===============  Permission End  ===============

// =============== Role Permission Begin ===============

/** get role permission ids data */
export function fetchGetRolePermissionIds(roleId: string) {
  return request<string[]>({
    url: `/sys_role_permission/permission/${roleId}`,
    method: 'get'
  });
}

/** add role permission data */
export function fetchAddRolePermission(data: Api.SystemManage.RolePermission) {
  return request<boolean>({
    url: '/sys_role_permission/',
    method: 'post',
    data
  });
}

// ===============  Role Permission End  ===============
