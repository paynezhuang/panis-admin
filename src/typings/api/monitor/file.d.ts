declare namespace Api {
  namespace Monitor {
    type File = Common.CommonRecord<{
      /** 订单ID */
      orderId: number;
      /** 订单号码 */
      orderNo: string;
      /** 分类1:上传 2:下载 */
      category: string;
      /** 存储位置 1:本地 2:Minio */
      location: string;
      /** 文件名称 */
      name: string;
      /** 文件尾缀 */
      suffix: string;
      /** 文件路径 */
      path: string;
      /** 文件大小 */
      length: number;
      /** 文件大小(带单位) */
      size: string;
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

    /** File search params */
    type FileSearchParams = CommonType.RecordNullable<
      Pick<Api.Monitor.File, 'orderNo' | 'category' | 'location' | 'name'> & Api.Common.CommonSearchParams
    >;

    /** File list */
    type FileList = Common.PaginatingQueryRecord<File>;
  }
}
