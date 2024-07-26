import { request } from '@/service/request';

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
