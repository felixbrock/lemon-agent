import {
  type ApiResponse,
  type ApiResponseData,
  type IExternalApi,
} from '../../services/i-external-api';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import { type MediumAuthType, type ToolType } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';

interface MediumOperationParams {
  toolType: ToolType;
  postCreateParamTypes?: {
    publication?: boolean;
    publicationId?: number;
    title: string;
    contentFormat: 'html | markdown';
    content: string;
    additionalFields?: {
      canonicalUrl?: string;
      license?: 'all-rights-reserved | cc-40-by | cc-40-by-nc | cc-40-by-nc-nd | cc-40-by-nc-sa | cc-40-by-nd | cc-40-by-sa | cc-40-zero | public-domain';
      notifyFollowers?: boolean;
      publishStatus?: 'public | draft | unlisted';
      tags?: string;
    };
  };
  publicationGetAllParamTypes?: {
    returnAll?: boolean;
    limit?: number;
  };
}

export interface ExecuteMediumOperationAuth {
  token: string;
  type: MediumAuthType;
}

export interface ExecuteMediumOperationReq {
  params: MediumOperationParams;
}

export type ExecuteMediumOperationRes = Result<Record<string, any> | undefined>;

export class ExecuteMediumOperation
  implements
    IUseCase<
      ExecuteMediumOperationReq,
      ExecuteMediumOperationRes,
      ExecuteMediumOperationAuth
    >
{
  #params?: MediumOperationParams;
  #auth?: ExecuteMediumOperationAuth;
  #api: IExternalApi;

  constructor(mediumApi: IExternalApi) {
    this.#api = mediumApi;
  }

  async execute(props: {
    req: ExecuteMediumOperationReq;
    auth: ExecuteMediumOperationAuth;
  }): Promise<ExecuteMediumOperationRes> {
    this.#params = props.req.params;
    this.#auth = props.auth;

    let returnData: ApiResponseData | undefined;

    try {
      switch (this.#params.toolType) {
        case 'medium-post-create':
          returnData = await this.#execPostCreate();
          break;
        case 'medium-publication-get-all':
          returnData = await this.#execPublicationGetAll();
          break;
        default:
          throw new Error(
            `The operation ${props.req.params.toolType} is not known!`
          );
      }
    } catch (error) {
      if (isApiErrorResponse(error)) {
        if (isRichApiErrorResponse(error))
          console.error(error.response.data.error.message);
        console.error(error.stack);
      } else if (error) console.trace(error);
      throw new Error(`Unknown error at ${this.constructor.name}`);
    }

    return Result.ok(returnData);
  }

  #execPostCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.postCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const {
      publication,
      publicationId,
      title,
      content,
      contentFormat,
      additionalFields,
    } = this.#params.postCreateParamTypes;

    const bodyRequest: Record<string, unknown> = {
      tags: [],
      title,
      contentFormat,
      content,
    };

    let apiResponse: ApiResponse;

    if (additionalFields?.tags) {
      const tags = additionalFields.tags;
      bodyRequest.tags = tags.split(',').map((name) => {
        const returnValue = name.trim();
        if (returnValue.length > 25) {
          throw new Error(
            `The tag "${returnValue}" is to long. Maximum lenght of a tag is 25 characters.`
          );
        }
        return returnValue;
      });

      if ((bodyRequest.tags as string[]).length > 5) {
        throw new Error('Too many tags got used. Maximum 5 can be set.');
      }
    }

    if (additionalFields?.canonicalUrl) {
      bodyRequest.canonicalUrl = additionalFields.canonicalUrl;
    }
    if (additionalFields?.publishStatus) {
      bodyRequest.publishStatus = additionalFields.publishStatus as string;
    }
    if (additionalFields?.license) {
      bodyRequest.license = additionalFields.license as string;
    }
    if (additionalFields?.notifyFollowers) {
      bodyRequest.notifyFollowers = additionalFields.notifyFollowers.toString();
    }

    // if user wants to publish it under a specific publication
    if (publication) {
      apiResponse = await this.#api.apiRequest(
        'POST',
        `/publications/${publicationId as number}/posts`,
        this.#auth.token,
        bodyRequest
      );
    } else {
      const responseAuthorId = await this.#api.apiRequest(
        'GET',
        '/me',
        this.#auth.token,
        {}
      );

      const authorId = responseAuthorId.data?.data.id as string;
      apiResponse = await this.#api.apiRequest(
        'POST',
        `/users/${authorId}/posts`,
        this.#auth.token,
        bodyRequest
      );
    }

    const responseData = apiResponse.data?.data;
    return responseData;
  };

  #execPublicationGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.publicationGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, limit } = this.#params.publicationGetAllParamTypes;

    const user = await this.#api.apiRequest('GET', '/me', this.#auth.token);

    const userId = user.data?.data.id as string;

    const apiResponse = await this.#api.apiRequest(
      'GET',
      `/users/${userId}/publications`,
      this.#auth.token
    );

    let responseData = apiResponse.data?.data;

    if (!returnAll) {
      responseData = responseData?.splice(0, limit);
    }

    return responseData;
  };
}
