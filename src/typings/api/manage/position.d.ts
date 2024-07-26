declare namespace Api {
  namespace SystemManage {
    /** position */
    type Position = Common.CommonRecord<{
      /** position name */
      name: string;
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
    type PositionSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Position, 'name' | 'status'> & Api.Common.CommonSearchParams>;

    /** position edit model */
    type PositionEdit = Pick<Api.SystemManage.Position, 'code' | 'name' | 'abbr' | 'sort' | 'description' | 'status'>;
  }
}
