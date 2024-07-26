/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      page: number;
      /** page size */
      pageSize: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /**
     * enable status
     *
     * - "0": disabled
     * - "1": enabled
     */
    type EnableStatus = '0' | '1';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: string;
      /** record creator */
      createUser: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateUser: string;
      /** record update time */
      updateTime: string;
    } & T;

    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'pageSize'>;

    /** common delete params */
    type DeleteParams = {
      ids: string[];
    };
  }
}
