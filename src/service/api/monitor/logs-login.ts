import { request } from '@/service/request';

// =============== Logs Login Begin ===============

/** get login log list */
export function fetchGetLoginLogList(params?: Api.Monitor.LoginLogSearchParams) {
  return request<Api.Monitor.LoginLogList>({
    url: '/mon_logs_login/page',
    method: 'get',
    params
  });
}

// =============== Logs Login End ===============
