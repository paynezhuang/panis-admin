declare namespace Api {
  namespace Monitor {
    /** scheduler execute status */
    type SchedulerExecuteStatus = 'SUCCESS' | 'FAIL';

    /** scheduler log */
    type SchedulerLog = Common.CommonRecord<{
      jobName: string;
      jobGroup: string;
      useTime: number;
      status: SchedulerExecuteStatus;
      createTime: string;
      exceptionMessage: string;
      exceptionClass: string;
      line: number;
      stackTrace: string;
    }>;

    /** scheduler log list */
    type SchedulerLogList = Common.PaginatingQueryRecord<SchedulerLog>;

    /** scheduler log search params */
    type SchedulerLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.SchedulerLog, 'jobName'> & Api.Common.CommonSearchParams>;
  }
}
