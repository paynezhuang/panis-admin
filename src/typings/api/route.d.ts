declare namespace Api {
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      id: string;
      userName: string;
      nickName: string;
      realName: string;
      roleIds: string[];
      permissions: string[];
    }
  }
}
