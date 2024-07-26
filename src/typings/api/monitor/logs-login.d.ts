declare namespace Api {
  namespace Monitor {
    /**
     * login status
     *
     * - "0": "fail"
     * - "1": "success"
     */
    type LogsLoginStatus = '0' | '1';

    /** LoginLog */
    type LoginLog = Common.CommonRecord<{
      /** user id */
      userId: number;
      /** user name */
      userName: string;
      /** user real name */
      userRealName: string;
      /** login ip */
      ip: string;
      /** login address */
      ipAddr: string;
      /** user agent */
      userAgent: string;
      /** login status */
      status: LogsLoginStatus;
      /** login message */
      message: string;
    }>;

    /** login log list */
    type LoginLogList = Common.PaginatingQueryRecord<LoginLog>;

    /** login log search params */
    type LoginLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.LoginLog, 'userName' | 'userRealName'> & Api.Common.CommonSearchParams>;
  }
}
