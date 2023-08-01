import { type Readable } from 'stream';
import { AgentMsgStream } from './agent-msg-stream';

export type ModelResponseType = 'stream';

export interface ModelApi<MessageType> {
  chat: (
    req: {
      model: string;
      messages: MessageType[];
      stream?: boolean;
    },
    options?: { responseType: ModelResponseType }
  ) => any;
}

export abstract class BaseAgent<MessageType, ResponseType> {
  protected modelApi: ModelApi<MessageType>;

  protected model: string;

  memory: MessageType[];

  constructor(
    model: string,
    modelApi: ModelApi<MessageType>,
    instruction: MessageType
  ) {
    this.model = model;
    this.modelApi = modelApi;
    this.memory = [instruction];
  }

  memorizeMsg = (msg: MessageType): void => {
    this.memory.push(msg);
  };

  protected isStructuredResponse = (msg: string): boolean => {
    try {
      const response = JSON.parse(msg);

      if (response.action && response.content) return true;
      else return false;
    } catch (error: unknown) {
      return false;
    }
  };

  protected streamToAgentMsgStream = (stream: Readable): AgentMsgStream => {
    const agentMsgStream = new AgentMsgStream();
    Object.assign(agentMsgStream, stream);
    return agentMsgStream;
  };

  protected abstract processMsg(
    stream: Readable,
    callback: {
      updateLoadingBarCallback: () => void;
    }
  ): Promise<ResponseType>;

  abstract chat(
    enableStreaming: boolean,
    callback: {
      updateLoadingBarCallback: () => void;
    }
  ): Promise<ResponseType>;
}
