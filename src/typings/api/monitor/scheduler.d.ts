declare namespace Api {
  namespace Monitor {
    /** scheduler trigger state */
    type SchedulerTriggerState = 'WAITING' | 'ACQUIRED' | 'EXECUTING' | 'PAUSED' | 'BLOCKED' | 'ERROR';

    /** scheduler */
    type Scheduler = Common.CommonRecord<{
      /** job name */
      jobName: string;
      /** job group */
      jobGroup: string;
      /** job class */
      jobClassName: string;
      /** job description */
      description: string;
      /** cron expression */
      cronExpression: string;
      /** job data */
      jobData?: { key: string; value: string }[] | null;
      /** trigger name */
      triggerName: string;
      /** trigger group */
      triggerGroup: string;
      /** trigger description */
      triggerDescription: string;
      /** trigger data */
      triggerData?: { key: string; value: string }[] | null;
      /** trigger state */
      triggerState: SchedulerTriggerState;
    }>;

    /** scheduler list */
    type SchedulerList = Common.PaginatingQueryRecord<Scheduler>;

    /** scheduler search params */
    type SchedulerSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.Scheduler, 'jobName' | 'jobGroup'> & Api.Common.CommonSearchParams>;

    /** scheduler edit model */
    type SchedulerEdit = Pick<
      Api.Monitor.Scheduler,
      'id' | 'jobName' | 'jobGroup' | 'jobClassName' | 'description' | 'cronExpression' | 'triggerName' | 'triggerGroup' | 'triggerDescription'
    > & {
      jobData: NonNullable<Api.Monitor.Scheduler['jobData']>;
      triggerData: NonNullable<Api.Monitor.Scheduler['triggerData']>;
    };
  }
}
