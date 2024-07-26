declare namespace Api {
  namespace Monitor {
    /** OperationLog */
    type OperationLog = Common.CommonRecord<{
      /** request id */
      requestId: number;
      /** ip */
      ip: string;
      /** ip addr */
      ipAddr: string;
      /** iser agent */
      userAgent: string;
      /** request uri */
      requestUri: string;
      /** request method */
      requestMethod: string;
      /** content Type */
      contentType: string;
      /** operation message */
      operation: string;
      /** method name */
      methodName: string;
      /** method params */
      methodParams: string;
      /** use time */
      useTime: number;
    }>;

    /** operation log list */
    type OperationLogList = Common.PaginatingQueryRecord<OperationLog>;

    /** login log search params */
    type OperationLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.OperationLog, 'createUser'> & Api.Common.CommonSearchParams>;
  }
}
