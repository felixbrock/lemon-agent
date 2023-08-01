/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiResponse, BaseExternalApi } from './base-external-api';

interface IAttachment {
  url: string;
  filename: string;
  type: string;
}

export interface IRecord {
  fields: Record<string, string | IAttachment[]>;
}

interface ReqConfig {
  json?: boolean;
  contentType?: string;
}

export class AirtableApi extends BaseExternalApi {
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
        baseURL: 'https://api.airtable.com/v0/',
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
  }): Promise<any> => {
    const { method, endpoint, authToken, data } = props;

    const query = props.query ?? {};
    query.pageSize = '100';

    const returnData: Array<Record<string, unknown>> = [];

    let responseData;

    do {
      responseData = (
        await this.apiRequest(method, endpoint, authToken, data, query)
      ).data;

      if (!responseData) continue;

      returnData.push.apply(returnData, responseData.records);
      query.offset = responseData.offset;
    } while (!responseData || responseData.offset !== undefined);

    return {
      records: returnData,
    };
  };
}
