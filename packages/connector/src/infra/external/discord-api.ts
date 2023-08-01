import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiResponse, BaseExternalApi } from './base-external-api';

export class DiscordApi extends BaseExternalApi {
  apiRequest = async (
    method: string,
    endpoint: string,
    authToken: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
    query?: Record<string, string | string[]>,
  ): Promise<ApiResponse> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'multipart/form-data; charset-utf-8',
      };

      const config: AxiosRequestConfig = {
        baseURL: endpoint,
        method,
        data,
        headers,
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
    const { method, endpoint, authToken, data, query } 
      = props;

    const response = await this.apiRequest(
      method, endpoint, authToken, data, query
    );

    return response;
  };
}