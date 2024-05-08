export interface RequestInstanceState {
  /** whether the request is refreshing token */
  isRefreshingToken: boolean;
  /** refresh nonce */
  refreshNonce: string;
  /** the request error message stack */
  errMsgStack: string[];
}
