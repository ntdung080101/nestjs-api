export interface BaseResponseInterface<T> {
  statusCode: number;
  message: Array<string> | T;
  error: string | undefined;
}
