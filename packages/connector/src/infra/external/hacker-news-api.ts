/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import axios, { type AxiosRequestConfig } from 'axios';
import {
  type ApiResponseData,
  BaseExternalApi,
  type ApiResponse,
} from './base-external-api';

interface ReqConfig {
  json?: boolean;
  contentType?: string;
}

export class HackernewsApi extends BaseExternalApi {
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
        baseURL: 'http://hn.algolia.com/api/v1',
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
    authToken?: string;
    data?: Record<string, unknown>;
    query?: Record<string, string | string[]>;
  }): Promise<any> => {
    if (!props.data) throw new Error('No data provided');

    props.data.hitsPerPage = 100;

    const returnData: Array<Record<string, unknown>> = [];

    let responseData: ApiResponseData | undefined;
    let itemsReceived = 0;

    do {
      responseData = (
        await this.apiRequest(
          props.method,
          props.endpoint,
          undefined,
          props.data
        )
      ).data;
      if (!responseData) throw new Error('No data returned');
      returnData.push.apply(
        returnData,
        responseData.hits as Array<Record<string, unknown>>
      );

      if (returnData) {
        itemsReceived += returnData.length;
      }
    } while (!responseData || responseData.nbHits > itemsReceived);

    return returnData;
  };
}
