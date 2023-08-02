import { InjectionMode, asClass, asFunction, createContainer } from 'awilix';
import { ExecuteWorkflow } from './domain/use-cases/execute-workflow';
import { logger } from 'shared';

const iocContainer = createContainer({ injectionMode: InjectionMode.CLASSIC });

iocContainer.register({
  executeWorkflow: asClass(ExecuteWorkflow),
  logger: asFunction(() => logger),
});

export default iocContainer;
