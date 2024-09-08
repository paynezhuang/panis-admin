declare namespace Api {
  namespace Tools {
    /** generate table */
    type GeneratorTable = Common.CommonRecord<{
      /** table name */
      tableName: string | null;
      /** table comment */
      tableComment: string;
      /** table prefix */
      tablePrefix: string;
      /** parent package name */
      parentPackage: string;
      /** module name */
      moduleName: string;
      /** parent menu ID */
      parentMenuId: number;
      /** author */
      author: string;
      /** status (0: disabled, 1: enabled) */
      status: Common.EnableStatus;
    }>;

    /** generate table list */
    type GeneratorTableList = Common.PaginatingQueryRecord<GeneratorTable>;

    /** generate table search params */
    type GeneratorTableSearchParams = CommonType.RecordNullable<Pick<Api.Tools.GeneratorTable, 'tableName'> & Api.Common.CommonSearchParams>;

    /** generate table edit model */
    type GeneratorTableEdit = Pick<
      Api.Tools.GeneratorTable,
      'id' | 'tableName' | 'tableComment' | 'tablePrefix' | 'parentPackage' | 'moduleName' | 'parentMenuId' | 'author' | 'status'
    >;

    /** generate table column */
    type GeneratorTableColumn = Common.CommonRecord<{
      /** generate associated table ID */
      tableId: string;
      /** generate associated table name */
      tableName: string;
      /** column name */
      columnName: string;
      /** property name */
      propertyName: string;
      /** column comment */
      columnComment: string;
      /** data type */
      dataType: string;
      /** java type */
      javaType: string;
      /** typeScript type */
      typeScriptType: string;
      /** ordinal position */
      ordinalPosition: number;
      /** i18n */
      i18n: Common.EnableStatus;
      /** required */
      required: string;
      /** list */
      list: string;
      /** search */
      search: string;
      /** search type */
      searchType: string;
      /** add */
      added: string;
      /** edit update */
      edit: string;
      /** associated dictionary code */
      dictCode: string;
      /** render type (select, radio) */
      renderType: string;
      /** status */
      status: string;
    }>;

    /** generate table column edit model */
    type GeneratorTableColumnEdit = Pick<
      GeneratorTableColumn,
      | 'id'
      | 'tableId'
      | 'tableName'
      | 'columnName'
      | 'propertyName'
      | 'columnComment'
      | 'dataType'
      | 'javaType'
      | 'typeScriptType'
      | 'ordinalPosition'
      | 'i18n'
      | 'required'
      | 'list'
      | 'search'
      | 'searchType'
      | 'added'
      | 'edit'
      | 'dictCode'
      | 'renderType'
      | 'status'
    >;
  }
}
