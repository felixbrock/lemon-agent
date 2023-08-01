/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import {
  type IExternalApi,
  type ApiResponse,
} from '../../../services/i-external-api';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../../services/identify-error-response';
import { Result } from 'shared';
import type IUseCase from '../i-use-case';

export interface GetUserHackerNewsReq {
  params: {
    username: string;
  };
}

export type GetUserHackerNewsRes = Result<Record<string, unknown>>;

export class GetUserHackerNews
  implements IUseCase<GetUserHackerNewsReq, GetUserHackerNewsRes, undefined>
{
  #api: IExternalApi;

  constructor(hackernewsApi: IExternalApi) {
    this.#api = hackernewsApi;
  }

  async execute(props: {
    req: GetUserHackerNewsReq;
  }): Promise<GetUserHackerNewsRes> {
    const { req } = props;

    const endpoint = `users/${req.params.username}`;

    let responseData: ApiResponse;
    try {
      responseData = await this.#api.apiRequest('GET', endpoint);
    } catch (error: unknown) {
      if (isApiErrorResponse(error)) {
        if (isRichApiErrorResponse(error))
          console.error(error.response.data.error.message);
        console.error(error.stack);
      } else if (error) console.trace(error);
      throw new Error('Unknown error at GetUserHackerNews');
    }

    if (responseData.status !== 200) {
      return Result.fail(
        `request failed with status code ${responseData.status} and message ${responseData.statusText} `
      );
    }

    const data = responseData.data;

    return Result.ok(data);
  }
}
