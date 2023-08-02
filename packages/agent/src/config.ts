import dotenv from 'dotenv';
import { resolve, dirname } from 'path';

const getInvocationDirPath = (): string => {
  if (!require.main?.filename) throw new Error('Missing require.main.filename');
  const invocationDirPath = resolve(dirname(require.main.filename), '../../..');
  if (!invocationDirPath) throw new Error('Missing invocation dir path');
  return invocationDirPath;
};

const invocationDirPath = getInvocationDirPath();

const dotenvConfig =
  process.env.NODE_ENV === 'development' && require.main
    ? {
        path: resolve(invocationDirPath, `.env.${process.env.NODE_ENV}`),
      }
    : {};
dotenv.config(dotenvConfig);

interface AccessToken {
  openaiAuthToken?: string;
  airtableAuthToken?: string;
  gitHubAuthToken?: string;
  discordAuthToken?: string;
  hubSpotAuthToken?: string;
  mediumAuthToken?: string;
  mondayAuthToken?: string;
  notionAuthToken?: string;
  slackAuthToken?: string;
}

const getAccessToken = (): AccessToken => {
  const { AUTH_TOKEN_OPENAI: openaiAuthToken } = process.env;
  const { AUTH_TOKEN_AIRTABLE: airtableAuthToken } = process.env;
  const { AUTH_TOKEN_GITHUB: gitHubAuthToken } = process.env;
  const { AUTH_TOKEN_DISCORD: discordAuthToken } = process.env;
  const { AUTH_TOKEN_HUBSPOT: hubSpotAuthToken } = process.env;
  const { AUTH_TOKEN_MEDIUM: mediumAuthToken } = process.env;
  const { AUTH_TOKEN_MONDAY: mondayAuthToken } = process.env;
  const { AUTH_TOKEN_NOTION: notionAuthToken } = process.env;
  const { AUTH_TOKEN_SLACK: slackAuthToken } = process.env;

  return {
    openaiAuthToken,
    airtableAuthToken,
    gitHubAuthToken,
    discordAuthToken,
    hubSpotAuthToken,
    mediumAuthToken,
    mondayAuthToken,
    notionAuthToken,
    slackAuthToken,
  };
};

export const appConfig = {
  nodejs: {
    mode: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 1313,
    invocationDirPath,
  },
  accessToken: getAccessToken(),
  modelType: process.env.MODEL_TYPE || 'gpt-3.5-turbo',
};
