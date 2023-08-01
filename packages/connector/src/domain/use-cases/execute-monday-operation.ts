import {
  // type ApiResponse,
  type ApiResponseData,
  type IExternalApi,
} from '../../services/i-external-api';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import { type MondayAuthType, type ToolType } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';

interface MondayOperationParams {
  toolType: ToolType;
  boardArchiveParamTypes?: {
    boardId: string;
  };
  boardCreateParamTypes?: {
    name: string;
    kind: 'share | public | private';
    additionalFields?: {
      templateId?: number;
    };
  };
  boardGetParamTypes?: {
    boardId: string;
  };
  boardGetAllParamTypes?: {
    returnAll?: boolean;
    limit?: number;
  };
  boardColumnCreateParamTypes?: {
    boardId: string;
    title: string;
    columnType: 'checkbox | country | date | dropdown | email | hour | Link | longText | numbers | people | person | phone | rating | status | tags | team | text | timeline | timezone | week | worldClock';
    additionalFields?: {
      defaults?: string;
    };
  };
  boardColumnGetAllParamTypes?: {
    boardId: string;
  };
  boardGroupCreateParamTypes?: {
    boardId: string;
    name: string;
  };
  boardGroupDeleteParamTypes?: {
    boardId: string;
    groupId: string;
  };
  boardGroupGetAllParamTypes?: {
    boardId: string;
  };
  boardItemAddUpdateParamTypes?: {
    itemId: string;
    value: string;
  };
  boardItemChangeColumnValueParamTypes?: {
    boardId: string;
    itemId: string;
    columnId: string;
    value: string;
  };
  boardItemChangeMultipleColumnValuesParamTypes?: {
    boardId: string;
    itemId: string;
    columnValues: string;
  };
  boardItemCreateParamTypes?: {
    boardId: string;
    groupId: string;
    name: string;
    additionalFields?: {
      columnValues?: string;
    };
  };
  boardItemDeleteParamTypes?: {
    itemId: string;
  };
  boardItemGetParamTypes?: {
    itemId: string;
  };
  boardItemGetAllParamTypes?: {
    boardId: string;
    groupId: string;
    returnAll?: boolean;
    limit?: number;
  };
  boardItemGetByColumnValueParamTypes?: {
    boardId: string;
    columnId: string;
    columnValue: string;
    returnAll?: boolean;
    limit?: number;
  };
  boardItemMoveParamTypes?: {
    itemId: string;
    groupId: string;
  };
}

export interface ExecuteMondayOperationAuth {
  token: string;
  type: MondayAuthType;
}

export interface ExecuteMondayOperationReq {
  params: MondayOperationParams;
}

export type ExecuteMondayOperationRes = Result<Record<string, any> | undefined>;

export class ExecuteMondayOperation
  implements
    IUseCase<
      ExecuteMondayOperationReq,
      ExecuteMondayOperationRes,
      ExecuteMondayOperationAuth
    >
{
  #params?: MondayOperationParams;
  #auth?: ExecuteMondayOperationAuth;
  #api: IExternalApi;

  constructor(mondayApi: IExternalApi) {
    this.#api = mondayApi;
  }

  async execute(props: {
    req: ExecuteMondayOperationReq;
    auth: ExecuteMondayOperationAuth;
  }): Promise<ExecuteMondayOperationRes> {
    this.#params = props.req.params;
    this.#auth = props.auth;

    let returnData: ApiResponseData | undefined;

    try {
      switch (this.#params.toolType) {
        case 'monday-board-archive':
          returnData = await this.#execBoardArchive();
          break;
        case 'monday-board-create':
          returnData = await this.#execBoardCreate();
          break;
        case 'monday-board-get':
          returnData = await this.#execBoardGet();
          break;
        case 'monday-board-get-all':
          returnData = await this.#execBoardGetAll();
          break;
        case 'monday-column-create':
          returnData = await this.#execColumnCreate();
          break;
        case 'monday-column-get-all':
          returnData = await this.#execColumnGetAll();
          break;
        case 'monday-group-delete':
          returnData = await this.#execGroupDelete();
          break;
        case 'monday-group-create':
          returnData = await this.#execGroupCreate();
          break;
        case 'monday-group-get-all':
          returnData = await this.#execGroupGetAll();
          break;
        case 'monday-item-add-update':
          returnData = await this.#execItemAddUpdate();
          break;
        case 'monday-item-column-change':
          returnData = await this.#execItemColumnChange();
          break;
        case 'monday-item-columns-change':
          returnData = await this.#execItemColumnsChange();
          break;
        case 'monday-item-create':
          returnData = await this.#execItemCreate();
          break;
        case 'monday-item-delete':
          returnData = await this.#execItemDelete();
          break;
        case 'monday-item-get':
          returnData = await this.#execItemGet();
          break;
        case 'monday-item-get-all':
          returnData = await this.#execItemGetAll();
          break;
        case 'monday-item-get-by-column':
          returnData = await this.#execItemGetByColumn();
          break;
        case 'monday-item-move':
          returnData = await this.#execItemMove();
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

  #execBoardArchive = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardArchiveParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardArchiveParamTypes.boardId);

    const body: Record<string, any> = {
      query: `mutation ($id: Int!) {
        archive_board (board_id: $id) {
          id
        }
      }`,
      variables: {
        id: boardId,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.archive_board;
  };

  #execBoardCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { name, kind, additionalFields } = this.#params.boardCreateParamTypes;

    const body: Record<string, any> = {
      query: `mutation ($name: String!, $kind: BoardKind!, $templateId: Int) {
          create_board (board_name: $name, board_kind: $kind, template_id: $templateId) {
            id
          }
        }`,
      variables: {
        name,
        kind,
      },
    };

    if (additionalFields?.templateId) {
      body.variables.templateId = additionalFields.templateId;
    }

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.create_board;
  };

  #execBoardGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardGetParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardGetParamTypes?.boardId);

    const body: Record<string, any> = {
      query: `query ($id: [Int]) {
          boards (ids: $id){
            id
            name
            description
            state
            board_folder_id
            board_kind
            owner() {
              id
            }
          }
        }`,
      variables: {
        id: boardId,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.boards;
  };

  #execBoardGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, limit } = this.#params.boardGetAllParamTypes;

    const body: Record<string, any> = {
      query: `query ($page: Int, $limit: Int) {
          boards (page: $page, limit: $limit){
            id
            name
            description
            state
            board_folder_id
            board_kind
            owner() {
              id
            }
          }
        }`,
      variables: {
        page: 1,
      },
    };

    let responseData;

    if (returnAll) {
      responseData = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '',
        authToken: this.#auth.token,
        data: body,
        query: { propertyName: 'boards' },
      });

      responseData = [].concat(...responseData);
    } else {
      body.variables.limit = limit;
      responseData = await this.#api.apiRequest(
        'POST',
        '',
        this.#auth.token,
        body
      );
      responseData = responseData.data?.data.boards;
    }

    return responseData;
  };

  #execColumnCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardColumnCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { boardId, title, columnType, additionalFields } =
      this.#params.boardColumnCreateParamTypes;

    const boardIdNum = parseInt(boardId);

    const body: Record<string, any> = {
      query: `mutation ($boardId: Int!, $title: String!, $columnType: ColumnType, $defaults: JSON ) {
          create_column (board_id: $boardId, title: $title, column_type: $columnType, defaults: $defaults) {
            id
          }
        }`,
      variables: {
        boardId: boardIdNum,
        title,
        columnType: snakeCase(columnType),
      },
    };

    if (additionalFields?.defaults) {
      try {
        JSON.parse(additionalFields.defaults);
      } catch (error) {
        throw new Error('Defauls must be a valid JSON');
      }
      body.variables.defaults = JSON.stringify(
        JSON.parse(additionalFields.defaults)
      );
    }

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.create_column;
  };

  #execColumnGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardColumnGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardColumnGetAllParamTypes.boardId);

    const body: Record<string, any> = {
      query: `query ($boardId: [Int]) {
          boards (ids: $boardId){
            columns() {
              id
              title
              type
              settings_str
              archived
            }
          }
        }`,
      variables: {
        page: 1,
        boardId,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.boards[0].columns;
  };

  #execGroupDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardGroupDeleteParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardGroupDeleteParamTypes.boardId);
    const groupId = this.#params.boardGroupDeleteParamTypes.groupId;

    const body: Record<string, any> = {
      query: `mutation ($boardId: Int!, $groupId: String!) {
          delete_group (board_id: $boardId, group_id: $groupId) {
            id
          }
        }`,
      variables: {
        boardId,
        groupId,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.delete_group;
  };

  #execGroupCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardGroupCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardGroupCreateParamTypes.boardId);
    const name = this.#params.boardGroupCreateParamTypes.name;

    const body: Record<string, any> = {
      query: `mutation ($boardId: Int!, $groupName: String!) {
          create_group (board_id: $boardId, group_name: $groupName) {
            id
          }
        }`,
      variables: {
        boardId,
        groupName: name,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.create_group;
  };

  #execGroupGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardGroupGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardGroupGetAllParamTypes.boardId);

    const body: Record<string, any> = {
      query: `query ($boardId: [Int]) {
          boards (ids: $boardId, ){
            id
            groups() {
              id
              title
              color
              position
              archived
            }
          }
        }`,
      variables: {
        boardId,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.boards[0].groups;
  };

  #execItemAddUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemAddUpdateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const itemId = parseInt(this.#params.boardItemAddUpdateParamTypes.itemId);
    const value = this.#params.boardItemAddUpdateParamTypes.value;

    const body: Record<string, any> = {
      query: `mutation ($itemId: Int!, $value: String!) {
          create_update (item_id: $itemId, body: $value) {
            id
          }
        }`,
      variables: {
        itemId,
        value,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.create_update;
  };

  #execItemColumnChange = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemChangeColumnValueParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(
      this.#params.boardItemChangeColumnValueParamTypes.boardId
    );
    const itemId = parseInt(
      this.#params.boardItemChangeColumnValueParamTypes.itemId
    );
    const columnId = this.#params.boardItemChangeColumnValueParamTypes.columnId;
    const value = this.#params.boardItemChangeColumnValueParamTypes.value;

    const body: Record<string, any> = {
      query: `mutation ($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
          change_column_value (board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
            id
          }
        }`,
      variables: {
        boardId,
        itemId,
        columnId,
      },
    };

    try {
      JSON.parse(value);
    } catch (error) {
      throw new Error('Custom Values must be a valid JSON');
    }
    body.variables.value = JSON.stringify(JSON.parse(value));

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.change_column_value;
  };

  #execItemColumnsChange = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemChangeMultipleColumnValuesParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(
      this.#params.boardItemChangeMultipleColumnValuesParamTypes.boardId
    );
    const itemId = parseInt(
      this.#params.boardItemChangeMultipleColumnValuesParamTypes.itemId
    );
    const columnValues =
      this.#params.boardItemChangeMultipleColumnValuesParamTypes.columnValues;

    const body: Record<string, any> = {
      query: `mutation ($boardId: Int!, $itemId: Int!, $columnValues: JSON!) {
          change_multiple_column_values (board_id: $boardId, item_id: $itemId, column_values: $columnValues) {
            id
          }
        }`,
      variables: {
        boardId,
        itemId,
      },
    };

    try {
      JSON.parse(columnValues);
    } catch (error) {
      throw new Error('Custom Values must be a valid JSON');
    }
    body.variables.columnValues = JSON.stringify(JSON.parse(columnValues));

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.change_multiple_column_values;
  };

  #execItemCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemCreateParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardItemCreateParamTypes.boardId);
    const groupId = this.#params.boardItemCreateParamTypes.groupId;
    const itemName = this.#params.boardItemCreateParamTypes.name;
    const additionalFields =
      this.#params.boardItemCreateParamTypes.additionalFields;

    const body: Record<string, any> = {
      query: `mutation ($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON) {
          create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
            id
          }
        }`,
      variables: {
        boardId,
        groupId,
        itemName,
      },
    };

    if (additionalFields?.columnValues) {
      try {
        JSON.parse(additionalFields.columnValues);
      } catch (error) {
        throw new Error('Custom Values must be a valid JSON');
      }
      body.variables.columnValues = JSON.stringify(
        JSON.parse(additionalFields.columnValues)
      );
    }

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.create_item;
  };

  #execItemDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemDeleteParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const itemId = parseInt(this.#params.boardItemDeleteParamTypes.itemId);

    const body: Record<string, any> = {
      query: `mutation ($itemId: Int!) {
          delete_item (item_id: $itemId) {
            id
          }
        }`,
      variables: {
        itemId,
      },
    };
    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.delete_item;
  };

  #execItemGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemGetParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const itemIds = this.#params.boardItemGetParamTypes.itemId
      .split(',')
      .map((n) => parseInt(n, 10));

    const body: Record<string, any> = {
      query: `query ($itemId: [Int!]){
          items (ids: $itemId) {
            id
            name
            created_at
            state
            column_values() {
              id
              text
              title
              type
              value
              additional_info
            }
          }
        }`,
      variables: {
        itemId: itemIds,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.items;
  };

  #execItemGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemGetAllParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(this.#params.boardItemGetAllParamTypes.boardId);
    const groupId = this.#params.boardItemGetAllParamTypes.groupId;
    const returnAll = this.#params.boardItemGetAllParamTypes.returnAll;

    const body: Record<string, any> = {
      query: `query ($boardId: [Int], $groupId: [String], $page: Int, $limit: Int) {
          boards (ids: $boardId) {
            groups (ids: $groupId) {
              id
              items(limit: $limit, page: $page) {
                id
                name
                created_at
                state
                column_values() {
                  id
                  text
                  title
                  type
                  value
                  additional_info
                }
              }
            }
          }
        }`,
      variables: {
        boardId,
        groupId,
      },
    };

    let responseData;

    if (returnAll) {
      const query = { propertyName: 'boards[0].groups[0].items' };

      responseData = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '',
        authToken: this.#auth.token,
        data: body,
        query,
      });

      responseData = [].concat(...responseData);
    } else {
      body.variables.limit = this.#params.boardItemGetAllParamTypes.limit;
      responseData = await this.#api.apiRequest(
        'POST',
        '',
        this.#auth.token,
        body
      );
      responseData = responseData.data?.data.boards[0].groups[0].items;
    }

    return responseData;
  };

  #execItemGetByColumn = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemGetByColumnValueParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const boardId = parseInt(
      this.#params.boardItemGetByColumnValueParamTypes.boardId,
      10
    );
    const columnId = this.#params.boardItemGetByColumnValueParamTypes.columnId;
    const columnValue =
      this.#params.boardItemGetByColumnValueParamTypes.columnValue;
    const returnAll =
      this.#params.boardItemGetByColumnValueParamTypes.returnAll;

    const body: Record<string, any> = {
      query: `query ($boardId: Int!, $columnId: String!, $columnValue: String!, $page: Int, $limit: Int ){
          items_by_column_values (board_id: $boardId, column_id: $columnId, column_value: $columnValue, page: $page, limit: $limit) {
            id
            name
            created_at
            state
            board {
              id
            }
            column_values() {
              id
              text
              title
              type
              value
              additional_info
            }
          }
        }`,
      variables: {
        boardId,
        columnId,
        columnValue,
      },
    };

    let responseData;

    if (returnAll) {
      const query = { propertyName: 'items_by_column_values' };

      responseData = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint: '',
        authToken: this.#auth.token,
        data: body,
        query,
      });

      responseData = [].concat(...responseData);
    } else {
      body.variables.limit =
        this.#params.boardItemGetByColumnValueParamTypes.limit;
      responseData = await this.#api.apiRequest(
        'POST',
        '',
        this.#auth.token,
        body
      );
      responseData = responseData.data?.data.items_by_column_values;
    }

    return responseData;
  };

  #execItemMove = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.boardItemMoveParamTypes)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const groupId = this.#params.boardItemMoveParamTypes.groupId;
    const itemId = parseInt(this.#params.boardItemMoveParamTypes.itemId, 10);

    const body: Record<string, any> = {
      query: `mutation ($groupId: String!, $itemId: Int!) {
          move_item_to_group (group_id: $groupId, item_id: $itemId) {
            id
          }
        }`,
      variables: {
        groupId,
        itemId,
      },
    };

    const responseData = await this.#api.apiRequest(
      'POST',
      '',
      this.#auth.token,
      body
    );
    return responseData.data?.data.move_item_to_group;
  };
}

export function getValueByPath(obj: any, path: string): any {
  const keys = path.split('.').map((key) => {
    const matches = key.match(/(\w+)(\[(\d+)\])?/);
    return {
      key: matches?.[1],
      index: matches?.[3] !== undefined ? parseInt(matches[3], 10) : undefined,
    };
  });

  let value = obj;

  for (const { key, index } of keys) {
    if (typeof value === 'object' && value !== null && key && key in value) {
      value = value[key];
      if (index !== undefined && Array.isArray(value) && index < value.length) {
        value = value[index];
      }
    } else {
      return undefined;
    }
  }

  return value;
}

export function snakeCase(input: string): string {
  return input
    .replace(/([A-Z])/g, '_$1')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}
