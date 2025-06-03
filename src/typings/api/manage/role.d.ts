declare namespace Api {
  namespace SystemManage {
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
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** role edit model */
    type RoleEdit = Pick<Api.SystemManage.Role, 'id' | 'roleName' | 'roleCode' | 'description' | 'status' | 'sort'>;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /** role menu */
    type RoleMenu = {
      roleId: string;
      menuIds: string[];
    };

    /** role perimission */
    type RolePermission = {
      roleId: string;
      permissionIds: string[];
    };

    /** role data scope */
    type RoleDataScope = {
      roleId: string;
      dataScopeIds: string[];
    };

    /** data scope tree */
    type DataScopeTree = {
      menuId: number;
      menuName: string;
      children: DataScopePermission[];
    };

    /** data scope permission */
    type DataScopePermission = {
      permissionId: number;
      permissionResource: string;
      permissionName: string;
      children: DataScopeRule[];
    };

    /** data scope rule */
    type DataScopeRule = {
      id: string;
      name: string;
      code: string;
      sort: number;
      scopeType: string;
    };
  }
}
