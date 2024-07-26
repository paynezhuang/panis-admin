import { request } from '@/service/request';

// =============== Logs Error Begin ===============

/** get scheduler log list */
export function fetchGetSchedulerLogList(params?: Api.Monitor.SchedulerLogSearchParams) {
  return request<Api.Monitor.SchedulerLogList>({
    url: '/mon_logs_scheduler/page',
    method: 'get',
    params
  });
}

// =============== Logs Error End ===============
