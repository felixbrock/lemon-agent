import { InjectionMode, asClass, createContainer } from 'awilix';
import { ExecuteWorkflow } from './domain/use-cases/execute-workflow';

const iocContainer = createContainer({ injectionMode: InjectionMode.CLASSIC });

iocContainer.register({
  executeWorkflow: asClass(ExecuteWorkflow),
});

export default iocContainer;
