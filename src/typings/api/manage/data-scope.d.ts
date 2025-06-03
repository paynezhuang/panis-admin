declare namespace Api {
  namespace SystemManage {
    /** data scope permission */
    type DataScope = Common.CommonRecord<{
      /** name */
      name: string;
      /** code */
      code: string;
      /** menu id */
      menuId: string;
      /** menu name */
      menuName: string;
      /** permission resource id */
      permissionId: string;
      /** permission resource code */
      permissionResource: string;
      /** permission resource name */
      permissionName: string;
      /** data scope type */
      scopeType: string;
      /** data scope type name (all/department and subordinates/department/self and subordinates/custom/self only) */
      scopeTypeName: string;
      /** description */
      description: string;
      /** sort */
      sort: number;
      /** status (0:disabled,1:enabled) */
      status: Common.EnableStatus | null;
    }>;

    /** data scope list */
    type DataScopeList = Common.PaginatingQueryRecord<DataScope>;

    /** data scope search params */
    type DataScopeSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.DataScope, 'permissionId' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** data scope edit model */
    type DataScopeEdit = Pick<
      Api.SystemManage.DataScope,
      | 'id'
      | 'menuId'
      | 'menuName'
      | 'name'
      | 'code'
      | 'permissionId'
      | 'permissionResource'
      | 'permissionName'
      | 'scopeType'
      | 'scopeTypeName'
      | 'description'
      | 'status'
      | 'sort'
    > & {
      customRules: DataScopeCondition[];
    };

    /** data scope button */
    type DataScopeButton = Pick<DataScope, 'id' | 'name' | 'permissionResource' | 'description'>;

    /** data scope condition */
    type DataScopeCondition = {
      field: string;
      operator: string;
      value: string;
      logic: string;
      variable: string;
    };

    /** variable condition */
    type VariableCondition = {
      code: string;
      name: string;
      conditions: string[];
    };

    /** operator condition */
    type OperatorCondition = {
      code: string;
      operator: string;
      description: string;
    };

    /** variable conditions response */
    type VariableConditionsResponse = {
      variables: VariableCondition[];
      conditions: OperatorCondition[];
    };
  }
}
