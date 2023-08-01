import { type Tool, getTools } from '../value-types/tool';
import { Result } from 'shared';
import type IUseCase from './i-use-case';

export type GetToolsReq = undefined;

export type GetToolsRes = Result<Tool[]>;

export class GetTools implements IUseCase<GetToolsReq, GetToolsRes, undefined> {
  async execute(props: { req: GetToolsReq }): Promise<GetToolsRes> {
    return Result.ok(getTools());
  }
}
