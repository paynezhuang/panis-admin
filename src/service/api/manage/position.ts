import { request } from '@/service/request';

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
