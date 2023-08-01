import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import { type DiscordAuthType, type ToolType } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';
import {
  type ApiResponseData,
  type IExternalApi,
} from '../../services/i-external-api';

interface DiscordOperationParams {
  toolType: ToolType;
  messageSendParamTypes: {
    text: string;
  };
}

export interface ExecuteDiscordOperationAuth {
  token: string;
  type: DiscordAuthType;
}

export interface ExecuteDiscordOperationReq {
  params: DiscordOperationParams;
}

export type ExecuteDiscordOperationRes = Result<
  Record<string, any> | undefined
>;

export class ExecuteDiscordOperation
  implements
    IUseCase<
      ExecuteDiscordOperationReq,
      ExecuteDiscordOperationRes,
      ExecuteDiscordOperationAuth
    >
{
  #params?: DiscordOperationParams;
  #auth?: ExecuteDiscordOperationAuth;
  #api: IExternalApi;

  constructor(discordApi: IExternalApi) {
    this.#api = discordApi;
  }

  async execute(props: {
    req: ExecuteDiscordOperationReq;
    auth: ExecuteDiscordOperationAuth;
  }): Promise<ExecuteDiscordOperationRes> {
    this.#params = props.req.params;
    this.#auth = props.auth;

    let returnData: ApiResponseData | undefined;

    try {
      if (this.#params.toolType === 'discord-message-send') {
        returnData = this.#execMessageSend();
      } else {
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

  #execMessageSend = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.messageSendParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { text } = this.#params.messageSendParamTypes;

    const body: Record<string, unknown> = {};
    body.content = text;

    if (!body.content) {
      throw new Error('Content must be set.');
    }

    const apiResponse = await this.#api.apiRequest(
      'POST',
      this.#auth.token,
      this.#auth.token,
      body
    );

    return apiResponse.data;
  };
}
