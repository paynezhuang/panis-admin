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

    /** common delete params */
    type DeleteParams = {
      ids: string[];
    };
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      id: string;
      userName: string;
      nickName: string;
      realName: string;
      roleIds: string[];
      permissions: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "sys"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'pageSize'>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      description: string;
      /** role sort */
      sort: number;
      /** role status */
      status: Common.EnableStatus | null;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & CommonSearchParams>;

    /** role edit model */
    type RoleEdit = Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'description' | 'status' | 'sort'>;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "0": "confidential"
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '0' | '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      gender: UserGender | null;
      /** user nickname */
      nickName: string;
      /** user real name */
      realName: string;
      /** user phone */
      phone: string;
      /** user email */
      email: string;
      /** user status */
      status: Common.EnableStatus;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'gender' | 'realName' | 'phone' | 'email' | 'status'> & CommonSearchParams
    >;

    /** user edit model */
    type UserEdit = Pick<Api.SystemManage.User, 'userName' | 'gender' | 'nickName' | 'realName' | 'phone' | 'email' | 'status'>;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /** user responsibilities */
    type UserResponsibilities = {
      userId: string;
      roleIds: string[];
      positionIds: string[];
      orgUnitsIds: string[];
      orgUnitsPrincipalIds: string[];
    };

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      'i18nKey' | 'constant' | 'order' | 'href' | 'hideInMenu' | 'activeMenu' | 'fixedIndexInTab' | 'query'
    >;

    type Menu = Common.CommonRecord<
      {
        /** parent menu id */
        parentId: UnionKey.StrNum;
        /** menu type */
        type: MenuType;
        /** menu name */
        name: string;
        /** route name */
        routeName: string;
        /** route path */
        routePath: string;
        /** component */
        component?: string;
        /** whether to cache the route */
        keepAlive?: CommonType.YesOrNo;
        /** By default, the same route path will use one tab, if set to true, it will use multiple tabs */
        multiTab?: CommonType.YesOrNo;
        /** iconify icon name or local icon name */
        icon: string;
        /** icon type */
        iconType: IconType;
        /** whether to hide the route in the menu */
        hide: CommonType.YesOrNo;
        /** menu sort */
        sort: number;
        /** children menu */
        children?: Menu[];
        /** menu status */
        status: Common.EnableStatus;
      } & MenuPropsOfRoute
    >;

    /** menu search params */
    type MenuSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Menu, 'name' | 'status'> & CommonSearchParams>;

    /** menu edit model */
    type MenuEdit = Pick<
      Api.SystemManage.Menu,
      | 'type'
      | 'name'
      | 'i18nKey'
      | 'routeName'
      | 'routePath'
      | 'icon'
      | 'iconType'
      | 'component'
      | 'status'
      | 'hide'
      | 'href'
      | 'keepAlive'
      | 'sort'
      | 'parentId'
      | 'multiTab'
      | 'activeMenu'
      | 'fixedIndexInTab'
    >;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    /** menu tree data */
    type MenuTreeData = Pick<
      Api.SystemManage.Menu,
      | 'id'
      | 'type'
      | 'name'
      | 'i18nKey'
      | 'routeName'
      | 'routePath'
      | 'icon'
      | 'iconType'
      | 'component'
      | 'status'
      | 'hide'
      | 'href'
      | 'keepAlive'
      | 'sort'
      | 'parentId'
    > & {
      label?: string;
      children?: MenuTreeData[];
      prefix?: () => import('vue').VNodeChild;
    };

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };

    /** role menu */
    type RoleMenu = {
      roleId: string;
      menuIds: string[];
    };

    /** menu permission button */
    type Permission = Common.CommonRecord<{
      /** menu id */
      menuId: string;
      /** menu name */
      menuName: string;
      /** permission name */
      name: string;
      /** resource */
      resource: string;
      /** permission description */
      description: string;
      /** permission status */
      status: Common.EnableStatus | null;
      /** permission sort */
      sort: number;
    }>;

    /** permission list */
    type PermissionList = Common.PaginatingQueryRecord<Permission>;

    /** permission search params */
    type PermissionSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Permission, 'menuId' | 'name'> & CommonSearchParams>;

    /** permission edit model */
    type PermissionEdit = Pick<Api.SystemManage.Permission, 'id' | 'menuId' | 'menuName' | 'name' | 'resource' | 'description' | 'status' | 'sort'>;

    /** role menu permission */
    type PermissionButton = Pick<Permission, 'id' | 'name' | 'resource' | 'description'>;

    type MenuPermission = Pick<Permission, 'menuId' | 'menuName'> & {
      i18nKey: App.I18n.I18nKey;
      buttons: PermissionButton[];
    };

    /** permission tree */
    type PermissionTree = {
      label: string;
      value: string;
      disable: boolean;
      children?: PermissionTree[];
    };

    /** role menu */
    type RolePermission = {
      roleId: string;
      permissionIds: string[];
    };

    /** position */
    type Position = Common.CommonRecord<{
      /** position name */
      name: string;
      /** position i18nKey */
      i18nKey: string;
      /** position code */
      code: string;
      /** abbr */
      abbr: string;
      /** position description */
      description: string;
      /** position sort */
      sort: number;
      /** position status */
      status: Common.EnableStatus;
    }>;

    /** position page list */
    type PositionPageList = Common.PaginatingQueryRecord<Position>;

    /** position search params */
    type PositionSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Position, 'name' | 'status'> & CommonSearchParams>;

    /** position edit model */
    type PositionEdit = Pick<Api.SystemManage.Position, 'code' | 'name' | 'i18nKey' | 'abbr' | 'sort' | 'description' | 'status'>;

    /**
     * dict type
     *
     * - "1": system dict
     * - "2": business dict
     */
    type DictType = '1' | '2';

    /** dict */
    type Dict = Common.CommonRecord<{
      /** dict name */
      name: string;
      /** dict code */
      code: string;
      /** dict type */
      type: DictType;
      /** dict sort */
      sort: number;
      /** dict description */
      description: string;
      /** dict status */
      status: Common.EnableStatus;
    }>;

    /** dict list */
    type DictPageList = Common.PaginatingQueryRecord<Dict>;

    /** dict search params */
    type DictSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Dict, 'name' | 'code'> & CommonSearchParams>;

    /** dict edit model */
    type DictEdit = Pick<Api.SystemManage.Dict, 'name' | 'code' | 'type' | 'sort' | 'description' | 'status'>;

    /** dict tree * */
    type DictTree = Pick<Api.SystemManage.Dict, 'id' | 'name' | 'code' | 'type' | 'description' | 'status'>;

    /** dict item */
    type DictItem = Common.CommonRecord<{
      /** dict id */
      dictId: string;
      /** dict code */
      dictCode: string;
      /** dict item value */
      value: string;
      /** dict item label: zh_cn */
      zhCN: string;
      /** dict item label: en_us */
      enUS: string;
      /** dict item sort */
      sort: number;
      /** dict item description */
      description: string;
      /** dict item status */
      status: Common.EnableStatus;
    }>;

    /** dict item page list */
    type DictItemPageList = Common.PaginatingQueryRecord<DictItem>;

    /** dict item search params */
    type DictItemSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.DictItem, 'dictId' | 'value' | 'zhCN' | 'enUS' | 'description'> & CommonSearchParams
    >;

    /** dict item edit model */
    type DictItemEdit = Pick<Api.SystemManage.DictItem, 'value' | 'zhCN' | 'enUS' | 'sort' | 'description' | 'status'>;

    type OrgUnits = Common.CommonRecord<{
      /** parent org id */
      parentId: UnionKey.StrNum;
      /** org name */
      name: string;
      /** org code */
      code: string;
      /** org abbr */
      abbr: string;
      /** org level */
      level: number;
      /** org ancestors */
      ancestors: string;
      /** org sort */
      description: string;
      /** org sort */
      sort: number;
      /** org status */
      status: Common.EnableStatus;
      /** children org */
      children?: OrgUnits[] | null;
    }>;

    /** OrgUnits page list */
    type OrgUnitsPageList = Common.PaginatingQueryRecord<OrgUnits>;

    /** OrgUnits search params */
    type OrgUnitsSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.OrgUnits, 'name' | 'status'> & CommonSearchParams>;

    /** OrgUnits edit model */
    type OrgUnitsEdit = Pick<
      Api.SystemManage.OrgUnits,
      'id' | 'parentId' | 'name' | 'code' | 'abbr' | 'level' | 'ancestors' | 'description' | 'status' | 'sort'
    >;

    /** OrgUnits tree */
    type OrgUnitsTree = Pick<Api.SystemManage.OrgUnits, 'id' | 'name' | 'code'> & {
      children?: OrgUnitsTree[];
    };
  }

  /**
   * namespace Monitor
   *
   * backend api module:"monitor"
   */
  namespace Monitor {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'pageSize'>;
    /** SystemInfo */
    type SystemInfo = {
      /** Operating system information */
      operatingSystem: OperatingSystem;
      /** Central processor information */
      centralProcessor: CentralProcessor;
      /** Global memory information */
      globalMemory: GlobalMemory;
      /** JVM information */
      jvm: JVM;
      /** File stores */
      fileStores: FileStore[];
      /** Processes */
      processes: Process[];
    };

    /** Operating system information */
    type OperatingSystem = {
      /** name */
      name: string;
      /** arch */
      arch: string;
      /** System boot time */
      systemBootTime: string;
      /** System uptime */
      systemUptime: string;
      /** Operating system manufacturer */
      manufacturer: string;
    };

    /** Central processor information */
    type CentralProcessor = {
      /** Processor name */
      name: string;
      /** Processor identifier */
      identifier: string;
      /** Vendor frequency */
      vendorFreq: string;
      /** Number of physical processors */
      physicalProcessorCount: number;
      /** Number of logical processors */
      logicalProcessorCount: number;
      /** System load average */
      systemLoadAverage: number;
      /** Processor usage rate */
      userPercent: number;
      /** System usage rate */
      systemPercent: number;
      /** Idle rate */
      idlePercent: number;
    };

    /** Global memory information */
    type GlobalMemory = {
      /** Total memory */
      total: string;
      /** Used memory */
      used: string;
      /** Available memory */
      available: string;
      /** Total swap memory */
      swapTotal: string;
      /** Used swap memory */
      swapUsed: string;
      /** Free swap memory */
      swapFree: string;
      /** Memory usage rate */
      memoryUsedRate: number;
      /** Swap usage rate */
      swapUsedRate: number;
    };

    /** JVM information */
    type JVM = {
      /** JVM name */
      vmName: string;
      /** JVM uptime */
      uptime: string;
      /** JVM version */
      vmVersion: string;
      /** JVM vendor */
      vmVendor: string;
      /** JVM start time */
      startTime: string;
      /** JVM input arguments */
      inputArguments: string;
      /** Heap memory used */
      heapMemoryUsed: string;
      /** Maximum heap memory */
      heapMemoryMax: string;
      /** Heap memory usage rate */
      memoryUsageRate: number;
      /** Non-heap memory used */
      nonHeapMemoryUsed: string;
    };

    /** File store information */
    type FileStore = {
      /** File store name */
      name: string;
      /** File store type */
      type: string;
      /** Mount */
      mount: string;
      /** Total space */
      totalSpace: string;
      /** Usable space */
      usableSpace: string;
      /** Used space */
      usedSpace: string;
      /** Usage rate */
      usedPercentage: string;
    };

    /** Process information */
    type Process = {
      /** Process ID */
      processID: number;
      /** Process name */
      name: string;
      /** CPU load */
      cpuLoad: string;
    };

    /** Cache Redis */
    type RedisInfo = {
      /** Redis version */
      version: string;
      /** upTime */
      uptime: string;
      /** connectedClients */
      connectedClients: number;
      /** usedMemory */
      usedMemory: string;
      /** usedMemoryPeak */
      maxMemory: string;
      /** memoryUsageRate */
      memoryUsageRate: string;
      /** menFragmentationRatio */
      memFragmentationRatio: string;
      /** totalCommandsProcessed */
      totalCommandsProcessed: number;
      /** Command Stats */
      commandStats: {
        name: string;
        value: number;
        percentage: number;
      }[];
    };

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
    type LoginLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.LoginLog, 'userName' | 'userRealName'> & CommonSearchParams>;

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
    type OperationLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.OperationLog, 'createUser'> & CommonSearchParams>;

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
    type ErrorLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.ErrorLog, 'createUser'> & CommonSearchParams>;

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
    type SchedulerLogSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.SchedulerLog, 'jobName'> & CommonSearchParams>;

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
    type SchedulerSearchParams = CommonType.RecordNullable<Pick<Api.Monitor.Scheduler, 'jobName' | 'jobGroup'> & CommonSearchParams>;

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
