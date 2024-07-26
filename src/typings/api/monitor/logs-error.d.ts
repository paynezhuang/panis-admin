declare namespace Api {
  namespace Monitor {
    /** error log */
    type ErrorLog = Common.CommonRecord<
      {
        /** exception message */
        exceptionMessage: string;
        /** exception class */
        exceptionClass: string;
        /** line */
        line: number;
        /** stackTrace */
        stackTrace: string;
      } & OperationLog
    >;

    /** error log list */
    type ErrorLogList = Common.PaginatingQueryRecord<ErrorLog>;

    /** error log search params */
    type ErrorLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.ErrorLog, 'createUser'> & Api.Common.CommonSearchParams>;
  }
}
