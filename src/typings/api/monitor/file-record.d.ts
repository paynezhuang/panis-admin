declare namespace Api {
  namespace Monitor {
    type FileRecord = Common.CommonRecord<{
      /** 订单ID */
      orderId: number;
      /** 订单号码 */
      orderNo: string;
      /** 分类1:上传 2:下载 */
      category: string;
      /** 文件名称 */
      name: string;
      /** 文件路径 */
      path: string;
      /** 文件大小 */
      length: number;
      /** 文件UUID */
      uuid: string;
      /** 文件类型 */
      contentType: string;
      /** 备注 */
      remark: string;
      /** 创建用户 */
      createUser: string;
      /** 创建时间 */
      createTime: string;
    }>;

    /** FileRecord search params */
    type FileRecordSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.FileRecord, 'orderNo' | 'category' | 'name'> & Api.Common.CommonSearchParams
    >;

    /** FileRecord list */
    type FileRecordList = Common.PaginatingQueryRecord<FileRecord>;
  }
}
