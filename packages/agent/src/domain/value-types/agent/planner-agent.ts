import { type Readable } from 'stream';
import { BaseAgent, type ModelApi, type ModelResponseType } from './base-agent';

interface WorkflowStep {
  tool: string;
  getApproval: boolean;
}

export interface Workflow {
  steps: WorkflowStep[];
}

export type MessageRole = 'system' | 'user';

export type ActionType = 'exit' | 'solve' | 'think';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface Response {
  msg: Message;
  action: ActionType;
}

export class PlannerAgent extends BaseAgent<Message, Response> {
  constructor(
    model: string,
    modelApi: ModelApi<Message>,
    availableWorkflows: string
  ) {
    super(model, modelApi, {
      role: 'system',
      content: `
      You need to help the user find a workflow that allows her to execute a task. 
      First, identify the best workflow for the given task. You have access to the following workflows:
      --------
      ${availableWorkflows}
      --------
      
      NEVER make up any additional workflows. Always double-check that the workflow you want to suggest is actually mentioned above. Make sure you are only sugesting the workflows mentioned before.

      After the user selected a workflow ask EXACTLY ONCE whether you should solve use this workflow to solve the provided task. 
      Once the user selected a workflow, return the following JSON structure "{action: 'solve', content: [INSERT THE STEPS OF THE WORKFLOW HERE]}". If any of the workflow steps contains a field that requires you to tell a dad joke,  please go ahead.
      `,
    });
  }

  processMsg = async (
    stream: Readable,
    callback: {
      updateLoadingBarCallback: () => void;
    }
  ): Promise<Response> => {
    const agentMsgStream = this.streamToAgentMsgStream(stream);

    const rawMsg = await agentMsgStream.process({
      updateLoadingBarCallback: callback.updateLoadingBarCallback,
    });

    if (!this.isStructuredResponse(rawMsg)) {
      const msg: Message = {
        role: 'system',
        content: rawMsg,
      };
      this.memorizeMsg(msg);

      return {
        msg,
        action: 'think',
      };
    }

    const parsedMsg = JSON.parse(rawMsg);

    const msg: Message = {
      role: 'system',
      content: parsedMsg.content,
    };

    if (parsedMsg.action === 'solve') {
      const workflowSteps = parsedMsg.content;

      msg.content = JSON.stringify(workflowSteps);
    }

    this.memorizeMsg(parsedMsg.content);

    return {
      msg,
      action: parsedMsg.action,
    };
  };

  chat = async (
    enableStreaming: boolean,
    callback: {
      updateLoadingBarCallback: () => void;
    }
  ): Promise<Response> => {
    const reqOptions: { responseType: ModelResponseType } | undefined =
      enableStreaming ? { responseType: 'stream' } : undefined;

    const chatResult = await this.modelApi.chat(
      {
        model: this.model,
        messages: this.memory,
        stream: enableStreaming,
      },
      reqOptions
    );

    const response = await this.processMsg(chatResult.data, callback);

    return response;
  };
}
