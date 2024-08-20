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
