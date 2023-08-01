/*
Partly borrowed from https://github.com/n8n-io/n8n.
*/

import { snakeCase } from 'change-case';
import {
  isApiErrorResponse,
  isRichApiErrorResponse,
} from '../../services/identify-error-response';
import { type HubSpotAuthType, type ToolType } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';
import {
  type ApiResponseData,
  type IExternalApi,
} from '../../services/i-external-api';

interface Associations {
  associatedCompanyIds?: number[];
  associatedVids?: number[];
}

export interface HubSpotToolProps {
  propertyName: string;
}

interface HubSpotOperationParams {
  toolType: ToolType;

  contactUpsertParams?: {
    email: string;
    additionalFields?: {
      annualRevenue?: number;
      associatedCompanyId?: string;
      city?: string;
      clickedFacebookAd?: string;
      closeDate?: string;
      companyName?: string;
      companySize?: string;
      contactOwner?: string;
      country?: string;
      customPropertiesUi?: {
        customPropertiesValues?: {
          property?: string;
          value: string;
        };
      };
      dateOfBirth?: string;
      degree?: string;
      facebookClickId?: number;
      faxNumber?: string;
      fieldOfStudy?: string;
      firstName?: string;
      gender?: string;
      googleAdClickId?: number;
      graduationDate?: string;
      industry?: string;
      jobFunction?: string;
      jobTitle?: string;
      lastName?: string;
      leadStatus?: string;
      processingContactData?: string;
      lifeCycleStage?: string;
      maritalStatus?: string;
      membershipNote?: string;
      message?: string;
      mobilePhoneNumber?: string;
      numberOfEmployees?: string;
      originalSource?: string;
      phoneNumber?: string;
      properties?: string[];
      postalCode?: string;
      prefferedLanguage?: string;
      relationshipStatus?: string;
      salutation?: string;
      school?: string;
      seniority?: string;
      startDate?: string;
      stateRegion?: string;
      status?: string;
      streetAddress?: string;
      twitterUsername?: string;
      websiteUrl?: string;
      workEmail?: string;
    };
    options?: {
      resolveData?: boolean;
    };
  };
  contactGetParams?: {
    contactId: string;
    additionalFields?: {
      formSubmissionMode?: 'all' | 'none' | 'newest' | 'oldest';
      listMemberships?: boolean;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  contactGetAllParams?: {
    returnAll?: boolean;
    limit?: number;
    additionalFields?: {
      formSubmissionMode?: 'all' | 'none' | 'newest' | 'oldest';
      listMemberships?: boolean;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  contactDeleteParams?: {
    contactId: string;
  };
  contactGetRecentlyCreatedUpdatedParams?: {
    returnAll?: boolean;
    limit?: number;
    additionalFields?: {
      formSubmissionMode?: 'all' | 'none' | 'newest' | 'oldest';
      listMemberships?: boolean;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  contactSearchParams?: {
    returnAll?: boolean;
    limit?: number;
    filterGroupsUi?: {
      filterGroupsValues?: {
        filtersUi?: {
          filterValues?: {
            propertyName?: string;
            type?: string;
            operator?:
              | 'CONTAINS_TOKEN'
              | 'EQ'
              | 'GT'
              | 'GTE'
              | 'HAS_PROPERTY'
              | 'NOT_HAS_PROPERTY'
              | 'LT'
              | 'LTE'
              | 'NEQ';
            value: string;
          };
        };
      };
    };
    additionalFields?: {
      direction?: 'ASCENDING' | 'DESCENDING';
      properties?: string[];
      query?: string;
      sortBy?: string;
    };
  };
  contactListAddParams?: {
    by: 'id' | 'email';
    email: string;
    id: number;
    listId: number;
  };
  contactListRemoveParams?: {
    id: number;
    listId: number;
  };
  companyCreateParams?: {
    name: string;
    additionalFields?: {
      aboutUs?: string;
      annualRevenue?: number;
      city?: string;
      closeDate?: string;
      companyDomainName?: string;
      companyOwner?: string;
      countryRegion?: string;
      customPropertiesUi?: {
        customPropertiesValues?: {
          property?: string;
          value: string;
        };
      };
      description?: string;
      facebookFans?: number;
      googlePlusPage?: string;
      industry?: string;
      isPublic?: boolean;
      leadStatus?: string;
      lifecycleStatus?: string;
      linkedinBio?: string;
      linkedInCompanyPage?: string;
      numberOfEmployees?: number;
      originalSourceType?: string;
      phoneNumber?: string;
      postalCode?: string;
      stateRegion?: string;
      streetAddress?: string;
      streetAddress2?: string;
      targetAccount?: string;
      timezone?: string;
      totalMoneyRaised?: number;
      twitterBio?: string;
      twitterFollowers?: number;
      twitterHandle?: string;
      type?: string;
      webTechnologies?: string;
      websiteUrl?: string;
      yearFounded?: string;
    };
  };
  companyUpdateParams?: {
    companyId: string;
    updateFields?: {
      aboutUs?: string;
      annualRevenue?: number;
      city?: string;
      closeDate?: string;
      companyDomainName?: string;
      companyOwner?: string;
      countryRegion?: string;
      customPropertiesUi?: {
        customPropertiesValues?: {
          property?: string;
          value: string;
        };
      };
      description?: string;
      facebookFans?: number;
      googlePlusPage?: string;
      industry?: string;
      isPublic?: boolean;
      leadStatus?: string;
      lifecycleStatus?: string;
      linkedinBio?: string;
      linkedInCompanyPage?: string;
      name?: string;
      numberOfEmployees?: number;
      originalSourceType?: string;
      phoneNumber?: string;
      postalCode?: string;
      stateRegion?: string;
      streetAddress?: string;
      streetAddress2?: string;
      targetAccount?: string;
      timezone?: string;
      totalMoneyRaised?: number;
      twitterBio?: string;
      twitterFollowers?: number;
      twitterHandle?: string;
      type?: string;
      webTechnologies?: string;
      websiteUrl?: string;
      yearFounded?: string;
    };
  };
  companyGetParams?: {
    companyId: string;
    additionalFields?: {
      includeMergeAudits?: boolean;
    };
  };
  companyGetAllParams?: {
    returnAll?: boolean;
    limit?: number;
    options?: {
      formSubmissionMode?: 'all' | 'none' | 'newest' | 'oldest';
      listMerberships?: boolean;
      includeMergeAudits?: boolean;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  companyDeleteParams?: {
    companyId: string;
  };
  companyGetRecentlyCreatedUpdatedParams?: {
    returnAll?: boolean;
    limit?: number;
    additionalFields?: {
      since?: string;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  companySearchByDomainParams?: {
    domain: string;
    returnAll?: boolean;
    limit?: number;
    options?: {
      properties?: string[];
    };
  };
  dealCreateParams?: {
    stage: string;
    additionalFields?: {
      amount?: string;
      associatedCompany?: number[];
      associatedVids?: number[];
      closeDate?: string;
      customPropertiesUi?: {
        customPropertiesValues?: {
          property?: string;
          value: string;
        };
      };
      description?: string;
      dealName?: string;
      dealOwner: string;
      dealType?: string;
      pipeline?: string;
    };
  };
  dealUpdateParams?: {
    dealId: string;
    updateFields?: {
      amount?: string;
      closeDate?: string;
      customPropertiesUi?: {
        customPropertiesValues?: {
          property?: string;
          value: string;
        };
      };
      description?: string;
      dealName?: string;
      dealOwner: string;
      stage?: string;
      dealType?: string;
      pipeline?: string;
    };
  };
  dealGetParams?: {
    dealId: string;
    filters?: {
      includePropertyVersions?: boolean;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  dealGetAllParams?: {
    returnAll?: boolean;
    limit?: number;
    filters?: {
      includeAssociations?: boolean;
      propertiesCollection?: {
        propertiesValues?: {
          properties?: string[];
          propertyMode?: 'valueAndHistory' | 'valueOnly';
        };
      };
    };
  };
  dealDeleteParams?: {
    dealId: string;
  };
  dealGetRecentlyCreatedUpdatedParams?: {
    returnAll?: boolean;
    limit?: number;
    filters?: {
      since?: string;
      includePropertyVersions?: boolean;
    };
  };
  dealSearchParams?: {
    returnAll?: boolean;
    limit?: number;
    filterGroupsUi?: {
      filterGroupsValues?: {
        filtersUi?: {
          filterValues?: {
            propertyName?: string;
            type?: string;
            operator?:
              | 'CONTAINS_TOKEN'
              | 'EQ'
              | 'GT'
              | 'GTE'
              | 'HAS_PROPERTY'
              | 'NOT_HAS_PROPERTY'
              | 'LT'
              | 'LTE'
              | 'NEQ';
            value: string;
          };
        };
      };
    };
    additionalFields?: {
      direction?: 'ASCENDING' | 'DESCENDING';
      properties?: string[];
      query?: string;
      sortBy?: string;
    };
  };
  engagementCreateParams?: {
    type: 'call' | 'email' | 'meeting' | 'task';
    metadata?: {
      body?: string;
      durationMilliseconds?: number;
      fromNumber?: string;
      recordingUrl?: string;
      status?:
        | 'BUSY'
        | 'CALLING_CRM_USER'
        | 'CANCELED'
        | 'COMPLETED'
        | 'CONNECTING'
        | 'FAILED'
        | 'IN_PROGRESS'
        | 'NO_ANSWER'
        | 'QUEUED'
        | 'RINGING';
      toNumber?: string;
    };
    additionalFields?: {
      associations?: {
        companyIds?: string;
        contactIds?: string;
        dealIds?: string;
        ownerIds?: string;
        ticketIds?: string;
      };
    };
  };
  engagementGetParams?: {
    engagementId: string;
  };
  engagementDeleteParams?: {
    engagementId: string;
  };
  engagementGetAllParams?: {
    returnAll?: boolean;
    limit?: number;
  };
  ticketCreateParams?: {
    pipelineId: string;
    stageId: string;
    ticketName: string;
    additionalFields?: {
      associatedCompanyIds?: string[];
      associatedContactIds?: string[];
      category?: string;
      closeDate?: string;
      createDate?: string;
      description?: string;
      priority?: string;
      resolution?: string;
      source?: string;
      ticketOwnerId?: string;
    };
  };
  ticketUpdateParams?: {
    ticketId: string;
    updateFields?: {
      associatedCompanyIds?: string[];
      associatedContactIds?: string[];
      category?: string;
      closeDate?: string;
      createDate?: string;
      description?: string;
      pipelineId?: string;
      priority?: string;
      resolution?: string;
      source?: string;
      stageId?: string;
      ticketName?: string;
      ticketOwnerId?: string;
    };
  };
  ticketGetParams?: {
    ticketId: string;
    additionalFields?: {
      includeDeleted?: boolean;
      properties?: string[];
      propertiesWithHistory?: string;
    };
  };
  ticketGetAllParams?: {
    returnAll?: boolean;
    limit?: number;
    additionalFields?: {
      properties?: string[];
      propertiesWithHistory?: string;
    };
  };
  ticketDeleteParams?: {
    ticketId: string;
  };
  formSubmitParams?: {
    formId: string;
    additionalFields?: {
      skipValidation?: boolean;
      submittedAt?: string;
    };
    contextUi?: {
      contextValue?: {
        hutk?: string;
        ipAddress?: string;
        pageUri?: string;
        pageName?: string;
        pageId?: number;
        sfdcCampaignId?: number;
        goToWebinarWebinarKey?: number;
      };
    };
    legalConsentUi?: {
      legalConsentValues?: {
        consentToProcess?: boolean;
        text?: string;
        communicationsUi?: {
          communicationValues?: {
            subscriptionTypeId?: string;
            value?: boolean;
            text?: string;
          };
        };
      };
      legitimateInterestValues?: {
        subscriptionTypeId?: string;
        value?: boolean;
        legalBasis?: 'CUSTOMER' | 'LEAD';
        text?: string;
      };
    };
  };
  formGetFieldsParams?: {
    formId: string;
  };
}

export interface ExecuteHubSpotOperationAuth {
  token: string;
  type: HubSpotAuthType;
}

export interface ExecuteHubSpotOperationReq {
  params: HubSpotOperationParams;
}

export type ExecuteHubSpotOperationRes = Result<
  Record<string, any> | undefined
>;

export class ExecuteHubSpotOperation
  implements
    IUseCase<
      ExecuteHubSpotOperationReq,
      ExecuteHubSpotOperationRes,
      ExecuteHubSpotOperationAuth
    >
{
  #params?: HubSpotOperationParams;
  #auth?: ExecuteHubSpotOperationAuth;
  #api: IExternalApi<HubSpotToolProps>;

  constructor(hubspotApi: IExternalApi<HubSpotToolProps>) {
    this.#api = hubspotApi;
  }

  async execute(props: {
    req: ExecuteHubSpotOperationReq;
    auth: ExecuteHubSpotOperationAuth;
  }): Promise<ExecuteHubSpotOperationRes> {
    this.#params = props.req.params;
    this.#auth = props.auth;

    let returnData: ApiResponseData | undefined;
    try {
      switch (this.#params.toolType) {
        case 'hubspot-create-update-contact':
          returnData = await this.#execContactUpsert();
          break;
        case 'hubspot-delete-contact':
          returnData = await this.#execContactDelete();
          break;
        case 'hubspot-get-contact':
          returnData = await this.#execContactGet();
          break;
        case 'hubspot-get-all-contacts':
          returnData = await this.#execContactGetAll();
          break;
        case 'hubspot-get-recently-created-updated-contacts':
          returnData = await this.#execContactGetRecentlyCreatedUpdatedParams();
          break;
        case 'hubspot-search-contacts':
          returnData = await this.#execContactSearch();
          break;
        case 'hubspot-add-contact-to-list':
          returnData = await this.#execContactListAdd();
          break;
        case 'hubspot-remove-contact-from-list':
          returnData = await this.#execContactListRemove();
          break;
        case 'hubspot-create-company':
          returnData = await this.#execCompanyCreate();
          break;
        case 'hubspot-delete-company':
          returnData = await this.#execCompanyDelete();
          break;
        case 'hubspot-get-company':
          returnData = await this.#execCompanyGet();
          break;
        case 'hubspot-get-all-companies':
          returnData = await this.#execCompanyGetAll();
          break;
        case 'hubspot-get-recently-created-updated-companies':
          returnData = await this.#execCompanyGetRecentlyCreatedUpdated();
          break;
        case 'hubspot-search-companies-by-domain':
          returnData = await this.#execCompanySearchByDomain();
          break;
        case 'hubspot-update-company':
          returnData = await this.#execCompanyUpdate();
          break;
        case 'hubspot-create-deal':
          returnData = await this.#execDealCreate();
          break;
        case 'hubspot-delete-deal':
          returnData = await this.#execDealDelete();
          break;
        case 'hubspot-get-deal':
          returnData = await this.#execDealGet();
          break;
        case 'hubspot-get-all-deals':
          returnData = await this.#execDealGetAll();
          break;
        case 'hubspot-get-recently-created-updated-deals':
          returnData = await this.#execDealGetRecentlyCreatedUpdated();
          break;
        case 'hubspot-search-deals':
          returnData = await this.#execDealSearch();
          break;
        case 'hubspot-update-deal':
          returnData = await this.#execDealUpdate();
          break;
        case 'hubspot-create-an-engagement':
          returnData = await this.#execEngagementCreate();
          break;
        case 'hubspot-delete-an-engagement':
          returnData = await this.#execEngagementDelete();
          break;
        case 'hubspot-get-an-engagement':
          returnData = await this.#execEngagementGet();
          break;
        case 'hubspot-get-all-engagements':
          returnData = await this.#execEngagementGetAll();
          break;
        case 'hubspot-get-fields-form':
          returnData = await this.#execFormGetFields();
          break;
        case 'hubspot-create-ticket':
          returnData = await this.#execTicketCreate();
          break;
        case 'hubspot-delete-ticket':
          returnData = await this.#execTicketDelete();
          break;
        case 'hubspot-get-ticket':
          returnData = await this.#execTicketGet();
          break;
        case 'hubspot-get-all-tickets':
          returnData = await this.#execTicketGetAll();
          break;
        case 'hubspot-update-ticket':
          returnData = await this.#execTicketUpdate();
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

  #execTicketUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.ticketUpdateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { updateFields, ticketId } = this.#params.ticketUpdateParams;

    const body: Array<Record<string, unknown>> = [];
    if (updateFields?.pipelineId) {
      body.push({
        name: 'hs_pipeline',
        value: updateFields.pipelineId,
      });
    }
    if (updateFields?.stageId) {
      body.push({
        name: 'hs_pipeline_stage',
        value: updateFields.stageId,
      });
    }
    if (updateFields?.ticketName) {
      body.push({
        name: 'subject',
        value: updateFields.ticketName,
      });
    }
    if (updateFields?.category) {
      body.push({
        name: 'hs_ticket_category',
        value: updateFields.category,
      });
    }
    if (updateFields?.closeDate) {
      body.push({
        name: 'closed_date',
        value: new Date(updateFields.closeDate).getTime(),
      });
    }
    if (updateFields?.createDate) {
      body.push({
        name: 'createdate',
        value: new Date(updateFields.createDate).getTime(),
      });
    }
    if (updateFields?.description) {
      body.push({
        name: 'content',
        value: updateFields.description,
      });
    }
    if (updateFields?.priority) {
      body.push({
        name: 'hs_ticket_priority',
        value: updateFields.priority,
      });
    }
    if (updateFields?.resolution) {
      body.push({
        name: 'hs_resolution',
        value: updateFields.resolution,
      });
    }
    if (updateFields?.source) {
      body.push({
        name: 'source_type',
        value: updateFields.source,
      });
    }
    if (updateFields?.ticketOwnerId) {
      body.push({
        name: 'hubspot_owner_id',
        value: updateFields?.ticketOwnerId,
      });
    }
    const endpoint = `crm-objects/v1/objects/tickets/${ticketId}`;
    const apiResponse = await this.#api.apiRequest(
      'PUT',
      endpoint,
      this.#auth.token,
      body
    );

    if (updateFields?.associatedCompanyIds) {
      const companyAssociations: Array<Record<string, unknown>> = [];
      for (const companyId of updateFields.associatedCompanyIds) {
        companyAssociations.push({
          fromObjectId: apiResponse.data?.objectId,
          toObjectId: companyId,
          category: 'HUBSPOT_DEFINED',
          definitionId: 26,
        });
      }
      await this.#api.apiRequest(
        'PUT',
        'crm-associations/v1/associations/create-batch',
        this.#auth.token,
        companyAssociations
      );
    }

    if (updateFields?.associatedContactIds) {
      const contactAssociations: Array<Record<string, unknown>> = [];
      for (const contactId of updateFields.associatedContactIds) {
        contactAssociations.push({
          fromObjectId: apiResponse.data?.objectId,
          toObjectId: contactId,
          category: 'HUBSPOT_DEFINED',
          definitionId: 16,
        });
      }
      await this.#api.apiRequest(
        'PUT',
        'crm-associations/v1/associations/create-batch',
        this.#auth.token,
        contactAssociations
      );
    }

    return apiResponse.data;
  };

  #execTicketDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.ticketDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { ticketId } = this.#params.ticketDeleteParams;

    const endpoint = `crm-objects/v1/objects/tickets/${ticketId}`;
    const apiResponse = await this.#api.apiRequest(
      'DELETE',
      endpoint,
      this.#auth.token
    );

    return apiResponse.data || { vid: ticketId, deleted: true };
  };

  #execTicketGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.ticketGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, additionalFields, limit } =
      this.#params.ticketGetAllParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.properties) {
      qs.properties = additionalFields.properties;
    }
    if (additionalFields?.propertiesWithHistory) {
      qs.propertiesWithHistory =
        additionalFields.propertiesWithHistory.split(',');
    }
    const endpoint = 'crm-objects/v1/objects/tickets/paged';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'objects' },
        method: 'GET',
        endpoint,
        authToken: this.#auth.token,
        query: qs,
      });

      return apiResponse.data;
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'objects' },
        method: 'GET',
        endpoint,
        authToken: this.#auth.token,
        query: qs,
      });
      return apiResponse.data?.splice(0, qs.limit);
    }
  };

  #execTicketGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.ticketGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { ticketId, additionalFields } = this.#params.ticketGetParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.properties) {
      qs.properties = additionalFields.properties;
    }
    if (additionalFields?.propertiesWithHistory) {
      qs.propertiesWithHistory =
        additionalFields.propertiesWithHistory.split(',');
    }
    if (additionalFields?.includeDeleted) {
      qs.includeDeleted = additionalFields.includeDeleted.toString();
    }
    const endpoint = `crm-objects/v1/objects/tickets/${ticketId}`;
    const apiResponse = await this.#api.apiRequest(
      'GET',
      endpoint,
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data;
  };

  #execTicketCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.ticketCreateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { additionalFields, pipelineId, stageId, ticketName } =
      this.#params.ticketCreateParams;

    const body: Array<Record<string, unknown>> = [
      {
        name: 'hs_pipeline',
        value: pipelineId,
      },
      {
        name: 'hs_pipeline_stage',
        value: stageId,
      },
      {
        name: 'subject',
        value: ticketName,
      },
    ];
    if (additionalFields?.category) {
      body.push({
        name: 'hs_ticket_category',
        value: additionalFields.category,
      });
    }
    if (additionalFields?.closeDate) {
      body.push({
        name: 'closed_date',
        value: new Date(additionalFields.closeDate).getTime(),
      });
    }
    if (additionalFields?.createDate) {
      body.push({
        name: 'createdate',
        value: new Date(additionalFields.createDate).getTime(),
      });
    }
    if (additionalFields?.description) {
      body.push({
        name: 'content',
        value: additionalFields.description,
      });
    }
    if (additionalFields?.priority) {
      body.push({
        name: 'hs_ticket_priority',
        value: additionalFields.priority,
      });
    }
    if (additionalFields?.resolution) {
      body.push({
        name: 'hs_resolution',
        value: additionalFields.resolution,
      });
    }
    if (additionalFields?.source) {
      body.push({
        name: 'source_type',
        value: additionalFields.source,
      });
    }
    if (additionalFields?.ticketOwnerId) {
      body.push({
        name: 'hubspot_owner_id',
        value: additionalFields.ticketOwnerId,
      });
    }
    const endpoint = 'crm-objects/v1/objects/tickets';
    const apiResponse = await this.#api.apiRequest(
      'POST',
      endpoint,
      this.#auth.token,
      body
    );

    if (additionalFields?.associatedCompanyIds) {
      const companyAssociations: Array<Record<string, unknown>> = [];
      for (const companyId of additionalFields.associatedCompanyIds) {
        companyAssociations.push({
          fromObjectId: apiResponse.data?.objectId,
          toObjectId: companyId,
          category: 'HUBSPOT_DEFINED',
          definitionId: 26,
        });
      }
      await this.#api.apiRequest(
        'PUT',
        'crm-associations/v1/associations/create-batch',
        this.#auth.token,
        companyAssociations
      );
    }

    if (additionalFields?.associatedContactIds) {
      const contactAssociations: Array<Record<string, unknown>> = [];
      for (const contactId of additionalFields.associatedContactIds) {
        contactAssociations.push({
          fromObjectId: apiResponse.data?.objectId,
          toObjectId: contactId,
          category: 'HUBSPOT_DEFINED',
          definitionId: 16,
        });
      }
      await this.#api.apiRequest(
        'PUT',
        'crm-associations/v1/associations/create-batch',
        this.#auth.token,
        contactAssociations
      );
    }

    return apiResponse.data;
  };

  #execFormGetFields = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.formGetFieldsParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { formId } = this.#params.formGetFieldsParams;

    const apiResponse = await this.#api.apiRequest(
      'GET',
      `/forms/v2/fields/${formId}`,
      this.#auth.token
    );

    return apiResponse.data;
  };

  #execEngagementGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.engagementGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, limit } = this.#params.engagementGetAllParams;

    const endpoint = 'engagements/v1/engagements/paged';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'results' },
        method: 'GET',
        endpoint,
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        limit ? { limit: limit.toString() } : undefined
      );
      return apiResponse.data?.results;
    }
  };

  #execEngagementGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.engagementGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { engagementId } = this.#params.engagementGetParams;

    const endpoint = `engagements/v1/engagements/${engagementId}`;
    const apiResponse = await this.#api.apiRequest(
      'GET',
      endpoint,
      this.#auth.token
    );

    return apiResponse.data;
  };

  #execEngagementDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.engagementDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { engagementId } = this.#params.engagementDeleteParams;

    const endpoint = `engagements/v1/engagements/${engagementId}`;
    const apiResponse = await this.#api.apiRequest(
      'DELETE',
      endpoint,
      this.#auth.token
    );

    return apiResponse.data || { vid: engagementId, deleted: true };
  };

  #execEngagementCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.engagementCreateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { type, metadata, additionalFields } =
      this.#params.engagementCreateParams;

    const associations = additionalFields?.associations;

    if (!metadata || !Object.keys(metadata).length) {
      throw new Error('At least one metadata field needs to set');
    }

    const body: {
      engagement: { type: string };
      metadata: Record<string, unknown>;
      associations: Record<string, unknown>;
    } = {
      engagement: {
        type: type.toUpperCase(),
      },
      metadata: {},
      associations: {},
    };

    if (type === 'email') {
      body.metadata = this.#getEmailMetadata(metadata);
    }

    if (type === 'task') {
      body.metadata = this.#getTaskMetadata(metadata);
    }

    if (type === 'meeting') {
      body.metadata = this.#getMeetingMetadata(metadata);
    }

    if (type === 'call') {
      body.metadata = this.#getCallMetadata(metadata);
    }

    if (associations) body.associations = this.#getAssociations(associations);

    const endpoint = 'engagements/v1/engagements';
    const apiResponse = await this.#api.apiRequest(
      'POST',
      endpoint,
      this.#auth.token,
      body
    );

    return apiResponse.data;
  };

  #execDealSearch = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.dealSearchParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { additionalFields, returnAll, filterGroupsUi, limit } =
      this.#params.dealSearchParams;

    const sortBy = additionalFields?.sortBy || 'createdate';
    const direction = additionalFields?.direction || 'DESCENDING';

    const body: Record<string, unknown> = {
      sorts: [
        {
          propertyName: sortBy,
          direction,
        },
      ],
    };

    if (filterGroupsUi?.filterGroupsValues) {
      const filterGroupValues = filterGroupsUi.filterGroupsValues as Array<
        Record<string, unknown>
      >;
      body.filterGroups = [];
      for (const filterGroupValue of filterGroupValues) {
        if (filterGroupValue.filtersUi) {
          const filterValues = (
            filterGroupValue.filtersUi as Record<string, unknown>
          ).filterValues as Array<Record<string, unknown>>;
          for (const filter of filterValues) {
            delete filter.type;
            // Hacky way to get the filter value as we concat the values with a | and the type
            filter.propertyName = filter.propertyName?.toString().split('|')[0];
          }
          (body.filterGroups as Array<Record<string, unknown>>).push({
            filters: filterValues,
          });
        }
      }
      if (Array.isArray(body.filterGroups) && body.filterGroups.length > 3) {
        throw new Error('You can only have 3 filter groups');
      }
    }

    Object.assign(body, additionalFields);

    const endpoint = 'crm/v3/objects/deals/search';

    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'results' },
        method: 'POST',
        endpoint,
        data: body,
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      body.limit = limit;
      const apiResponse = await this.#api.apiRequest(
        'POST',
        endpoint,
        this.#auth.token,
        body
      );
      return apiResponse.data?.results;
    }
  };

  #execDealDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.dealDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { dealId } = this.#params.dealDeleteParams;

    const endpoint = `/deals/v1/deal/${dealId}`;
    const apiResponse = await this.#api.apiRequest(
      'DELETE',
      endpoint,
      this.#auth.token
    );

    return apiResponse.data || { vid: dealId, deleted: true };
  };

  #execDealGetRecentlyCreatedUpdated = async (): Promise<
    ApiResponseData | undefined
  > => {
    if (!this.#params?.dealGetRecentlyCreatedUpdatedParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { filters, returnAll, limit } =
      this.#params.dealGetRecentlyCreatedUpdatedParams;

    const qs: Record<string, string | string[]> = {};

    const endpoint = 'deals/v1/deal/recent/created';
    if (filters?.since) {
      qs.since = new Date(filters.since).getTime().toString();
    }
    if (filters?.includePropertyVersions) {
      qs.includePropertyVersions = filters.includePropertyVersions.toString();
    }
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'results' },
        method: 'GET',
        endpoint,
        query: qs,
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      if (limit) qs.count = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.results;
    }
  };

  #execDealGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.dealGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { filters, returnAll, limit } = this.#params.dealGetAllParams;

    const qs: Record<string, string | string[]> = {};

    if (filters?.includeAssociations) {
      qs.includeAssociations = filters.includeAssociations.toString();
    }

    if (filters?.propertiesCollection) {
      const propertiesValues = filters.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }

    const endpoint = 'deals/v1/deal/paged';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'deals' },
        method: 'GET',
        endpoint,
        query: qs,
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.deals;
    }
  };

  #execDealGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.dealGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { dealId, filters } = this.#params.dealGetParams;

    const qs: Record<string, string | string[]> = {};

    if (filters?.includePropertyVersions) {
      qs.includePropertyVersions = filters.includePropertyVersions.toString();
    }

    if (filters?.propertiesCollection) {
      const propertiesValues = filters.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }
    const endpoint = `deals/v1/deal/${dealId}`;
    const apiResponse = await this.#api.apiRequest(
      'GET',
      endpoint,
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data;
  };

  #execDealUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.dealUpdateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { updateFields, dealId } = this.#params.dealUpdateParams;

    const body: {
      associations?: Associations;
      properties?: Array<Record<string, unknown>>;
    } = {};
    body.properties = [];

    if (updateFields?.stage) {
      body.properties.push({
        name: 'dealstage',
        value: updateFields.stage,
      });
    }
    if (updateFields?.dealName) {
      body.properties.push({
        name: 'dealname',
        value: updateFields.dealName,
      });
    }
    if (updateFields?.closeDate) {
      body.properties.push({
        name: 'closedate',
        value: new Date(updateFields.closeDate).getTime(),
      });
    }
    if (updateFields?.amount) {
      body.properties.push({
        name: 'amount',
        value: updateFields.amount,
      });
    }
    if (updateFields?.dealType) {
      body.properties.push({
        name: 'dealtype',
        value: updateFields.dealType,
      });
    }
    if (updateFields?.pipeline) {
      body.properties.push({
        name: 'pipeline',
        value: updateFields.pipeline,
      });
    }
    if (updateFields?.description) {
      body.properties.push({
        name: 'description',
        value: updateFields.description,
      });
    }
    if (updateFields?.customPropertiesUi) {
      const customProperties = (
        updateFields.customPropertiesUi as Record<string, unknown>
      ).customPropertiesValues as Array<Record<string, unknown>>;
      if (customProperties) {
        for (const customProperty of customProperties) {
          body.properties.push({
            name: customProperty.property,
            value: customProperty.value,
          });
        }
      }
    }
    const endpoint = `deals/v1/deal/${dealId}`;
    const apiResponse = await this.#api.apiRequest(
      'PUT',
      endpoint,
      this.#auth.token,
      body
    );

    return apiResponse.data;
  };

  #execDealCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.dealCreateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { additionalFields, stage } = this.#params.dealCreateParams;

    const body: {
      associations?: Associations;
      properties?: Array<Record<string, unknown>>;
    } = {};
    body.properties = [];
    const associations: Associations = {};
    if (stage) {
      body.properties.push({
        name: 'dealstage',
        value: stage,
      });
    }
    if (additionalFields?.associatedCompany) {
      associations.associatedCompanyIds = additionalFields.associatedCompany;
    }
    if (additionalFields?.associatedVids) {
      associations.associatedVids = additionalFields.associatedVids;
    }
    if (additionalFields?.dealName) {
      body.properties.push({
        name: 'dealname',
        value: additionalFields.dealName,
      });
    }
    if (additionalFields?.dealOwner) {
      const dealOwner = additionalFields.dealOwner;
      body.properties.push({
        name: 'hubspot_owner_id',
        value: dealOwner,
      });
    }
    if (additionalFields?.closeDate) {
      body.properties.push({
        name: 'closedate',
        value: new Date(additionalFields.closeDate).getTime(),
      });
    }
    if (additionalFields?.amount) {
      body.properties.push({
        name: 'amount',
        value: additionalFields.amount,
      });
    }
    if (additionalFields?.dealType) {
      body.properties.push({
        name: 'dealtype',
        value: additionalFields.dealType,
      });
    }
    if (additionalFields?.pipeline) {
      body.properties.push({
        name: 'pipeline',
        value: additionalFields.pipeline,
      });
    }
    if (additionalFields?.description) {
      body.properties.push({
        name: 'description',
        value: additionalFields.description,
      });
    }
    if (additionalFields?.customPropertiesUi) {
      const customProperties = (
        additionalFields.customPropertiesUi as Record<string, unknown>
      ).customPropertiesValues as Array<Record<string, unknown>>;
      if (customProperties) {
        for (const customProperty of customProperties) {
          body.properties.push({
            name: customProperty.property,
            value: customProperty.value,
          });
        }
      }
    }
    body.associations = associations;
    const endpoint = 'deals/v1/deal';
    const apiResponse = await this.#api.apiRequest(
      'POST',
      endpoint,
      this.#auth.token,
      body
    );

    return apiResponse.data;
  };

  #execCompanyDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.companyDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { companyId } = this.#params.companyDeleteParams;

    const endpoint = `crm/v3/objects/companies/${companyId}`;
    const apiResponse = await this.#api.apiRequest(
      'DELETE',
      endpoint,
      this.#auth.token,
      undefined,
      undefined
    );

    return apiResponse.data || { vid: companyId, deleted: true };
  };

  #execCompanySearchByDomain = async (): Promise<
    ApiResponseData | undefined
  > => {
    if (!this.#params?.companySearchByDomainParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { options, returnAll, limit } =
      this.#params.companySearchByDomainParams;

    let { domain } = this.#params.companySearchByDomainParams;
    if (domain.includes('https://')) {
      domain = domain.replace('https://', '');
    } else if (domain.includes('http://')) {
      domain = domain.replace('http://', '');
    }
    const body: Record<string, unknown> = {
      requestOptions: {},
    };
    if (options?.properties) {
      body.requestOptions = { properties: options.properties };
    }
    const endpoint = `companies/v2/domains/${domain}/companies`;
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'results' },
        method: 'POST',
        endpoint,
        data: body,
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      body.limit = limit;
      const apiResponse = await this.#api.apiRequest(
        'POST',
        endpoint,
        this.#auth.token,
        body
      );
      return apiResponse.data?.results;
    }
  };

  #execCompanyGetRecentlyCreatedUpdated = async (): Promise<
    ApiResponseData | undefined
  > => {
    if (!this.#params?.companyGetRecentlyCreatedUpdatedParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, additionalFields, limit } =
      this.#params.companyGetRecentlyCreatedUpdatedParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.since) {
      qs.since = new Date(additionalFields.since).getTime().toString();
    }
    if (additionalFields?.propertiesCollection) {
      const propertiesValues = additionalFields.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }
    const endpoint = 'companies/v2/companies/recent/modified';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        toolProps: { propertyName: 'results' },
        method: 'GET',
        endpoint,
        query: qs,
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      if (limit) qs.count = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.results;
    }
  };

  #execCompanyGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.companyGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { options, returnAll, limit } = this.#params.companyGetAllParams;

    const qs: Record<string, string | string[]> = {};

    if (options?.formSubmissionMode) {
      qs.formSubmissionMode = options.formSubmissionMode as string;
    }
    if (options?.listMerberships) {
      qs.showListMemberships = options.listMerberships.toString();
    }
    if (options?.propertiesCollection) {
      const propertiesValues = options.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }
    const endpoint = 'companies/v2/companies/paged';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint,
        authToken: this.#auth.token,
        query: qs,
        toolProps: { propertyName: 'companies' },
      });

      return apiResponse.data;
    } else {
      if (limit) qs.limit = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.companies;
    }
  };

  #execCompanyGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.companyGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { companyId, additionalFields } = this.#params.companyGetParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.includeMergeAudits) {
      qs.includeMergeAudits = additionalFields.includeMergeAudits.toString();
    }
    const endpoint = `companies/v2/companies/${companyId}`;
    const apiResponse = await this.#api.apiRequest(
      'GET',
      endpoint,
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data;
  };

  #execCompanyUpdate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.companyUpdateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { companyId, updateFields } = this.#params.companyUpdateParams;

    const body: Array<Record<string, unknown>> = [];
    if (updateFields?.name) {
      body.push({
        name: 'name',
        value: updateFields.name,
      });
    }
    if (updateFields?.aboutUs) {
      body.push({
        name: 'about_us',
        value: updateFields.aboutUs,
      });
    }
    if (updateFields?.annualRevenue) {
      body.push({
        name: 'annualrevenue',
        value: updateFields.annualRevenue.toString(),
      });
    }
    if (updateFields?.city) {
      body.push({
        name: 'city',
        value: updateFields.city,
      });
    }
    if (updateFields?.closeDate) {
      body.push({
        name: 'closedate',
        value: new Date(updateFields.closeDate).getTime(),
      });
    }
    if (updateFields?.companyDomainName) {
      body.push({
        name: 'domain',
        value: updateFields.companyDomainName,
      });
    }
    if (updateFields?.companyOwner) {
      body.push({
        name: 'hubspot_owner_id',
        value: updateFields.companyOwner,
      });
    }
    if (updateFields?.countryRegion) {
      body.push({
        name: 'country',
        value: updateFields.countryRegion,
      });
    }
    if (updateFields?.description) {
      body.push({
        name: 'description',
        value: updateFields.description,
      });
    }
    if (updateFields?.facebookFans) {
      body.push({
        name: 'facebookfans',
        value: updateFields.facebookFans,
      });
    }
    if (updateFields?.googlePlusPage) {
      body.push({
        name: 'googleplus_page',
        value: updateFields.googlePlusPage,
      });
    }
    if (updateFields?.industry) {
      body.push({
        name: 'industry',
        value: updateFields.industry,
      });
    }
    if (updateFields?.isPublic) {
      body.push({
        name: 'is_public',
        value: updateFields.isPublic,
      });
    }
    if (updateFields?.leadStatus) {
      body.push({
        name: 'hs_lead_status',
        value: updateFields.leadStatus,
      });
    }
    if (updateFields?.lifecycleStatus) {
      body.push({
        name: 'lifecyclestage',
        value: updateFields.lifecycleStatus,
      });
    }
    if (updateFields?.linkedinBio) {
      body.push({
        name: 'linkedinbio',
        value: updateFields.linkedinBio,
      });
    }
    if (updateFields?.linkedInCompanyPage) {
      body.push({
        name: 'linkedin_company_page',
        value: updateFields.linkedInCompanyPage,
      });
    }
    if (updateFields?.numberOfEmployees) {
      body.push({
        name: 'numberofemployees',
        value: updateFields.numberOfEmployees,
      });
    }
    if (updateFields?.originalSourceType) {
      body.push({
        name: 'hs_analytics_source',
        value: updateFields.originalSourceType,
      });
    }
    if (updateFields?.phoneNumber) {
      body.push({
        name: 'phone',
        value: updateFields.phoneNumber,
      });
    }
    if (updateFields?.postalCode) {
      body.push({
        name: 'zip',
        value: updateFields.postalCode,
      });
    }
    if (updateFields?.stateRegion) {
      body.push({
        name: 'state',
        value: updateFields.stateRegion,
      });
    }
    if (updateFields?.streetAddress) {
      body.push({
        name: 'address',
        value: updateFields.streetAddress,
      });
    }
    if (updateFields?.streetAddress2) {
      body.push({
        name: 'address2',
        value: updateFields.streetAddress2,
      });
    }
    if (updateFields?.targetAccount) {
      body.push({
        name: 'hs_target_account',
        value: updateFields.targetAccount,
      });
    }
    if (updateFields?.timezone) {
      body.push({
        name: 'timezone',
        value: updateFields.timezone,
      });
    }
    if (updateFields?.totalMoneyRaised) {
      body.push({
        name: 'total_money_raised',
        value: updateFields.totalMoneyRaised,
      });
    }
    if (updateFields?.twitterBio) {
      body.push({
        name: 'twitterbio',
        value: updateFields.twitterBio,
      });
    }
    if (updateFields?.twitterFollowers) {
      body.push({
        name: 'twitterfollowers',
        value: updateFields.twitterFollowers,
      });
    }
    if (updateFields?.twitterHandle) {
      body.push({
        name: 'twitterhandle',
        value: updateFields.twitterHandle,
      });
    }
    if (updateFields?.type) {
      body.push({
        name: 'type',
        value: updateFields.type,
      });
    }
    if (updateFields?.websiteUrl) {
      body.push({
        name: 'website',
        value: updateFields.websiteUrl,
      });
    }
    if (updateFields?.webTechnologies) {
      body.push({
        name: 'web_technologies',
        value: updateFields.webTechnologies,
      });
    }
    if (updateFields?.yearFounded) {
      body.push({
        name: 'founded_year',
        value: updateFields.yearFounded,
      });
    }
    if (updateFields?.customPropertiesUi) {
      const customProperties = (
        updateFields.customPropertiesUi as Record<string, unknown>
      ).customPropertiesValues as Array<Record<string, unknown>>;

      if (customProperties) {
        for (const customProperty of customProperties) {
          body.push({
            name: customProperty.property,
            value: customProperty.value,
          });
        }
      }
    }
    const endpoint = `companies/v2/companies/${companyId}`;

    const apiResponse = await this.#api.apiRequest(
      'PUT',
      endpoint,
      this.#auth.token,
      {
        properties: body,
      }
    );

    return apiResponse.data;
  };

  #execCompanyCreate = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.companyCreateParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { additionalFields, name } = this.#params.companyCreateParams;

    const body: Array<Record<string, unknown>> = [];
    body.push({
      name: 'name',
      value: name,
    });
    if (additionalFields?.aboutUs) {
      body.push({
        name: 'about_us',
        value: additionalFields.aboutUs,
      });
    }
    if (additionalFields?.annualRevenue) {
      body.push({
        name: 'annualrevenue',
        value: additionalFields.annualRevenue.toString(),
      });
    }
    if (additionalFields?.city) {
      body.push({
        name: 'city',
        value: additionalFields.city,
      });
    }
    if (additionalFields?.closeDate) {
      body.push({
        name: 'closedate',
        value: new Date(additionalFields.closeDate).getTime(),
      });
    }
    if (additionalFields?.companyDomainName) {
      body.push({
        name: 'domain',
        value: additionalFields.companyDomainName,
      });
    }
    if (additionalFields?.companyOwner) {
      body.push({
        name: 'hubspot_owner_id',
        value: additionalFields.companyOwner,
      });
    }
    if (additionalFields?.countryRegion) {
      body.push({
        name: 'country',
        value: additionalFields.countryRegion,
      });
    }
    if (additionalFields?.description) {
      body.push({
        name: 'description',
        value: additionalFields.description,
      });
    }
    if (additionalFields?.facebookFans) {
      body.push({
        name: 'facebookfans',
        value: additionalFields.facebookFans,
      });
    }
    if (additionalFields?.googlePlusPage) {
      body.push({
        name: 'googleplus_page',
        value: additionalFields.googlePlusPage,
      });
    }
    if (additionalFields?.industry) {
      body.push({
        name: 'industry',
        value: additionalFields.industry,
      });
    }
    if (additionalFields?.isPublic) {
      body.push({
        name: 'is_public',
        value: additionalFields.isPublic,
      });
    }
    if (additionalFields?.leadStatus) {
      body.push({
        name: 'hs_lead_status',
        value: additionalFields.leadStatus,
      });
    }
    if (additionalFields?.lifecycleStatus) {
      body.push({
        name: 'lifecyclestage',
        value: additionalFields.lifecycleStatus,
      });
    }
    if (additionalFields?.linkedinBio) {
      body.push({
        name: 'linkedinbio',
        value: additionalFields.linkedinBio,
      });
    }
    if (additionalFields?.linkedInCompanyPage) {
      body.push({
        name: 'linkedin_company_page',
        value: additionalFields.linkedInCompanyPage,
      });
    }
    if (additionalFields?.numberOfEmployees) {
      body.push({
        name: 'numberofemployees',
        value: additionalFields.numberOfEmployees,
      });
    }
    if (additionalFields?.originalSourceType) {
      body.push({
        name: 'hs_analytics_source',
        value: additionalFields.originalSourceType,
      });
    }
    if (additionalFields?.phoneNumber) {
      body.push({
        name: 'phone',
        value: additionalFields.phoneNumber,
      });
    }
    if (additionalFields?.postalCode) {
      body.push({
        name: 'zip',
        value: additionalFields.postalCode,
      });
    }
    if (additionalFields?.stateRegion) {
      body.push({
        name: 'state',
        value: additionalFields.stateRegion,
      });
    }
    if (additionalFields?.streetAddress) {
      body.push({
        name: 'address',
        value: additionalFields.streetAddress,
      });
    }
    if (additionalFields?.streetAddress2) {
      body.push({
        name: 'address2',
        value: additionalFields.streetAddress2,
      });
    }
    if (additionalFields?.targetAccount) {
      body.push({
        name: 'hs_target_account',
        value: additionalFields.targetAccount,
      });
    }
    if (additionalFields?.timezone) {
      body.push({
        name: 'timezone',
        value: additionalFields.timezone,
      });
    }
    if (additionalFields?.totalMoneyRaised) {
      body.push({
        name: 'total_money_raised',
        value: additionalFields.totalMoneyRaised,
      });
    }
    if (additionalFields?.twitterBio) {
      body.push({
        name: 'twitterbio',
        value: additionalFields.twitterBio,
      });
    }
    if (additionalFields?.twitterFollowers) {
      body.push({
        name: 'twitterfollowers',
        value: additionalFields.twitterFollowers,
      });
    }
    if (additionalFields?.twitterHandle) {
      body.push({
        name: 'twitterhandle',
        value: additionalFields.twitterHandle,
      });
    }
    if (additionalFields?.type) {
      body.push({
        name: 'type',
        value: additionalFields.type,
      });
    }
    if (additionalFields?.websiteUrl) {
      body.push({
        name: 'website',
        value: additionalFields.websiteUrl,
      });
    }
    if (additionalFields?.webTechnologies) {
      body.push({
        name: 'web_technologies',
        value: additionalFields.webTechnologies,
      });
    }
    if (additionalFields?.yearFounded) {
      body.push({
        name: 'founded_year',
        value: additionalFields.yearFounded,
      });
    }
    if (additionalFields?.customPropertiesUi) {
      const customProperties = (
        additionalFields.customPropertiesUi as Record<string, unknown>
      ).customPropertiesValues as Array<Record<string, unknown>>;

      if (customProperties) {
        for (const customProperty of customProperties) {
          body.push({
            name: customProperty.property,
            value: customProperty.value,
          });
        }
      }
    }
    const endpoint = 'companies/v2/companies';
    const apiResponse = await this.#api.apiRequest(
      'POST',
      endpoint,
      this.#auth.token,
      {
        properties: body,
      }
    );

    return apiResponse.data;
  };

  #execContactSearch = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactSearchParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { additionalFields, returnAll, filterGroupsUi, limit } =
      this.#params.contactSearchParams;

    const sortBy = additionalFields?.sortBy || 'createdate';
    const direction = additionalFields?.direction || 'DESCENDING';

    const body: Record<string, unknown> = {
      sorts: [
        {
          propertyName: sortBy,
          direction,
        },
      ],
    };

    if (filterGroupsUi?.filterGroupsValues) {
      const filterGroupValues = filterGroupsUi.filterGroupsValues as Array<
        Record<string, unknown>
      >;
      body.filterGroups = [];
      for (const filterGroupValue of filterGroupValues) {
        if (filterGroupValue.filtersUi) {
          const filterValues = (
            filterGroupValue.filtersUi as Record<string, unknown>
          ).filterValues as Array<Record<string, unknown>>;
          for (const filter of filterValues) {
            delete filter.type;
            // Hacky way to get the filter value as we concat the values with a | and the type
            filter.propertyName = filter.propertyName?.toString().split('|')[0];
          }
          (body.filterGroups as Array<Record<string, unknown>>).push({
            filters: filterValues,
          });
        }
      }
      if (Array.isArray(body.filterGroups) && body.filterGroups.length > 3) {
        throw new Error('You can only have 3 filter groups');
      }
    }

    Object.assign(body, additionalFields);

    const endpoint = 'crm/v3/objects/contacts/search';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'POST',
        endpoint,
        data: body,
        toolProps: { propertyName: 'results' },
        authToken: this.#auth.token,
      });

      return apiResponse.data;
    } else {
      body.limit = limit;
      const apiResponse = await this.#api.apiRequest(
        'POST',
        endpoint,
        this.#auth.token,
        undefined,
        undefined
      );
      return apiResponse.data?.results;
    }
  };

  #execContactDelete = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactDeleteParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { contactId } = this.#params.contactDeleteParams;

    const endpoint = `contacts/v1/contact/vid/${contactId}`;
    const apiResponse = await this.#api.apiRequest(
      'DELETE',
      endpoint,
      this.#auth.token
    );
    return apiResponse.data || { vid: contactId, deleted: true };
  };

  #execContactGetRecentlyCreatedUpdatedParams = async (): Promise<
    ApiResponseData | undefined
  > => {
    if (!this.#params?.contactGetRecentlyCreatedUpdatedParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { returnAll, additionalFields, limit } =
      this.#params.contactGetRecentlyCreatedUpdatedParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.formSubmissionMode) {
      qs.formSubmissionMode = additionalFields.formSubmissionMode as string;
    }
    if (additionalFields?.listMemberships) {
      qs.showListMemberships = additionalFields.listMemberships.toString();
    }
    if (additionalFields?.propertiesCollection) {
      const propertiesValues = additionalFields.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }

    const endpoint = 'contacts/v1/lists/recently_updated/contacts/recent';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint,
        authToken: this.#auth.token,
        query: qs,
        toolProps: { propertyName: 'contacts' },
      });

      return apiResponse.data;
    } else {
      if (limit) qs.count = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        qs
      );

      return apiResponse.data?.contacts;
    }
  };

  #execContactGetAll = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactGetAllParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { additionalFields, returnAll, limit } =
      this.#params.contactGetAllParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.formSubmissionMode) {
      qs.formSubmissionMode = additionalFields.formSubmissionMode as string;
    }
    if (additionalFields?.listMemberships) {
      qs.showListMemberships = additionalFields.listMemberships.toString();
    }
    if (additionalFields?.propertiesCollection) {
      const propertiesValues = additionalFields.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }

    const endpoint = 'contacts/v1/lists/all/contacts/all';
    if (returnAll) {
      const apiResponse = await this.#api.apiRequestAllItems({
        method: 'GET',
        endpoint,
        authToken: this.#auth.token,
        toolProps: { propertyName: 'contacts' },
        query: qs,
      });
      return apiResponse.data;
    } else {
      if (limit) qs.count = limit.toString();
      const apiResponse = await this.#api.apiRequest(
        'GET',
        endpoint,
        this.#auth.token,
        undefined,
        qs
      );
      return apiResponse.data?.contacts;
    }
  };

  #execContactGet = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactGetParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { contactId, additionalFields } = this.#params.contactGetParams;

    const qs: Record<string, string | string[]> = {};

    if (additionalFields?.formSubmissionMode) {
      qs.formSubmissionMode = additionalFields.formSubmissionMode as string;
    }
    if (additionalFields?.listMemberships) {
      qs.showListMemberships = additionalFields.listMemberships.toString();
    }
    if (additionalFields?.propertiesCollection) {
      const propertiesValues = additionalFields.propertiesCollection
        .propertiesValues as Record<string, unknown>;
      const properties = propertiesValues.properties as string | string[];
      qs.properties = !Array.isArray(propertiesValues.properties)
        ? (properties as string).split(',')
        : properties;
      qs.propertyMode = snakeCase(propertiesValues.propertyMode as string);
    }

    const apiResponse = await this.#api.apiRequest(
      'GET',
      `contacts/v1/contact/vid/${contactId}/profile`,
      this.#auth.token,
      undefined,
      qs
    );

    return apiResponse.data;
  };

  #execContactUpsert = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactUpsertParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { email, additionalFields, options } =
      this.#params.contactUpsertParams;

    const body: Array<Record<string, unknown>> = [];
    if (additionalFields?.annualRevenue) {
      body.push({
        property: 'annualrevenue',
        value: additionalFields.annualRevenue.toString(),
      });
    }
    if (additionalFields?.city) {
      body.push({
        property: 'city',
        value: additionalFields.city,
      });
    }
    if (additionalFields?.clickedFacebookAd) {
      body.push({
        property: 'hs_facebook_ad_clicked',
        value: additionalFields.clickedFacebookAd,
      });
    }
    if (additionalFields?.closeDate) {
      body.push({
        property: 'closedate',
        value: new Date(additionalFields.closeDate).getTime(),
      });
    }
    if (additionalFields?.companyName) {
      body.push({
        property: 'company',
        value: additionalFields.companyName,
      });
    }
    if (additionalFields?.companySize) {
      body.push({
        property: 'company_size',
        value: additionalFields.companySize,
      });
    }
    if (additionalFields?.contactOwner) {
      body.push({
        property: 'hubspot_owner_id',
        value: additionalFields.contactOwner,
      });
    }
    if (additionalFields?.country) {
      body.push({
        property: 'country',
        value: additionalFields.country,
      });
    }
    if (additionalFields?.dateOfBirth) {
      body.push({
        property: 'date_of_birth',
        value: additionalFields.dateOfBirth,
      });
    }
    if (additionalFields?.degree) {
      body.push({
        property: 'degree',
        value: additionalFields.degree,
      });
    }
    if (additionalFields?.facebookClickId) {
      body.push({
        property: 'hs_facebook_click_id',
        value: additionalFields.facebookClickId,
      });
    }
    if (additionalFields?.faxNumber) {
      body.push({
        property: 'fax',
        value: additionalFields.faxNumber,
      });
    }
    if (additionalFields?.fieldOfStudy) {
      body.push({
        property: 'field_of_study',
        value: additionalFields.fieldOfStudy,
      });
    }
    if (additionalFields?.firstName) {
      body.push({
        property: 'firstname',
        value: additionalFields.firstName,
      });
    }
    if (additionalFields?.gender) {
      body.push({
        property: 'gender',
        value: additionalFields.gender,
      });
    }
    if (additionalFields?.googleAdClickId) {
      body.push({
        property: 'hs_google_click_id',
        value: additionalFields.googleAdClickId,
      });
    }
    if (additionalFields?.graduationDate) {
      body.push({
        property: 'graduation_date',
        value: additionalFields.graduationDate,
      });
    }
    if (additionalFields?.industry) {
      body.push({
        property: 'industry',
        value: additionalFields.industry,
      });
    }
    if (additionalFields?.jobFunction) {
      body.push({
        property: 'job_function',
        value: additionalFields.jobFunction,
      });
    }
    if (additionalFields?.jobTitle) {
      body.push({
        property: 'jobtitle',
        value: additionalFields.jobTitle,
      });
    }
    if (additionalFields?.lastName) {
      body.push({
        property: 'lastname',
        value: additionalFields.lastName,
      });
    }
    if (additionalFields?.leadStatus) {
      body.push({
        property: 'hs_lead_status',
        value: additionalFields.leadStatus,
      });
    }
    if (additionalFields?.processingContactData) {
      body.push({
        property: 'hs_legal_basis',
        value: additionalFields.processingContactData,
      });
    }
    if (additionalFields?.lifeCycleStage) {
      body.push({
        property: 'lifecyclestage',
        value: additionalFields.lifeCycleStage,
      });
    }
    if (additionalFields?.maritalStatus) {
      body.push({
        property: 'marital_status',
        value: additionalFields.maritalStatus,
      });
    }
    if (additionalFields?.membershipNote) {
      body.push({
        property: 'hs_content_membership_notes',
        value: additionalFields.membershipNote,
      });
    }
    if (additionalFields?.message) {
      body.push({
        property: 'message',
        value: additionalFields.message,
      });
    }
    if (additionalFields?.mobilePhoneNumber) {
      body.push({
        property: 'mobilephone',
        value: additionalFields.mobilePhoneNumber,
      });
    }
    if (additionalFields?.numberOfEmployees) {
      body.push({
        property: 'numemployees',
        value: additionalFields.numberOfEmployees,
      });
    }
    if (additionalFields?.originalSource) {
      body.push({
        property: 'hs_analytics_source',
        value: additionalFields.originalSource,
      });
    }
    if (additionalFields?.phoneNumber) {
      body.push({
        property: 'phone',
        value: additionalFields.phoneNumber,
      });
    }
    if (additionalFields?.postalCode) {
      body.push({
        property: 'zip',
        value: additionalFields.postalCode,
      });
    }
    if (additionalFields?.prefferedLanguage) {
      body.push({
        property: 'hs_language',
        value: additionalFields.prefferedLanguage,
      });
    }
    if (additionalFields?.relationshipStatus) {
      body.push({
        property: 'relationship_status',
        value: additionalFields.relationshipStatus,
      });
    }
    if (additionalFields?.salutation) {
      body.push({
        property: 'salutation',
        value: additionalFields.salutation,
      });
    }
    if (additionalFields?.school) {
      body.push({
        property: 'school',
        value: additionalFields.school,
      });
    }
    if (additionalFields?.seniority) {
      body.push({
        property: 'seniority',
        value: additionalFields.seniority,
      });
    }
    if (additionalFields?.startDate) {
      body.push({
        property: 'start_date',
        value: additionalFields.startDate,
      });
    }
    if (additionalFields?.stateRegion) {
      body.push({
        property: 'state',
        value: additionalFields.stateRegion,
      });
    }
    if (additionalFields?.status) {
      body.push({
        property: 'hs_content_membership_status',
        value: additionalFields.status,
      });
    }
    if (additionalFields?.streetAddress) {
      body.push({
        property: 'address',
        value: additionalFields.streetAddress,
      });
    }
    if (additionalFields?.twitterUsername) {
      body.push({
        property: 'twitterhandle',
        value: additionalFields.twitterUsername,
      });
    }
    if (additionalFields?.websiteUrl) {
      body.push({
        property: 'website',
        value: additionalFields.websiteUrl,
      });
    }
    if (additionalFields?.workEmail) {
      body.push({
        property: 'work_email',
        value: additionalFields.workEmail,
      });
    }

    if (additionalFields?.customPropertiesUi) {
      const customProperties = (
        additionalFields.customPropertiesUi as Record<string, unknown>
      ).customPropertiesValues as Array<Record<string, unknown>>;

      if (customProperties) {
        for (const customProperty of customProperties) {
          body.push({
            property: customProperty.property,
            value: customProperty.value,
          });
        }
      }
    }

    let apiResponse = await this.#api.apiRequest(
      'POST',
      `contacts/v1/contact/createOrUpdate/email/${email}`,
      this.#auth.token,
      {
        properties: body,
      },
      undefined
    );

    if (additionalFields?.associatedCompanyId) {
      const companyAssociations: Array<Record<string, unknown>> = [];
      companyAssociations.push({
        fromObjectId: apiResponse.data?.vid,
        toObjectId: additionalFields.associatedCompanyId,
        category: 'HUBSPOT_DEFINED',
        definitionId: 1,
      });
      apiResponse = await this.#api.apiRequest(
        'PUT',
        `crm-associations/v1/associations/create-batch`,
        this.#auth.token,
        companyAssociations,
        undefined
      );
    }

    if (!options?.resolveData) {
      const isNew = apiResponse.data?.isNew;

      const vid = apiResponse.data?.vid;
      if (typeof vid !== 'string') throw new Error('No vid returned');
      apiResponse = await this.#api.apiRequest(
        'GET',
        `contacts/v1/contact/vid/${vid}/profile`,
        this.#auth.token,
        undefined,
        additionalFields?.properties
          ? { property: additionalFields.properties }
          : undefined
      );
      if (apiResponse.data) apiResponse.data.isNew = isNew;
    }
    return apiResponse.data;
  };

  #execContactListRemove = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactListRemoveParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { listId, id } = this.#params.contactListRemoveParams;

    const body: Record<string, number[]> = {
      vids: [id],
    };

    const apiResponse = await this.#api.apiRequest(
      'POST',
      `contacts/v1/lists/${listId}/remove`,
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #execContactListAdd = async (): Promise<ApiResponseData | undefined> => {
    if (!this.#params?.contactListAddParams)
      throw new Error('Operation specific params missing');
    if (!this.#auth) throw new Error('Auth missing');
    if (!this.#api) throw new Error('Api missing');

    const { listId, by, id, email } = this.#params.contactListAddParams;

    const body: Record<string, Array<string | number>> = {
      emails: [],
      vids: [],
    };

    if (by === 'id') {
      body.vids.push(id);
    } else {
      body.emails.push(email);
    }

    const apiResponse = await this.#api.apiRequest(
      'POST',
      `contacts/v1/lists/${listId}/add`,
      this.#auth.token,
      body,
      undefined
    );

    return apiResponse.data;
  };

  #propertyEvents = [
    'contact.propertyChange',
    'company.propertyChange',
    'deal.propertyChange',
  ];

  #contactFields = [
    {
      id: 'company_size',
      label: 'testingricardo',
    },
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'date_of_birth',
      label: 'Date of birth',
    },
    {
      id: 'days_to_close',
      label: 'Days To Close',
    },
    {
      id: 'degree',
      label: 'Degree',
    },
    {
      id: 'field_of_study',
      label: 'Field of study',
    },
    {
      id: 'first_conversion_date',
      label: 'First Conversion Date',
    },
    {
      id: 'first_conversion_event_name',
      label: 'First Conversion',
    },
    {
      id: 'first_deal_created_date',
      label: 'First Deal Created Date',
    },
    {
      id: 'gender',
      label: 'Gender',
    },
    {
      id: 'graduation_date',
      label: 'Graduation date',
    },
    {
      id: 'hs_additional_emails',
      label: 'Additional email addresses',
    },
    {
      id: 'hs_all_contact_vids',
      label: 'All vids for a contact',
    },
    {
      id: 'hs_analytics_first_touch_converting_campaign',
      label: 'First Touch Converting Campaign',
    },
    {
      id: 'hs_analytics_last_touch_converting_campaign',
      label: 'Last Touch Converting Campaign',
    },
    {
      id: 'hs_avatar_filemanager_key',
      label: 'Avatar FileManager key',
    },
    {
      id: 'hs_buying_role',
      label: 'Buying Role',
    },
    {
      id: 'hs_calculated_form_submissions',
      label: 'All form submissions for a contact',
    },
    {
      id: 'hs_calculated_merged_vids',
      label: 'Merged vids with timestamps of a contact',
    },
    {
      id: 'hs_calculated_mobile_number',
      label: 'Calculated Mobile Number in International Format',
    },
    {
      id: 'hs_calculated_phone_number',
      label: 'Calculated Phone Number in International Format',
    },
    {
      id: 'hs_calculated_phone_number_area_code',
      label: 'Calculated Phone Number Area Code',
    },
    {
      id: 'hs_calculated_phone_number_country_code',
      label: 'Calculated Phone Number Country Code',
    },
    {
      id: 'hs_calculated_phone_number_region_code',
      label: 'Calculated Phone Number Region',
    },
    {
      id: 'hs_content_membership_email_confirmed',
      label: 'Email Confirmed',
    },
    {
      id: 'hs_content_membership_notes',
      label: 'Membership Notes',
    },
    {
      id: 'hs_content_membership_registered_at',
      label: 'Registered At',
    },
    {
      id: 'hs_content_membership_registration_domain_sent_to',
      label: 'Domain to which registration email was sent',
    },
    {
      id: 'hs_content_membership_registration_email_sent_at',
      label: 'Time registration email was sent',
    },
    {
      id: 'hs_content_membership_status',
      label: 'Status',
    },
    {
      id: 'hs_conversations_visitor_email',
      label: 'Conversations visitor email',
    },
    {
      id: 'hs_count_is_unworked',
      label: 'Count of unengaged contacts',
    },
    {
      id: 'hs_count_is_worked',
      label: 'Count of engaged contacts',
    },
    {
      id: 'hs_created_by_conversations',
      label: 'Created By Conversations',
    },
    {
      id: 'hs_created_by_user_id',
      label: 'Created by user ID',
    },
    {
      id: 'hs_createdate',
      label: 'Object create date/time',
    },
    {
      id: 'hs_document_last_revisited',
      label: 'Recent Document Revisit Date',
    },
    {
      id: 'hs_email_bad_address',
      label: 'Invalid email address',
    },
    {
      id: 'hs_email_customer_quarantined_reason',
      label: 'Email address quarantine reason',
    },
    {
      id: 'hs_email_domain',
      label: 'Email Domain',
    },
    {
      id: 'hs_email_hard_bounce_reason',
      label: 'Email hard bounce reason',
    },
    {
      id: 'hs_email_hard_bounce_reason_enum',
      label: 'Email hard bounce reason',
    },
    {
      id: 'hs_email_quarantined',
      label: 'Email Address Quarantined',
    },
    {
      id: 'hs_email_quarantined_reason',
      label: 'Email address internal quarantine reason',
    },
    {
      id: 'hs_email_recipient_fatigue_recovery_time',
      label: 'Email Address Recipient Fatigue Next Available Sending Time',
    },
    {
      id: 'hs_email_sends_since_last_engagement',
      label: 'Sends Since Last Engagement',
    },
    {
      id: 'hs_emailconfirmationstatus',
      label: 'Marketing email confirmation status',
    },
    {
      id: 'hs_facebook_ad_clicked',
      label: 'Clicked Facebook ad',
    },
    {
      id: 'hs_facebook_click_id',
      label: 'Facebook click id',
    },
    {
      id: 'hs_facebookid',
      label: 'Facebook ID',
    },
    {
      id: 'hs_feedback_last_nps_follow_up',
      label: 'Last NPS survey comment',
    },
    {
      id: 'hs_feedback_last_nps_rating',
      label: 'Last NPS survey rating',
    },
    {
      id: 'hs_feedback_last_survey_date',
      label: 'Last NPS survey date',
    },
    {
      id: 'hs_feedback_show_nps_web_survey',
      label: 'Should be shown an NPS web survey',
    },
    {
      id: 'hs_first_engagement_object_id',
      label: 'ID of first engagement',
    },
    {
      id: 'hs_google_click_id',
      label: 'Google ad click id',
    },
    {
      id: 'hs_googleplusid',
      label: 'googleplus ID',
    },
    {
      id: 'hs_ip_timezone',
      label: 'IP Timezone',
    },
    {
      id: 'hs_is_contact',
      label: 'Is a contact',
    },
    {
      id: 'hs_is_unworked',
      label: 'Contact unworked',
    },
    {
      id: 'hs_last_sales_activity_date',
      label: 'last sales activity date old',
    },
    {
      id: 'hs_last_sales_activity_timestamp',
      label: 'Last Engagement Date',
    },
    {
      id: 'hs_lastmodifieddate',
      label: 'Object last modified date/time',
    },
    {
      id: 'hs_lead_status',
      label: 'Lead Status',
    },
    {
      id: 'hs_legal_basis',
      label: "Legal basis for processing contact's data",
    },
    {
      id: 'hs_linkedinid',
      label: 'Linkedin ID',
    },
    {
      id: 'hs_marketable_reason_id',
      label: 'Marketing contact status source name',
    },
    {
      id: 'hs_marketable_reason_type',
      label: 'Marketing contact status source type',
    },
    {
      id: 'hs_marketable_status',
      label: 'Marketing contact status',
    },
    {
      id: 'hs_marketable_until_renewal',
      label: 'Marketing contact until next update',
    },
    {
      id: 'hs_merged_object_ids',
      label: 'Merged object IDs',
    },
    {
      id: 'hs_object_id',
      label: 'Contact ID',
    },
    {
      id: 'hs_predictivecontactscore_v2',
      label: 'Likelihood to close',
    },
    {
      id: 'hs_predictivescoringtier',
      label: 'Contact priority',
    },
    {
      id: 'hs_sa_first_engagement_date',
      label: 'Date of first engagement',
    },
    {
      id: 'hs_sa_first_engagement_descr',
      label: 'Description of first engagement',
    },
    {
      id: 'hs_sa_first_engagement_object_type',
      label: 'Type of first engagement',
    },
    {
      id: 'hs_sales_email_last_clicked',
      label: 'Recent Sales Email Clicked Date',
    },
    {
      id: 'hs_sales_email_last_opened',
      label: 'Recent Sales Email Opened Date',
    },
    {
      id: 'hs_searchable_calculated_international_mobile_number',
      label: 'Calculated Mobile Number with country code',
    },
    {
      id: 'hs_searchable_calculated_international_phone_number',
      label: 'Calculated Phone Number with country code',
    },
    {
      id: 'hs_searchable_calculated_mobile_number',
      label: 'Calculated Mobile Number without country code',
    },
    {
      id: 'hs_searchable_calculated_phone_number',
      label: 'Calculated Phone Number without country code',
    },
    {
      id: 'hs_sequences_is_enrolled',
      label: 'Currently in Sequence',
    },
    {
      id: 'hs_testpurge',
      label: 'testpurge',
    },
    {
      id: 'hs_testrollback',
      label: 'testrollback',
    },
    {
      id: 'hs_time_between_contact_creation_and_deal_close',
      label: 'Time between contact creation and deal close',
    },
    {
      id: 'hs_time_between_contact_creation_and_deal_creation',
      label: 'Time between contact creation and deal creation',
    },
    {
      id: 'hs_time_to_first_engagement',
      label: 'Lead response time',
    },
    {
      id: 'hs_time_to_move_from_lead_to_customer',
      label: 'Time to move from lead to customer',
    },
    {
      id: 'hs_time_to_move_from_marketingqualifiedlead_to_customer',
      label: 'Time to move from marketing qualified lead to customer',
    },
    {
      id: 'hs_time_to_move_from_opportunity_to_customer',
      label: 'Time to move from opportunity to customer',
    },
    {
      id: 'hs_time_to_move_from_salesqualifiedlead_to_customer',
      label: 'Time to move from sales qualified lead to customer',
    },
    {
      id: 'hs_time_to_move_from_subscriber_to_customer',
      label: 'Time to move from subscriber to customer',
    },
    {
      id: 'hs_twitterid',
      label: 'Twitter ID',
    },
    {
      id: 'hs_updated_by_user_id',
      label: 'Updated by user ID',
    },
    {
      id: 'hs_user_ids_of_all_owners',
      label: 'User IDs of all owners',
    },
    {
      id: 'hubspot_owner_assigneddate',
      label: 'Owner Assigned Date',
    },
    {
      id: 'ip_city',
      label: 'IP City',
    },
    {
      id: 'ip_country',
      label: 'IP Country',
    },
    {
      id: 'ip_country_code',
      label: 'IP Country Code',
    },
    {
      id: 'ip_latlon',
      label: 'IP Latitude & Longitude',
    },
    {
      id: 'ip_state',
      label: 'IP State/Region',
    },
    {
      id: 'ip_state_code',
      label: 'IP State Code/Region Code',
    },
    {
      id: 'ip_zipcode',
      label: 'IP Zipcode',
    },
    {
      id: 'job_function',
      label: 'Job function',
    },
    {
      id: 'lastmodifieddate',
      label: 'Last Modified Date',
    },
    {
      id: 'marital_status',
      label: 'Marital Status',
    },
    {
      id: 'military_status',
      label: 'Military status',
    },
    {
      id: 'num_associated_deals',
      label: 'Associated Deals',
    },
    {
      id: 'num_conversion_events',
      label: 'Number of Form Submissions',
    },
    {
      id: 'num_unique_conversion_events',
      label: 'Number of Unique Forms Submitted',
    },
    {
      id: 'recent_conversion_date',
      label: 'Recent Conversion Date',
    },
    {
      id: 'recent_conversion_event_name',
      label: 'Recent Conversion',
    },
    {
      id: 'recent_deal_amount',
      label: 'Recent Deal Amount',
    },
    {
      id: 'recent_deal_close_date',
      label: 'Recent Deal Close Date',
    },
    {
      id: 'relationship_status',
      label: 'Relationship Status',
    },
    {
      id: 'school',
      label: 'School',
    },
    {
      id: 'seniority',
      label: 'Seniority',
    },
    {
      id: 'start_date',
      label: 'Start date',
    },
    {
      id: 'testing',
      label: 'testing',
    },
    {
      id: 'total_revenue',
      label: 'Total Revenue',
    },
    {
      id: 'work_email',
      label: 'Work email',
    },
    {
      id: 'firstname',
      label: 'First Name',
    },
    {
      id: 'hs_analytics_first_url',
      label: 'First Page Seen',
    },
    {
      id: 'hs_email_delivered',
      label: 'Marketing emails delivered',
    },
    {
      id: 'hs_email_optout_6871816',
      label: 'Opted out of email: Marketing Information',
    },
    {
      id: 'hs_email_optout_8363428',
      label: 'Opted out of email: One to One',
    },
    {
      id: 'twitterhandle',
      label: 'Twitter Username',
    },
    {
      id: 'currentlyinworkflow',
      label: 'Currently in workflow',
    },
    {
      id: 'followercount',
      label: 'Follower Count',
    },
    {
      id: 'hs_analytics_last_url',
      label: 'Last Page Seen',
    },
    {
      id: 'hs_email_open',
      label: 'Marketing emails opened',
    },
    {
      id: 'lastname',
      label: 'Last Name',
    },
    {
      id: 'hs_analytics_num_page_views',
      label: 'Number of Pageviews',
    },
    {
      id: 'hs_email_click',
      label: 'Marketing emails clicked',
    },
    {
      id: 'salutation',
      label: 'Salutation',
    },
    {
      id: 'twitterprofilephoto',
      label: 'Twitter Profile Photo',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'hs_analytics_num_visits',
      label: 'Number of Sessions',
    },
    {
      id: 'hs_email_bounce',
      label: 'Marketing emails bounced',
    },
    {
      id: 'hs_persona',
      label: 'Persona',
    },
    {
      id: 'hs_social_last_engagement',
      label: 'Most Recent Social Click',
    },
    {
      id: 'hs_analytics_num_event_completions',
      label: 'Number of event completions',
    },
    {
      id: 'hs_email_optout',
      label: 'Unsubscribed from all email',
    },
    {
      id: 'hs_social_twitter_clicks',
      label: 'Twitter Clicks',
    },
    {
      id: 'mobilephone',
      label: 'Mobile Phone Number',
    },
    {
      id: 'phone',
      label: 'Phone Number',
    },
    {
      id: 'fax',
      label: 'Fax Number',
    },
    {
      id: 'hs_analytics_first_timestamp',
      label: 'Time First Seen',
    },
    {
      id: 'hs_email_last_email_name',
      label: 'Last marketing email name',
    },
    {
      id: 'hs_email_last_send_date',
      label: 'Last marketing email send date',
    },
    {
      id: 'hs_social_facebook_clicks',
      label: 'Facebook Clicks',
    },
    {
      id: 'address',
      label: 'Street Address',
    },
    {
      id: 'engagements_last_meeting_booked',
      label: 'Date of last meeting booked in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_campaign',
      label: 'Campaign of last booking in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_medium',
      label: 'Medium of last booking in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_source',
      label: 'Source of last booking in meetings tool',
    },
    {
      id: 'hs_analytics_first_visit_timestamp',
      label: 'Time of First Session',
    },
    {
      id: 'hs_email_last_open_date',
      label: 'Last marketing email open date',
    },
    {
      id: 'hs_latest_meeting_activity',
      label: 'Latest meeting activity',
    },
    {
      id: 'hs_sales_email_last_replied',
      label: 'Recent Sales Email Replied Date',
    },
    {
      id: 'hs_social_linkedin_clicks',
      label: 'LinkedIn Clicks',
    },
    {
      id: 'hubspot_owner_id',
      label: 'Contact owner',
    },
    {
      id: 'notes_last_contacted',
      label: 'Last Contacted',
    },
    {
      id: 'notes_last_updated',
      label: 'Last Activity Date',
    },
    {
      id: 'notes_next_activity_date',
      label: 'Next Activity Date',
    },
    {
      id: 'num_contacted_notes',
      label: 'Number of times contacted',
    },
    {
      id: 'num_notes',
      label: 'Number of Sales Activities',
    },
    {
      id: 'owneremail',
      label: 'HubSpot Owner Email (legacy)',
    },
    {
      id: 'ownername',
      label: 'HubSpot Owner Name (legacy)',
    },
    {
      id: 'surveymonkeyeventlastupdated',
      label: 'SurveyMonkey Event Last Updated',
    },
    {
      id: 'webinareventlastupdated',
      label: 'Webinar Event Last Updated',
    },
    {
      id: 'city',
      label: 'City',
    },
    {
      id: 'hs_analytics_last_timestamp',
      label: 'Time Last Seen',
    },
    {
      id: 'hs_email_last_click_date',
      label: 'Last marketing email click date',
    },
    {
      id: 'hs_social_google_plus_clicks',
      label: 'Google Plus Clicks',
    },
    {
      id: 'hubspot_team_id',
      label: 'HubSpot Team',
    },
    {
      id: 'linkedinbio',
      label: 'LinkedIn Bio',
    },
    {
      id: 'twitterbio',
      label: 'Twitter Bio',
    },
    {
      id: 'hs_all_owner_ids',
      label: 'All owner ids',
    },
    {
      id: 'hs_analytics_last_visit_timestamp',
      label: 'Time of Last Session',
    },
    {
      id: 'hs_email_first_send_date',
      label: 'First marketing email send date',
    },
    {
      id: 'hs_social_num_broadcast_clicks',
      label: 'Broadcast Clicks',
    },
    {
      id: 'state',
      label: 'State/Region',
    },
    {
      id: 'hs_all_team_ids',
      label: 'All team ids',
    },
    {
      id: 'hs_analytics_source',
      label: 'Original Source',
    },
    {
      id: 'hs_email_first_open_date',
      label: 'First marketing email open date',
    },
    {
      id: 'zip',
      label: 'Postal Code',
    },
    {
      id: 'country',
      label: 'Country/Region',
    },
    {
      id: 'hs_all_accessible_team_ids',
      label: 'All accessible team ids',
    },
    {
      id: 'hs_analytics_source_data_1',
      label: 'Original Source Drill-Down 1',
    },
    {
      id: 'hs_email_first_click_date',
      label: 'First marketing email click date',
    },
    {
      id: 'linkedinconnections',
      label: 'LinkedIn Connections',
    },
    {
      id: 'hs_analytics_source_data_2',
      label: 'Original Source Drill-Down 2',
    },
    {
      id: 'hs_email_is_ineligible',
      label: 'Is globally ineligible',
    },
    {
      id: 'hs_language',
      label: 'Preferred language',
    },
    {
      id: 'kloutscoregeneral',
      label: 'Klout Score',
    },
    {
      id: 'hs_analytics_first_referrer',
      label: 'First Referring Site',
    },
    {
      id: 'hs_email_first_reply_date',
      label: 'First marketing email reply date',
    },
    {
      id: 'jobtitle',
      label: 'Job Title',
    },
    {
      id: 'photo',
      label: 'Photo',
    },
    {
      id: 'hs_analytics_last_referrer',
      label: 'Last Referring Site',
    },
    {
      id: 'hs_email_last_reply_date',
      label: 'Last marketing email reply date',
    },
    {
      id: 'message',
      label: 'Message',
    },
    {
      id: 'closedate',
      label: 'Close Date',
    },
    {
      id: 'hs_analytics_average_page_views',
      label: 'Average Pageviews',
    },
    {
      id: 'hs_email_replied',
      label: 'Marketing emails replied',
    },
    {
      id: 'hs_analytics_revenue',
      label: 'Event Revenue',
    },
    {
      id: 'hs_lifecyclestage_lead_date',
      label: 'Became a Lead Date',
    },
    {
      id: 'hs_lifecyclestage_marketingqualifiedlead_date',
      label: 'Became a Marketing Qualified Lead Date',
    },
    {
      id: 'hs_lifecyclestage_opportunity_date',
      label: 'Became an Opportunity Date',
    },
    {
      id: 'lifecyclestage',
      label: 'Lifecycle Stage',
    },
    {
      id: 'hs_lifecyclestage_salesqualifiedlead_date',
      label: 'Became a Sales Qualified Lead Date',
    },
    {
      id: 'createdate',
      label: 'Create Date',
    },
    {
      id: 'hs_lifecyclestage_evangelist_date',
      label: 'Became an Evangelist Date',
    },
    {
      id: 'hs_lifecyclestage_customer_date',
      label: 'Became a Customer Date',
    },
    {
      id: 'hubspotscore',
      label: 'HubSpot Score',
    },
    {
      id: 'company',
      label: 'Company Name',
    },
    {
      id: 'hs_lifecyclestage_subscriber_date',
      label: 'Became a Subscriber Date',
    },
    {
      id: 'hs_lifecyclestage_other_date',
      label: 'Became an Other Lifecycle Date',
    },
    {
      id: 'website',
      label: 'Website URL',
    },
    {
      id: 'numemployees',
      label: 'Number of Employees',
    },
    {
      id: 'annualrevenue',
      label: 'Annual Revenue',
    },
    {
      id: 'industry',
      label: 'Industry',
    },
    {
      id: 'associatedcompanyid',
      label: 'Associated Company ID',
    },
    {
      id: 'associatedcompanylastupdated',
      label: 'Associated Company Last Updated',
    },
    {
      id: 'hs_predictivecontactscorebucket',
      label: 'Lead Rating',
    },
    {
      id: 'hs_predictivecontactscore',
      label: 'Predictive Lead Score',
    },
  ];

  #companyFields = [
    {
      id: 'about_us',
      label: 'About Us',
    },
    {
      id: 'closedate_timestamp_earliest_value_a2a17e6e',
      label: 'closedate_timestamp_earliest_value_a2a17e6e',
    },
    {
      id: 'facebookfans',
      label: 'Facebook Fans',
    },
    {
      id: 'first_contact_createdate_timestamp_earliest_value_78b50eea',
      label: 'first_contact_createdate_timestamp_earliest_value_78b50eea',
    },
    {
      id: 'first_conversion_date',
      label: 'First Conversion Date',
    },
    {
      id: 'first_conversion_date_timestamp_earliest_value_61f58f2c',
      label: 'first_conversion_date_timestamp_earliest_value_61f58f2c',
    },
    {
      id: 'first_conversion_event_name',
      label: 'First Conversion',
    },
    {
      id: 'first_conversion_event_name_timestamp_earliest_value_68ddae0a',
      label: 'first_conversion_event_name_timestamp_earliest_value_68ddae0a',
    },
    {
      id: 'first_deal_created_date',
      label: 'First Deal Created Date',
    },
    {
      id: 'founded_year',
      label: 'Year Founded',
    },
    {
      id: 'hs_additional_domains',
      label: 'Additional Domains',
    },
    {
      id: 'hs_analytics_first_timestamp',
      label: 'Time First Seen',
    },
    {
      id: 'hs_analytics_first_timestamp_timestamp_earliest_value_11e3a63a',
      label: 'hs_analytics_first_timestamp_timestamp_earliest_value_11e3a63a',
    },
    {
      id: 'hs_analytics_first_touch_converting_campaign',
      label: 'First Touch Converting Campaign',
    },
    {
      id: 'hs_analytics_first_touch_converting_campaign_timestamp_earliest_value_4757fe10',
      label:
        'hs_analytics_first_touch_converting_campaign_timestamp_earliest_value_4757fe10',
    },
    {
      id: 'hs_analytics_first_visit_timestamp',
      label: 'Time of First Session',
    },
    {
      id: 'hs_analytics_first_visit_timestamp_timestamp_earliest_value_accc17ae',
      label:
        'hs_analytics_first_visit_timestamp_timestamp_earliest_value_accc17ae',
    },
    {
      id: 'hs_analytics_last_timestamp',
      label: 'Time Last Seen',
    },
    {
      id: 'hs_analytics_last_timestamp_timestamp_latest_value_4e16365a',
      label: 'hs_analytics_last_timestamp_timestamp_latest_value_4e16365a',
    },
    {
      id: 'hs_analytics_last_touch_converting_campaign',
      label: 'Last Touch Converting Campaign',
    },
    {
      id: 'hs_analytics_last_touch_converting_campaign_timestamp_latest_value_81a64e30',
      label:
        'hs_analytics_last_touch_converting_campaign_timestamp_latest_value_81a64e30',
    },
    {
      id: 'hs_analytics_last_visit_timestamp',
      label: 'Time of Last Session',
    },
    {
      id: 'hs_analytics_last_visit_timestamp_timestamp_latest_value_999a0fce',
      label:
        'hs_analytics_last_visit_timestamp_timestamp_latest_value_999a0fce',
    },
    {
      id: 'hs_analytics_num_page_views',
      label: 'Number of Pageviews',
    },
    {
      id: 'hs_analytics_num_page_views_cardinality_sum_e46e85b0',
      label: 'hs_analytics_num_page_views_cardinality_sum_e46e85b0',
    },
    {
      id: 'hs_analytics_num_visits',
      label: 'Number of Sessions',
    },
    {
      id: 'hs_analytics_num_visits_cardinality_sum_53d952a6',
      label: 'hs_analytics_num_visits_cardinality_sum_53d952a6',
    },
    {
      id: 'hs_analytics_source',
      label: 'Original Source Type',
    },
    {
      id: 'hs_analytics_source_data_1',
      label: 'Original Source Data 1',
    },
    {
      id: 'hs_analytics_source_data_1_timestamp_earliest_value_9b2f1fa1',
      label: 'hs_analytics_source_data_1_timestamp_earliest_value_9b2f1fa1',
    },
    {
      id: 'hs_analytics_source_data_2',
      label: 'Original Source Data 2',
    },
    {
      id: 'hs_analytics_source_data_2_timestamp_earliest_value_9b2f9400',
      label: 'hs_analytics_source_data_2_timestamp_earliest_value_9b2f9400',
    },
    {
      id: 'hs_analytics_source_timestamp_earliest_value_25a3a52c',
      label: 'hs_analytics_source_timestamp_earliest_value_25a3a52c',
    },
    {
      id: 'hs_avatar_filemanager_key',
      label: 'Avatar FileManager key',
    },
    {
      id: 'hs_created_by_user_id',
      label: 'Created by user ID',
    },
    {
      id: 'hs_createdate',
      label: 'Object create date/time',
    },
    {
      id: 'hs_ideal_customer_profile',
      label: 'Ideal Customer Profile Tier',
    },
    {
      id: 'hs_is_target_account',
      label: 'Target Account',
    },
    {
      id: 'hs_last_booked_meeting_date',
      label: 'Last Booked Meeting Date',
    },
    {
      id: 'hs_last_logged_call_date',
      label: 'Last Logged Call Date',
    },
    {
      id: 'hs_last_open_task_date',
      label: 'Last Open Task Date',
    },
    {
      id: 'hs_last_sales_activity_date',
      label: 'last sales activity date old',
    },
    {
      id: 'hs_last_sales_activity_timestamp',
      label: 'Last Engagement Date',
    },
    {
      id: 'hs_lastmodifieddate',
      label: 'Last Modified Date',
    },
    {
      id: 'hs_merged_object_ids',
      label: 'Merged object IDs',
    },
    {
      id: 'hs_num_blockers',
      label: 'Number of blockers',
    },
    {
      id: 'hs_num_contacts_with_buying_roles',
      label: 'Number of contacts with a buying role',
    },
    {
      id: 'hs_num_decision_makers',
      label: 'Number of decision makers',
    },
    {
      id: 'hs_num_open_deals',
      label: 'Number of open deals',
    },
    {
      id: 'hs_object_id',
      label: 'Company ID',
    },
    {
      id: 'hs_predictivecontactscore_v2',
      label: 'Likelihood to close',
    },
    {
      id: 'hs_predictivecontactscore_v2_next_max_max_d4e58c1e',
      label: 'hs_predictivecontactscore_v2_next_max_max_d4e58c1e',
    },
    {
      id: 'hs_target_account',
      label: 'Target Account',
    },
    {
      id: 'hs_target_account_probability',
      label: 'Target Account Probability',
    },
    {
      id: 'hs_target_account_recommendation_snooze_time',
      label: 'Target Account Recommendation Snooze Time',
    },
    {
      id: 'hs_target_account_recommendation_state',
      label: 'Target Account Recommendation State',
    },
    {
      id: 'hs_total_deal_value',
      label: 'Total open deal value',
    },
    {
      id: 'hs_updated_by_user_id',
      label: 'Updated by user ID',
    },
    {
      id: 'hs_user_ids_of_all_owners',
      label: 'User IDs of all owners',
    },
    {
      id: 'hubspot_owner_assigneddate',
      label: 'Owner Assigned Date',
    },
    {
      id: 'is_public',
      label: 'Is Public',
    },
    {
      id: 'num_associated_contacts',
      label: 'Associated Contacts',
    },
    {
      id: 'num_associated_deals',
      label: 'Associated Deals',
    },
    {
      id: 'num_conversion_events',
      label: 'Number of Form Submissions',
    },
    {
      id: 'num_conversion_events_cardinality_sum_d095f14b',
      label: 'num_conversion_events_cardinality_sum_d095f14b',
    },
    {
      id: 'recent_conversion_date',
      label: 'Recent Conversion Date',
    },
    {
      id: 'recent_conversion_date_timestamp_latest_value_72856da1',
      label: 'recent_conversion_date_timestamp_latest_value_72856da1',
    },
    {
      id: 'recent_conversion_event_name',
      label: 'Recent Conversion',
    },
    {
      id: 'recent_conversion_event_name_timestamp_latest_value_66c820bf',
      label: 'recent_conversion_event_name_timestamp_latest_value_66c820bf',
    },
    {
      id: 'recent_deal_amount',
      label: 'Recent Deal Amount',
    },
    {
      id: 'recent_deal_close_date',
      label: 'Recent Deal Close Date',
    },
    {
      id: 'timezone',
      label: 'Time Zone',
    },
    {
      id: 'total_money_raised',
      label: 'Total Money Raised',
    },
    {
      id: 'total_revenue',
      label: 'Total Revenue',
    },
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'owneremail',
      label: 'HubSpot Owner Email',
    },
    {
      id: 'twitterhandle',
      label: 'Twitter Handle',
    },
    {
      id: 'ownername',
      label: 'HubSpot Owner Name',
    },
    {
      id: 'phone',
      label: 'Phone Number',
    },
    {
      id: 'twitterbio',
      label: 'Twitter Bio',
    },
    {
      id: 'twitterfollowers',
      label: 'Twitter Followers',
    },
    {
      id: 'address',
      label: 'Street Address',
    },
    {
      id: 'address2',
      label: 'Street Address 2',
    },
    {
      id: 'facebook_company_page',
      label: 'Facebook Company Page',
    },
    {
      id: 'city',
      label: 'City',
    },
    {
      id: 'linkedin_company_page',
      label: 'LinkedIn Company Page',
    },
    {
      id: 'linkedinbio',
      label: 'LinkedIn Bio',
    },
    {
      id: 'state',
      label: 'State/Region',
    },
    {
      id: 'googleplus_page',
      label: 'Google Plus Page',
    },
    {
      id: 'engagements_last_meeting_booked',
      label: 'Date of last meeting booked in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_campaign',
      label: 'Campaign of last booking in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_medium',
      label: 'Medium of last booking in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_source',
      label: 'Source of last booking in meetings tool',
    },
    {
      id: 'hs_latest_meeting_activity',
      label: 'Latest meeting activity',
    },
    {
      id: 'hs_sales_email_last_replied',
      label: 'Recent Sales Email Replied Date',
    },
    {
      id: 'hubspot_owner_id',
      label: 'Company owner',
    },
    {
      id: 'notes_last_contacted',
      label: 'Last Contacted',
    },
    {
      id: 'notes_last_updated',
      label: 'Last Activity Date',
    },
    {
      id: 'notes_next_activity_date',
      label: 'Next Activity Date',
    },
    {
      id: 'num_contacted_notes',
      label: 'Number of times contacted',
    },
    {
      id: 'num_notes',
      label: 'Number of Sales Activities',
    },
    {
      id: 'zip',
      label: 'Postal Code',
    },
    {
      id: 'country',
      label: 'Country/Region',
    },
    {
      id: 'hubspot_team_id',
      label: 'HubSpot Team',
    },
    {
      id: 'hs_all_owner_ids',
      label: 'All owner ids',
    },
    {
      id: 'website',
      label: 'Website URL',
    },
    {
      id: 'domain',
      label: 'Company Domain Name',
    },
    {
      id: 'hs_all_team_ids',
      label: 'All team ids',
    },
    {
      id: 'hs_all_accessible_team_ids',
      label: 'All accessible team ids',
    },
    {
      id: 'numberofemployees',
      label: 'Number of Employees',
    },
    {
      id: 'industry',
      label: 'Industry',
    },
    {
      id: 'annualrevenue',
      label: 'Annual Revenue',
    },
    {
      id: 'lifecyclestage',
      label: 'Lifecycle Stage',
    },
    {
      id: 'hs_lead_status',
      label: 'Lead Status',
    },
    {
      id: 'hs_parent_company_id',
      label: 'Parent Company',
    },
    {
      id: 'type',
      label: 'Type',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'hs_num_child_companies',
      label: 'Number of child companies',
    },
    {
      id: 'hubspotscore',
      label: 'HubSpot Score',
    },
    {
      id: 'createdate',
      label: 'Create Date',
    },
    {
      id: 'closedate',
      label: 'Close Date',
    },
    {
      id: 'first_contact_createdate',
      label: 'First Contact Create Date',
    },
    {
      id: 'days_to_close',
      label: 'Days to Close',
    },
    {
      id: 'web_technologies',
      label: 'Web Technologies',
    },
  ];

  #dealFields = [
    {
      id: 'amount_in_home_currency',
      label: 'Amount in company currency',
    },
    {
      id: 'days_to_close',
      label: 'Days to close',
    },
    {
      id: 'deal_currency_code',
      label: 'Currency',
    },
    {
      id: 'hs_acv',
      label: 'Annual contract value',
    },
    {
      id: 'hs_analytics_source',
      label: 'Original Source Type',
    },
    {
      id: 'hs_analytics_source_data_1',
      label: 'Original Source Data 1',
    },
    {
      id: 'hs_analytics_source_data_2',
      label: 'Original Source Data 2',
    },
    {
      id: 'hs_arr',
      label: 'Annual recurring revenue',
    },
    {
      id: 'hs_campaign',
      label: 'HubSpot Campaign',
    },
    {
      id: 'hs_closed_amount',
      label: 'Closed Deal Amount',
    },
    {
      id: 'hs_closed_amount_in_home_currency',
      label: 'Closed Deal Amount In Home Currency',
    },
    {
      id: 'hs_created_by_user_id',
      label: 'Created by user ID',
    },
    {
      id: 'hs_date_entered_appointmentscheduled',
      label: "Date entered 'Appointment Scheduled (Sales Pipeline)'",
    },
    {
      id: 'hs_date_entered_closedlost',
      label: "Date entered 'Closed Lost (Sales Pipeline)'",
    },
    {
      id: 'hs_date_entered_closedwon',
      label: "Date entered 'Closed Won (Sales Pipeline)'",
    },
    {
      id: 'hs_date_entered_contractsent',
      label: "Date entered 'Contract Sent (Sales Pipeline)'",
    },
    {
      id: 'hs_date_entered_decisionmakerboughtin',
      label: "Date entered 'Decision Maker Bought-In (Sales Pipeline)'",
    },
    {
      id: 'hs_date_entered_presentationscheduled',
      label: "Date entered 'Presentation Scheduled (Sales Pipeline)'",
    },
    {
      id: 'hs_date_entered_qualifiedtobuy',
      label: "Date entered 'Qualified To Buy (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_appointmentscheduled',
      label: "Date exited 'Appointment Scheduled (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_closedlost',
      label: "Date exited 'Closed Lost (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_closedwon',
      label: "Date exited 'Closed Won (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_contractsent',
      label: "Date exited 'Contract Sent (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_decisionmakerboughtin',
      label: "Date exited 'Decision Maker Bought-In (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_presentationscheduled',
      label: "Date exited 'Presentation Scheduled (Sales Pipeline)'",
    },
    {
      id: 'hs_date_exited_qualifiedtobuy',
      label: "Date exited 'Qualified To Buy (Sales Pipeline)'",
    },
    {
      id: 'hs_deal_amount_calculation_preference',
      label: 'Deal amount calculation preference',
    },
    {
      id: 'hs_deal_stage_probability',
      label: 'Deal Stage Probability',
    },
    {
      id: 'hs_forecast_amount',
      label: 'Forecast Amount',
    },
    {
      id: 'hs_forecast_probability',
      label: 'Forecast Probability',
    },
    {
      id: 'hs_is_closed',
      label: 'Is Deal Closed?',
    },
    {
      id: 'hs_lastmodifieddate',
      label: 'Last Modified Date',
    },
    {
      id: 'hs_likelihood_to_close',
      label: 'Likelihood to close by the close date',
    },
    {
      id: 'hs_line_item_global_term_hs_discount_percentage',
      label: 'Global Term Line Item Discount Percentage',
    },
    {
      id: 'hs_line_item_global_term_hs_discount_percentage_enabled',
      label: 'Global Term Line Item Discount Percentage Enabled',
    },
    {
      id: 'hs_line_item_global_term_hs_recurring_billing_period',
      label: 'Global Term Line Item Recurring Billing Period',
    },
    {
      id: 'hs_line_item_global_term_hs_recurring_billing_period_enabled',
      label: 'Global Term Line Item Recurring Billing Period Enabled',
    },
    {
      id: 'hs_line_item_global_term_hs_recurring_billing_start_date',
      label: 'Global Term Line Item Recurring Billing Start Date',
    },
    {
      id: 'hs_line_item_global_term_hs_recurring_billing_start_date_enabled',
      label: 'Global Term Line Item Recurring Billing Start Date Enabled',
    },
    {
      id: 'hs_line_item_global_term_recurringbillingfrequency',
      label: 'Global Term Line Item Recurring Billing Frequency',
    },
    {
      id: 'hs_line_item_global_term_recurringbillingfrequency_enabled',
      label: 'Global Term Line Item Recurring Billing Frequency Enabled',
    },
    {
      id: 'hs_manual_forecast_category',
      label: 'Forecast category',
    },
    {
      id: 'hs_merged_object_ids',
      label: 'Merged object IDs',
    },
    {
      id: 'hs_mrr',
      label: 'Monthly recurring revenue',
    },
    {
      id: 'hs_next_step',
      label: 'Next step',
    },
    {
      id: 'hs_object_id',
      label: 'Deal ID',
    },
    {
      id: 'hs_predicted_amount',
      label: 'The predicted deal amount',
    },
    {
      id: 'hs_predicted_amount_in_home_currency',
      label: "The predicted deal amount in your company's currency",
    },
    {
      id: 'hs_projected_amount',
      label: 'Projected Deal Amount',
    },
    {
      id: 'hs_projected_amount_in_home_currency',
      label: 'Projected Deal Amount in Home Currency',
    },
    {
      id: 'hs_tcv',
      label: 'Total contract value',
    },
    {
      id: 'hs_time_in_appointmentscheduled',
      label: "Time in 'Appointment Scheduled (Sales Pipeline)'",
    },
    {
      id: 'hs_time_in_closedlost',
      label: "Time in 'Closed Lost (Sales Pipeline)'",
    },
    {
      id: 'hs_time_in_closedwon',
      label: "Time in 'Closed Won (Sales Pipeline)'",
    },
    {
      id: 'hs_time_in_contractsent',
      label: "Time in 'Contract Sent (Sales Pipeline)'",
    },
    {
      id: 'hs_time_in_decisionmakerboughtin',
      label: "Time in 'Decision Maker Bought-In (Sales Pipeline)'",
    },
    {
      id: 'hs_time_in_presentationscheduled',
      label: "Time in 'Presentation Scheduled (Sales Pipeline)'",
    },
    {
      id: 'hs_time_in_qualifiedtobuy',
      label: "Time in 'Qualified To Buy (Sales Pipeline)'",
    },
    {
      id: 'hs_updated_by_user_id',
      label: 'Updated by user ID',
    },
    {
      id: 'hs_user_ids_of_all_owners',
      label: 'User IDs of all owners',
    },
    {
      id: 'hubspot_owner_assigneddate',
      label: 'Owner Assigned Date',
    },
    {
      id: 'testing',
      label: 'testing',
    },
    {
      id: 'dealname',
      label: 'Deal Name',
    },
    {
      id: 'amount',
      label: 'Amount',
    },
    {
      id: 'dealstage',
      label: 'Deal Stage',
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
    },
    {
      id: 'closedate',
      label: 'Close Date',
    },
    {
      id: 'createdate',
      label: 'Create Date',
    },
    {
      id: 'engagements_last_meeting_booked',
      label: 'Date of last meeting booked in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_campaign',
      label: 'Campaign of last booking in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_medium',
      label: 'Medium of last booking in meetings tool',
    },
    {
      id: 'engagements_last_meeting_booked_source',
      label: 'Source of last booking in meetings tool',
    },
    {
      id: 'hs_latest_meeting_activity',
      label: 'Latest meeting activity',
    },
    {
      id: 'hs_sales_email_last_replied',
      label: 'Recent Sales Email Replied Date',
    },
    {
      id: 'hubspot_owner_id',
      label: 'Deal owner',
    },
    {
      id: 'notes_last_contacted',
      label: 'Last Contacted',
    },
    {
      id: 'notes_last_updated',
      label: 'Last Activity Date',
    },
    {
      id: 'notes_next_activity_date',
      label: 'Next Activity Date',
    },
    {
      id: 'num_contacted_notes',
      label: 'Number of times contacted',
    },
    {
      id: 'num_notes',
      label: 'Number of Sales Activities',
    },
    {
      id: 'hs_createdate',
      label: 'HubSpot Create Date',
    },
    {
      id: 'hubspot_team_id',
      label: 'HubSpot Team',
    },
    {
      id: 'dealtype',
      label: 'Deal Type',
    },
    {
      id: 'hs_all_owner_ids',
      label: 'All owner ids',
    },
    {
      id: 'description',
      label: 'Deal Description',
    },
    {
      id: 'hs_all_team_ids',
      label: 'All team ids',
    },
    {
      id: 'hs_all_accessible_team_ids',
      label: 'All accessible team ids',
    },
    {
      id: 'num_associated_contacts',
      label: 'Number of Contacts',
    },
    {
      id: 'closed_lost_reason',
      label: 'Closed Lost Reason',
    },
    {
      id: 'closed_won_reason',
      label: 'Closed Won Reason',
    },
  ];

  #validateJSON = (json: string | undefined): string => {
    if (!json) return '';
    let result;
    try {
      result = JSON.parse(json);
    } catch (exception) {
      result = '';
    }
    return result;
  };

  #clean = (obj: any): Record<string, unknown> =>
    Object.entries(obj).reduce((acc: Record<string, unknown>, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

  #reduceMetadatFields = (data: string[]): Array<Record<string, unknown>> => {
    return data
      .reduce((a: string[], v) => {
        a.push(...v.split(','));
        return a;
      }, [])
      .map((email) => ({ email }));
  };

  #getEmailMetadata = (meta: Record<string, any>): Record<string, unknown> => {
    return {
      from: {
        ...(meta.fromEmail && { email: meta.fromEmail }),
        ...(meta.firstName && { firstName: meta.firstName }),
        ...(meta.lastName && { lastName: meta.lastName }),
      },
      cc: this.#reduceMetadatFields((meta.cc as string[]) || []),
      bcc: this.#reduceMetadatFields((meta.bcc as string[]) || []),
      ...(meta.subject && { subject: meta.subject }),
      ...(meta.html && { html: meta.html }),
      ...(meta.text && { text: meta.text }),
    };
  };

  #getTaskMetadata = (meta: Record<string, any>): Record<string, unknown> => {
    return {
      ...(meta.body && { body: meta.body }),
      ...(meta.subject && { subject: meta.subject }),
      ...(meta.status && { status: meta.status }),
      ...(meta.forObjectType && { forObjectType: meta.forObjectType }),
    };
  };

  #getMeetingMetadata = (
    meta: Record<string, any>
  ): Record<string, unknown> => {
    return {
      ...(meta.body && { body: meta.body }),
      ...(meta.startTime && {
        startTime: new Date(meta.startTime as string).getTime() / 1000,
      }),
      ...(meta.endTime && {
        endTime: new Date(meta.endTime as string).getTime() / 1000,
      }),
      ...(meta.title && { title: meta.title }),
      ...(meta.internalMeetingNotes && {
        internalMeetingNotes: meta.internalMeetingNotes,
      }),
    };
  };

  #getCallMetadata = (meta: Record<string, any>): Record<string, unknown> => {
    return {
      ...(meta.toNumber && { toNumber: meta.toNumber }),
      ...(meta.fromNumber && { fromNumber: meta.fromNumber }),
      ...(meta.status && { status: meta.status }),
      ...(meta.durationMilliseconds && {
        durationMilliseconds: meta.durationMilliseconds,
      }),
      ...(meta.recordingUrl && { recordingUrl: meta.recordingUrl }),
      ...(meta.body && { body: meta.body }),
    };
  };

  #getAssociations = (associations: {
    companyIds?: string;
    dealIds?: string;
    ownerIds?: string;
    contactIds?: string;
    ticketIds?: string;
  }): Record<string, unknown> => {
    return {
      ...(associations.companyIds && {
        companyIds: associations.companyIds.toString().split(','),
      }),
      ...(associations.contactIds && {
        contactIds: associations.contactIds.toString().split(','),
      }),
      ...(associations.dealIds && {
        dealIds: associations.dealIds.toString().split(','),
      }),
      ...(associations.ownerIds && {
        ownerIds: associations.ownerIds.toString().split(','),
      }),
      ...(associations.ticketIds && {
        ticketIds: associations.ticketIds.toString().split(','),
      }),
    };
  };
}
