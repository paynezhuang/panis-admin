import { request } from '@/service/request';

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
