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
import { type SlackAuthType, type ToolType } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';

export interface SlackToolProps {
  propertyName: string;
}

interface ChannelArchiveParams {
  channelId: string;
}
interface ChannelCloseParams {
  channelId: string;
}
interface ChannelCreateParams {
  channelId: string;
  channelVisibility: 'public' | 'private';
}
interface ChannelInviteParams {
  channelId: string;
  userIds: string[];
}
interface ChannelGetParams {
  channelId: string;
  options?: {
    includeNumMembers?: boolean;
  };
}
interface ChannelKickParams {
  channelId: string;
  userId?: string;
}
interface ChannelJoinParams {
  channelId: string;
}
interface ChannelGetAllParams {
  returnAll?: boolean;
  limit?: number;
  filters?: {
    excludeArchived?: boolean;
    types?: Array<'public_channel' | 'private_channel' | 'mpim' | 'im'>;
  };
}
interface ChannelHistoryParams {
  channelId: string;
  returnAll?: boolean;
  limit?: number;
  filters?: {
    inclusive?: boolean;
    latest?: string;
    oldest?: string;
  };
}
interface ChannelLeaveParams {
  channelId: string;
}
interface ChannelMemberParams {
  channelId: string;
  returnAll?: boolean;
  limit?: number;
  resolveData?: boolean;
}
interface ChannelOpenParams {
  options?: {
    channelId?: string;
    returnIm?: boolean;
    users?: string[];
  };
}
interface ChannelRenameParams {
  channelId: string;
  name: string;
}
interface ChannelRepliesParams {
  channelId: string;
  ts: number;
  returnAll?: boolean;
  limit?: number;
  filters?: {
    inclusive?: boolean;
    latest?: string;
    oldest?: string;
  };
}
interface ChannelSetPurposeParams {
  channelId: string;
  purpose: string;
}
interface ChannelSetTopicParams {
  channelId: string;
  topic: string;
}
interface ChannelUnarchiveParams {
  channelId: string;
}
interface MessageGetPermalinkParams {
  channelId: string;
  timestamp: number;
}
interface MessagePostParams {
  select: 'channel' | 'user';
  channelId: string;
  user: { value: string; mode: string };
  messageType: 'text' | 'block' | 'attachment';
  blocksUi: Record<string, any>;
  text?: string;
  noticeAttachments?: string;
  attachments?: {
    fallback?: string;
    text?: string;
    title?: string;
    title_link?: string;
    color?: string;
    pretext?: string;
    author_name?: string;
    author_link?: string;
    author_icon?: string;
    image_url?: string;
    thumb_url?: string;
    footer?: string;
    footer_icon?: string;
    ts?: number;
    fields?: {
      item?: {
        title?: string;
        value?: string;
        short?: boolean;
      };
    };
  };
  otherOptions?: {
    botProfile?: {
      imageValues?: {
        profilePhotoType?: 'image' | 'emoji';
        icon_emoji?: string;
        icon_url?: string;
      };
    };
    link_names?: boolean;
    thread_ts?: {
      replyValues?: {
        thread_ts?: number;
        reply_broadcast?: boolean;
      };
    };
    mrkdwn?: boolean;
    unfurl_links?: boolean;
    unfurl_media?: boolean;
    channelEphemeral?: {
      ephemeralValues?: {
        user: { value: string; mode: string };
        ephemeral?: boolean;
      };
    };
    userEphemeral?: boolean;
    sendAsUser?: string;
  };
}
interface MessageUpdateParams {
  channelId: string;
  ts: number;
  text?: string;
  updateFields?: {
    link_names?: boolean;
    parse?: 'client' | 'full' | 'none';
  };
}
interface MessageDeleteParams {
  select: 'channel' | 'user';
  channelId: string;
  user: { value: string; mode: string };
  timestamp: number;
}
interface MessageSearchParams {
  query: string;
  sort?: 'desc' | 'asc' | 'relevance';
  returnAll?: boolean;
  limit?: number;
  options?: {
    searchChannel?: string[];
  };
}
interface StarAddParams {
  target: 'message' | 'file';
  channelId: string;
  fileId?: string;
  timestamp?: number;
  options?: {
    fileComment?: string;
  };
}
interface StarDeleteParams {
  options?: {
    channelId?: string;
    fileId?: string;
    fileComment?: string;
    timestamp?: number;
  };
}
interface StarGetAllParams {
  returnAll?: boolean;
  limit?: number;
}
interface FileGetAllParams {
  returnAll?: boolean;
  limit?: number;
  filters?: {
    channelId?: string;
    showFilesHidden?: boolean;
    tsFrom?: string;
    tsTo?: string;
    types?: Array<
      'all' | 'gdocs' | 'images' | 'pdfs' | 'snippets' | 'spaces' | 'zips'
    >;
    userId?: string;
  };
}
interface FileGetParams {
  fileId?: string;
}
interface ReactionAddParams {
  channelId: string;
  timestamp: number;
  name: string;
}
interface ReactionGetParams {
  channelId: string;
  timestamp: number;
}
interface ReactionRemoveParams {
  channelId: string;
  timestamp: number;
  name: string;
}
interface UserInfoParams {
  user: { value: string; mode: string };
}
interface UserGetAllParams {
  returnAll?: boolean;
  limit?: number;
}
interface UserGetPresenceParams {
  user: { value: string; mode: string };
}
interface UserUpdateProfileParams {
  options?: {
    customFieldUi?: {
      customFieldValues?: {
        id?: string;
        value?: string;
        alt?: string;
      };
    };
    email?: string;
    first_name?: string;
    last_name?: string;
    status?: {
      set_status?: {
        status_emoji?: string;
        status_expiration?: string;
        status_text?: string;
      };
    };
    user?: { value: string; mode: string };
  };
}
interface UserGroupCreateParams {
  name: string;
  options?: {
    channelIds?: string[];
    description?: string;
    handle?: string;
    include_count?: boolean;
  };
}
interface UserGroupDisableParams {
  userGroupId: string;
  options?: {
    include_count?: boolean;
  };
}
interface UserGroupEnableParams {
  userGroupId: string;
  options?: {
    include_count?: boolean;
  };
}
interface UserGroupGetAllParams {
  returnAll?: boolean;
  limit?: number;
  options?: {
    include_count?: boolean;
    include_disabled?: boolean;
    include_users?: boolean;
  };
}
interface UserGroupUpdateParams {
  userGroupId: string;
  updateFields?: {
    channels?: string[];
    description?: string;
    handle?: string;
    include_count?: boolean;
    name?: string;
  };
}

interface SlackOperationParams {
  toolType: ToolType;

  channelArchiveParams?: ChannelArchiveParams;
  channelCloseParams?: ChannelCloseParams;
  channelCreateParams?: ChannelCreateParams;
  channelInviteParams?: ChannelInviteParams;
  channelGetParams?: ChannelGetParams;
  channelKickParams?: ChannelKickParams;
  channelJoinParams?: ChannelJoinParams;
  channelGetAllParams?: ChannelGetAllParams;
  channelHistoryParams?: ChannelHistoryParams;
  channelLeaveParams?: ChannelLeaveParams;
  channelMemberParams?: ChannelMemberParams;
  channelOpenParams?: ChannelOpenParams;
  channelRenameParams?: ChannelRenameParams;
  channelRepliesParams?: ChannelRepliesParams;
  channelSetPurposeParams?: ChannelSetPurposeParams;
  channelSetTopicParams?: ChannelSetTopicParams;
  channelUnarchiveParams?: ChannelUnarchiveParams;
  messageGetPermalinkParams?: MessageGetPermalinkParams;
  messagePostParams?: MessagePostParams;
  messageUpdateParams?: MessageUpdateParams;
  messageDeleteParams?: MessageDeleteParams;
  messageSearchParams?: MessageSearchParams;
  starAddParams?: StarAddParams;
  starDeleteParams?: StarDeleteParams;
  starGetAllParams?: StarGetAllParams;
  fileGetAllParams?: FileGetAllParams;
  fileGetParams?: FileGetParams;
  reactionAddParams?: ReactionAddParams;
  reactionGetParams?: ReactionGetParams;
  reactionRemoveParams?: ReactionRemoveParams;
  userInfoParams?: UserInfoParams;
  userGetAllParams?: UserGetAllParams;
  userGetPresenceParams?: UserGetPresenceParams;
  userUpdateProfileParams?: UserUpdateProfileParams;
  userGroupCreateParams?: UserGroupCreateParams;
  userGroupDisableParams?: UserGroupDisableParams;
  userGroupEnableParams?: UserGroupEnableParams;
  userGroupGetAllParams?: UserGroupGetAllParams;
  userGroupUpdateParams?: UserGroupUpdateParams;
}

export interface ExecuteSlackOperationAuth {
  token: string;
  type: SlackAuthType;
}

export interface ExecuteSlackOperationReq {
  params: SlackOperationParams;
}

export type ExecuteSlackOperationRes = Result<Record<string, any> | undefined>;

export class ExecuteSlackOperation
  implements
    IUseCase<
      ExecuteSlackOperationReq,
      ExecuteSlackOperationRes,
      ExecuteSlackOperationAuth
    >
{
  #params?: SlackOperationParams;
  #auth?: ExecuteSlackOperationAuth;
  #api: IExternalApi<SlackToolProps>;

  constructor(hubspotApi: IExternalApi<SlackToolProps>) {
    this.#api = hubspotApi;
  }

  async execute(props: {
    req: ExecuteSlackOperationReq;
    auth: ExecuteSlackOperationAuth;
  }): Promise<ExecuteSlackOperationRes> {
    this.#params = props.req.params;
    this.#auth = props.auth;

    let returnData: ApiResponseData | undefined;
    try {
      switch (this.#params.toolType) {
        case 'slack-channel-archive':
          returnData = await this.execChannelArchive();
          break;
        case 'slack-channel-close':
          returnData = await this.execChannelClose();
          break;
        case 'slack-channel-create':
          returnData = await this.execChannelCreate();
          break;
        case 'slack-channel-kick':
          returnData = await this.execChannelKick();
          break;
        case 'slack-channel-join':
          returnData = await this.execChannelJoin();
          break;
        case 'slack-channel-get':
          returnData = await this.execChannelGet();
          break;
        case 'slack-channel-get-many':
          returnData = await this.execChannelGetMany();
          break;
        case 'slack-channel-history':
          returnData = await this.execChannelHistory();
          break;
        case 'slack-channel-invite':
          returnData = await this.#execChannelInvite();
          break;
        case 'slack-channel-leave':
          returnData = await this.#execChannelLeave();
          break;
        case 'slack-channel-member':
          returnData = await this.#execChannelMember();
          break;
        case 'slack-channel-open':
          returnData = await this.#execChannelOpen();
          break;
        case 'slack-channel-rename':
          returnData = await this.#execChannelRename();
          break;
        case 'slack-channel-reply':
          returnData = await this.#execChannelReplies();
          break;
        case 'slack-channel-set-purpose':
          returnData = await this.#execChannelSetPurpose();
          break;
        case 'slack-channel-set-topic':
          returnData = await this.#execChannelSetTopic();
          break;
        case 'slack-channel-unarchive':
          returnData = await this.#execChannelUnarchive();
          break;
        case 'slack-message-send':
          returnData = await this.#execMessageSend();
          break;
        case 'slack-message-update':
          returnData = await this.#execMessageUpdate();
          break;
        case 'slack-message-delete':
          returnData = await this.#execMessageDelete();
          break;
        case 'slack-message-get-permalink':
          returnData = await this.#execMessageGetPermalink();
          break;
        case 'slack-message-search':
          returnData = await this.#execMessageSearch();
          break;
        case 'slack-reaction-add':
          returnData = await this.#execReactionAdd();
          break;
        case 'slack-reaction-remove':
          returnData = await this.#execReactionRemove();
          break;
        case 'slack-reaction-get':
          returnData = await this.#execReactionGet();
          break;
        case 'slack-star-add':
          returnData = await this.#execStarAdd();
          break;
        case 'slack-star-delete':
          returnData = await this.#execStarDelete();
          break;
        case 'slack-star-get-many':
          returnData = await this.#execStarGetMany();
          break;
        case 'slack-file-get-many':
          returnData = await this.#execFileGetAll();
          break;
        case 'slack-file-get':
          returnData = await this.#execFileGet();
          break;
        case 'slack-user-get':
          returnData = await this.#execUserGet();
          break;
        case 'slack-user-get-many':
          returnData = await this.#execUserGetAll();
          break;
        case 'slack-user-update-profile':
          returnData = await this.#execUserUpdateProfile();
          break;
        case 'slack-user-get-status':
          returnData = await this.#execUserGetPresence();
          break;
        case 'slack-user-group-create':
          returnData = await this.#execUserGroupCreate();
          break;
        case 'slack-user-group-enable':
          returnData = await this.#execUserGroupEnable();
          break;
        case 'slack-user-group-disable':
          returnData = await this.#execUserGroupDisable();
          break;
        case 'slack-user-group-get-many':
          returnData = await this.#execUserGroupGetAll();
          break;
        case 'slack-user-group-update':
          returnData = await this.#execUserGroupUpdate();
          break;
        default:
          throw new Error(
            `The operation "${props.req.params.toolType}" is not known!`
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

  #execUserGroupUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGroupUpdateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { userGroupId, updateFields } = this.#params.userGroupUpdateParams;

    const body: Record<string, unknown> = {
      usergroup: userGroupId,
    };

    Object.assign(body, updateFields);

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'usergroups.update',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.usergroup;
  };

  #execUserGroupGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGroupGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, options, limit } = this.#params.userGroupGetAllParams;

    const qs: Record<string, string | string[]> = {};

    Object.assign(qs, options);

    const apiResponse = await this.#api.apiRequest(
      'GET',
      'usergroups.list',
      this.#auth.token,
      undefined,
      qs
    );

    const data = apiResponse.data?.usergroups;
    return !returnAll ? data.slice(0, limit) : data;
  };

  #execUserGroupDisable = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGroupDisableParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { userGroupId, options } = this.#params.userGroupDisableParams;

    const body: Record<string, unknown> = {
      usergroup: userGroupId,
    };

    Object.assign(body, options);

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'usergroups.disable',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.usergroup;
  };

  #execUserGroupEnable = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGroupEnableParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { userGroupId, options } = this.#params.userGroupEnableParams;

    const body: Record<string, unknown> = {
      usergroup: userGroupId,
    };

    Object.assign(body, options);

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'usergroups.enable',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.usergroup;
  };

  #execUserGroupCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGroupCreateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { name, options } = this.#params.userGroupCreateParams;

    const body: Record<string, unknown> = {
      name,
    };

    Object.assign(body, options);

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'usergroups.create',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.usergroup;
  };

  #execUserGetPresence = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGetPresenceParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { user } = this.#params.userGetPresenceParams;

    const qs: Record<string, string | string[]> = { user: user?.value };

    const apiResponse = await this.#api.apiRequest(
      'GET',
      'users.getPresence',
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data;
  };

  #execUserUpdateProfile = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userUpdateProfileParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { options } = this.#params.userUpdateProfileParams;

    const body: Record<string, unknown> = {};
    let status;
    if (options?.status) {
      status = (
        (options.status as Record<string, unknown>)?.set_status as Array<
          Record<string, unknown>
        >
      )[0];
      if (status.status_expiration === undefined) {
        status.status_expiration = 0;
      } else {
        if (typeof status.status_expiration !== 'string')
          throw new Error('Status expiration must be a string');
        status.status_expiration =
          new Date(status.status_expiration).getTime() / 1000;
      }
      Object.assign(body, status);
      delete options.status;
    }

    const fields: Record<string, unknown> = {};
    if (options?.customFieldUi) {
      const customFields = (options.customFieldUi as Record<string, unknown>)
        .customFieldValues as Array<Record<string, unknown>>;

      for (const customField of customFields) {
        fields[customField.id as string] = {
          value: customField.value,
          alt: customField.alt,
        };
      }
    }
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'users.profile.set',
      this.#auth.token,
      { profile: { ...options, fields } },
      undefined
    );

    return apiResponse.data?.profile;
  };

  #execUserGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, limit } = this.#params.userGetAllParams;

    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'users.list',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'members' },
      });
      return apiResponse.data;
    } else {
      const apiResponse = await this.#api.apiRequest(
        'GET',
        'users.list',
        this.#auth.token,
        undefined,
        limit ? { limit: limit.toString() } : undefined
      );
      return apiResponse.data?.members;
    }
  };

  #execUserGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.userInfoParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { user } = this.#params.userInfoParams;

    const qs: Record<string, string | string[]> = { user: user?.value };

    const apiResponse = await this.#api.apiRequest(
      'GET',
      'users.info',
      this.#auth.token,
      undefined,
      qs
    );
    return apiResponse.data?.user;
  };

  #execFileGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.fileGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { fileId } = this.#params.fileGetParams;

    const apiResponse = await this.#api.apiRequest(
      'GET',
      'files.info',
      this.#auth.token,
      undefined,
      fileId ? { file: fileId } : undefined
    );
    return apiResponse.data?.file;
  };

  #execFileGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.fileGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, filters, limit } = this.#params.fileGetAllParams;

    const qs: Record<string, string | string[]> = {};

    if (filters?.channelId) {
      qs.channel = filters.channelId;
    }
    if (filters?.showFilesHidden) {
      qs.show_files_hidden_by_limit = filters.showFilesHidden.toString();
    }
    if (filters?.tsFrom) {
      qs.ts_from = filters.tsFrom;
    }
    if (filters?.tsTo) {
      qs.ts_to = filters.tsTo;
    }
    if (filters?.types) {
      qs.types = filters.types.join(',');
    }
    if (filters?.userId) {
      qs.user = filters.userId;
    }
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'files.list',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'files' },
        query: qs,
      });
      return apiResponse.data;
    } else {
      if (limit) qs.count = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        'files.list',
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.files;
    }
  };

  #execStarGetMany = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.starGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, limit } = this.#params.starGetAllParams;

    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'stars.list',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'items' },
      });

      return apiResponse.data;
    } else {
      const apiResponse = await this.#api.apiRequest(
        'GET',
        '/stars.list',
        this.#auth.token,
        undefined,
        limit
          ? {
              limit: limit.toString(),
            }
          : undefined
      );
      return apiResponse.data;
    }
  };

  #execStarDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.starDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { options } = this.#params.starDeleteParams;

    const body: Record<string, unknown> = {};
    if (options?.channelId) {
      body.channel = options.channelId;
    }
    if (options?.fileId) {
      body.file = options.fileId;
    }
    if (options?.fileComment) {
      body.file_comment = options.fileComment;
    }
    if (options?.timestamp) {
      body.timestamp = options.timestamp.toString();
    }

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'stars.remove',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #execStarAdd = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.starAddParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { options, target, channelId, timestamp, fileId } =
      this.#params.starAddParams;

    const body: Record<string, unknown> = { channel: channelId };

    if (target === 'message') {
      body.timestamp = timestamp?.toString();
    }
    if (target === 'file') {
      const file = fileId;
      body.file = file;
    }
    if (options?.fileComment) {
      body.file_comment = options?.fileComment;
    }
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'stars.add',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #execReactionGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.reactionGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, timestamp } = this.#params.reactionGetParams;

    const qs: Record<string, string | string[]> = {
      channel: channelId,
    };

    if (timestamp) qs.timestamp = timestamp.toString();

    const apiResponse = await this.#api.apiRequest(
      'GET',
      'reactions.get',
      this.#auth.token,
      undefined,
      qs
    );
    return apiResponse.data;
  };

  #execReactionRemove = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.reactionRemoveParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, timestamp, name } = this.#params.reactionRemoveParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      name,
      timestamp,
    };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'reactions.remove',
      this.#auth.token,
      body,
      undefined
    );
    return apiResponse.data;
  };

  #execReactionAdd = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.reactionAddParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, timestamp, name } = this.#params.reactionAddParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      name,
      timestamp,
    };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'reactions.add',
      this.#auth.token,
      body,
      undefined
    );
    return apiResponse.data;
  };

  #execMessageSearch = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.messageSearchParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { query, sort, returnAll, options, limit } =
      this.#params.messageSearchParams;

    let localQuery = query;
    if (options?.searchChannel) {
      const channel = options?.searchChannel;
      for (const channelItem of channel) {
        localQuery += ` in:${channelItem}`;
      }
    }
    const qs: Record<string, string | string[]> = {
      localQuery,
      sort: sort === 'relevance' ? 'score' : 'timestamp',
      sort_dir: sort === 'asc' ? 'asc' : 'desc',
    };
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'chat.getPermalink',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'messages' },
        query: qs,
      });
      return apiResponse.data;
    } else {
      if (limit) qs.count = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'POST',
        'search.messages',
        this.#auth.token,
        undefined,
        qs
      );

      return apiResponse.data?.messages.matches;
    }
  };

  #execMessageGetPermalink = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.messageGetPermalinkParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, timestamp } = this.#params.messageGetPermalinkParams;

    const qs: Record<string, string | string[]> = {
      channel: channelId,
      message_ts: timestamp.toString(),
    };

    const apiResponse = await this.#api.apiRequest(
      'GET',
      'chat.getPermalink',
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data;
  };

  #execMessageDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.messageDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { select, channelId, user, timestamp } =
      this.#params.messageDeleteParams;

    let target = select === 'channel' ? channelId : user?.value;

    if (!target)
      throw new Error(`target object undefined for message delete operation`);

    if (select === 'user' && user?.mode === 'username') {
      target = target.slice(0, 1) === '@' ? target : `@${target}`;
    }

    const body: Record<string, unknown> = {
      channel: target,
      ts: timestamp.toString(),
    };
    // Add all the other options to the request
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'chat.delete',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #execMessageUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.messageUpdateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, text, ts, updateFields } =
      this.#params.messageUpdateParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      text,
      ts,
    };

    // Add all the other options to the request
    Object.assign(body, updateFields);

    const apiResponse = await this.#api.apiRequest(
      'POST',
      `chat.update`,
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #execMessageSend = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.messagePostParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const auth = this.#auth;

    const {
      select,
      messageType,
      channelId,
      user,
      otherOptions,
      text,
      blocksUi,
      attachments,
    } = this.#params.messagePostParams;

    let target = select === 'channel' ? channelId : user?.value;

    if (!target)
      throw new Error(`target object undefined for message send operation`);

    if (select === 'user' && user?.mode === 'username') {
      target = target.slice(0, 1) === '@' ? target : `@${target}`;
    }

    let content: Record<string, unknown> = {};
    switch (messageType) {
      case 'text':
        content = { text };
        break;
      case 'block':
        content = blocksUi;
        if (text) {
          content.text = text;
        }
        break;
      case 'attachment':
        content = {
          attachments,
        };
        break;
    }
    const body: Record<string, unknown> = {
      channel: target,
      ...content,
    };
    if (
      auth.type === 'accessToken' &&
      otherOptions?.sendAsUser !== '' &&
      otherOptions?.sendAsUser !== undefined
    ) {
      body.username = otherOptions.sendAsUser;
    }

    let action = 'postMessage';
    if (otherOptions?.userEphemeral || otherOptions?.channelEphemeral) {
      if (select === 'channel') {
        const ephemeral = otherOptions?.channelEphemeral;
        if (!ephemeral) throw new Error('channelEphemeral option missing');
        const ephemeralValues = ephemeral.ephemeralValues;
        const userRlc = ephemeralValues?.user;
        if (!userRlc) throw new Error('user option missing');
        body.user =
          userRlc.value?.toString().slice(0, 1) !== '@' &&
          userRlc.mode === 'username'
            ? `@${userRlc.value}`
            : userRlc.value;
        action = 'postEphemeral';
      } else if (select === 'user') {
        body.user = target;
        action = 'postEphemeral';
      }
    }

    const replyValues = (otherOptions?.thread_ts as Record<string, unknown>)
      ?.replyValues as Record<string, unknown>;
    Object.assign(body, replyValues);
    delete otherOptions?.thread_ts;
    delete otherOptions?.userEphemeral;
    delete otherOptions?.channelEphemeral;
    if (otherOptions?.botProfile) {
      const botProfile = otherOptions.botProfile as Record<string, unknown>;
      const botProfileValues = botProfile.imageValues as Record<
        string,
        unknown
      >;
      Object.assign(
        body,
        botProfileValues.profilePhotoType === 'image'
          ? { icon_url: botProfileValues.icon_url }
          : { icon_emoji: botProfileValues.icon_emoji }
      );
    }
    delete otherOptions?.botProfile;
    Object.assign(body, otherOptions);
    if (
      select === 'user' &&
      action === 'postEphemeral' &&
      user?.mode === 'username'
    ) {
      throw new Error(
        'You cannot send ephemeral messages using User type "By username". Please use "From List" or "By ID".'
      );
    } else {
      const apiResponse = await this.#api.apiRequest(
        'POST',
        `chat.${action}`,
        auth.token,
        body,
        undefined
      );
      return apiResponse.data;
    }
  };

  #execChannelUnarchive = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelUnarchiveParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId } = this.#params.channelUnarchiveParams;

    const body: Record<string, unknown> = {
      channel: channelId,
    };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.unarchive',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #execChannelSetTopic = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelSetTopicParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, topic } = this.#params.channelSetTopicParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      topic,
    };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.setTopic',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.channel;
  };

  #execChannelSetPurpose = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelSetPurposeParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, purpose } = this.#params.channelSetPurposeParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      purpose,
    };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.setPurpose',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.channel;
  };

  #execChannelReplies = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelRepliesParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, ts, returnAll, filters, limit } =
      this.#params.channelRepliesParams;

    const qs: Record<string, string | string[]> = { channel: channelId };
    if (ts) qs.ts = ts.toString();
    if (filters?.inclusive) {
      qs.inclusive = filters.inclusive.toString();
    }
    if (filters?.latest) {
      qs.latest = (new Date(filters.latest).getTime() / 1000).toString();
    }
    if (filters?.oldest) {
      qs.oldest = (new Date(filters.oldest).getTime() / 1000).toString();
    }

    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'conversations.replies',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'messages' },
        query: qs,
      });
      return apiResponse.data;
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        'conversations.replies',
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.messages;
    }
  };

  #execChannelRename = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelRenameParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, name } = this.#params.channelRenameParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      name,
    };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.rename',
      this.#auth.token,
      body,
      undefined
    );
    return apiResponse.data?.channel;
  };

  #execChannelOpen = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelOpenParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { options } = this.#params.channelOpenParams;

    const body: Record<string, unknown> = {};
    if (options?.channelId) {
      body.channel = options.channelId;
    }
    if (options?.returnIm) {
      body.return_im = options.returnIm;
    }
    if (options?.users) {
      body.users = options.users.join(',');
    }
    const apiResponse = await this.#api.apiRequest(
      'GET',
      'conversations.open',
      this.#auth.token,
      body,
      undefined
    );
    return apiResponse.data?.channel;
  };

  #execChannelMember = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelMemberParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, resolveData, channelId, limit } =
      this.#params.channelMemberParams;

    const qs: Record<string, string | string[]> = { channel: channelId };
    let returnData: any[] | undefined;

    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'conversations.members',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'members' },
        query: qs,
      });
      returnData = apiResponse.data?.map((member: string) => ({ member }));
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        'conversations.members',
        this.#auth.token,
        undefined,
        qs
      );
      returnData = apiResponse.data?.map((member: string) => ({ member }));
    }

    if (resolveData) {
      if (!returnData) throw new Error('No data to resolve');
      const data: Array<Record<string, unknown>> = [];
      for (const { member } of returnData) {
        const apiResponse = await this.#api.apiRequest(
          'GET',
          'users.info',
          this.#auth.token,
          undefined,
          { user: member }
        );

        data.push(apiResponse.data?.user);
      }
      returnData = data;
    }

    return returnData;
  };

  #execChannelLeave = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelLeaveParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId } = this.#params.channelLeaveParams;

    const body: Record<string, unknown> = {
      channel: channelId,
    };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.leave',
      this.#auth.token,
      body
    );

    return apiResponse.data?.channel;
  };

  #execChannelInvite = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.channelInviteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, userIds } = this.#params.channelInviteParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      users: userIds,
    };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.inivite',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.channel;
  };

  private async execChannelHistory(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelHistoryParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, returnAll, filters, limit } =
      this.#params.channelHistoryParams;

    const qs: Record<string, string | string[]> = { channel: channelId };

    if (filters?.inclusive) {
      qs.inclusive = filters.inclusive.toString();
    }
    if (filters?.latest) {
      qs.latest = (new Date(filters.latest).getTime() / 1000).toString();
    }
    if (filters?.oldest) {
      qs.oldest = (new Date(filters.oldest).getTime() / 1000).toString();
    }
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'conversations.history',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'messages' },
        query: qs,
      });
      return apiResponse.data;
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        'conversations.history',
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.messages;
    }
  }

  private async execChannelGetMany(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, filters, limit } = this.#params.channelGetAllParams;

    const qs: Record<string, string | string[]> = {};

    if (filters?.types) {
      qs.types = filters.types.join(',');
    }
    if (filters?.excludeArchived) {
      qs.exclude_archived = filters.excludeArchived.toString();
    }

    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint: 'conversations.list',
        authToken: this.#auth.token,
        toolProps: { propertyName: 'channels' },
        query: qs,
      });
      return apiResponse.data;
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'POST',
        'conversations.list',
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.channels;
    }
  }

  private async execChannelJoin(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelJoinParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId } = this.#params.channelJoinParams;

    const body: Record<string, unknown> = {
      channel: channelId,
    };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.join',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.channel;
  }

  private async execChannelKick(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelKickParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, userId } = this.#params.channelKickParams;

    const body: Record<string, unknown> = {
      channel: channelId,
      user: userId,
    };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.kick',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  }

  private async execChannelCreate(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelCreateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId, channelVisibility } = this.#params.channelCreateParams;

    const body: Record<string, unknown> = {
      name: channelId[0] === '#' ? channelId.slice(1) : channelId,
      is_private: channelVisibility === 'private',
    };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.create',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data?.channel;
  }

  private async execChannelClose(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelCloseParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId } = this.#params.channelCloseParams;

    const body: Record<string, unknown> = { channel: channelId };
    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.close',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  }

  private async execChannelArchive(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelArchiveParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId } = this.#params.channelArchiveParams;

    const body: Record<string, unknown> = { channel: channelId };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.archive',
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  }

  private async execChannelGet(): Promise<ApiResponseData | undefined> {
    if (!this.#params?.channelGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { channelId } = this.#params.channelGetParams;
    const qs: Record<string, string | string[]> = { channel: channelId };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      'conversations.info',
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data?.channel;
  }
}
