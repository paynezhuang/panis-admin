import { request } from '../request';

// =============== System Begin ===============

/** get system info */
export function fetchGetSystemInfo() {
  return request<Api.Monitor.SystemInfo>({
    url: '/mon_system/info',
    method: 'get'
  });
}

// =============== System End ===============

// =============== Cache Begin ===============

/** get cache with redis */
export function fetchGetCacheRedisInfo() {
  return request<Api.Monitor.RedisInfo>({
    url: '/mon_cache/redis',
    method: 'get'
  });
}

// =============== Cache End ===============

// =============== Logs Begin ===============

/** get login log list */
export function fetchGetLoginLogList(params?: Api.Monitor.LoginLogSearchParams) {
  return request<Api.Monitor.LoginLogList>({
    url: '/mon_logs_login/page',
    method: 'get',
    params
  });
}

/** get operation log list */
export function fetchGetOperationLogList(params?: Api.Monitor.OperationLogSearchParams) {
  return request<Api.Monitor.OperationLogList>({
    url: '/mon_logs_operation/page',
    method: 'get',
    params
  });
}

/** get error log list */
export function fetchGetErrorLogList(params?: Api.Monitor.ErrorLogSearchParams) {
  return request<Api.Monitor.ErrorLogList>({
    url: '/mon_logs_error/page',
    method: 'get',
    params
  });
}

// =============== Logs End ===============
