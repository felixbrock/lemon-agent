/*
Heavily borrowed from https://github.com/n8n-io/n8n.
*/

export default {
  baseParams: {
    owner: 'The owner of the repository',
    repository: 'The name of the repository',
  },

  fileListParamDescription: {
    filePath: 'The path of the folder to list',
  },
  fileCreateParamDescription: {
    binaryData: 'Whether the data to upload should be taken from binary field',
    fileContent: 'The text content of the file',
    binaryPropertyName:
      'Name of the binary property which contains the data for the file',
    additionalParameters: {
      author: {
        name: 'The name of the author of the commit',
        email: 'The email of the author of the commit',
      },
      branch: {
        branch:
          'The branch to commit to. If not set the repository’s default branch (usually master) is used.',
      },
      committer: {
        name: 'The name of the committer of the commit',
        email: 'The email of the committer of the commit',
      },
    },
  },
  fileEditParamDescription: {
    binaryData: 'Whether the data to upload should be taken from binary field',
    fileContent: 'The text content of the file',
    binaryPropertyName:
      'Name of the binary property which contains the data for the file',
    additionalParameters: {
      author: {
        name: 'The name of the author of the commit',
        email: 'The email of the author of the commit',
      },
      branch: {
        branch:
          'The branch to commit to. If not set the repository’s default branch (usually master) is used.',
      },
      committer: {
        name: 'The name of the committer of the commit',
        email: 'The email of the committer of the commit',
      },
    },
  },
  fileDeleteParamDescription: {
    additionalParameters: {
      author: {
        name: 'The name of the author of the commit',
        email: 'The email of the author of the commit',
      },
      branch: {
        branch:
          'The branch to commit to. If not set the repository’s default branch (usually master) is used.',
      },
      committer: {
        name: 'The name of the committer of the commit',
        email: 'The email of the committer of the commit',
      },
    },
  },
  fileGetParamDescription: {
    asBinaryProperty:
      'Whether to set the data of the file as binary property instead of returning the raw API response',
    binaryPropertyName:
      'Name of the binary property in which to save the binary data of the received file',
    additionalParameters: {
      reference:
        'The name of the commit/branch/tag. Default: the repository’s default branch (usually master).',
    },
  },
  issueCreateParamDescription: {
    title: 'The title of the issue',
    body: 'The body of the issue',
    labels: {
      label: 'Label to add to issue',
    },
    assignees: {
      assignee: 'User to assign issue too',
    },
  },
  issueCreateCommentParamDescription: {
    issueNumber: 'The number of the issue on which to create the comment on',
    body: 'The body of the comment',
  },
  issueEditParamDescription: {
    issueNumber: 'The number of the issue edit',
    editFields: {
      title: 'The title of the issue',
      body: 'The body of the issue',
      state: 'closed | open',
      labels: {
        label: 'Label to add to issue',
      },
      assignees: {
        assignee: 'User to assign issue to',
      },
    },
  },
  issueGetParamDescription: {
    issueNumber: 'The number of the issue get data of',
  },
  issueLockParamDescription: {
    issueNumber: 'The number of the issue to lock',
    lockReason: 'off-topic | too heated | resolved | spam',
  },
  releaseCreateParamDescription: {
    releaseTag: 'The tag of the release',
    additionalFields: {
      name: 'The name of the issue',
      body: 'The body of the release',
      draft:
        'Whether to create a draft (unpublished) release, "false" to create a published one',
      prerelease:
        'Whether to point out that the release is non-production ready',
      target_commitish:
        "Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch(usually master).",
    },
  },
  releaseGetParamDescription: {},
  releaseDeleteParamDescription: {},
  releaseUpdateParamDescription: {
    additionalFields: {
      body: 'The body of the release',
      draft:
        'Whether to create a draft (unpublished) release, "false" to create a published one',
      name: 'The name of the release',
      prerelease:
        'Whether to point out that the release is non-production ready',
      tag_name: 'The name of the tag',
      target_commitish:
        "Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch(usually master).",
    },
  },
  releaseGetAllParamDescription: {
    returnAll: 'Whether to return all results or only up to a given limit',
    limit: 'Max number of results to return',
  },
  repositoryGetIssuesParamDescription: {
    returnAll: 'Whether to return all results or only up to a given limit',
    limit: 'Max number of results to return',
    getRepositoryIssuesFilters: {
      assignee: 'Return only issues which are assigned to a specific user',
      creator: 'Return only issues which were created by a specific user',
      mentioned: 'Return only issues in which a specific user was mentioned',
      labels:
        'Return only issues with the given labels. Multiple lables can be separated by comma.',
      since: 'Return only issues updated at or after this time',
      state: 'all | closed | open',
      sort: 'created | updated | comments',
      direction: 'asc | desc',
    },
  },
  reviewGetParamDescription: {
    pullRequestNumber: 'The number of the pull request',
    reviewId: 'ID of the review',
  },
  reviewUpdateParamDescription: {
    pullRequestNumber: 'The number of the pull request',
    reviewId: 'ID of the review',
    body: 'The body of the review',
  },
  reviewGetAllParamDescription: {
    pullRequestNumber: 'The number of the pull request',
    returnAll: 'Whether to return all results or only up to a given limit',
    limit: 'Max number of results to return',
  },
  reviewCreateParamDescription: {
    pullRequestNumber: 'The number of the pull request to review',
    event: 'approve | requestChanges | comment | pending',
    body: 'The body of the review (required for events Request Changes or Comment)',
    additionalFields: {
      commitId:
        'The SHA of the commit that needs a review, if different from the latest',
    },
  },
  userGetRepositoriesParamDescription: {
    returnAll: 'Whether to return all results or only up to a given limit',
    limit: 'Max number of results to return',
  },
  userInviteParamDescription: {
    organization: 'The GitHub organization that the user is being invited to',
    email: 'The email address of the invited user',
  },
  userGetStarGrowthParamDescription: {
    username:
      'The username of the user whose starred repositories are being requested',
  },
  organizationGetRepositoriesParamDescription: {
    returnAll: 'Whether to return all results or only up to a given limit',
    limit: 'Max number of results to return',
  },
};
