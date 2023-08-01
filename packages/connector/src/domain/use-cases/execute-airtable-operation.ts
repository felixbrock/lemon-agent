/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import {
  type ApiResponseData,
  type IExternalApi,
} from '../../services/i-external-api';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import { type AirtableAuthType, type ToolType } from '../value-types/tool';
import type IUseCase from './i-use-case';
import { Result } from 'shared';

export interface ExecuteAirtableOperationReq {
  params: {
    toolType: ToolType;
    baseId: string;
    tableId: string;
    appendParams?: {
      data: Array<Record<string, number | string | boolean>>;
      fieldNamesToLoad?: string[];
      options?: { typecast?: boolean; bulkSize?: number };
    };
    deleteParams?: { id: string; options?: { bulkSize?: number } };
    listParams?: {
      limit: number;
    };
    readParams?: { id: string };
    updateParams?: {
      id: string;
      fieldNamesToUpdate: string[];
      data: Array<Record<string, number | string | boolean>>;
      options?: {
        bulkSize?: number;
        ignoreFields?: string;
        typecast?: boolean;
      };
    };
  };
}

export type ExecuteAirtableOperationRes = Result<
  Record<string, any> | undefined
>;

export interface ExecuteAirtableOperationAuth {
  token: string;
  type: AirtableAuthType;
}

export class ExecuteAirtableOperation
  implements
    IUseCase<
      ExecuteAirtableOperationReq,
      ExecuteAirtableOperationRes,
      ExecuteAirtableOperationAuth
    >
{
  #api: IExternalApi;

  constructor(airtableApi: IExternalApi) {
    this.#api = airtableApi;
  }

  async execute(props: {
    req: ExecuteAirtableOperationReq;
    auth: ExecuteAirtableOperationAuth;
  }): Promise<ExecuteAirtableOperationRes> {
    const {
      toolType: operation,
      baseId,
      tableId,
      appendParams,
      deleteParams,
      listParams,
      readParams,
      updateParams,
    } = props.req.params;

    const { token } = props.auth;

    let returnData: ApiResponseData | undefined;

    const application = baseId;
    const table = tableId;

    const returnAll = false;
    let endpoint = '';
    let requestMethod = '';

    const body: Record<string, unknown> = {};
    const qs: Record<string, string | string[]> = {};

    if (operation === 'airtable-append-data') {
      // ----------------------------------
      //         append
      // ----------------------------------

      if (!appendParams)
        throw new Error('appendParams is required for append operation');

      const { fieldNamesToLoad, options, data } = appendParams;

      requestMethod = 'POST';
      endpoint = `${application}/${table}`;

      const rows: Array<Record<string, unknown>> = [];

      try {
        data.forEach((item) => {
          const row: Record<string, unknown> = {};

          // Add only the specified fields

          if (fieldNamesToLoad) {
            const rowFields: Record<string, unknown> = {};

            for (const fieldName of fieldNamesToLoad) {
              if (fieldName in item) rowFields[fieldName] = item[fieldName];
            }

            row.fields = rowFields;
          } else {
            // Add all the fields the item has
            row.fields = item;
            delete (row.fields as any).id;
          }

          rows.push(row);
        });

        if (options?.typecast) {
          body.typecast = true;
        }

        body.records = rows;

        returnData = await this.#api.apiRequest(
          requestMethod,
          endpoint,
          token,
          body,
          qs
        );

        rows.length = 0;
      } catch (error) {
        if (isApiErrorResponse(error)) {
          if (isRichApiErrorResponse(error))
            console.error(error.response.data.error.message);
          console.error(error.stack);
        } else if (error) console.trace(error);
        throw new Error(`Unknown error at ${this.constructor.name}`);
      }
    } else if (operation === 'airtable-delete-data') {
      requestMethod = 'DELETE';

      const rows: string[] = [];

      try {
        if (!deleteParams)
          throw new Error('deleteParams is required for delete operation');

        const { id, options } = deleteParams;

        rows.push(id);

        if (rows.length === options?.bulkSize) {
          endpoint = `${application}/${table}`;

          // Make one request after another. This is slower but makes
          // sure that we do not run into the rate limit they have in
          // place and so block for 30 seconds. Later some global
          // functionality in core should make it easy to make requests
          // according to specific rules like not more than 5 requests
          // per seconds.
          qs.records = rows;

          returnData = await this.#api.apiRequest(
            requestMethod,
            endpoint,
            token,
            body,
            qs
          );

          // empty rows
          rows.length = 0;
        }
      } catch (error) {
        if (isApiErrorResponse(error)) {
          if (isRichApiErrorResponse(error))
            console.error(error.response.data.error.message);
          console.error(error.stack);
        } else if (error) console.trace(error);
        throw new Error(`Unknown error at ${this.constructor.name}`);
      }
    } else if (operation === 'airtable-list-data') {
      // ----------------------------------
      //         list
      // ----------------------------------
      try {
        requestMethod = 'GET';
        endpoint = `${application}/${table}`;

        if (!listParams)
          throw new Error('listParams is required for list operation');

        const { limit } = listParams;

        if (returnAll) {
          returnData = await this.#api.apiRequestAllItems({
            method: requestMethod,
            endpoint,
            authToken: token,
            data: body,
            query: qs,
          });
        } else {
          qs.maxRecords = limit.toString();
          returnData = await this.#api.apiRequest(
            requestMethod,
            endpoint,
            token,
            body,
            qs
          );
        }
      } catch (error) {
        if (isApiErrorResponse(error)) {
          if (isRichApiErrorResponse(error))
            console.error(error.response.data.error.message);
          console.error(error.stack);
        } else if (error) console.trace(error);
      }
    } else if (operation === 'airtable-read-data') {
      // ----------------------------------
      //         read
      // ----------------------------------

      if (!readParams)
        throw new Error('readParams is required for read operation');

      requestMethod = 'GET';

      const { id } = readParams;

      endpoint = `${application}/${table}/${id}`;

      // Make one request after another. This is slower but makes
      // sure that we do not run into the rate limit they have in
      // place and so block for 30 seconds. Later some global
      // functionality in core should make it easy to make requests
      // according to specific rules like not more than 5 requests
      // per seconds.
      try {
        returnData = await this.#api.apiRequest(
          requestMethod,
          endpoint,
          token,
          body,
          qs
        );
      } catch (error) {
        if (isApiErrorResponse(error)) {
          if (isRichApiErrorResponse(error))
            console.error(error.response.data.error.message);
          console.error(error.stack);
        } else if (error) console.trace(error);
        throw new Error(`Unknown error at ${this.constructor.name}`);
      }
    } else if (operation === 'airtable-update-data') {
      // ----------------------------------
      //         update
      // ----------------------------------

      if (!updateParams)
        throw new Error('updateParams is required for update operation');

      const { id, fieldNamesToUpdate, options, data } = updateParams;

      requestMethod = 'PATCH';

      const rows: Array<Record<string, unknown>> = [];

      try {
        data.forEach((item) => {
          const row: Record<string, unknown> = {};

          if (fieldNamesToUpdate.length) {
            const rowFields: Record<string, unknown> = {};
            for (const fieldName of fieldNamesToUpdate) {
              if (!(fieldName in item)) rowFields[fieldName] = item[fieldName];
            }

            row.fields = rowFields;
          } else {
            // Update all the fields the item has
            row.fields = item;
            // remove id field
            delete (row.fields as any).id;

            if (options?.ignoreFields) {
              const ignoreFields = options.ignoreFields
                .split(',')
                .map((field) => field.trim())
                .filter((field) => !!field);
              if (ignoreFields.length) {
                // From: https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
                row.fields = Object.entries(item)
                  .filter(([key]) => !ignoreFields.includes(key))
                  .reduce(
                    (obj, [key, val]) => Object.assign(obj, { [key]: val }),
                    {}
                  );
              }
            }
          }

          row.id = id;

          rows.push(row);
        });

        endpoint = `${application}/${table}`;

        // Make one request after another. This is slower but makes
        // sure that we do not run into the rate limit they have in
        // place and so block for 30 seconds. Later some global
        // functionality in core should make it easy to make requests
        // according to specific rules like not more than 5 requests
        // per seconds.

        const requestData = {
          records: rows,
          typecast: options?.typecast,
        };

        returnData = await this.#api.apiRequest(
          requestMethod,
          endpoint,
          token,
          requestData,
          qs
        );

        // empty rows
        rows.length = 0;
      } catch (error) {
        if (isApiErrorResponse(error)) {
          if (isRichApiErrorResponse(error))
            console.error(error.response.data.error.message);
          console.error(error.stack);
        } else if (error) console.trace(error);
        throw error;
      }
    } else {
      throw new Error(
        `The operation "${props.req.params.toolType}" is not known!`
      );
    }

    return Result.ok(returnData?.data);
  }
}
