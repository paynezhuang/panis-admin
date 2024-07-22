import { request } from '../request';

// =============== User Begin ===============

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/sys_user/page',
    method: 'GET',
    params
  });
}

/** user drawer get user info */
export function fetchGetEditUserInfo(id: string) {
  return request<Api.SystemManage.User>({
    url: `/sys_user/${id}`,
    method: 'GET'
  });
}

/** add user info */
export function fetchAddUser(data: Api.SystemManage.UserEdit) {
  return request<boolean>({
    url: '/sys_user/',
    method: 'POST',
    data
  });
}

/** edit update user info */
export function fetchUpdateUserInfo(data: Api.SystemManage.UserEdit) {
  return request<boolean>({
    url: '/sys_user/',
    method: 'PUT',
    data
  });
}

/** edit delete user */
export function fetchDeleteUser(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_user/',
    method: 'DELETE',
    data
  });
}

/** edit delete user */
export function fetchResetUserPassword(userId: string) {
  return request<string>({
    url: `/sys_user/reset_password/${userId}`,
    method: 'PUT'
  });
}

/** get user responsibilities */
export function fetchGetUserResponsibilities(userId: string) {
  return request<Api.SystemManage.UserResponsibilities>({
    url: `/sys_user/responsibilities/${userId}`,
    method: 'GET'
  });
}

/** get user responsibilities */
export function fetchSaveUserResponsibilities(data: Api.SystemManage.UserResponsibilities) {
  return request<boolean>({
    url: `/sys_user/responsibilities`,
    method: 'PUT',
    data
  });
}

// =============== User End  ===============

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

// =============== Menu Begin ===============

/** get menu page list */
export function fetchGetMenuList(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/sys_menu/page',
    method: 'GET',
    params
  });
}

/** add menu */
export function fetchAddMenu(data: Api.SystemManage.MenuEdit) {
  return request<boolean>({
    url: '/sys_menu/',
    method: 'POST',
    data
  });
}

/** menu drawer get menu info */
export function fetchGetEditMenuInfo(id: string) {
  return request<Api.SystemManage.Menu>({
    url: `/sys_menu/${id}`,
    method: 'GET'
  });
}

/** edit update menu info */
export function fetchUpdateMenuInfo(data: Api.SystemManage.MenuEdit) {
  return request<boolean>({
    url: '/sys_menu/',
    method: 'PUT',
    data
  });
}

/** edit delete menu button */
export function fetchDeleteMenu(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_menu/',
    method: 'DELETE',
    data
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.Menu[]>({
    url: '/sys_menu/tree',
    method: 'GET'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/sys_menu/all_pages',
    method: 'GET'
  });
}

/** get menu permission */
export function fetchGetMenuPermission() {
  return request<Api.SystemManage.MenuPermission[]>({
    url: '/sys_menu/permission',
    method: 'GET'
  });
}

// =============== Menu End  ===============

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

// =============== Position Begin ===============

/** get position page list */
export function fetchGetPositionPageList(params?: Api.SystemManage.PositionSearchParams) {
  return request<Api.SystemManage.PositionPageList>({
    url: '/sys_position/page',
    method: 'GET',
    params
  });
}

/** add position info */
export function fetchAddPosition(data: Api.SystemManage.PositionEdit) {
  return request<boolean>({
    url: '/sys_position/',
    method: 'POST',
    data
  });
}

/** update position info */
export function fetchUpdatePosition(data: Api.SystemManage.PositionEdit) {
  return request<boolean>({
    url: '/sys_position/',
    method: 'PUT',
    data
  });
}

/** edit delete position */
export function fetchDeletePosition(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_position/',
    method: 'DELETE',
    data
  });
}

/**
 * get all positions
 *
 * these positions are all enabled
 */
export function fetchGetAllPositions() {
  return request<CommonType.Option<string>[]>({
    url: '/sys_position/all_positions',
    method: 'GET'
  });
}

// =============== Position End  ===============

// =============== Dict Begin ===============

/** get dict page list */
export function fetchGetDictPageList(params?: Api.SystemManage.DictSearchParams) {
  return request<Api.SystemManage.DictPageList>({
    url: '/sys_dict/page',
    method: 'GET',
    params
  });
}

/** get dict list */
export function fetchGetDictList() {
  return request<Api.SystemManage.DictTree[]>({
    url: '/sys_dict/list',
    method: 'GET'
  });
}

/** get dict edit */
export function fetchGetEditDict(id: string) {
  return request<Api.SystemManage.Dict>({
    url: `/sys_dict/${id}`,
    method: 'GET'
  });
}

/** add dict info */
export function fetchAddDict(data: Api.SystemManage.DictEdit) {
  return request<boolean>({
    url: '/sys_dict/',
    method: 'POST',
    data
  });
}

/** update dict info */
export function fetchUpdateDict(data: Api.SystemManage.DictEdit) {
  return request<boolean>({
    url: '/sys_dict/',
    method: 'PUT',
    data
  });
}

/** edit delete dict */
export function fetchDeleteDict(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_dict/',
    method: 'DELETE',
    data
  });
}

export function fetchLoadCacheDict() {
  return request<boolean>({
    url: '/sys_dict/load_cache',
    method: 'POST'
  });
}

/** get dict item page list */
export function fetchGetDictItemPageList(params?: Api.SystemManage.DictItemSearchParams) {
  return request<Api.SystemManage.DictItemPageList>({
    url: '/sys_dict_item/page',
    method: 'GET',
    params
  });
}

/** get dict item edit */
export function fetchGetEditDictItem(id: string) {
  return request<Api.SystemManage.DictItem>({
    url: `/sys_dict_item/${id}`,
    method: 'GET'
  });
}

/** add dict item info */
export function fetchAddDictItem(data: Api.SystemManage.DictItemEdit) {
  return request<boolean>({
    url: '/sys_dict_item/',
    method: 'POST',
    data
  });
}

/** update dict item info */
export function fetchUpdateDictItem(data: Api.SystemManage.DictItemEdit) {
  return request<boolean>({
    url: '/sys_dict_item/',
    method: 'PUT',
    data
  });
}

/** edit delete item dict */
export function fetchDeleteDictItem(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_dict_item/',
    method: 'DELETE',
    data
  });
}

// =============== Dict End  ===============

// =============== OrgUnits Begin ===============

/** get org page list */
export function fetchGetOrgUnitsPageList(params?: Api.SystemManage.OrgUnitsSearchParams) {
  return request<Api.SystemManage.OrgUnitsPageList>({
    url: '/sys_org_units/page',
    method: 'GET',
    params
  });
}

/** add org info */
export function fetchAddOrgUnits(data: Api.SystemManage.OrgUnitsEdit) {
  return request<boolean>({
    url: '/sys_org_units/',
    method: 'POST',
    data
  });
}

/** update org info */
export function fetchUpdateOrgUnits(data: Api.SystemManage.OrgUnitsEdit) {
  return request<boolean>({
    url: '/sys_org_units/',
    method: 'PUT',
    data
  });
}

/** edit delete org */
export function fetchDeleteOrgUnits(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_org_units/',
    method: 'DELETE',
    data
  });
}

/** get org page tree */
export function fetchGetOrgUnitsTree() {
  return request<Api.SystemManage.OrgUnitsTree[]>({
    url: '/sys_org_units/tree',
    method: 'GET'
  });
}

// =============== OrgUnits End  ===============
