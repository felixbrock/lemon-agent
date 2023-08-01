/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import axios, { type AxiosRequestConfig } from 'axios';
import { type HubSpotToolProps } from '../../domain/use-cases/execute-hubspot-operation';
import { type ApiResponse, BaseExternalApi } from './base-external-api';

interface ReqConfig {
  json?: boolean;
  contentType?: string;
}

export class HubSpotApi extends BaseExternalApi<HubSpotToolProps> {
  apiRequest = async (
    method: string,
    endpoint: string,
    authToken?: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
    query?: Record<string, string | string[]>,
    reqConfig?: ReqConfig
  ): Promise<ApiResponse> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json; charset=utf-8',
      };

      if (authToken) headers.Authorization = `Bearer ${authToken}`;

      const config: AxiosRequestConfig = {
        baseURL: 'https://api.hubapi.com',
        method,
        url: endpoint,
        data,
        headers,
        params: query ? new URLSearchParams(query) : undefined,
      };

      if (!reqConfig) {
        const result = await axios<any, ApiResponse>(config);
        return result;
      }

      if (reqConfig.json === false && config.headers)
        delete config.headers['Content-Type'];
      if (reqConfig.contentType && config.headers)
        config.headers['Content-Type'] = reqConfig.contentType;

      const result = await axios<any, ApiResponse>(config);
      return result;
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  apiRequestAllItems = async (props: {
    method: string;
    endpoint: string;
    authToken: string;
    data?: Record<string, unknown>;
    query?: Record<string, string | string[]>;
    toolProps: HubSpotToolProps;
  }): Promise<any> => {
    const { method, endpoint, authToken, toolProps } = props;
    const query = props.query ?? {};
    const data = props.data ?? {};

    query.limit = query.limit || '250';
    query.count = '100';
    data.limit = data.limit || '100';

    const returnData: Array<Record<string, unknown>> = [];
    let apiResponse: ApiResponse;
    do {
      apiResponse = await this.apiRequest(
        method,
        endpoint,
        authToken,
        data,
        query
      );
      query.offset = apiResponse.data?.offset;
      query.vidOffset = apiResponse.data
        ? apiResponse.data['vid-offset']
        : undefined;
      // Used by Search endpoints
      if (apiResponse.data?.paging) {
        data.after = apiResponse.data.paging.next.after;
      }
      returnData.push.apply(
        returnData,
        apiResponse.data ? apiResponse.data[toolProps.propertyName] : []
      );
      // ticket:getAll endpoint does not support setting a limit, so return once the limit is reached
      const limit =
        query.limit && typeof query.limit === 'string'
          ? parseInt(query.limit)
          : undefined;
      if (
        limit &&
        limit <= returnData.length &&
        endpoint.includes('/tickets/paged')
      ) {
        return returnData;
      }
    } while (
      apiResponse.data?.hasMore ||
      (apiResponse.data ? apiResponse.data['has-more'] : undefined) ||
      apiResponse.data?.paging
    );
    return returnData;
  };
}
