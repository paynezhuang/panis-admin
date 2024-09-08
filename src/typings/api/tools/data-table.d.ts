declare namespace Api {
  namespace Tools {
    /** data table */
    type DataTable = {
      /** table name */
      tableName: string;
      /** table comment */
      tableComment: string;
      /** create time */
      createTime: string;
      /** update time */
      updateTime: string;
    };

    /** data table column */
    type DataTableColumn = {
      /** column name */
      columnName: string;
      /** property name */
      propertyName: string;
      /** column comment */
      columnComment: string;
      /** ordinal position */
      ordinalPosition: number;
      /** data type */
      dataType: string;
      /** java type */
      javaType: string;
      /** character maximum length */
      characterMaximumLength: string;
    };
  }
}
