import { type ExecuteAirtableOperation } from '../domain/use-cases/execute-airtable-operation';
import { type GetArticleHackerNews } from '../domain/use-cases/hacker-news/get-article';
import { type GetUserHackerNews } from '../domain/use-cases/hacker-news/get-user';
import { type ExecuteSlackOperation } from '../domain/use-cases/execute-slack-operation';
import { type ExecuteGithubOperation } from '../domain/use-cases/execute-github-operation';
import { type ExecuteHubSpotOperation } from '../domain/use-cases/execute-hubspot-operation';
import { type ExecuteNotionOperation } from '../domain/use-cases/execute-notion-operation';
import { type ExecuteDiscordOperation } from '../domain/use-cases/execute-discord-operation';
import { type ExecuteMediumOperation } from '../domain/use-cases/execute-medium-operation';
import { type ExecuteMondayOperation } from '../domain/use-cases/execute-monday-operation';
import iocContainer from '../ioc-container';

export const getExecuteAirtableOperationUseCase =
  (): ExecuteAirtableOperation =>
    iocContainer.resolve('executeAirtableOperation');

export const getGetUserHackerNewsUseCase = (): GetUserHackerNews =>
  iocContainer.resolve('getUserHackerNews');

export const getGetArticleHackerNewsUseCase = (): GetArticleHackerNews =>
  iocContainer.resolve('getArticleHackerNews');

export const getExecuteSlackOperationUseCase = (): ExecuteSlackOperation =>
  iocContainer.resolve('executeSlackOperation');

export const getExecuteGithubOperationUseCase = (): ExecuteGithubOperation =>
  iocContainer.resolve('executeGithubOperation');

export const getExecuteHubSpotOperationUseCase = (): ExecuteHubSpotOperation =>
  iocContainer.resolve('executeHubSpotOperation');

export const getExecuteNotionOperationUseCase = (): ExecuteNotionOperation =>
  iocContainer.resolve('executeNotionOperation');

export const getExecuteDiscordOperationUseCase = (): ExecuteDiscordOperation =>
  iocContainer.resolve('executeDiscordOperation');

export const getExecuteMediumOperationUseCase = (): ExecuteMediumOperation =>
  iocContainer.resolve('executeMediumOperation');

export const getExecuteMondayOperationUseCase = (): ExecuteMondayOperation =>
  iocContainer.resolve('executeMondayOperation');
