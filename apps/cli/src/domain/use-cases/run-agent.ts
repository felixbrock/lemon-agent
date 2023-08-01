import { getExecuteWorkflowController, type Response } from 'agent';
import { CLI } from 'cli';

export default async (): Promise<void> => {
  const response: Response = {
    status: (code: number) => {
      // Implement the status method logic here
      console.log('Setting status code:', code);
      return response;
    },
    json: (dto: unknown) => {
      // Implement the json method logic here
      console.log('Setting response JSON:', dto);
      return response;
    },
    type: (type: string) => {
      // Implement the type method logic here
      console.log('Setting response type:', type);
      return response;
    },
  };

  const controller = getExecuteWorkflowController(new CLI(process.stdin));

  await controller.execute({}, response);
};
