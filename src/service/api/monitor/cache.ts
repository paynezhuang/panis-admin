import { request } from '@/service/request';

// =============== Cache Begin ===============

/** get cache with redis */
export function fetchGetCacheRedisInfo() {
  return request<Api.Monitor.RedisInfo>({
    url: '/mon_cache/redis',
    method: 'get'
  });
}

// =============== Cache End ===============
