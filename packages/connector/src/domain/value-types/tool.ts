/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import githubParamDescriptions from '../../services/github-param-descriptions';
import slackParamDescriptions from '../../services/slack-param-descriptions';
import notionParamDescriptions from '../../services/notion-param-descriptions';
import discordParamDescriptions from '../../services/discord-param-descriptions';
import mediumParamDescriptions from '../../services/medium-param-descriptions';
import mondayParamDescriptions from '../../services/monday-param-descriptions';

export const toolTypes = [
  'monday-board-archive',
  'monday-board-create',
  'monday-board-get',
  'monday-board-get-all',
  'monday-column-create',
  'monday-column-get-all',
  'monday-group-delete',
  'monday-group-create',
  'monday-group-get-all',
  'monday-item-add-update',
  'monday-item-column-change',
  'monday-item-columns-change',
  'monday-item-create',
  'monday-item-delete',
  'monday-item-get',
  'monday-item-get-all',
  'monday-item-get-by-column',
  'monday-item-move',
  'medium-post-create',
  'medium-publication-get-all',
  'discord-message-send',
  'notion-append-after-block',
  'notion-get-child-blocks',
  'notion-get-database',
  'notion-get-many-database',
  'notion-search-database',
  'notion-create-database-page',
  'notion-get-database-page',
  'notion-get-many-database-page',
  'notion-update-database-page',
  'notion-archive-page',
  'notion-create-page',
  'notion-search-page',
  'notion-get-user',
  'notion-get-many-user',
  'github-file-create',
  'github-file-delete',
  'github-file-edit',
  'github-file-get',
  'github-issue-create',
  'github-issue-comment',
  'github-issue-edit',
  'github-issue-get',
  'github-issue-lock',
  'github-repo-get',
  'github-repo-license',
  'github-repo-issues',
  'github-repo-top-paths',
  'github-repo-top-domains',
  'github-release-create',
  'github-release-get',
  'github-release-get-all',
  'github-release-delete',
  'github-release-update',
  'github-review-create',
  'github-review-get',
  'github-review-get-all',
  'github-review-update',
  'github-user-repos',
  'github-user-org-invite',
  'github-user-get-star-growth',
  'github-org-repos-get',
  'hubspot-create-update-contact',
  'hubspot-delete-contact',
  'hubspot-get-contact',
  'hubspot-get-all-contacts',
  'hubspot-get-recently-created-updated-contacts',
  'hubspot-search-contacts',
  'hubspot-add-contact-to-list',
  'hubspot-remove-contact-from-list',
  'hubspot-create-company',
  'hubspot-delete-company',
  'hubspot-get-company',
  'hubspot-get-all-companies',
  'hubspot-get-recently-created-updated-companies',
  'hubspot-search-companies-by-domain',
  'hubspot-update-company',
  'hubspot-create-deal',
  'hubspot-delete-deal',
  'hubspot-get-deal',
  'hubspot-get-all-deals',
  'hubspot-get-recently-created-updated-deals',
  'hubspot-search-deals',
  'hubspot-update-deal',
  'hubspot-create-an-engagement',
  'hubspot-delete-an-engagement',
  'hubspot-get-an-engagement',
  'hubspot-get-all-engagements',
  'hubspot-get-fields-form',
  'hubspot-create-ticket',
  'hubspot-delete-ticket',
  'hubspot-get-ticket',
  'hubspot-get-all-tickets',
  'hubspot-update-ticket',
  'slack-channel-archive',
  'slack-channel-close',
  'slack-channel-create',
  'slack-channel-get',
  'slack-channel-get-many',
  'slack-channel-history',
  'slack-channel-invite',
  'slack-channel-join',
  'slack-channel-kick',
  'slack-channel-leave',
  'slack-channel-member',
  'slack-channel-open',
  'slack-channel-rename',
  'slack-channel-reply',
  'slack-channel-set-purpose',
  'slack-channel-set-topic',
  'slack-channel-unarchive',
  'slack-file-get',
  'slack-file-get-many',
  'slack-message-delete',
  'slack-message-get-permalink',
  'slack-message-search',
  'slack-message-send',
  'slack-message-update',
  'slack-reaction-add',
  'slack-reaction-get',
  'slack-reaction-remove',
  'slack-star-add',
  'slack-star-delete',
  'slack-star-get-many',
  'slack-user-get',
  'slack-user-get-many',
  'slack-user-get-status',
  'slack-user-update-profile',
  'slack-user-group-create',
  'slack-user-group-disable',
  'slack-user-group-enable',
  'slack-user-group-get-many',
  'slack-user-group-update',
  'airtable-append-data',
  'airtable-delete-data',
  'airtable-list-data',
  'airtable-read-data',
  'airtable-update-data',
  'hackernews-get-user',
  'hackernews-get-article',
] as const;

export type ToolType = (typeof toolTypes)[number];

export const parseToolType = (type: unknown): ToolType => {
  const identifiedElement = toolTypes.find((element) => element === type);
  if (identifiedElement) return identifiedElement;
  throw new Error('Provision of invalid type');
};

export type GithubAuthType = 'accessToken';
export type HubSpotAuthType = 'accessToken';
export type SlackAuthType = 'accessToken';
export type AirtableAuthType = 'accessToken';
export type NotionAuthType = 'apiKey';
export type DiscordAuthType = 'accessToken';
export type HackerNewsAuthType = 'none';
export type MediumAuthType = 'accessToken';
export type MondayAuthType = 'accessToken';

interface ToolBase {
  id: ToolType;
  name: string;
  params: Record<string, unknown>;
  authorizationType:
    | HubSpotAuthType
    | SlackAuthType
    | AirtableAuthType
    | HackerNewsAuthType
    | NotionAuthType
    | DiscordAuthType
    | MediumAuthType
    | MondayAuthType;
}
export interface Tool extends ToolBase {
  description: string;
}

const airtableBaseParams = {
  baseId: 'a string for the id of an Airtable base',
  tableId: 'a string for the id of an Airtable table',
  authToken: 'a string for the personal access token to use the Airtable API',
};

const airtableAppendParams = {
  data: 'a JSON object of the data to append to the table where the keys are the corresponding fieldnames.',
  fieldNamesToLoad:
    'an optional list of strings of the names of the table fields to load data into. If not provided, data will be loaded into all fields',
  typecast:
    'an optional boolean that determines if the data should be typecasted before loading it into Airtable',
  bulkSize:
    'an optional integer that determines the number of records to append in a single request. The default value is 10',
};

const airtableDeleteParams = {
  id: 'a string of the record id to delete from an Airtable table',
};

const airtableListParams = {
  limit:
    'an integer of the maximum number of records to return in a single request. The default value is 100',
};

const airtableReadParams = {
  id: 'a string of the record id to read from an Airtable table',
};

const airtableUpdateParams = {
  id: 'a string of the record id to update in an Airtable table',
  data: 'a JSON object of the data to update in the table, where the keys are the corresponding fieldnames.',
  fieldNamesToUpdate:
    'an optional list of strings of the names of the table fields to update. If not provided, data will be updated in all fields',
  typecast:
    'an optional boolean that determines if the data should be typecasted before loading it into Airtable',
  bulkSize:
    'an optional integer that determines the number of records to append in a single request. The default value is 10',
  ignoreFields:
    'an optional concatenated string of the names of the Airtable table fields to ignore. The names are separated by ",". If not provided, data will be updated in all fields',
};

const hubSpotBaseParams = {
  authToken:
    'A string value that holds the personal access token to use the Slack API',
};

const hubspotContactUpsertParams = {
  email: '#description-placeholder',
  additionalFields: {
    annualRevenue: '#description-placeholder',
    associatedCompanyId: '#description-placeholder',
    city: '#description-placeholder',
    clickedFacebookAd: '#description-placeholder',
    closeDate: '#description-placeholder',
    companyName: '#description-placeholder',
    companySize: '#description-placeholder',
    contactOwner: '#description-placeholder',
    country: '#description-placeholder',
    customPropertiesUi: {
      customPropertiesValues: {
        property: '#description-placeholder',
        value: '#description-placeholder',
      },
    },
    dateOfBirth: '#description-placeholder',
    degree: '#description-placeholder',
    facebookClickId: '#description-placeholder',
    faxNumber: '#description-placeholder',
    fieldOfStudy: '#description-placeholder',
    firstName: '#description-placeholder',
    gender: '#description-placeholder',
    googleAdClickId: '#description-placeholder',
    graduationDate: '#description-placeholder',
    industry: '#description-placeholder',
    jobFunction: '#description-placeholder',
    jobTitle: '#description-placeholder',
    lastName: '#description-placeholder',
    leadStatus: '#description-placeholder',
    processingContactData: '#description-placeholder',
    lifeCycleStage: '#description-placeholder',
    maritalStatus: '#description-placeholder',
    membershipNote: '#description-placeholder',
    message: '#description-placeholder',
    mobilePhoneNumber: '#description-placeholder',
    numberOfEmployees: '#description-placeholder',
    originalSource: '#description-placeholder',
    phoneNumber: '#description-placeholder',
    properties: '#description-placeholder',
    postalCode: '#description-placeholder',
    prefferedLanguage: '#description-placeholder',
    relationshipStatus: '#description-placeholder',
    salutation: '#description-placeholder',
    school: '#description-placeholder',
    seniority: '#description-placeholder',
    startDate: '#description-placeholder',
    stateRegion: '#description-placeholder',
    status: '#description-placeholder',
    streetAddress: '#description-placeholder',
    twitterUsername: '#description-placeholder',
    websiteUrl: '#description-placeholder',
    workEmail: '#description-placeholder',
  },
  options: {
    resolveData: '#description-placeholder',
  },
};
const hubspotContactGetParams = {
  contactId: '#description-placeholder',
  additionalFields: {
    formSubmissionMode: '#description-placeholder',
    listMemberships: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotContactGetAllParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  additionalFields: {
    formSubmissionMode: '#description-placeholder',
    listMemberships: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotContactDeleteParams = {
  contactId: '#description-placeholder',
};
const hubspotContactGetRecentlyCreatedUpdatedParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  additionalFields: {
    formSubmissionMode: '#description-placeholder',
    listMemberships: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotContactSearchParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  filterGroupsUi: {
    filterGroupsValues: {
      filtersUi: {
        filterValues: {
          propertyName: '#description-placeholder',
          type: '#description-placeholder',
          operator: '#description-placeholder',
          value: '#description-placeholder',
        },
      },
    },
  },
  additionalFields: {
    direction: '#description-placeholder',
    properties: '#description-placeholder',
    query: '#description-placeholder',
    sortBy: '#description-placeholder',
  },
};
const hubspotContactListAddParams = {
  by: '#description-placeholder',
  email: '#description-placeholder',
  id: '#description-placeholder',
  listId: '#description-placeholder',
};
const hubspotContactListRemoveParams = {
  id: '#description-placeholder',
  listId: '#description-placeholder',
};
const hubspotCompanyCreateParams = {
  name: '#description-placeholder',
  additionalFields: {
    aboutUs: '#description-placeholder',
    annualRevenue: '#description-placeholder',
    city: '#description-placeholder',
    closeDate: '#description-placeholder',
    companyDomainName: '#description-placeholder',
    companyOwner: '#description-placeholder',
    countryRegion: '#description-placeholder',
    customPropertiesUi: {
      customPropertiesValues: {
        property: '#description-placeholder',
        value: '#description-placeholder',
      },
    },
    description: '#description-placeholder',
    facebookFans: '#description-placeholder',
    googlePlusPage: '#description-placeholder',
    industry: '#description-placeholder',
    isPublic: '#description-placeholder',
    leadStatus: '#description-placeholder',
    lifecycleStatus: '#description-placeholder',
    linkedinBio: '#description-placeholder',
    linkedInCompanyPage: '#description-placeholder',
    numberOfEmployees: '#description-placeholder',
    originalSourceType: '#description-placeholder',
    phoneNumber: '#description-placeholder',
    postalCode: '#description-placeholder',
    stateRegion: '#description-placeholder',
    streetAddress: '#description-placeholder',
    streetAddress2: '#description-placeholder',
    targetAccount: '#description-placeholder',
    timezone: '#description-placeholder',
    totalMoneyRaised: '#description-placeholder',
    twitterBio: '#description-placeholder',
    twitterFollowers: '#description-placeholder',
    twitterHandle: '#description-placeholder',
    type: '#description-placeholder',
    webTechnologies: '#description-placeholder',
    websiteUrl: '#description-placeholder',
    yearFounded: '#description-placeholder',
  },
};
const hubspotCompanyUpdateParams = {
  companyId: '#description-placeholder',
  updateFields: {
    aboutUs: '#description-placeholder',
    annualRevenue: '#description-placeholder',
    city: '#description-placeholder',
    closeDate: '#description-placeholder',
    companyDomainName: '#description-placeholder',
    companyOwner: '#description-placeholder',
    countryRegion: '#description-placeholder',
    customPropertiesUi: {
      customPropertiesValues: {
        property: '#description-placeholder',
        value: '#description-placeholder',
      },
    },
    description: '#description-placeholder',
    facebookFans: '#description-placeholder',
    googlePlusPage: '#description-placeholder',
    industry: '#description-placeholder',
    isPublic: '#description-placeholder',
    leadStatus: '#description-placeholder',
    lifecycleStatus: '#description-placeholder',
    linkedinBio: '#description-placeholder',
    linkedInCompanyPage: '#description-placeholder',
    name: '#description-placeholder',
    numberOfEmployees: '#description-placeholder',
    originalSourceType: '#description-placeholder',
    phoneNumber: '#description-placeholder',
    postalCode: '#description-placeholder',
    stateRegion: '#description-placeholder',
    streetAddress: '#description-placeholder',
    streetAddress2: '#description-placeholder',
    targetAccount: '#description-placeholder',
    timezone: '#description-placeholder',
    totalMoneyRaised: '#description-placeholder',
    twitterBio: '#description-placeholder',
    twitterFollowers: '#description-placeholder',
    twitterHandle: '#description-placeholder',
    type: '#description-placeholder',
    webTechnologies: '#description-placeholder',
    websiteUrl: '#description-placeholder',
    yearFounded: '#description-placeholder',
  },
};
const hubspotCompanyGetParams = {
  companyId: '#description-placeholder',
  additionalFields: {
    includeMergeAudits: '#description-placeholder',
  },
};
const hubspotCompanyGetAllParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  options: {
    formSubmissionMode: '#description-placeholder',
    listMerberships: '#description-placeholder',
    includeMergeAudits: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotCompanyDeleteParams = {
  companyId: '#description-placeholder',
};
const hubspotCompanyGetRecentlyCreatedUpdatedParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  additionalFields: {
    since: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotCompanySearchByDomainParams = {
  domain: '#description-placeholder',
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  options: {
    properties: '#description-placeholder',
  },
};
const hubspotDealCreateParams = {
  stage: '#description-placeholder',
  additionalFields: {
    amount: '#description-placeholder',
    associatedCompany: '#description-placeholder',
    associatedVids: '#description-placeholder',
    closeDate: '#description-placeholder',
    customPropertiesUi: {
      customPropertiesValues: {
        property: '#description-placeholder',
        value: '#description-placeholder',
      },
    },
    description: '#description-placeholder',
    dealName: '#description-placeholder',
    dealOwner: '#description-placeholder',
    dealType: '#description-placeholder',
    pipeline: '#description-placeholder',
  },
};
const hubspotDealUpdateParams = {
  dealId: '#description-placeholder',
  updateFields: {
    amount: '#description-placeholder',
    closeDate: '#description-placeholder',
    customPropertiesUi: {
      customPropertiesValues: {
        property: '#description-placeholder',
        value: '#description-placeholder',
      },
    },
    description: '#description-placeholder',
    dealName: '#description-placeholder',
    dealOwner: '#description-placeholder',
    stage: '#description-placeholder',
    dealType: '#description-placeholder',
    pipeline: '#description-placeholder',
  },
};
const hubspotDealGetParams = {
  dealId: '#description-placeholder',
  filters: {
    includePropertyVersions: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotDealGetAllParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  filters: {
    includeAssociations: '#description-placeholder',
    propertiesCollection: {
      propertiesValues: {
        properties: '#description-placeholder',
        propertyMode: '#description-placeholder',
      },
    },
  },
};
const hubspotDealDeleteParams = {
  dealId: '#description-placeholder',
};
const hubspotDealGetRecentlyCreatedUpdatedParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  filters: {
    since: '#description-placeholder',
    includePropertyVersions: '#description-placeholder',
  },
};
const hubspotDealSearchParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  filterGroupsUi: {
    filterGroupsValues: {
      filtersUi: {
        filterValues: {
          propertyName: '#description-placeholder',
          type: '#description-placeholder',
          operator: '#description-placeholder',
          value: '#description-placeholder',
        },
      },
    },
  },
  additionalFields: {
    direction: '#DESCRIPTION-PLACEHOLDER',
    properties: '#description-placeholder',
    query: '#description-placeholder',
    sortBy: '#description-placeholder',
  },
};
const hubspotEngagementCreateParams = {
  type: '#description-placeholder',
  metadata: {
    body: '#description-placeholder',
    durationMilliseconds: '#description-placeholder',
    fromNumber: '#description-placeholder',
    recordingUrl: '#description-placeholder',
    status: '#description-placeholder',
    toNumber: '#description-placeholder',
  },
  additionalFields: {
    associations: {
      companyIds: '#description-placeholder',
      contactIds: '#description-placeholder',
      dealIds: '#description-placeholder',
      ownerIds: '#description-placeholder',
      ticketIds: '#description-placeholder',
    },
  },
};
const hubspotEngagementGetParams = {
  engagementId: '#description-placeholder',
};
const hubspotEngagementDeleteParams = {
  engagementId: '#description-placeholder',
};
const hubspotEngagementGetAllParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
};
const hubspotTicketCreateParams = {
  pipelineId: '#description-placeholder',
  stageId: '#description-placeholder',
  ticketName: '#description-placeholder',
  additionalFields: {
    associatedCompanyIds: '#description-placeholder',
    associatedContactIds: '#description-placeholder',
    category: '#description-placeholder',
    closeDate: '#description-placeholder',
    createDate: '#description-placeholder',
    description: '#description-placeholder',
    priority: '#description-placeholder',
    resolution: '#description-placeholder',
    source: '#description-placeholder',
    ticketOwnerId: '#description-placeholder',
  },
};
const hubspotTicketUpdateParams = {
  ticketId: '#description-placeholder',
  updateFields: {
    associatedCompanyIds: '#description-placeholder',
    associatedContactIds: '#description-placeholder',
    category: '#description-placeholder',
    closeDate: '#description-placeholder',
    createDate: '#description-placeholder',
    description: '#description-placeholder',
    pipelineId: '#description-placeholder',
    priority: '#description-placeholder',
    resolution: '#description-placeholder',
    source: '#description-placeholder',
    stageId: '#description-placeholder',
    ticketName: '#description-placeholder',
    ticketOwnerId: '#description-placeholder',
  },
};
const hubspotTicketGetParams = {
  ticketId: '#description-placeholder',
  additionalFields: {
    includeDeleted: '#description-placeholder',
    properties: '#description-placeholder',
    propertiesWithHistory: '#description-placeholder',
  },
};
const hubspotTicketGetAllParams = {
  returnAll: '#description-placeholder',
  limit: '#description-placeholder',
  additionalFields: {
    properties: '#description-placeholder',
    propertiesWithHistory: '#description-placeholder',
  },
};
const hubspotTicketDeleteParams = {
  ticketId: '#description-placeholder',
};

const hubspotFormGetFieldsParams = {
  formId: '#description-placeholder',
};

const toolBases: ToolBase[] = [
  {
    id: 'monday-board-archive',
    name: 'Monday: Archive a board',
    params: {
      ...mondayParamDescriptions.boardArchiveParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-board-create',
    name: 'Monday: Create a new board',
    params: {
      ...mondayParamDescriptions.boardCreateParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-board-get',
    name: 'Monday: Get a board',
    params: {
      ...mondayParamDescriptions.boardGetParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-board-get-all',
    name: 'Monday: Get all board',
    params: {
      ...mondayParamDescriptions.boardGetAllParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-column-create',
    name: 'Monday: Create a new column',
    params: {
      ...mondayParamDescriptions.boardColumnCreateParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-column-get-all',
    name: 'Monday: Get all columns',
    params: {
      ...mondayParamDescriptions.boardColumnGetAllParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-group-delete',
    name: 'Monday: Delete a group in a board',
    params: {
      ...mondayParamDescriptions.boardGroupDeleteParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-group-create',
    name: 'Monday: Create a group in a board',
    params: {
      ...mondayParamDescriptions.boardGroupCreateParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-group-get-all',
    name: 'Monday: Get list of groups in a board',
    params: {
      ...mondayParamDescriptions.boardGroupGetAllParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-add-update',
    name: 'Monday: Add an update to an item',
    params: {
      ...mondayParamDescriptions.boardItemAddUpdateParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-column-change',
    name: 'Monday: Change a column value for a board item',
    params: {
      ...mondayParamDescriptions.boardItemChangeColumnValueParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-columns-change',
    name: 'Monday: Change multiple column values for a board item',
    params: {
      ...mondayParamDescriptions.boardItemChangeMultipleColumnValuesParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-create',
    name: "Monday: Create an item in a board's group",
    params: {
      ...mondayParamDescriptions.boardItemCreateParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-delete',
    name: 'Monday: Delete an item',
    params: {
      ...mondayParamDescriptions.boardItemDeleteParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-get',
    name: 'Monday: Get an item',
    params: {
      ...mondayParamDescriptions.boardItemGetParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-get-all',
    name: 'Monday: Get all items',
    params: {
      ...mondayParamDescriptions.boardItemGetAllParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-get-by-column',
    name: 'Monday: Get items by column value',
    params: {
      ...mondayParamDescriptions.boardItemGetByColumnValueParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'monday-item-move',
    name: 'Monday: Move item to group',
    params: {
      ...mondayParamDescriptions.boardItemMoveParamDescriptions,
    },
    authorizationType: 'accessToken',
  },

  {
    id: 'medium-post-create',
    name: 'Medium: Create a post',
    params: {
      ...mediumParamDescriptions.postCreateParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'medium-publication-get-all',
    name: 'Medium: Get all publications',
    params: {
      ...mediumParamDescriptions.publicationGetAllParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'discord-message-send',
    name: 'Discord: Send message in channel',
    params: {
      ...discordParamDescriptions.messageSendParamDescriptions,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'notion-append-after-block',
    name: 'Notion: Append after block',
    params: {
      ...notionParamDescriptions.blockAppendParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-child-blocks',
    name: 'Notion: Get child blocks',
    params: {
      ...notionParamDescriptions.blockGetAllParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-database',
    name: 'Notion: Get database',
    params: {
      ...notionParamDescriptions.databaseGetParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-many-database',
    name: 'Notion: Get many database',
    params: {
      ...notionParamDescriptions.databaseGetAllParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-search-database',
    name: 'Notion: Search database',
    params: {
      ...notionParamDescriptions.databaseSearchParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-create-database-page',
    name: 'Notion: Create database page',
    params: {
      ...notionParamDescriptions.databasePageCreateParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-database-page',
    name: 'Notion: Get database page',
    params: {
      ...notionParamDescriptions.databasePageGetParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-many-database-page',
    name: 'Notion: Get many database page',
    params: {
      ...notionParamDescriptions.databasePageGetAllParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-update-database-page',
    name: 'Notion: Update database page',
    params: {
      ...notionParamDescriptions.databasePageUpdateParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-archive-page',
    name: 'Notion: Archive page',
    params: {
      ...notionParamDescriptions.pageArchiveParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-create-page',
    name: 'Notion: Create page',
    params: {
      ...notionParamDescriptions.pageCreateParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-search-page',
    name: 'Notion: Search page',
    params: {
      ...notionParamDescriptions.pageSearchParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-user',
    name: 'Notion: Get user',
    params: {
      ...notionParamDescriptions.userGetParamDescriptions,
    },
    authorizationType: 'apiKey',
  },
  {
    id: 'notion-get-many-user',
    name: 'Notion: Get many user',
    params: {
      ...notionParamDescriptions.userGetAllParamDescriptions,
    },
    authorizationType: 'apiKey',
  },

  {
    id: 'github-file-create',
    name: 'Github: Create a new file in repository',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.fileCreateParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-file-delete',
    name: 'Github: Delete a file in repository',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.fileDeleteParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-file-edit',
    name: 'Github: Edit a file in repository',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.fileEditParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-file-get',
    name: 'Github: Get the data of a single file',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.fileGetParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-issue-create',
    name: 'Github: Create a new issue',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.issueCreateParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-issue-comment',
    name: 'Github: Create a new comment on an issue',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.issueCreateCommentParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-issue-edit',
    name: 'Github: Edit an issue',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.issueEditParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-issue-get',
    name: 'Github: Get the data of a single issue',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.issueGetParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-issue-lock',
    name: 'Github: Lock an issue',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.issueLockParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-repo-get',
    name: 'Github: Get the data of a single repository',
    params: {
      ...githubParamDescriptions.baseParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-repo-license',
    name: 'Github: Return the contents of the repository license file, if one is detected',
    params: {
      ...githubParamDescriptions.baseParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-repo-issues',
    name: 'Github: Return issues of a repository',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.repositoryGetIssuesParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-repo-top-paths',
    name: 'Github: Get the top 10 popular content paths over the last 14 days',
    params: {
      ...githubParamDescriptions.baseParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-repo-top-domains',
    name: 'Github: Get the top 10 referring domains over the last 14 days',
    params: {
      ...githubParamDescriptions.baseParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-release-create',
    name: 'Github: Create a new release',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.releaseCreateParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-release-get',
    name: 'Github: Get a release',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.releaseGetParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-release-get-all',
    name: 'Github: Get all repository releases',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.releaseGetAllParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-release-delete',
    name: 'Github: Delete a release',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.releaseDeleteParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-release-update',
    name: 'Github: Update a release',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.releaseUpdateParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-review-create',
    name: 'Github: Create a new review',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.reviewCreateParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-review-get',
    name: 'Github: Get a review for a pull request',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.reviewGetParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-review-get-all',
    name: 'Github: Get all reviews for a pull request',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.reviewGetAllParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-review-update',
    name: 'Github: Update a review',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.reviewUpdateParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-user-repos',
    name: 'Github: Return the repositories of a user',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.userGetRepositoriesParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-user-get-star-growth',
    name: 'Github: Get the top growing starred repositories of a user',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.userGetStarGrowthParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-user-org-invite',
    name: 'Github: Invite a user to an organisation',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.userInviteParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'github-org-repos-get',
    name: 'Github: Return the repositories of an organisation',
    params: {
      ...githubParamDescriptions.baseParams,
      ...githubParamDescriptions.organizationGetRepositoriesParamDescription,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-create-update-contact',
    name: 'HubSpot: Create/Update a contact',
    params: { ...hubSpotBaseParams, ...hubspotContactUpsertParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-delete-contact',
    name: 'HubSpot: Delete a contact',
    params: { ...hubSpotBaseParams, ...hubspotContactDeleteParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-contact',
    name: 'HubSpot: Get a contact',
    params: { ...hubSpotBaseParams, ...hubspotContactGetParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-all-contacts',
    name: 'HubSpot: Get all contacts',
    params: { ...hubSpotBaseParams, ...hubspotContactGetAllParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-recently-created-updated-contacts',
    name: 'HubSpot: Get recently created/updated contacts',
    params: {
      ...hubSpotBaseParams,
      ...hubspotContactGetRecentlyCreatedUpdatedParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-search-contacts',
    name: 'HubSpot: Search contacts',
    params: { ...hubSpotBaseParams, ...hubspotContactSearchParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-add-contact-to-list',
    name: 'HubSpot: Add contact to a list',
    params: { ...hubSpotBaseParams, ...hubspotContactListAddParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-remove-contact-from-list',
    name: 'HubSpot: Remove a contact from a list',
    params: { ...hubSpotBaseParams, ...hubspotContactListRemoveParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-create-company',
    name: 'HubSpot: Create a company',
    params: { ...hubSpotBaseParams, ...hubspotCompanyCreateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-delete-company',
    name: 'HubSpot: Delete a company',
    params: { ...hubSpotBaseParams, ...hubspotCompanyDeleteParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-company',
    name: 'HubSpot: Get a company',
    params: { ...hubSpotBaseParams, ...hubspotCompanyGetParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-all-companies',
    name: 'HubSpot: Get all companies',
    params: { ...hubSpotBaseParams, ...hubspotCompanyGetAllParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-recently-created-updated-companies',
    name: 'HubSpot: Get recently created companies',
    params: {
      ...hubSpotBaseParams,
      ...hubspotCompanyGetRecentlyCreatedUpdatedParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-search-companies-by-domain',
    name: 'HubSpot: Search companies by domain',
    params: { ...hubSpotBaseParams, ...hubspotCompanySearchByDomainParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-update-company',
    name: 'HubSpot: Update a company',
    params: { ...hubSpotBaseParams, ...hubspotCompanyUpdateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-create-deal',
    name: 'HubSpot: Create a deal',
    params: { ...hubSpotBaseParams, ...hubspotDealCreateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-delete-deal',
    name: 'HubSpot: Delete a deal',
    params: { ...hubSpotBaseParams, ...hubspotDealDeleteParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-deal',
    name: 'HubSpot: Get a deal',
    params: { ...hubSpotBaseParams, ...hubspotDealGetParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-all-deals',
    name: 'HubSpot: Get all deals',
    params: { ...hubSpotBaseParams, ...hubspotDealGetAllParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-recently-created-updated-deals',
    name: 'HubSpot: Get recently created deals',
    params: {
      ...hubSpotBaseParams,
      ...hubspotDealGetRecentlyCreatedUpdatedParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-search-deals',
    name: 'HubSpot: Search deals',
    params: { ...hubSpotBaseParams, ...hubspotDealSearchParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-update-deal',
    name: 'HubSpot: Update a deal',
    params: { ...hubSpotBaseParams, ...hubspotDealUpdateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-create-an-engagement',
    name: 'HubSpot: Create an engagement',
    params: { ...hubSpotBaseParams, ...hubspotEngagementCreateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-delete-an-engagement',
    name: 'HubSpot: Delete an engagement',
    params: { ...hubSpotBaseParams, ...hubspotEngagementDeleteParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-an-engagement',
    name: 'HubSpot: Get an engagement',
    params: { ...hubSpotBaseParams, ...hubspotEngagementGetParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-all-engagements',
    name: 'HubSpot: Get all engagements',
    params: { ...hubSpotBaseParams, ...hubspotEngagementGetAllParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-fields-form',
    name: 'HubSpot: Get all fields from a form',
    params: { ...hubSpotBaseParams, ...hubspotFormGetFieldsParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-create-ticket',
    name: 'HubSpot: Create a ticket',
    params: { ...hubSpotBaseParams, ...hubspotTicketCreateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-delete-ticket',
    name: 'HubSpot: Delete a ticket',
    params: { ...hubSpotBaseParams, ...hubspotTicketDeleteParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-ticket',
    name: 'HubSpot: Get a ticket',
    params: { ...hubSpotBaseParams, ...hubspotTicketGetParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-get-all-tickets',
    name: 'HubSpot: Get all tickets',
    params: { ...hubSpotBaseParams, ...hubspotTicketGetAllParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hubspot-update-ticket',
    name: 'HubSpot: Update a ticket',
    params: { ...hubSpotBaseParams, ...hubspotTicketUpdateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-archive',
    name: 'Slack: Archive channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelArchiveParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-close',
    name: 'Slack: Close channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelCloseParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-create',
    name: 'Slack: Create channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelCreateParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-get',
    name: 'Slack: Get channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelGetParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-get-many',
    name: 'Slack: Get many channels',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelGetAllParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-history',
    name: 'Slack: Get channel history',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelHistoryParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-invite',
    name: 'Slack: Invite to channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelInviteParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-join',
    name: 'Slack: Join channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelJoinParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-kick',
    name: 'Slack: Kick from channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelKickParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-leave',
    name: 'Slack: Leave channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelLeaveParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-member',
    name: 'Slack: Get channel members',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelMemberParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-open',
    name: 'Slack: Open channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelOpenParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-rename',
    name: 'Slack: Rename channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelRenameParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-reply',
    name: 'Slack: Reply in channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelRepliesParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-set-purpose',
    name: 'Slack: Set channel purpose',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelSetPurposeParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-set-topic',
    name: 'Slack: Set channel topic',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelSetTopicParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-channel-unarchive',
    name: 'Slack: Unarchive channel',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.channelUnarchiveParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-file-get',
    name: 'Slack: Get file',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.fileGetParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-file-get-many',
    name: 'Slack: Get many files',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.fileGetAllParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-message-delete',
    name: 'Slack: Delete message',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.messageDeleteParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-message-get-permalink',
    name: 'Slack: Get message permalink',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.messageGetPermalinkParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-message-search',
    name: 'Slack: Search for message',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.messageSearchParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-message-send',
    name: 'Slack: Send message',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.messagePostParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-message-update',
    name: 'Slack: Update message',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.messageUpdateParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-reaction-add',
    name: 'Slack: Add message reaction',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.reactionAddParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-reaction-get',
    name: 'Slack: Get message reaction',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.reactionGetParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-reaction-remove',
    name: 'Slack: Remove message reaction',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.reactionRemoveParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-star-add',
    name: 'Slack: Add star',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.starAddParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-star-delete',
    name: 'Slack: Delete star',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.starDeleteParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-star-get-many',
    name: 'Slack: Get many stars',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.starGetAllParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-get',
    name: 'Slack: Get user',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userInfoParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-get-many',
    name: 'Slack: Get many users',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGetAllParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-get-status',
    name: "Slack: Get user's status",
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGetPresenceParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-update-profile',
    name: "Slack: Update user's profile",
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userUpdateProfileParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-group-create',
    name: 'Slack: Create user group',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGroupCreateParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-group-disable',
    name: 'Slack: Disable user group',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGroupDisableParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-group-enable',
    name: 'Slack: Enable user group',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGroupEnableParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-group-get-many',
    name: 'Slack: Get many user groups',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGroupGetAllParams,
    },
    authorizationType: 'accessToken',
  },
  {
    id: 'slack-user-group-update',
    name: 'Slack: Update user group',
    params: {
      ...slackParamDescriptions.baseParams,
      ...slackParamDescriptions.userGroupUpdateParams,
    },
    authorizationType: 'accessToken',
  },

  {
    id: 'airtable-append-data',
    name: 'Airtable: Append the data to a table',
    params: { ...airtableBaseParams, ...airtableAppendParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'airtable-delete-data',
    name: 'Airtable: Delete data from a table',
    params: { ...airtableBaseParams, ...airtableDeleteParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'airtable-list-data',
    name: 'Airtable: List data from a table',
    params: { ...airtableBaseParams, ...airtableListParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'airtable-read-data',
    name: 'Airtable: Read data from a table',
    params: { ...airtableBaseParams, ...airtableReadParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'airtable-update-data',
    name: 'Airtable: Update data in a table',
    params: { ...airtableBaseParams, ...airtableUpdateParams },
    authorizationType: 'accessToken',
  },
  {
    id: 'hackernews-get-user',
    name: 'HackerNews: Get User',
    params: { username: 'string' },
    authorizationType: 'none',
  },
  {
    id: 'hackernews-get-article',
    name: 'HackerNews: Get Article',
    params: { articleId: 'string', includeComments: 'boolean' },
    authorizationType: 'none',
  },
];

const genDescription = (
  toolId: string,
  params: Record<string, unknown>
): string => {
  const listParams = JSON.stringify(Object.keys(params));
  const paramDefs = genParamDefinitions(params);
  return `A wrapper around Lemon AI actions. The input to this tool is a natural language instruction, for example \\"get the latest email from my mother\\" or \\"send a discord message to the #general channel\\". Each tool will have params associated with it that are specified as a list. You MUST take into account the params when creating the instruction. For example, if the params are ['Message_Text', 'Channel'], your instruction should be something like 'send a slack message to the #general channel with the text hello world'. Another example: if the params are ['Calendar', 'Search_Term'], your instruction should be something like 'find the meeting in my personal calendar at 3pm'. Do not make up params, they will be explicitly specified in the tool description. If you do not have enough information to fill in the params, just say 'not enough information provided in the instruction, missing <param>'. If you get a none or null response, STOP EXECUTION, do not try to another tool! This tool specifically used for: ${toolId}, and has params: ${listParams}. They represent the following: ${paramDefs}`;
};

const genParamDefinitions = (params: Record<string, any>): string =>
  Object.entries(params).reduce(
    (acc, [key, value]) =>
      acc.concat(
        `"${key}" is ${JSON.stringify(value)
          .replaceAll('{', '(')
          .replaceAll('}', ')')}, `
      ),
    ''
  );

export const getTools = (): Tool[] =>
  toolBases.map((el) => ({
    ...el,
    description: genDescription(el.name, el.params),
  }));
