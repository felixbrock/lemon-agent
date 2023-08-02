// TODO: Violation of control flow. DI for express instead
import { BaseController, CodeHttp, isRequest } from './base-controller';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../../services/identify-error-response';
import {
  type ExecuteWorkflowReq,
  type ExecuteWorkflow,
  type ICLI,
} from '../../../domain/use-cases/execute-workflow';
import { type Request, type Response } from './base-controller';
import { PlannerAgent } from '../../../domain/value-types/agent/planner-agent';
import { appConfig } from '../../../config';
import { parseModelType } from '../../../domain/value-types/model';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';
import { SolverAgent } from '../../../domain/value-types/agent/solver-agent';

export default class ExecuteWorkflowController extends BaseController {
  readonly #executeWorkflow: ExecuteWorkflow;
  readonly #cli: ICLI;

  constructor(executeWorkflow: ExecuteWorkflow, cli: ICLI) {
    super();
    this.#executeWorkflow = executeWorkflow;
    this.#cli = cli;
  }

  buildRequest = (req: Request): ExecuteWorkflowReq => {
    if (!isRequest(req)) throw new Error('Request missing params');

    const modelType = appConfig.modelType;

    if (!parseModelType(modelType)) throw new Error('Invalid model type');

    let accessToken: string;
    switch (modelType) {
      case 'gpt-3.5-turbo': {
        if (!appConfig.accessToken.openaiAuthToken)
          throw new Error('Missing OpenAI access token');
        accessToken = appConfig.accessToken.openaiAuthToken;
        break;
      }
      default:
        throw new Error('Invalid model type');
    }

    const modelApi = new OpenAIApi(
      new Configuration({
        apiKey: accessToken,
      })
    );

    return {
      plannerAgent: new PlannerAgent(
        modelType,
        {
          ...modelApi,
          chat: modelApi.createChatCompletion,
        },
        fs
          .readFileSync(
            path.resolve(
              appConfig.nodejs.invocationDirPath,
              './data/workflow.json'
            )
          )
          .toString()
      ),
      solverAgent: new SolverAgent(modelType, {
        ...modelApi,
        chat: modelApi.createChatCompletion,
      }),
      cli: this.#cli,
    };
  };

  protected async executeImpl(req: Request, res: Response): Promise<Response> {
    try {
      const useCaseResult = await this.#executeWorkflow.execute({
        req: this.buildRequest(req),
      });

      if (!useCaseResult.success) {
        return ExecuteWorkflowController.badRequest(res);
      }

      const result = useCaseResult.value;
      if (!result)
        return ExecuteWorkflowController.fail(
          res,
          'Get tools. Internal error.'
        );

      return ExecuteWorkflowController.ok(res, result, CodeHttp.OK);
    } catch (error: unknown) {
      if (isApiErrorResponse(error)) {
        if (isRichApiErrorResponse(error))
          console.error(error.response.data.error.message);
        console.error(error.stack);
      } else if (error) console.trace(error);
      return ExecuteWorkflowController.fail(
        res,
        'run tool - Internal error occurred'
      );
    }
  }
}
