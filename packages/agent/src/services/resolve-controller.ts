import { type ICLI } from '../domain/use-cases/execute-workflow';
import ExecuteWorkflowController from '../infra/api/controllers/execute-workflow-controller';
import iocContainer from '../ioc-container';

export const getExecuteWorkflowController = (
  cli: ICLI
): ExecuteWorkflowController =>
  new ExecuteWorkflowController(iocContainer.resolve('executeWorkflow'), cli);
