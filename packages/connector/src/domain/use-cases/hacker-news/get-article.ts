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

export interface GetArticleHackerNewsReq {
  params: {
    articleId: string;
    additionalFields: { includeComments: boolean };
  };
}

export type GetArticleHackerNewsRes = Result<Record<string, any> | undefined>;

export class GetArticleHackerNews
  implements
    IUseCase<GetArticleHackerNewsReq, GetArticleHackerNewsRes, undefined>
{
  #api: IExternalApi;

  constructor(hackernewsApi: IExternalApi) {
    this.#api = hackernewsApi;
  }

  async execute(props: {
    req: GetArticleHackerNewsReq;
  }): Promise<GetArticleHackerNewsRes> {
    const { req } = props;

    const endpoint = `items/${req.params.articleId}`;

    let apiResponse: ApiResponse;
    try {
      apiResponse = await this.#api.apiRequest('GET', endpoint);
    } catch (error: unknown) {
      if (isApiErrorResponse(error)) {
        if (isRichApiErrorResponse(error))
          console.error(error.response.data.error.message);
        console.error(error.stack);
      } else if (error) console.trace(error);
      throw new Error('Unknown error at GetArticleHackerNews');
    }

    if (apiResponse.status !== 200) {
      return Result.fail(
        `request failed with status code ${apiResponse.status} and message ${apiResponse.statusText} `
      );
    }

    const article = apiResponse.data;

    if (!article) return Result.ok(undefined);

    if (!req.params.additionalFields.includeComments) {
      delete article.children;
    }

    return Result.ok(article);
  }
}
