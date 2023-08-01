import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiResponse, BaseExternalApi, type ApiResponseData } from './base-external-api';
import { getValueByPath } from '../../domain/use-cases/execute-monday-operation';

export class MondayApi extends BaseExternalApi {

  apiRequest = async (
      method: string,
      endpoint: string,
      authToken: string,
      data?: Record<string, unknown> | Array<Record<string, unknown>>,
      query?: Record<string, string | string[]>
    ): Promise<ApiResponse> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      };

      const config: AxiosRequestConfig = {
        baseURL: 'https://api.monday.com/v2/',
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
    data?: Record<string, any>;
    query?: Record<string, string>;
  }): Promise<any> => {
    const { 
        method, 
        endpoint, 
        authToken,
    } = props;

    const data = props.data ?? {};
    const query = props.query ?? {};

	const returnData: Array<Record<string, unknown>> = [];

	let responseData: ApiResponseData | undefined;
	data.variables.limit = 50;
	data.variables.page = 1;

	do {
		responseData = await this.apiRequest(method, endpoint, authToken, data, query);
		returnData.push(getValueByPath(responseData.data.data, query.propertyName));
		data.variables.page++;
	} while (getValueByPath(responseData.data.data, query.propertyName).length > 0);

    return returnData;
  };
}