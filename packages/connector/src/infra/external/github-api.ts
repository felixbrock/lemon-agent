/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiResponse, BaseExternalApi } from './base-external-api';

export class GithubApi extends BaseExternalApi {
  apiRequest = async (
    method: string,
    endpoint: string,
    authToken: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
    query?: Record<string, string | string[]>
  ): Promise<ApiResponse> => {
    try {
      const headers: Record<string, string> = {
        'User-Agent': 'lemonagent',
        Authorization: `Bearer ${authToken}`,
      };

      if (query?.customAcceptHeader) {
        headers.Accept = query.customAcceptHeader as string;
      }

      const config: AxiosRequestConfig = {
        baseURL: 'https://api.github.com',
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

    query.per_page = '100';
    let page = query.page ? parseInt(query.page as string) : 1;

    let apiResponse: ApiResponse;
    do {
      query.page = page.toString();
      apiResponse = await this.apiRequest(
        method,
        endpoint,
        authToken,
        data,
        query
      );
      page++;
      returnData.push(apiResponse.data as Record<string, unknown>);
    } while (!apiResponse || apiResponse.headers.link?.includes('next'));
    return returnData;
  };
}
