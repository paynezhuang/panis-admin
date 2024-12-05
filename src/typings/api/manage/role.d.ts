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
  }
}
