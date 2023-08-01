import {
  type PlannerAgent,
  type Message as PlannerMessage,
  type Response as PlannerResponse,
} from '../value-types/agent/planner-agent';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import type IUseCase from './i-use-case';
import {
  type SolverAgent,
  type Response as SolverResponse,
} from '../value-types/agent/solver-agent';
import { Result } from 'shared';
import { type Interface } from 'readline';
import {
  type ExecuteAirtableOperationAuth,
  type ExecuteAirtableOperationReq,
  type ExecuteDiscordOperationAuth,
  type ExecuteDiscordOperationReq,
  type ExecuteGithubOperationAuth,
  type ExecuteGithubOperationReq,
  type ExecuteHubSpotOperationAuth,
  type ExecuteHubSpotOperationReq,
  type ExecuteMediumOperationAuth,
  type ExecuteMediumOperationReq,
  type ExecuteMondayOperationAuth,
  type ExecuteMondayOperationReq,
  type ExecuteNotionOperationAuth,
  type ExecuteNotionOperationReq,
  type ExecuteSlackOperationAuth,
  type ExecuteSlackOperationReq,
  type GetArticleHackerNewsReq,
  type GetUserHackerNewsReq,
  ParamDescription,
  getExecuteAirtableOperationUseCase,
  getExecuteDiscordOperationUseCase,
  getExecuteGithubOperationUseCase,
  getExecuteHubSpotOperationUseCase,
  getExecuteMediumOperationUseCase,
  getExecuteMondayOperationUseCase,
  getExecuteNotionOperationUseCase,
  getExecuteSlackOperationUseCase,
  getGetArticleHackerNewsUseCase,
  getGetUserHackerNewsUseCase,
  parseToolType,
} from 'connector';
import { appConfig } from '../../config';

export interface ICLI extends Interface {
  writeSysMsg: (
    content: string,
    options?: {
      clearPrevContent?: boolean;
      breakLine?: boolean;
      showEmoji?: boolean;
    }
  ) => void;
  updateLoadingBar: () => void;
  setState: (state: 'exit' | 'prompt' | 'processing') => void;
}

export interface ExecuteWorkflowReq {
  plannerAgent: PlannerAgent;
  solverAgent: SolverAgent;
  cli: ICLI;
}

export type ExecuteWorkflowRes = Result<string>;

export class ExecuteWorkflow
  implements IUseCase<ExecuteWorkflowReq, ExecuteWorkflowRes>
{
  #cli: ICLI | undefined;

  #solverAgent: SolverAgent | undefined;

  #plannerAgent: PlannerAgent | undefined;

  #chatWithLemonAgent = async (userMsg: string): Promise<void> => {
    if (!this.#plannerAgent) throw new Error('Missing Planner Agent');
    if (!this.#solverAgent) throw new Error('Missing Solver Agent');

    this.#processUserMsg(userMsg);

    await this.#chatWithPlannerAgent();
  };

  #chatWithPlannerAgent = async (): Promise<void> => {
    if (!this.#cli) throw new Error('Missing cli');
    if (!this.#plannerAgent) throw new Error('Missing Planner Agent');

    const plannerResponse = await this.#plannerAgent.chat(true, {
      updateLoadingBarCallback: this.#cli.updateLoadingBar,
    });

    await this.#processPlannerResponse(plannerResponse);
  };

  #chatWithSolverAgent = async (toolId: string): Promise<void> => {
    if (!this.#cli) throw new Error('Missing cli');
    if (!this.#solverAgent) throw new Error('Missing Solver Agent');

    const solverResponse = await this.#solverAgent.chat(true, {
      updateLoadingBarCallback: this.#cli.updateLoadingBar,
    });

    await this.#processSolverResponse(solverResponse, toolId);
  };

  #processUserMsg = (userMsg: string): void => {
    if (!this.#cli) throw new Error('Missing cli');
    if (!this.#plannerAgent) throw new Error('Missing Planner Agent');

    if (userMsg.toLowerCase() === 'exit') this.#cli?.setState('exit');

    this.#plannerAgent.memorizeMsg({
      role: 'user',
      content: userMsg,
    });
  };

  #executeTool = async (
    toolId: string,
    input: Record<string, any>
  ): Promise<Result<Record<string, any> | undefined>> => {
    let result: Result<Record<string, any> | undefined>;

    if (toolId.startsWith('airtable')) {
      if (!appConfig.accessToken.airtableAuthToken)
        throw new Error('Airtable auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteAirtableOperationReq =
        input as ExecuteAirtableOperationReq;
      const auth: ExecuteAirtableOperationAuth = {
        token: appConfig.accessToken.airtableAuthToken,
        type: 'accessToken',
      };

      const useCase = getExecuteAirtableOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else if (toolId === 'hackernews-get-user') {
      // TODO: Replace 'as' parsing
      const req: GetUserHackerNewsReq = input as GetUserHackerNewsReq;

      const useCase = getGetUserHackerNewsUseCase();

      result = await useCase.execute({ req });
    } else if (toolId === 'hackernews-get-article') {
      // TODO: Replace 'as' parsing
      const req: GetArticleHackerNewsReq = input as GetArticleHackerNewsReq;

      const useCase = getGetArticleHackerNewsUseCase();

      result = await useCase.execute({ req });
    } else if (toolId.startsWith('slack')) {
      if (!appConfig.accessToken.slackAuthToken)
        throw new Error('Slack auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteSlackOperationReq = input as ExecuteSlackOperationReq;
      const auth: ExecuteSlackOperationAuth = {
        token: appConfig.accessToken.slackAuthToken,
        type: 'accessToken',
      };

      const useCase = getExecuteSlackOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else if (toolId.startsWith('github')) {
      if (!appConfig.accessToken.gitHubAuthToken)
        throw new Error('GitHub auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteGithubOperationReq = {
        params: {
          owner: input.owner,
          repository: input.repository,
          toolType: parseToolType(toolId),
        },
      };
      const auth: ExecuteGithubOperationAuth = {
        token: appConfig.accessToken.gitHubAuthToken,
        type: 'accessToken',
      };

      const useCase = getExecuteGithubOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else if (toolId.startsWith('hubspot')) {
      if (!appConfig.accessToken.hubSpotAuthToken)
        throw new Error('HubSpot auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteHubSpotOperationReq =
        input as ExecuteHubSpotOperationReq;
      const auth: ExecuteHubSpotOperationAuth = {
        token: appConfig.accessToken.hubSpotAuthToken,
        type: 'accessToken',
      };
      const useCase = getExecuteHubSpotOperationUseCase();
      result = await useCase.execute({ req, auth });
    } else if (toolId.startsWith('notion')) {
      if (!appConfig.accessToken.notionAuthToken)
        throw new Error('Notion auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteNotionOperationReq = input as ExecuteNotionOperationReq;
      const auth: ExecuteNotionOperationAuth = {
        token: appConfig.accessToken.notionAuthToken,
        type: 'apiKey',
      };

      const useCase = getExecuteNotionOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else if (toolId.startsWith('discord')) {
      if (!appConfig.accessToken.discordAuthToken)
        throw new Error('Discord auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteDiscordOperationReq =
        input as ExecuteDiscordOperationReq;
      const auth: ExecuteDiscordOperationAuth = {
        token: appConfig.accessToken.discordAuthToken,
        type: 'accessToken',
      };

      const useCase = getExecuteDiscordOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else if (toolId.startsWith('medium')) {
      if (!appConfig.accessToken.mediumAuthToken)
        throw new Error('Medium auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteMediumOperationReq = input as ExecuteMediumOperationReq;
      const auth: ExecuteMediumOperationAuth = {
        token: appConfig.accessToken.mediumAuthToken,
        type: 'accessToken',
      };

      const useCase = getExecuteMediumOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else if (toolId.startsWith('monday')) {
      if (!appConfig.accessToken.mondayAuthToken)
        throw new Error('Monday auth token not provided');

      // TODO: Replace 'as' parsing
      const req: ExecuteMondayOperationReq = input as ExecuteMondayOperationReq;
      const auth: ExecuteMondayOperationAuth = {
        token: appConfig.accessToken.mondayAuthToken,
        type: 'accessToken',
      };

      const useCase = getExecuteMondayOperationUseCase();

      result = await useCase.execute({ req, auth });
    } else throw new Error(`Tool type ${toolId} not supported`);

    return result;
  };

  #processSolverResponse = async (
    response: SolverResponse,
    toolId?: string
  ): Promise<void> => {
    if (!this.#plannerAgent) throw new Error('Missig planner agent');
    if (!this.#solverAgent) throw new Error('Missig solver agent');
    if (!this.#cli) throw new Error('Missing cli');

    switch (response.action) {
      case 'execute': {
        this.#cli.writeSysMsg(response.msg.content, {
          clearPrevContent: true,
          breakLine: true,
          showEmoji: true,
        });

        if (!toolId) throw new Error('Missing tool id');

        const result = await this.#executeTool(
          toolId,
          JSON.parse(JSON.stringify(response.msg.content))
        );

        if (!result.success) throw new Error(result.error);

        const resultValue = result.value;

        if (!resultValue) throw new Error('No result value available');

        this.#cli.writeSysMsg(
          `Tool execution result: ${JSON.stringify(resultValue)}`,
          {
            clearPrevContent: true,
            breakLine: true,
            showEmoji: true,
          }
        );

        break;
      }
      case 'request-param':
        throw new Error(`Input param ${response.msg.content} missing`);
      case 'think':
        throw new Error(
          `Solver requires Planner to think about ${response.msg.content}`
        );
      default:
        throw new Error('Invalid response action');
    }
  };

  #solveWorkflowStep = async (toolId: string): Promise<void> => {
    if (!this.#plannerAgent) throw new Error('Missig planner agent');
    if (!this.#solverAgent) throw new Error('Missig solver agent');
    if (!this.#cli) throw new Error('Missing cli');

    if (typeof toolId !== 'string')
      throw new Error('Non-string workflow step provided');
    const stepMsg = `Executing step ${toolId}...`;

    this.#cli.writeSysMsg(stepMsg, {
      clearPrevContent: true,
      breakLine: true,
      showEmoji: false,
    });

    this.#plannerAgent.memorizeMsg({
      content: stepMsg,
      role: 'system',
    });

    const userPrompt = this.#plannerAgent.memory
      .reduce((acc: string[], mem: PlannerMessage) => {
        const localAcc = acc;
        if (mem.role === 'user') localAcc.push(mem.content);
        return localAcc;
      }, [])
      .join('. ');
    const plannerToSolverMsg = {
      toolId,
      userPrompt,
      namesOfRequiredParams: Object.keys(ParamDescription.baseParams),
    };

    this.#solverAgent.memorizeMsg({
      role: 'system',
      content: JSON.stringify(plannerToSolverMsg),
    });

    await this.#chatWithSolverAgent(toolId);
  };

  #processPlannerResponse = async (
    response: PlannerResponse
  ): Promise<void> => {
    if (!this.#plannerAgent) throw new Error('Missig planner agent');
    if (!this.#solverAgent) throw new Error('Missig solver agent');
    if (!this.#cli) throw new Error('Missing cli');

    switch (response.action) {
      case 'exit':
        this.#cli.setState('exit');
        break;
      case 'solve': {
        const workflowSteps = JSON.parse(response.msg.content);

        const idsOfSelectedTools = workflowSteps.reduce(
          (
            acc: string[],
            step: { toolId: string; userPermissionRequired: boolean }
          ) => {
            acc.push(step.toolId);
            return acc;
          },
          []
        );

        this.#cli.writeSysMsg(
          `I will solve the task with the following workflow: ${JSON.stringify(
            idsOfSelectedTools
          )}`,
          {
            clearPrevContent: true,
            breakLine: true,
            showEmoji: true,
          }
        );

        this.#cli.setState('processing');

        for (const toolId of idsOfSelectedTools)
          await this.#solveWorkflowStep(toolId);

        break;
      }
      case 'think':
        this.#cli.writeSysMsg(response.msg.content, {
          clearPrevContent: true,
          breakLine: true,
          showEmoji: true,
        });

        this.#cli.setState('prompt');

        break;
      default:
        throw new Error('Invalid response action');
    }
  };

  #chat = async (): Promise<void> => {
    await new Promise((resolve, reject) => {
      if (!this.#cli) throw new Error('Missing cli');

      const welcomeMsg =
        "Hey there! I'm your pesonal Lemon agent. Which task do you want to solve with me?";

      this.#cli.writeSysMsg(welcomeMsg, { breakLine: true, showEmoji: true });

      this.#cli.setState('prompt');

      this.#cli.on('line', (input) => {
        this.#chatWithLemonAgent(input.trim()).catch(reject);
      });

      this.#cli.on('close', () => {
        resolve('Session ended');
      });
    });
  };

  async execute(props: {
    req: ExecuteWorkflowReq;
  }): Promise<ExecuteWorkflowRes> {
    const { plannerAgent, solverAgent, cli } = props.req;
    this.#plannerAgent = plannerAgent;
    this.#solverAgent = solverAgent;
    this.#cli = cli;

    try {
      await this.#chat();

      return Result.ok('Workflow executed');
    } catch (error: unknown) {
      if (isApiErrorResponse(error)) {
        if (isRichApiErrorResponse(error))
          console.error(error.response.data.error.message);
        console.error(error.stack);
      } else if (error) console.trace(error);
      return Result.fail('');
    }
  }
}
