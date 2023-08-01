import { Interface } from 'readline';

export type State = 'exit' | 'prompt' | 'processing';

export default class CLI extends Interface {
  readonly #modelMsgTextFormat = {
    bold: '\x1b[1m',
    greenFont: '\x1b[32m',
    greenBackground: '\x1b[42m',
    reset: '\x1b[0m',
  };

  readonly #moduloDivisor = 30;

  #loadingIndex = 0;

  constructor(input: NodeJS.ReadableStream) {
    super({ input });
  }

  writeSysMsg = (
    content: string,
    options?: {
      clearPrevContent?: boolean;
      breakLine?: boolean;
      showEmoji?: boolean;
    }
  ): void => {
    if (!options) options = {};

    if (options.clearPrevContent) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
    process.stdout.write(
      `${options.showEmoji ? '🍋 ' : ''}${this.#modelMsgTextFormat.bold}${
        this.#modelMsgTextFormat.greenFont
      }${content}${this.#modelMsgTextFormat.reset}${
        options.breakLine ? '\n' : ''
      }`
    );
  };

  updateLoadingBar = (): void => {
    this.writeSysMsg(
      `${this.#modelMsgTextFormat.greenBackground}${
        this.#modelMsgTextFormat.bold
      }[${'.'.repeat(this.#loadingIndex % this.#moduloDivisor)}🍋${'.'.repeat(
        this.#moduloDivisor - (this.#loadingIndex % this.#moduloDivisor)
      )}]${this.#modelMsgTextFormat.reset}`,
      {
        clearPrevContent: true,
      }
    );

    this.#loadingIndex++;
  };

  setState = (state: State): void => {
    switch (state) {
      case 'prompt':
        this.prompt();
        break;
      case 'exit':
        this.close();
        break;
      case 'processing':
        break;
      default:
        throw new Error('Invalid terminal state');
    }
  };
}
