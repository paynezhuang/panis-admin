declare namespace Api {
  namespace SystemManage {
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
        /** Iframe URL */
        iframeUrl: string;
        /** children menu */
        children?: Menu[];
        /** menu status */
        status: Common.EnableStatus;
      } & MenuPropsOfRoute
    >;

    /** menu search params */
    type MenuSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Menu, 'name' | 'status'> & Api.Common.CommonSearchParams>;

    /** menu edit model */
    type MenuEdit = Pick<
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
      | 'iframeUrl'
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
      | 'iframeUrl'
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

    type MenuPermission = Pick<Permission, 'menuId' | 'menuName'> & {
      i18nKey: App.I18n.I18nKey;
      buttons: PermissionButton[];
    };
  }
}
