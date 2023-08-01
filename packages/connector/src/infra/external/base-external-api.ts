import { type IExternalApi } from '../../services/i-external-api';

export type ApiResponseData = Record<string, any>;

export interface ApiResponse {
  headers: Record<string, string>;
  status: number;
  statusText: string;
  data?: ApiResponseData;
}

export abstract class BaseExternalApi<ToolProps = undefined>
  implements IExternalApi<ToolProps>
{
  abstract apiRequest(
    method: string,
    endpoint: string,
    authToken?: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
    query?: Record<string, string | string[]>,
    reqConfig?: Record<string, string | number>
  ): Promise<ApiResponse>;

  abstract apiRequestAllItems(props: {
    method: string;
    endpoint: string;
    authToken?: string;
    data?: Record<string, unknown>;
    query?: Record<string, string | string[]>;
    toolProps?: ToolProps;
  }): Promise<any>;
}
