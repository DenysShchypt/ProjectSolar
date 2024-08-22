export interface IRefreshToken {
  token: string;
  exp: Date;
  userId: string;
  userAgent: string;
}

export interface ITokenResponse {
  accuseToken: string;
  refreshToken: IRefreshToken;
}
export interface IAccuseToken {
  accuseToken: string;
}
