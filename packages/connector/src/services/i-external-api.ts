export type ApiResponseData = Record<string, any>;

export interface ApiResponse {
  status: number;
  statusText: string;
  data?: ApiResponseData;
}

export interface IExternalApi<ToolProps = undefined> {
  apiRequest: (
    method: string,
    endpoint: string,
    authToken?: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
    query?: Record<string, string | string[]>,
    reqConfig?: Record<string, string | number>
  ) => Promise<ApiResponse>;
  apiRequestAllItems: (props: {
    method: string;
    endpoint: string;
    authToken?: string;
    data?: Record<string, unknown>;
    query?: Record<string, string | string[]>;
    toolProps?: ToolProps;
  }) => Promise<any>;
}
