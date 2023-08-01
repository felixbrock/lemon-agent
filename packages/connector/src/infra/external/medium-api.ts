import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiResponse, BaseExternalApi } from './base-external-api';

export class MediumApi extends BaseExternalApi {

  apiRequest = async (
      method: string,
      endpoint: string,
      authToken: string,
      data?: Record<string, unknown> | Array<Record<string, unknown>>,
      query?: Record<string, string | string[]>
    ): Promise<ApiResponse> => {
    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Charset': 'utf-8',
        Authorization: `Bearer ${authToken}`
      };

      const config: AxiosRequestConfig = {
        baseURL: 'https://api.medium.com/v1',
        method,
        url: endpoint,
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