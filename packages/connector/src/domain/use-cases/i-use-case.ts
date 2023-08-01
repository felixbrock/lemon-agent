import { type Result } from 'shared';

export default interface IUseCase<
  IRequest,
  IResponse extends Result<unknown>,
  IAuth = undefined
> {
  execute: (props: {
    req: IRequest;
    auth: IAuth;
  }) => Promise<IResponse> | IResponse;
}
