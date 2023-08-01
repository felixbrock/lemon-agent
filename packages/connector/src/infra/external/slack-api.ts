/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import axios, { type AxiosRequestConfig } from 'axios';
import { type SlackToolProps } from '../../domain/use-cases/execute-slack-operation';
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

export class SlackApi extends BaseExternalApi<SlackToolProps> {
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
        baseURL: 'https://slack.com/api',
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
    toolProps: SlackToolProps;
  }): Promise<any> => {
    const { method, endpoint, authToken, data, toolProps } = props;

    const query = props.query ?? {};

    const returnData: Array<Record<string, unknown>> = [];
    let responseData;
    let page = 1;
    // if the endpoint uses legacy pagination use count
    // https://api.slack.com/docs/pagination#classic
    if (endpoint.includes('files.list')) {
      query.count = '100';
    } else {
      query.limit = '100';
    }
    do {
      query.page = page.toString();
      responseData = await this.apiRequest(
        method,
        endpoint,
        authToken,
        data,
        query
      );
      if (!responseData.data) throw new Error('No data returned from Slack');
      query.cursor = responseData.data.response_metadata.next_cursor;
      page++;
      returnData.push.apply(
        returnData,
        responseData.data[toolProps.propertyName].matches ??
          responseData.data[toolProps.propertyName]
      );
    } while (
      (responseData.data.response_metadata?.next_cursor !== undefined &&
        responseData.data.response_metadata.next_cursor !== '' &&
        responseData.data.response_metadata.next_cursor !== null) ||
      (responseData.data.paging?.pages !== undefined &&
        responseData.data.paging.page !== undefined &&
        responseData.data.paging.page < responseData.data.paging.pages) ||
      (responseData.data[toolProps.propertyName].paging?.pages !== undefined &&
        responseData.data[toolProps.propertyName].paging.page !== undefined &&
        responseData.data[toolProps.propertyName].paging.page <
          responseData.data[toolProps.propertyName].paging.pages)
    );
    return returnData;
  };
}
