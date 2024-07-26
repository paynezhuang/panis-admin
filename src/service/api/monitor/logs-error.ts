import { request } from '@/service/request';

// =============== Logs Error Begin ===============

/** get error log list */
export function fetchGetErrorLogList(params?: Api.Monitor.ErrorLogSearchParams) {
  return request<Api.Monitor.ErrorLogList>({
    url: '/mon_logs_error/page',
    method: 'get',
    params
  });
}

// =============== Logs Error End ===============
