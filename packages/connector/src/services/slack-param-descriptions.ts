/*
Heavily borrowed from https://github.com/n8n-io/n8n.
*/

export default {
  baseParams: {
    authToken:
      'A string value that holds the personal access token to use the Slack API',
  },

  channelArchiveParams: {
    channelId: '#description-placeholder',
  },
  channelCloseParams: {
    channelId: '#description-placeholder',
  },
  channelCreateParams: {
    channelId: '#description-placeholder',
    channelVisibility: '#description-placeholder',
  },
  channelInviteParams: {
    channelId: '#description-placeholder',
    userIds: '#description-placeholder',
  },
  channelGetParams: {
    channelId: '#description-placeholder',
    options: {
      includeNumMembers: '#description-placeholder',
    },
  },
  channelKickParams: {
    channelId: '#description-placeholder',
    userId: '#description-placeholder',
  },
  channelJoinParams: {
    channelId: '#description-placeholder',
  },
  channelGetAllParams: {
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    filters: {
      excludeArchived: '#description-placeholder',
      types: '#description-placeholder',
    },
  },
  channelHistoryParams: {
    channelId: '#description-placeholder',
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    filters: {
      inclusive: '#description-placeholder',
      latest: '#description-placeholder',
      oldest: '#description-placeholder',
    },
  },
  channelLeaveParams: {
    channelId: '#description-placeholder',
  },
  channelMemberParams: {
    channelId: '#description-placeholder',
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    resolveData: '#description-placeholder',
  },
  channelOpenParams: {
    options: {
      channelId: '#description-placeholder',
      returnIm: '#description-placeholder',
      users: '#description-placeholder',
    },
  },
  channelRenameParams: {
    channelId: '#description-placeholder',
    name: '#description-placeholder',
  },
  channelRepliesParams: {
    channelId: '#description-placeholder',
    ts: '#description-placeholder',
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    filters: {
      inclusive: '#description-placeholder',
      latest: '#description-placeholder',
      oldest: '#description-placeholder',
    },
  },
  channelSetPurposeParams: {
    channelId: '#description-placeholder',
    purpose: '#description-placeholder',
  },
  channelSetTopicParams: {
    channelId: '#description-placeholder',
    topic: '#description-placeholder',
  },
  channelUnarchiveParams: {
    channelId: '#description-placeholder',
  },
  messageGetPermalinkParams: {
    channelId: '#description-placeholder',
    timestamp: '#description-placeholder',
  },
  messagePostParams: {
    select: '#description-placeholder',
    channelId: '#description-placeholder',
    user: {
      value: '#description-placeholder',
      mode: '#description-placeholder',
    },
    messageType: '#description-placeholder',
    blocksUi: '#description-placeholder',
    text: '#description-placeholder',
    noticeAttachments: '#description-placeholder',
    attachments: {
      fallback: '#description-placeholder',
      text: '#description-placeholder',
      title: '#description-placeholder',
      title_link: '#description-placeholder',
      color: '#description-placeholder',
      pretext: '#description-placeholder',
      author_name: '#description-placeholder',
      author_link: '#description-placeholder',
      author_icon: '#description-placeholder',
      image_url: '#description-placeholder',
      thumb_url: '#description-placeholder',
      footer: '#description-placeholder',
      footer_icon: '#description-placeholder',
      ts: '#description-placeholder',
      fields: {
        item: {
          title: '#description-placeholder',
          value: '#description-placeholder',
          short: '#description-placeholder',
        },
      },
    },
    otherOptions: {
      botProfile: {
        imageValues: {
          profilePhotoType: '#description-placeholder',
          icon_emoji: '#description-placeholder',
          icon_url: '#description-placeholder',
        },
      },
      link_names: '#description-placeholder',
      thread_ts: {
        replyValues: {
          thread_ts: '#description-placeholder',
          reply_broadcast: '#description-placeholder',
        },
      },
      mrkdwn: '#description-placeholder',
      unfurl_links: '#description-placeholder',
      unfurl_media: '#description-placeholder',
      channelEphemeral: {
        ephemeralValues: {
          user: {
            value: '#description-placeholder',
            mode: '#description-placeholder',
          },
          ephemeral: '#description-placeholder',
        },
      },
      userEphemeral: '#description-placeholder',
      uendAsUser: '#description-placeholder',
    },
  },
  messageUpdateParams: {
    channelId: '#description-placeholder',
    ts: '#description-placeholder',
    text: '#description-placeholder',
    updateFields: {
      link_names: '#description-placeholder',
      parse: '#description-placeholder',
    },
  },
  messageDeleteParams: {
    select: '#description-placeholder',
    channelId: '#description-placeholder',
    user: {
      value: '#description-placeholder',
      mode: '#description-placeholder',
    },
    timestamp: '#description-placeholder',
  },
  messageSearchParams: {
    query: '#description-placeholder',
    sort: '#description-placeholder',
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    options: {
      searchchannel: '#description-placeholder',
    },
  },
  starAddParams: {
    target: '#description-placeholder',
    channelId: '#description-placeholder',
    fileId: '#description-placeholder',
    timestamp: '#description-placeholder',
    options: {
      fileComment: '#description-placeholder',
    },
  },
  starDeleteParams: {
    options: {
      channelId: '#description-placeholder',
      fileId: '#description-placeholder',
      fileComment: '#description-placeholder',
      timestamp: '#description-placeholder',
    },
  },
  starGetAllParams: {
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
  },
  fileGetAllParams: {
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    filters: {
      channelId: '#description-placeholder',
      showFilesHidden: '#description-placeholder',
      tsFrom: '#description-placeholder',
      tsTo: '#description-placeholder',
      types: '#description-placeholder',
      userId: '#description-placeholder',
    },
  },
  fileGetParams: {
    fileId: '#description-placeholder',
  },
  reactionAddParams: {
    channelId: '#description-placeholder',
    timestamp: '#description-placeholder',
    name: '#description-placeholder',
  },
  reactionGetParams: {
    channelId: '#description-placeholder',
    timestamp: '#description-placeholder',
  },
  reactionRemoveParams: {
    channelId: '#description-placeholder',
    timestamp: '#description-placeholder',
    name: '#description-placeholder',
  },
  userInfoParams: {
    user: {
      value: '#description-placeholder',
      mode: '#description-placeholder',
    },
  },
  userGetAllParams: {
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
  },
  userGetPresenceParams: {
    user: {
      value: '#description-placeholder',
      mode: '#description-placeholder',
    },
  },
  userUpdateProfileParams: {
    options: {
      customFieldUi: {
        customFieldValues: {
          id: '#description-placeholder',
          value: '#description-placeholder',
          alt: '#description-placeholder',
        },
      },
      email: '#description-placeholder',
      first_name: '#description-placeholder',
      last_name: '#description-placeholder',
      status: {
        set_status: {
          status_emoji: '#description-placeholder',
          status_expiration: '#description-placeholder',
          status_text: '#description-placeholder',
        },
      },
      user: {
        value: '#description-placeholder',
        mode: '#description-placeholder',
      },
    },
  },
  userGroupCreateParams: {
    name: '#description-placeholder',
    options: {
      channelIds: '#description-placeholder',
      description: '#description-placeholder',
      handle: '#description-placeholder',
      include_count: '#description-placeholder',
    },
  },
  userGroupDisableParams: {
    userGroupId: '#description-placeholder',
    options: {
      include_count: '#description-placeholder',
    },
  },
  userGroupEnableParams: {
    userGroupId: '#description-placeholder',
    options: {
      include_count: '#description-placeholder',
    },
  },
  userGroupGetAllParams: {
    returnAll: '#description-placeholder',
    limit: '#description-placeholder',
    options: {
      include_count: '#description-placeholder',
      include_disabled: '#description-placeholder',
      include_users: '#description-placeholder',
    },
  },
  userGroupUpdateParams: {
    userGroupId: '#description-placeholder',
    updateFields: {
      channels: '#description-placeholder',
      description: '#description-placeholder',
      handle: '#description-placeholder',
      include_count: '#description-placeholder',
      name: '#description-placeholder',
    },
  },
};
