/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiResponse, BaseExternalApi } from './base-external-api';

export class NotionApi extends BaseExternalApi {
  apiRequest = async (
    method: string,
    endpoint: string,
    authToken: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
    query?: Record<string, string | string[]>
  ): Promise<ApiResponse> => {
    try {
      const headers: Record<string, string> = {
        'Notion-Version': apiVersion[2],
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      };

      const config: AxiosRequestConfig = {
        baseURL: 'https://api.notion.com/v1',
        method,
        url: endpoint,
        data,
        headers,
        params: query ? new URLSearchParams(query) : undefined,
      };

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
    const { method, endpoint, authToken } = props;
    const query = props.query ?? {};
    const data = props.data ?? {};

    const returnData: Array<Record<string, unknown>> = [];

    let apiResponse: ApiResponse;
    const resource = endpoint.replace("/", "");

    do {
      apiResponse = await this.apiRequest(
        method, 
        endpoint,
        authToken, 
        data, 
        query
      );

      if (apiResponse.data) {
        const { next_cursor: nextCursor } = apiResponse.data;
        if (resource === 'block' || resource === 'user') {
          query.start_cursor = nextCursor;
        } else {
          data.start_cursor = nextCursor;
        }
        returnData.push(apiResponse.data);
        const limit = parseInt(query.limit as string);
        if (limit && limit <= returnData.length) {
          return returnData;
        }
      }
    } while (apiResponse.data?.has_more !== false);

    return returnData;
  };
}

const apiVersion: Record<number, string> = {
  1: '2021-05-13',
  2: '2021-08-16',
};
