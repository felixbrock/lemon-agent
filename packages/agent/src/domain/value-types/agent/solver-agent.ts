import { type Readable } from 'stream';
import { BaseAgent, type ModelApi, type ModelResponseType } from './base-agent';
export type MessageRole = 'system' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}
export interface Response {
  msg: Message;
  action: ActionType;
}

export type ActionType = 'execute' | 'request-param' | 'think';

export class SolverAgent extends BaseAgent<Message, Response> {
  constructor(model: string, modelApi: ModelApi<Message>) {
    super(model, modelApi, {
      role: 'system',
      content: `
    You are a helpful assistant to execute a given task.
    
    1) If you are provided with input in the JSON structure of "{toolId: string, userPrompt: string, namesOfRequiredParams: string[]}" do the following:
    For each element in namesOfRequiredParams check whether the userPromopt contains a corresponding value. 
    - If you did not find the corresponding value return "{action: 'request-param', content:[MISSING PARAMETER], role: 'system'}".
    - Else, map all elements of namesRequiredParams with the corresponding value in a JSON structure where the element name is the key and the value is the value. Finally, return "{action: 'execute', content: [INSERT JSON STRUCTURE HERE]}"
    
    2) If you are provided with input in the structure of "{instruction: string, input: any}" do the following instead:
    Try solve the task as best as you can by using any input that might have been provided.
    For example, if you are asked to create a summary, get the value of the 'input' field and summarize it as best as you can.
    If you are missing information return "{action: 'ask-information', content: [INSERT QUESTION ABOUT MISSING INFORMATION HERE]}".
    Finally, return the result of your work as "{action: 'consume-result', content: [INSERT RESULT HERE]}".
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

      return { msg, action: 'think' };
    }

    const parsedMsg = JSON.parse(rawMsg);

    const msg: Message = {
      role: 'system',
      content: parsedMsg.content,
    };

    if (parsedMsg.action === 'request-param') {
      const nameOfMissingParam = parsedMsg.content;

      if (
        !Array.isArray(nameOfMissingParam) &&
        typeof nameOfMissingParam !== 'string'
      )
        throw new Error(
          `Name of missing parameter provided in invalid format ${typeof nameOfMissingParam}`
        );

      msg.content = `Parameter '${JSON.stringify(
        nameOfMissingParam
      )}' is missing`;
    }

    this.memorizeMsg(msg);

    return { msg, action: parsedMsg.action };
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
