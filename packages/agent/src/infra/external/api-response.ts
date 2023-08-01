export type ApiResponseData = Record<string, any>;

export interface ApiResponse {
  status: number;
  statusText: string;
  data?: ApiResponseData;
}
