import { request } from '@/service/request';

// =============== System Begin ===============

/** get system info */
export function fetchGetSystemInfo() {
  return request<Api.Monitor.SystemInfo>({
    url: '/mon_system/info',
    method: 'get'
  });
}

// =============== System End ===============
