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

/** get scheduler log list */
export function fetchGetSchedulerLogList(params?: Api.Monitor.SchedulerLogSearchParams) {
  return request<Api.Monitor.SchedulerLogList>({
    url: '/mon_logs_scheduler/page',
    method: 'get',
    params
  });
}

// =============== Logs End ===============

// =============== Scheduler Begin ===============

/** get scheduler list */
export function fetchGetSchedulerList(params?: Api.Monitor.SchedulerSearchParams) {
  return request<Api.Monitor.SchedulerList>({
    url: '/mon_scheduler/page',
    method: 'get',
    params
  });
}

/** shceduler drawer get info */
export function fetchGetEditScheduler(id: string) {
  return request<Api.Monitor.SchedulerEdit>({
    url: `/mon_scheduler/${id}`,
    method: 'get'
  });
}

/** add scheduler */
export function fetchAddScheduler(data: Api.Monitor.SchedulerEdit) {
  return request<boolean>({
    url: '/mon_scheduler/',
    method: 'post',
    data
  });
}

/** edit update scheduler info */
export function fetchUpdateSchedulerInfo(data: Api.Monitor.SchedulerEdit) {
  return request<boolean>({
    url: '/mon_scheduler/',
    method: 'put',
    data
  });
}

/** edit delete scheduler job */
export function fetchDeleteScheduler(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/mon_scheduler/',
    method: 'delete',
    data
  });
}

/** Immediate scheduler job */
export function fetchImmediateJob(id: string) {
  return request<boolean>({
    url: `/mon_scheduler/immediate/${id}`,
    method: 'put'
  });
}

/** pause scheduler job */
export function fetchPauseJob(id: string) {
  return request<boolean>({
    url: `/mon_scheduler/pause/${id}`,
    method: 'put'
  });
}

/** pause scheduler job group */
export function fetchPauseJobGroup(id: string) {
  return request<boolean>({
    url: `/mon_scheduler/pause_group/${id}`,
    method: 'put'
  });
}

/** resume scheduler job */
export function fetchResumeJob(id: string) {
  return request<boolean>({
    url: `/mon_scheduler/resume/${id}`,
    method: 'put'
  });
}

/** resume scheduler job group */
export function fetchResumeJobGroup(id: string) {
  return request<boolean>({
    url: `/mon_scheduler/resume_group/${id}`,
    method: 'put'
  });
}

/** get scheduler all job name */
export function fetchGetSchedulerAllJobNames() {
  return request<CommonType.Option<string>[]>({
    url: '/mon_scheduler/all_job_names',
    method: 'get'
  });
}
// =============== Scheduler End ===============
