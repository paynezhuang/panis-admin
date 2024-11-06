declare namespace Api {
  namespace SystemManage {
    /**
     * user gender
     *
     * - "0": "confidential"
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '0' | '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      gender: UserGender | null;
      /** user nickname */
      nickName: string;
      /** user real name */
      realName: string;
      /** user phone */
      phone: string;
      /** user email */
      email: string;
      /** user status */
      status: Common.EnableStatus;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'gender' | 'realName' | 'phone' | 'email' | 'status'> & Api.Common.CommonSearchParams
    > & { orgIds?: string };

    /** user edit model */
    type UserEdit = Pick<Api.SystemManage.User, 'userName' | 'gender' | 'nickName' | 'realName' | 'phone' | 'email' | 'status'>;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /** user responsibilities */
    type UserResponsibilities = {
      userId: string;
      roleIds: string[];
      positionIds: string[];
      orgUnitsIds: string[];
      orgUnitsPrincipalIds: string[];
    };
  }
}
