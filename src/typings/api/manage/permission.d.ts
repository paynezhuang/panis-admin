declare namespace Api {
  namespace SystemManage {
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
    type PermissionSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Permission, 'menuId' | 'name'> & Api.Common.CommonSearchParams>;

    /** permission edit model */
    type PermissionEdit = Pick<Api.SystemManage.Permission, 'id' | 'menuId' | 'menuName' | 'name' | 'resource' | 'description' | 'status' | 'sort'>;

    /** role menu permission */
    type PermissionButton = Pick<Permission, 'id' | 'name' | 'resource' | 'description'>;

    /** permission tree */
    type PermissionTree = {
      label: string;
      value: string;
      disable: boolean;
      children?: PermissionTree[];
    };
  }
}
