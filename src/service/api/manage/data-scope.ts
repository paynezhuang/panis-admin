import { request } from '@/service/request';

// =============== Data Scope Begin ===============

/** get data scope page list */
export function fetchGetDataScopeList(params?: Api.SystemManage.DataScopeSearchParams) {
  return request<Api.SystemManage.DataScopeList>({
    url: '/sys_data_scope/page',
    method: 'GET',
    params
  });
}

/** add data scope button */
export function fetchAddDataScope(data: Api.SystemManage.DataScopeEdit) {
  return request<boolean>({
    url: '/sys_data_scope/',
    method: 'POST',
    data
  });
}

/** get data scope info */
export function fetchGetDataScopeInfo(id: string) {
  return request<Api.SystemManage.DataScopeEdit>({
    url: `/sys_data_scope/${id}`,
    method: 'GET'
  });
}

/** edit update data scope button info */
export function fetchUpdateDataScopeInfo(data: Api.SystemManage.DataScopeEdit) {
  return request<boolean>({
    url: '/sys_data_scope/',
    method: 'PUT',
    data
  });
}

/** edit delete data scope button */
export function fetchDeleteDataScope(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/sys_data_scope/',
    method: 'DELETE',
    data
  });
}

/** get variable conditions */
export function fetchGetVariableConditions() {
  return request<Api.SystemManage.VariableConditionsResponse>({
    url: '/sys_data_scope/variable-conditions',
    method: 'GET'
  });
}

// =============== Data Scope End  ===============

// =============== Role Data Scope Begin ===============

/** get data scope tree */
export function fetchGetDataScopeTree() {
  return request<Api.SystemManage.DataScopeTree[]>({
    url: '/sys_data_scope/tree',
    method: 'GET'
  });
}

/** get role data scope ids */
export function fetchGetRoleDataScopeIds(roleId: string) {
  return request<string[]>({
    url: `/sys_role_data_scope/role/${roleId}`,
    method: 'GET'
  });
}

/** add role data scope */
export function fetchAddRoleDataScope(data: Api.SystemManage.RoleDataScope) {
  return request<boolean>({
    url: '/sys_role_data_scope/',
    method: 'POST',
    data
  });
}

// =============== Role Data Scope End  ===============
