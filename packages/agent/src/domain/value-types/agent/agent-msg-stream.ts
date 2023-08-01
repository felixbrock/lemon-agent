import { Readable } from 'stream';

export class AgentMsgStream extends Readable {
  process = async (callback: {
    updateLoadingBarCallback: () => void;
  }): Promise<string> =>
    await new Promise((resolve, reject) => {
      let fullMsg: string = '';

      super.on('data', (chunk: Buffer) => {
        const chunkUTF = chunk.toString('utf8');
        const elements = chunkUTF.split('data: ').filter((el) => el !== '');

        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];

          if (el.includes('[DONE]')) break;

          const parsed = JSON.parse(el);

          const choice = parsed.choices[0];
          if (!choice) throw new Error('No choice in response');

          if (choice.finish_reason) break;

          const delta = parsed.choices[0].delta;
          if (!delta) throw new Error('No delta in response');

          fullMsg = fullMsg.concat(delta.content);

          callback.updateLoadingBarCallback();
        }
      });
      super.on('error', (err: any) => {
        reject(err);
      });
      super.on('end', () => {
        resolve(fullMsg);
      });
    });

  _read = (value: any): void => {};
}
