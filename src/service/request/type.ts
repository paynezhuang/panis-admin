export interface RequestInstanceState {
  /** whether the request is refreshing token */
  refreshTokenFn: Promise<boolean> | null;
  /** refresh nonce */
  refreshNonce: string;
  /** the request error message stack */
  errMsgStack: string[];
}
