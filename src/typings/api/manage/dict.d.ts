declare namespace Api {
  namespace SystemManage {
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
    type DictSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Dict, 'name' | 'code'> & Api.Common.CommonSearchParams>;

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
      /** dict item type */
      type: string;
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
      Pick<Api.SystemManage.DictItem, 'dictId' | 'value' | 'zhCN' | 'enUS' | 'description'> & Api.Common.CommonSearchParams
    >;

    /** dict item edit model */
    type DictItemEdit = Pick<Api.SystemManage.DictItem, 'value' | 'zhCN' | 'enUS' | 'type' | 'sort' | 'description' | 'status'>;

    /** dict options */
    type DictOptions = {
      label: string;
      value: string;
      type: NaiveUI.ThemeColor;
    };

    /** dict store search params */
    type DictStoreSearchParams = CommonType.RecordNullable<{ language: string; code?: string }>;
  }
}
