export interface IError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}
