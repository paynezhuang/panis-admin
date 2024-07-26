declare namespace Api {
  namespace SystemManage {
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
    type OrgUnitsSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.OrgUnits, 'name' | 'status'> & Api.Common.CommonSearchParams>;

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
}
