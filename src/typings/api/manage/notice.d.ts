declare namespace Api {
  namespace Manage {
    type Notice = Common.CommonRecord<{
      /** 分类 1:通知 2:公告 */
      category: string;
      /** 标题 */
      title: string;
      /** 内容 */
      content: string;
      /** 发布时间 */
      releaseTime: number | null;
      /** 备注 */
      remark: string;
      /** 创建用户 */
      createUser: string;
      /** 创建时间 */
      createTime: string;
      /** 是否启用(0:禁用,1:启用) */
      status: string;
    }>;

    /** Notice search params */
    type NoticeSearchParams = CommonType.RecordNullable<Pick<Api.Manage.Notice, 'category' | 'title'> & Api.Common.CommonSearchParams>;

    /** Notice edit model */
    type NoticeEdit = Pick<Api.Manage.Notice, 'id' | 'category' | 'title' | 'content' | 'releaseTime' | 'remark' | 'status'>;

    /** Notice list */
    type NoticeList = Common.PaginatingQueryRecord<Notice>;
  }
}
