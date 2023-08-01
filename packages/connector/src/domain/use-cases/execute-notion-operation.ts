/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import { type NotionAuthType, type ToolType } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';
import {
  type ApiResponseData,
  type IExternalApi,
} from '../../services/i-external-api';
import { validate as uuidValidate } from 'uuid';
import { camelCase, snakeCase } from 'change-case';

interface NotionOperationParams {
  toolType: ToolType;
  blockAppendParamTypes?: {
    blockId: string;
    blockUi?: {
      blockValues?: {
        type?: string;
        richText?: boolean;
        textContent?: string;
        text?: {
          text?: {
            textType?: 'equation' | 'mention' | 'text';
            text?: string;
            isLink?: boolean;
            textLink?: string;
            mentionType?: 'database' | 'date' | 'page' | 'user';
            user?: string;
            page?: string;
            database: string;
            range?: boolean;
            date?: string;
            dateStart?: string;
            dateEnd?: string;
            expression?: string;
            annotationUi?: {
              bold?: boolean;
              italic?: boolean;
              strikethrough?: boolean;
              underline?: boolean;
              code?: boolean;
              color?:
                | 'default'
                | 'gray'
                | 'brown'
                | 'orange'
                | 'yellow'
                | 'green'
                | 'blue'
                | 'purple'
                | 'pink'
                | 'red'
                | 'gray_background'
                | 'brown_background'
                | 'orange_background'
                | 'yellow_background'
                | 'green_background'
                | 'blue_background'
                | 'purple_background'
                | 'pink_background'
                | 'red_background';
            };
          };
        };
        checked?: boolean;
        title?: string;
        url?: string;
      };
    };
  };
  blockGetAllParamTypes?: {
    blockId: string;
    returnAll?: boolean;
    limit?: number;
  };
  databaseGetParamTypes?: {
    databaseId: string;
    simple?: boolean;
  };
  databaseGetAllParamTypes?: {
    returnAll?: boolean;
    limit?: number;
    simple?: boolean;
  };
  databaseSearchParamTypes?: {
    text?: string;
    returnAll?: boolean;
    limit?: number;
    simple?: boolean;
    options?: {
      sort?: {
        sortValue?: {
          direction?: 'ascending' | 'descending';
          timestamp?: 'last_edited_time';
        };
      };
    };
  };
  databasePageCreateParamTypes?: {
    databaseId: string;
    title?: string;
    simple?: boolean;
    propertiesUi?: {
      propertyValues?: {
        key?: string;
        type?: boolean;
        title?: string;
        richText?: boolean;
        textContent?: string;
        text?: {
          text?: {
            textType?: 'equation' | 'mention' | 'text';
            text?: string;
            isLink?: boolean;
            textLink?: string;
            mentionType?: 'database' | 'date' | 'page' | 'user';
            user?: string;
            page?: string;
            database: string;
            range?: boolean;
            date?: string;
            dateStart?: string;
            dateEnd?: string;
            expression?: string;
            annotationUi?: {
              bold?: boolean;
              italic?: boolean;
              strikethrough?: boolean;
              underline?: boolean;
              code?: boolean;
              color?:
                | 'default'
                | 'gray'
                | 'brown'
                | 'orange'
                | 'yellow'
                | 'green'
                | 'blue'
                | 'purple'
                | 'pink'
                | 'red'
                | 'gray_background'
                | 'brown_background'
                | 'orange_background'
                | 'yellow_background'
                | 'green_background'
                | 'blue_background'
                | 'purple_background'
                | 'pink_background'
                | 'red_background';
            };
          };
        };
        phoneValue?: string;
        multiSelectValue?: string[];
        selectValue?: string;
        statusValue?: string;
        emailValue?: string;
        ignoreIfEmpty?: boolean;
        urlValue?: string;
        peopleValue?: string[];
        relationValue?: string;
        checkboxValue?: boolean;
        numberValue?: number;
        range?: boolean;
        includeTime?: boolean;
        date?: string;
        dateStart?: string;
        dateEnd?: string;
        timezone?: string;
        fileUrls?: {
          fileUrl?: {
            name?: string;
            url?: string;
          };
        };
      };
    };
    blockUi?: {
      blockValues?: {
        type?: string;
        richText?: boolean;
        textContent?: string;
        text?: {
          text?: {
            textType?: 'equation' | 'mention' | 'text';
            text?: string;
            isLink?: boolean;
            textLink?: string;
            mentionType?: 'database' | 'date' | 'page' | 'user';
            user?: string;
            page?: string;
            database: string;
            range?: boolean;
            date?: string;
            dateStart?: string;
            dateEnd?: string;
            expression?: string;
            annotationUi?: {
              bold?: boolean;
              italic?: boolean;
              strikethrough?: boolean;
              underline?: boolean;
              code?: boolean;
              color?:
                | 'default'
                | 'gray'
                | 'brown'
                | 'orange'
                | 'yellow'
                | 'green'
                | 'blue'
                | 'purple'
                | 'pink'
                | 'red'
                | 'gray_background'
                | 'brown_background'
                | 'orange_background'
                | 'yellow_background'
                | 'green_background'
                | 'blue_background'
                | 'purple_background'
                | 'pink_background'
                | 'red_background';
            };
          };
        };
        checked?: boolean;
        title?: string;
        url?: string;
      };
    };
    options?: {
      iconType?: 'emoji' | 'file';
      icon?: string;
    };
  };
  databasePageUpdateParamTypes?: {
    pageId: string;
    simple?: boolean;
    options?: {
      iconType?: 'emoji' | 'file';
      icon?: string;
    };
    propertiesUi?: {
      propertyValues?: {
        key?: string;
        type?: boolean;
        title?: string;
        richText?: boolean;
        textContent?: string;
        text?: {
          text?: {
            textType?: 'equation' | 'mention' | 'text';
            text?: string;
            isLink?: boolean;
            textLink?: string;
            mentionType?: 'database' | 'date' | 'page' | 'user';
            user?: string;
            page?: string;
            database: string;
            range?: boolean;
            date?: string;
            dateStart?: string;
            dateEnd?: string;
            expression?: string;
            annotationUi?: {
              bold?: boolean;
              italic?: boolean;
              strikethrough?: boolean;
              underline?: boolean;
              code?: boolean;
              color?:
                | 'default'
                | 'gray'
                | 'brown'
                | 'orange'
                | 'yellow'
                | 'green'
                | 'blue'
                | 'purple'
                | 'pink'
                | 'red'
                | 'gray_background'
                | 'brown_background'
                | 'orange_background'
                | 'yellow_background'
                | 'green_background'
                | 'blue_background'
                | 'purple_background'
                | 'pink_background'
                | 'red_background';
            };
          };
        };
        phoneValue?: string;
        multiSelectValue?: string[];
        selectValue?: string;
        statusValue?: string;
        emailValue?: string;
        ignoreIfEmpty?: boolean;
        urlValue?: string;
        peopleValue?: string[];
        relationValue?: string;
        checkboxValue?: boolean;
        numberValue?: number;
        range?: boolean;
        includeTime?: boolean;
        date?: string;
        dateStart?: string;
        dateEnd?: string;
        timezone?: string;
        fileUrls?: {
          fileUrl?: {
            name?: string;
            url?: string;
          };
        };
      };
    };
  };
  databasePageGetParamTypes?: {
    pageId: string;
    simple?: boolean;
  };
  databasePageGetAllParamTypes?: {
    databaseId: string;
    returnAll?: boolean;
    limit?: number;
    simple?: boolean;
    filterType?: 'none' | 'manual' | 'json';
    matchType?: 'anyFilter' | 'allFilters';
    filters?: {
      conditions?: {
        key?: string;
        type?: boolean;
        condition?:
          | 'equals'
          | 'before'
          | 'after'
          | 'on_or_before'
          | 'is_empty'
          | 'is_not_empty'
          | 'on_or_after'
          | 'past_week'
          | 'past_month'
          | 'past_year'
          | 'next_week'
          | 'next_month'
          | 'next_year';
        returnType?: 'text' | 'checkbox' | 'number' | 'date';
        titleValue?: string;
        richTextValue?: string;
        phoneNumberValue?: string;
        multiSelectValue?: string;
        selectValue?: string;
        statusValue?: string;
        emailValue?: string;
        urlValue?: string;
        peopleValue?: string;
        createdByValue?: string;
        lastEditedByValue?: string;
        relationValue?: string;
        checkboxValue?: boolean;
        numberValue?: number;
        date?: string;
        createdTimeValue?: string;
        lastEditedTime?: string;
        textValue?: string;
        dateValue?: string;
      };
    };
    jsonNotice?: string;
    filterJson?: string;
    options?: {
      downloadFiles?: boolean;
      filter?: {
        singleCondition?: {
          key?: string;
          type?: boolean;
          condition?:
            | 'equals'
            | 'before'
            | 'after'
            | 'on_or_before'
            | 'is_empty'
            | 'is_not_empty'
            | 'on_or_after'
            | 'past_week'
            | 'past_month'
            | 'past_year'
            | 'next_week'
            | 'next_month'
            | 'next_year';
          returnType?: 'text' | 'checkbox' | 'number' | 'date';
          titleValue?: string;
          richTextValue?: string;
          phoneNumberValue?: string;
          multiSelectValue?: string;
          selectValue?: string;
          statusValue?: string;
          emailValue?: string;
          urlValue?: string;
          peopleValue?: string;
          createdByValue?: string;
          lastEditedByValue?: string;
          relationValue?: string;
          checkboxValue?: boolean;
          numberValue?: number;
          date?: string;
          createdTimeValue?: string;
          lastEditedTime?: string;
          textValue?: string;
          dateValue?: string;
        };
        multipleCondition?: {
          condition?: {
            or?: {
              key?: string;
              type?: boolean;
              condition?:
                | 'equals'
                | 'before'
                | 'after'
                | 'on_or_before'
                | 'is_empty'
                | 'is_not_empty'
                | 'on_or_after'
                | 'past_week'
                | 'past_month'
                | 'past_year'
                | 'next_week'
                | 'next_month'
                | 'next_year';
              returnType?: 'text' | 'checkbox' | 'number' | 'date';
              titleValue?: string;
              richTextValue?: string;
              phoneNumberValue?: string;
              multiSelectValue?: string;
              selectValue?: string;
              statusValue?: string;
              emailValue?: string;
              urlValue?: string;
              peopleValue?: string;
              createdByValue?: string;
              lastEditedByValue?: string;
              relationValue?: string;
              checkboxValue?: boolean;
              numberValue?: number;
              date?: string;
              createdTimeValue?: string;
              lastEditedTime?: string;
              textValue?: string;
              dateValue?: string;
            };
            and?: {
              key?: string;
              type?: boolean;
              condition?:
                | 'equals'
                | 'before'
                | 'after'
                | 'on_or_before'
                | 'is_empty'
                | 'is_not_empty'
                | 'on_or_after'
                | 'past_week'
                | 'past_month'
                | 'past_year'
                | 'next_week'
                | 'next_month'
                | 'next_year';
              returnType?: 'text' | 'checkbox' | 'number' | 'date';
              titleValue?: string;
              richTextValue?: string;
              phoneNumberValue?: string;
              multiSelectValue?: string;
              selectValue?: string;
              statusValue?: string;
              emailValue?: string;
              urlValue?: string;
              peopleValue?: string;
              createdByValue?: string;
              lastEditedByValue?: string;
              relationValue?: string;
              checkboxValue?: boolean;
              numberValue?: number;
              date?: string;
              createdTimeValue?: string;
              lastEditedTime?: string;
              textValue?: string;
              dateValue?: string;
            };
          };
        };
      };
      sort?: {
        sortValue?: {
          timestamp?: boolean;
          key?: 'created_time' | 'last_edited_time';
          type?: boolean;
          direction?: 'ascending' | 'descending';
        };
      };
    };
  };
  pageArchiveParamTypes?: {
    pageId: string;
    simple?: boolean;
  };
  pageCreateParamTypes?: {
    pageId: string;
    title: string;
    simple?: boolean;
    blockUi?: {
      blockValues?: {
        type?: string;
        richText?: boolean;
        textContent?: string;
        text?: {
          text?: {
            textType?: 'equation' | 'mention' | 'text';
            text?: string;
            isLink?: boolean;
            textLink?: string;
            mentionType?: 'database' | 'date' | 'page' | 'user';
            user?: string;
            page?: string;
            database: string;
            range?: boolean;
            date?: string;
            dateStart?: string;
            dateEnd?: string;
            expression?: string;
            annotationUi?: {
              bold?: boolean;
              italic?: boolean;
              strikethrough?: boolean;
              underline?: boolean;
              code?: boolean;
              color?:
                | 'default'
                | 'gray'
                | 'brown'
                | 'orange'
                | 'yellow'
                | 'green'
                | 'blue'
                | 'purple'
                | 'pink'
                | 'red'
                | 'gray_background'
                | 'brown_background'
                | 'orange_background'
                | 'yellow_background'
                | 'green_background'
                | 'blue_background'
                | 'purple_background'
                | 'pink_background'
                | 'red_background';
            };
          };
        };
        checked?: boolean;
        title?: string;
        url?: string;
      };
    };
    options?: {
      iconType?: 'emoji' | 'file';
      icon?: string;
    };
  };
  pageGetParamTypes?: {
    pageId: string;
    simple?: boolean;
  };
  pageSearchParamTypes?: {
    text?: string;
    returnAll?: boolean;
    limit?: number;
    simple?: boolean;
    options?: {
      filter?: {
        filters?: {
          property?: object;
          value?: 'database' | 'page';
        };
      };
      sort?: {
        sortValue?: {
          direction?: 'ascending' | 'descending';
          timestamp?: string;
        };
      };
    };
  };
  userGetParamTypes?: {
    userId: string;
  };
  userGetAllParamTypes?: {
    returnAll?: boolean;
    limit?: number;
  };
}

interface SortData {
  key: string;
  type: string;
  direction: string;
  timestamp: boolean;
}

interface FileRecord {
  properties: Record<string, any>;
}

interface TextData {
  textType: string;
  text: string;
  isLink: boolean;
  range: boolean;
  textLink: string;
  mentionType: string;
  dateStart: string;
  dateEnd: string;
  date: string;
  annotationUi: Record<string, unknown>;
  expression: string;
}

export interface ExecuteNotionOperationAuth {
  token: string;
  type: NotionAuthType;
}

export interface ExecuteNotionOperationReq {
  params: NotionOperationParams;
}

export type ExecuteNotionOperationRes = Result<Record<string, any> | undefined>;

export class ExecuteNotionOperation
  implements
    IUseCase<
      ExecuteNotionOperationReq,
      ExecuteNotionOperationRes,
      ExecuteNotionOperationAuth
    >
{
  #params?: NotionOperationParams;
  #auth?: ExecuteNotionOperationAuth;
  #api: IExternalApi;

  constructor(notionApi: IExternalApi) {
    this.#api = notionApi;
  }

  async execute(props: {
    req: ExecuteNotionOperationReq;
    auth: ExecuteNotionOperationAuth;
  }): Promise<ExecuteNotionOperationRes> {
    this.#params = props.req.params;
    this.#auth = props.auth;

    let returnData: ApiResponseData | undefined;

    try {
      switch (this.#params.toolType) {
        case 'notion-append-after-block':
          returnData = await this.#execBlockAppend();
          break;
        case 'notion-get-child-blocks':
          returnData = await this.#execBlockGetAll();
          break;
        case 'notion-get-database':
          returnData = await this.#execDatabaseGet();
          break;
        case 'notion-get-many-database':
          returnData = await this.#execDatabaseGetAll();
          break;
        case 'notion-search-database':
          returnData = await this.#execDatabaseSearch();
          break;
        case 'notion-create-database-page':
          returnData = await this.#execDatabasePageCreate();
          break;
        case 'notion-get-database-page':
          returnData = await this.#execDatabasePageGet();
          break;
        case 'notion-get-many-database-page':
          returnData = await this.#execDatabasePageGetAll();
          break;
        case 'notion-update-database-page':
          returnData = await this.#execDatabasePageUpdate();
          break;
        case 'notion-archive-page':
          returnData = await this.#execPageArchive();
          break;
        case 'notion-create-page':
          returnData = await this.#execPageCreate();
          break;
        case 'notion-search-page':
          returnData = await this.#execPageSearch();
          break;
        case 'notion-get-user':
          returnData = await this.#execUserGet();
          break;
        case 'notion-get-many-user':
          returnData = await this.#execUserGetAll();
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

  #execBlockAppend = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.blockAppendParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { blockId, blockUi } = this.#params.blockAppendParamTypes;

    const pageId = this.#extractPageId(blockId);

    let body: Record<string, unknown> = {};

    if (blockUi?.blockValues) {
      this.#extractDatabaseMentionRLC(blockUi.blockValues);
      body = {
        children: this.#formatBlocks(blockUi.blockValues),
      };
    }

    const apiResponse = await this.#api.apiRequest(
      'PATCH',
      `/blocks/${pageId}/children`,
      this.#auth.token,
      body
    );

    return apiResponse.data;
  };

  #execBlockGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.blockGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { blockId, returnAll, limit } = this.#params.blockGetAllParamTypes;

    const extractedBlockId = this.#extractPageId(blockId);

    let apiResponse;
    let responseData;
    const query: Record<string, string | string[]> = {};

    if (returnAll) {
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: `/blocks/${extractedBlockId}/children`,
        authToken: this.#auth.token,
        data: {},
      });

      const flattenedResponseList: any = [];
      apiResponse.forEach((p: any) => {
        p.results.forEach((e: any) => flattenedResponseList.push(e));
      });

      responseData = flattenedResponseList;
    } else {
      if (limit) query.page_size = limit.toString();
      apiResponse = await this.#api.apiRequest(
        'GET',
        `/blocks/${blockId}/children`,
        this.#auth.token,
        {},
        query
      );

      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execDatabaseGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databaseGetParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { databaseId, simple } = this.#params.databaseGetParamTypes;

    const extractedDatabaseId = this.#extractDatabaseId(databaseId);

    const apiResponse = await this.#api.apiRequest(
      'GET',
      `/databases/${extractedDatabaseId}`,
      this.#auth.token
    );
    let responseData: ApiResponseData | undefined;

    if (simple) {
      responseData = this.#simplifyObjects(apiResponse.data)[0];
    } else {
      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execDatabaseGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databaseGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { simple, returnAll, limit } = this.#params.databaseGetAllParamTypes;

    const body: Record<string, any> = {
      filter: { property: 'object', value: 'database' },
    };

    let apiResponse;
    let responseData: ApiResponseData | undefined;

    if (returnAll) {
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '/search',
        authToken: this.#auth.token,
        data: body,
      });

      if (simple) {
        const flattenedResponseList: any = [];
        apiResponse.forEach((p: any) => {
          p.results.forEach((e: any) => flattenedResponseList.push(e));
        });

        responseData = this.#simplifyObjects(flattenedResponseList);
      }
    } else {
      body.page_size = limit;
      apiResponse = await this.#api.apiRequest(
        'POST',
        '/search',
        this.#auth.token,
        body
      );

      if (simple) {
        responseData = this.#simplifyObjects(apiResponse.data);
      }
    }

    return responseData;
  };

  #execDatabaseSearch = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databaseSearchParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { text, returnAll, limit, simple, options } =
      this.#params.databaseSearchParamTypes;

    const body: Record<string, unknown> = {
      filter: {
        property: 'object',
        value: 'database',
      },
    };

    let apiResponse;
    let responseData;
    const query: Record<string, string | string[]> = {};
    const flattenedResponseList: any = [];

    if (text) {
      body.query = text;
    }
    if (options?.sort) {
      const sort = options.sort?.sortValue || {};
      body.sort = sort;
    }
    if (returnAll) {
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '/search',
        authToken: this.#auth.token,
        data: body,
      });

      apiResponse.forEach((p: any) => {
        p.results.forEach((e: any) => flattenedResponseList.push(e));
      });

      responseData = flattenedResponseList;
    } else {
      if (limit) query.limit = limit.toString();
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '/search',
        authToken: this.#auth.token,
        data: body,
      });

      apiResponse.forEach((p: any) => {
        p.results.forEach((e: any) => flattenedResponseList.push(e));
      });

      responseData = flattenedResponseList.splice(0, query.limit);
    }

    if (simple) {
      responseData = this.#simplifyObjects(responseData);
    }

    return responseData;
  };

  #execDatabasePageCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databasePageCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { databaseId, title, simple, propertiesUi, blockUi, options } =
      this.#params.databasePageCreateParamTypes;

    const { properties } = (
      await this.#api.apiRequest(
        'GET',
        `/databases/${databaseId}`,
        this.#auth.token
      )
    ).data as Record<string, any>;
    let titleKey = '';
    for (const key of Object.keys(properties)) {
      if (properties[key].type === 'title') {
        titleKey = key;
      }
    }

    const body: Record<string, any> = {
      parent: {},
      properties: {},
    };
    if (title !== '') {
      body.properties[titleKey] = {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      };
    }
    body.parent.database_id = databaseId;
    const propertiesValues = [propertiesUi?.propertyValues] as Array<
      Record<string, unknown>
    >;
    if (propertiesValues.length !== 0) {
      body.properties = Object.assign(
        body.properties,
        this.#mapProperties(propertiesValues, 2)
      );
    }

    if (blockUi?.blockValues) {
      this.#extractDatabaseMentionRLC(blockUi.blockValues);
      body.children = this.#formatBlocks(blockUi.blockValues);
    }

    if (options?.icon) {
      if (options.iconType && options.iconType === 'file') {
        body.icon = { external: { url: options.icon } };
      } else {
        body.icon = { emoji: options.icon };
      }
    }

    let responseData: ApiResponseData | undefined;

    const apiResponse = await this.#api.apiRequest(
      'POST',
      '/pages',
      this.#auth.token,
      body
    );

    if (simple) {
      responseData = this.#simplifyObjects(apiResponse.data);
    } else {
      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execDatabasePageGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databasePageGetParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { pageId, simple } = this.#params.databasePageGetParamTypes;

    const extractedPageId = this.#extractPageId(pageId);

    const apiResponse = await this.#api.apiRequest(
      'GET',
      `/pages/${extractedPageId}`,
      this.#auth.token
    );

    let responseData: ApiResponseData | undefined;

    if (simple) {
      responseData = this.#simplifyObjects(apiResponse.data);
    } else {
      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execDatabasePageGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databasePageGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const {
      databaseId,
      returnAll,
      limit,
      simple,
      filterType,
      matchType,
      filters,
      filterJson,
      options,
    } = this.#params.databasePageGetAllParamTypes;

    const download = options?.downloadFiles;
    const conditions = filters?.conditions;
    const sort = options?.sort?.sortValue;
    const body: Record<string, unknown> = {
      filter: {},
    };

    if (filterType === 'manual') {
      if (matchType === 'anyFilter' && body.filter && conditions) {
        Object.assign(body.filter, {
          or: this.#mapFilters([conditions]),
        });
      } else if (matchType === 'allFilters' && body.filter && conditions) {
        Object.assign(body.filter, {
          and: this.#mapFilters([conditions]),
        });
      }
    } else if (filterType === 'json') {
      if (this.#validateJSON(filterJson) !== undefined) {
        body.filter = filterJson;
      } else {
        throw new Error('Filters (JSON) must be a valid json');
      }
    }

    if (!Object.keys(body.filter as any).length) {
      delete body.filter;
    }
    if (sort) {
      body.sorts = this.#mapSorting(sort as SortData[]);
    }

    let apiResponse;
    let responseData;

    if (returnAll) {
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: `/databases/${databaseId}/query`,
        authToken: this.#auth.token,
        data: body,
        query: {},
      });

      const flattenedResponseList: any = [];
      apiResponse.forEach((p: any) => {
        p.results.forEach((e: any) => flattenedResponseList.push(e));
      });

      responseData = flattenedResponseList;

      if (simple) {
        responseData = this.#simplifyObjects(responseData, download);
      }
    } else {
      body.page_size = limit;
      apiResponse = await this.#api.apiRequest(
        'POST',
        `/databases/${databaseId}/query`,
        this.#auth.token,
        body,
        {}
      );
      responseData = apiResponse.data;

      if (simple) {
        responseData = this.#simplifyObjects(responseData, download);
      }
    }
    if (download) {
      responseData = await this.#downloadFiles(responseData as FileRecord[]);
    }

    return responseData;
  };

  #execDatabasePageUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.databasePageUpdateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { pageId, simple, propertiesUi, options } =
      this.#params.databasePageUpdateParamTypes;

    const extractedPageId = this.#extractPageId(pageId);
    const properties = [propertiesUi?.propertyValues] as Array<
      Record<string, unknown>
    >;

    const body: Record<string, unknown> = {
      properties: {},
    };
    if (properties && properties.length !== 0) {
      body.properties = this.#mapProperties(properties, 2);
    }

    if (options?.icon) {
      if (options.iconType && options.iconType === 'file') {
        body.icon = { type: 'external', external: { url: options.icon } };
      } else {
        body.icon = { type: 'emoji', emoji: options.icon };
      }
    }

    const apiResponse = await this.#api.apiRequest(
      'PATCH',
      `/pages/${extractedPageId}`,
      this.#auth.token,
      body
    );

    let responseData: ApiResponseData | undefined;
    if (simple) {
      responseData = this.#simplifyObjects(apiResponse.data, false);
    } else {
      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execUserGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGetParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { userId } = this.#params.userGetParamTypes;

    const apiResponse = await this.#api.apiRequest(
      'GET',
      `/users/${userId}`,
      this.#auth.token
    );

    const responseData = apiResponse.data;
    return responseData;
  };

  #execUserGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, limit } = this.#params.userGetAllParamTypes;

    let apiResponse;
    let responseData;

    if (returnAll) {
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: '/users',
        authToken: this.#auth.token,
      });

      responseData = apiResponse;
    } else {
      if (limit) {
        const query: Record<string, string | string[]> = {};
        query.limit = limit?.toString();
        apiResponse = await this.#api.apiRequestAllItems({
          method: 'GET',
          endpoint: '/users',
          authToken: this.#auth.token,
          query,
        });

        responseData = apiResponse.splice(0, query.limit);
      }
    }

    return responseData;
  };

  #execPageArchive = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.pageArchiveParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { pageId, simple } = this.#params.pageArchiveParamTypes;

    const extractedPageId = this.#extractPageId(pageId);

    const apiResponse = await this.#api.apiRequest(
      'PATCH',
      `/pages/${extractedPageId}`,
      this.#auth.token,
      { archived: true }
    );

    let responseData: ApiResponseData | undefined;
    if (simple) {
      responseData = this.#simplifyObjects(apiResponse);
    } else {
      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execPageCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.pageCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { pageId, title, simple, blockUi, options } =
      this.#params.pageCreateParamTypes;

    const body: Record<string, any> = {
      parent: {},
      properties: {},
    };
    body.parent.page_id = this.#extractPageId(pageId);
    body.properties = this.#formatTitle(title);
    const blockValues = blockUi?.blockValues;
    if (blockValues) {
      this.#extractDatabaseMentionRLC(blockValues);
      body.children = this.#formatBlocks(blockValues);
    }

    if (options?.icon) {
      if (options.iconType && options.iconType === 'file') {
        body.icon = { external: { url: options.icon } };
      } else {
        body.icon = { emoji: options.icon };
      }
    }

    const apiResponse = await this.#api.apiRequest(
      'POST',
      '/pages',
      this.#auth.token,
      body
    );

    let responseData: ApiResponseData | undefined;
    if (simple) {
      responseData = this.#simplifyObjects(apiResponse.data);
    } else {
      responseData = apiResponse.data;
    }

    return responseData;
  };

  #execPageSearch = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.pageSearchParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { text, returnAll, limit, simple, options } =
      this.#params.pageSearchParamTypes;

    const body: any = {};

    if (text) {
      body.query = text;
    }
    if (options?.filter) {
      const filter = [options.filter?.filters] || [];
      body.filter = filter;
    }
    if (options?.sort) {
      const sort = options.sort?.sortValue || {};
      body.sort = sort;
    }

    let apiResponse;
    let responseData;

    if (returnAll) {
      apiResponse = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '/search',
        authToken: this.#auth.token,
        data: body,
      });

      const flattenedResponseList: any = [];
      apiResponse.forEach((p: any) => {
        p.results.forEach((e: any) => flattenedResponseList.push(e));
      });

      responseData = flattenedResponseList;

      if (simple) {
        responseData = this.#simplifyObjects(responseData);
      }
    } else {
      if (limit) {
        const query: Record<string, string | string[]> = {};
        query.limit = limit?.toString();
        apiResponse = await this.#api.apiRequestAllItems({
          method: 'GET',
          endpoint: '/users',
          authToken: this.#auth.token,
          query,
        });

        const flattenedResponseList: any = [];
        apiResponse.forEach((p: any) => {
          p.results.forEach((e: any) => flattenedResponseList.push(e));
        });

        responseData = flattenedResponseList.splice(0, query.limit);

        if (simple) {
          responseData = this.#simplifyObjects(responseData);
        }
      }
    }

    return responseData;
  };

  // prettier-ignore
  #downloadFiles = async (records: FileRecord[]): Promise<Array<Record<string, unknown>>> => {
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const elements: Array<Record<string, unknown>> = [];
    for (const record of records) {
      const element: any = { json: {}, binary: {} };
      element.json = record;
      for (const key of Object.keys(record.properties)) {
        if (record.properties[key].type === 'files') {
          if (record.properties[key].files.length) {
            for (const [, file] of record.properties[key].files.entries()) {
              const body = {
                uri: file?.file?.url || file?.external?.url,
                json: false, 
                encoding: null
              }
              
              await this.#api.apiRequest(
                'GET',
                '',
                this.#auth.token,
                body,
                {}
              );
            }
          }
        }
      }
      if (Object.keys(element.binary).length === 0) {
        delete element.binary;
      }
      elements.push(element);
    }

    return elements;
  };

  #formatTitle(content: string): Record<string, unknown> {
    return {
      title: [this.#textContent(content)],
    };
  }

  #textContent(content: string): Record<string, unknown> {
    return {
      text: {
        content,
      },
    };
  }

  #formatText(content: string): Record<string, unknown> {
    return {
      text: [this.#textContent(content)],
    };
  }

  #getLink(text: {
    textLink: string;
    isLink: boolean;
  }): Record<string, unknown> {
    if (text.isLink && text.textLink !== '') {
      return {
        link: {
          url: text.textLink,
        },
      };
    }
    return {};
  }

  #getTexts(texts: TextData[]): Array<Record<string, unknown>> {
    const results = [];
    for (const text of texts) {
      if (text.textType === 'text') {
        results.push({
          type: 'text',
          text: {
            content: text.text,
            ...this.#getLink(text),
          },
          annotations: text.annotationUi,
        });
      } else if (text.textType === 'mention') {
        if (text.mentionType === 'date') {
          results.push({
            type: 'mention',
            mention: {
              type: text.mentionType,
              [text.mentionType]: text.range
                ? { start: text.dateStart, end: text.dateEnd }
                : { start: text.date, end: null },
            },
            annotations: text.annotationUi,
          });
        } else {
          results.push({
            type: 'mention',
            mention: {
              type: text.mentionType,
              // @ts-expect-error any
              [text.mentionType]: { id: text[text.mentionType] as string },
            },
            annotations: text.annotationUi,
          });
        }
      } else if (text.textType === 'equation') {
        results.push({
          type: 'equation',
          equation: {
            expression: text.expression,
          },
          annotations: text.annotationUi,
        });
      }
    }
    return results;
  }

  #getTextBlocks(block: Record<string, any>): Record<string, unknown> {
    if (block.text.text && !Array.isArray(block.text.text)) {
      block.text.text = [block.text.text];
    }

    return {
      text:
        block.richText === false
          ? this.#formatText(block.textContent as string).text
          : this.#getTexts((block.text.text as TextData[]) || []),
    };
  }

  #formatBlocks(
    block: Record<string, unknown>
  ): Array<Record<string, unknown>> {
    const results = [];
    results.push({
      object: 'block',
      type: block.type,
      [block.type as string]: {
        ...(block.type === 'to_do' ? { checked: block.checked } : {}),
        ...(block.type === 'image'
          ? { type: 'external', external: { url: block.url } }
          : {}),
        // prettier-ignore
        ...(!['to_do', 'image'].includes(block.type as string)
                ? this.#getTextBlocks(block)
                : {}),
      },
    });
    return results;
  }

  #uuidValidateWithoutDashes(value: string): boolean {
    if (uuidValidate(value)) return true;
    if (value.length === 32) {
      // prettier-ignore
      const strWithDashes = `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
      if (uuidValidate(strWithDashes)) return true;
    }
    throw new Error(
      `The relation id "${value}" is not a valid uuid with optional dashes.`
    );
  }

  #getPropertyKeyValue(
    value: any,
    type: string,
    version = 1
  ): Record<string, unknown> {
    const ignoreIfEmpty = <T>(v: T, cb: (v: T) => any): any =>
      !v && value.ignoreIfEmpty ? undefined : cb(v);
    let result: Record<string, unknown> = {};

    switch (type) {
      case 'rich_text':
        if (value.richText === false) {
          result = { rich_text: [{ text: { content: value.textContent } }] };
        } else {
          result = { rich_text: this.#getTexts(value.text.text as TextData[]) };
        }
        break;
      case 'title':
        result = { title: [{ text: { content: value.title } }] };
        break;
      case 'number':
        result = { type: 'number', number: value.numberValue };
        break;
      case 'url':
        result = ignoreIfEmpty(value.urlValue, (url) => ({ type: 'url', url }));
        break;
      case 'checkbox':
        result = { type: 'checkbox', checkbox: value.checkboxValue };
        break;
      case 'relation':
        result = {
          type: 'relation',
          relation: value.relationValue
            .filter((relation: string) => {
              return relation && typeof relation === 'string';
            })
            .reduce((acc: string[], cur: string) => {
              return acc.concat(
                cur.split(',').map((relation: string) => relation.trim())
              );
            }, [])
            .filter((relation: string) => {
              return this.#uuidValidateWithoutDashes(relation);
            })
            .map((relation: string) => ({ id: relation })),
        };
        break;
      case 'multi_select':
        result = {
          type: 'multi_select',
          multi_select: (Array.isArray(value.multiSelectValue)
            ? value.multiSelectValue
            : value.multiSelectValue.split(',').map((v: string) => v.trim())
          )
            .filter((entry: any) => entry !== null)
            .map((option: string) =>
              !uuidValidate(option) ? { name: option } : { id: option }
            ),
        };
        break;
      case 'email':
        result = {
          type: 'email',
          email: value.emailValue,
        };
        break;
      case 'people':
        if (!Array.isArray(value.peopleValue)) {
          value.peopleValue = [value.peopleValue];
        }

        result = {
          type: 'people',
          people: value.peopleValue.map((option: string) => ({ id: option })),
        };
        break;
      case 'phone_number':
        result = {
          type: 'phone_number',
          phone_number: value.phoneValue,
        };
        break;
      case 'select':
        result = {
          type: 'select',
          select:
            version === 1
              ? { id: value.selectValue }
              : { name: value.selectValue },
        };
        break;
      case 'status':
        result = {
          type: 'status',
          status: { name: value.statusValue },
        };
        break;
      case 'date':
        if (value.range === true) {
          result = {
            type: 'date',
            date: {
              start: new Date(value.dateStart).toISOString(),
              end: new Date(value.dateEnd).toISOString(),
            },
          };
        } else {
          result = {
            type: 'date',
            date: {
              start: new Date(value.date).toISOString(),
              end: null,
            },
          };
        }

        if (
          value.date === '' ||
          (value.dateStart === '' && value.dateEnd === '')
        ) {
          result.date = null;
        }

        break;
      case 'files':
        result = {
          type: 'files',
          files: value.fileUrls.fileUrl.map(
            (file: { name: string; url: string }) => ({
              name: file.name,
              type: 'external',
              external: { url: file.url },
            })
          ),
        };
        break;
      default:
    }
    return result;
  }

  #getNameAndType(key: string): any {
    const [name, type] = key.split('|');
    return {
      name,
      type,
    };
  }

  #mapProperties(
    properties: Array<Record<string, unknown>>,
    version = 1
  ): Record<string, unknown> {
    return properties
      .filter(
        (
          property
        ): property is Record<string, { key: string; [k: string]: any }> =>
          typeof property.key === 'string'
      )
      .map(
        (property) =>
          [
            property.key.split('|')[0],
            this.#getPropertyKeyValue(
              property,
              property.key.split('|')[1] as string,
              version
            ),
          ] as const
      )
      .filter(([, value]) => value)
      .reduce(
        (obj, [key, value]) =>
          Object.assign(obj, {
            [key]: value,
          }),
        {}
      );
  }

  #mapSorting(data: SortData[]): Array<Record<string, unknown>> {
    return data.map((sort) => {
      return {
        direction: sort.direction,
        [sort.timestamp ? 'timestamp' : 'property']: sort.key.split('|')[0],
      };
    });
  }

  #mapFilters(
    filtersList: Array<Record<string, unknown>>
  ): Record<string, unknown> {
    return filtersList.reduce((obj, value: Record<string, any>) => {
      let key = this.#getNameAndType(value.key as string).type;

      let valuePropertyName =
        key === 'last_edited_time'
          ? value[camelCase(key)]
          : value[`${camelCase(key)}Value`];

      if (['is_empty', 'is_not_empty'].includes(value.condition as string)) {
        valuePropertyName = true;
      } else if (
        [
          'past_week',
          'past_month',
          'past_year',
          'next_week',
          'next_month',
          'next_year',
        ].includes(value.condition as string)
      ) {
        valuePropertyName = {};
      }
      if (key === 'rich_text' || key === 'text') {
        key = 'text';
      } else if (key === 'phone_number') {
        key = 'phone';
      } else if (
        key === 'date' &&
        !['is_empty', 'is_not_empty'].includes(value.condition as string)
      ) {
        valuePropertyName = value.date === '' ? {} : new Date().toISOString();
      } else if (key === 'boolean') {
        key = 'checkbox';
      }

      if (value.type === 'formula') {
        const vpropertyName =
          value[`${camelCase(value.returnType as string)}Value`];

        return Object.assign(obj, {
          property: this.#getNameAndType(value.key as string).name,
          [key]: {
            [value.returnType]: { [value.condition]: vpropertyName },
          },
        });
      }

      return Object.assign(obj, {
        property: this.#getNameAndType(value.key as string).name,
        [key]: { [value.condition]: valuePropertyName },
      });
    }, {});
  }

  #simplifyProperty(property: any): any {
    let result: any;
    const type = property.type as string;
    if (['text'].includes(property.type as string)) {
      result = property.plain_text;
    } else if (['rich_text', 'title'].includes(property.type as string)) {
      if (Array.isArray(property[type]) && property[type].length !== 0) {
        result = property[type]
          .map((text: any) => this.#simplifyProperty(text) as string)
          .join('');
      } else {
        result = '';
      }
    } else if (
      [
        'url',
        'created_time',
        'checkbox',
        'number',
        'last_edited_time',
        'email',
        'phone_number',
        'date',
      ].includes(property.type as string)
    ) {
      result = property[type];
    } else if (
      ['created_by', 'last_edited_by', 'select'].includes(
        property.type as string
      )
    ) {
      result = property[type] ? property[type].name : null;
    } else if (['people'].includes(property.type as string)) {
      if (Array.isArray(property[type])) {
        result = property[type].map(
          (person: any) => person.person?.email || {}
        );
      } else {
        result = property[type];
      }
    } else if (['multi_select'].includes(property.type as string)) {
      if (Array.isArray(property[type])) {
        result = property[type].map((e: any) => e.name || {});
      } else {
        result = property[type].options.map((e: any) => e.name || {});
      }
    } else if (['relation'].includes(property.type as string)) {
      if (Array.isArray(property[type])) {
        result = property[type].map((e: any) => e.id || {});
      } else {
        result = property[type].database_id;
      }
    } else if (['formula'].includes(property.type as string)) {
      result = property[type][property[type].type];
    } else if (['rollup'].includes(property.type as string)) {
      const rollupFunction = property[type].function as string;
      if (
        rollupFunction.startsWith('count') ||
        rollupFunction.includes('empty')
      ) {
        result = property[type].number;
        if (rollupFunction.includes('percent')) {
          result = result * 100;
        }
      } else if (
        rollupFunction.startsWith('show') &&
        property[type].type === 'array'
      ) {
        const elements = property[type].array
          .map(this.#simplifyProperty)
          .flat();
        result =
          rollupFunction === 'show_unique'
            ? [...new Set(elements as string)]
            : elements;
      }
    } else if (['files'].includes(property.type as string)) {
      result = property[type].map(
        (file: { type: string; [key: string]: any }) => file[file.type].url
      );
    } else if (['status'].includes(property.type as string)) {
      result = property[type].name;
    }
    return result;
  }

  #simplifyProperties(properties: any): any {
    const results: any = {};
    for (const key of Object.keys(properties)) {
      results[`${key}`] = this.#simplifyProperty(properties[key]);
    }
    return results;
  }

  #getPropertyTitle(properties: Record<string, any>): any {
    return (
      Object.values(properties).filter(
        (property) => property.type === 'title'
      )[0].title[0]?.plain_text || ''
    );
  }

  #prepend(
    stringKey: string,
    properties: Record<string, any>
  ): Record<string, any> {
    const updatedProperties: Record<string, any> = {};
    for (const key of Object.keys(properties)) {
      updatedProperties[`${stringKey}_${snakeCase(key)}`] = properties[key];
    }
    return updatedProperties;
  }

  #simplifyObjects(
    objects: any,
    download = false,
    version = 2
  ): Array<Record<string, unknown>> {
    if (!Array.isArray(objects)) {
      objects = [objects];
    }
    const results: Array<Record<string, unknown>> = [];
    for (const {
      object,
      id,
      properties,
      parent,
      title,
      json,
      binary,
      url,
    } of objects) {
      if (
        object === 'page' &&
        (parent.type === 'page_id' || parent.type === 'workspace')
      ) {
        results.push({
          id,
          name: properties.title.title[0].plain_text,
          ...(version === 2 ? { url } : {}),
        });
      } else if (object === 'page' && parent.type === 'database_id') {
        results.push({
          id,
          ...(version === 2
            ? { name: this.#getPropertyTitle(properties) }
            : {}),
          ...(version === 2 ? { url } : {}),
          ...(version === 2
            ? {
                ...this.#prepend(
                  'property',
                  this.#simplifyProperties(properties)
                ),
              }
            : { ...this.#simplifyProperties(properties) }),
        });
      } else if (
        download &&
        json.object === 'page' &&
        json.parent.type === 'database_id'
      ) {
        results.push({
          json: {
            id: json.id,
            ...(version === 2
              ? { name: this.#getPropertyTitle(json.properties) }
              : {}),
            ...(version === 2 ? { url: json.url } : {}),
            ...(version === 2
              ? {
                  ...this.#prepend(
                    'property',
                    this.#simplifyProperties(json.properties)
                  ),
                }
              : { ...this.#simplifyProperties(json.properties) }),
          },
          binary,
        });
      } else if (object === 'database') {
        results.push({
          id,
          ...(version === 2
            ? { name: title[0]?.plain_text || '' }
            : { title: title[0]?.plain_text || '' }),
          ...(version === 2 ? { url } : {}),
        });
      }
    }
    return results;
  }

  #extractPageId(page: string): string {
    if (page.includes('p=')) {
      return page.split('p=')[1];
    } else if (page.includes('-') && page.includes('https')) {
      return page.split('-')[page.split('-').length - 1];
    }
    return page;
  }

  #extractDatabaseId(database: string): string {
    if (database.includes('?v=')) {
      const data = database.split('?v=')[0].split('/');
      const index = data.length - 1;
      return data[index];
    } else if (database.includes('/')) {
      const index = database.split('/').length - 1;
      return database.split('/')[index];
    } else {
      return database;
    }
  }

  #validateJSON(json: string | undefined): any {
    let result;
    try {
      if (json) result = JSON.parse(json);
    } catch (exception) {
      result = undefined;
    }
    return result;
  }

  #extractDatabaseMentionRLC(blockValues: Record<string, unknown>): void {
    if (blockValues.richText && blockValues.text) {
      const texts = (
        blockValues.text as {
          text: [
            {
              textType: string;
              mentionType: string;
              database:
                | string
                | {
                    value: string;
                    mode: string;
                    __rl: boolean;
                    __regex: string;
                  };
            }
          ];
        }
      ).text;
      texts.forEach((txt) => {
        if (txt.textType === 'mention' && txt.mentionType === 'database') {
          if (typeof txt.database === 'object' && txt.database.__rl) {
            if (txt.database.__regex) {
              const regex = new RegExp(txt.database.__regex);
              const extracted = regex.exec(txt.database.value);
              if (extracted) txt.database = extracted[1];
            } else {
              txt.database = txt.database.value;
            }
          }
        }
      });
    }
  }
}
