import { request } from '@/service/request';

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
