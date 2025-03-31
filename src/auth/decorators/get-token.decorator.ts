import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResponseType } from '../interfaces/response-type.interface';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req: ResponseType = ctx.switchToHttp().getRequest();
    const user = req.token;

    if (!user) throw new InternalServerErrorException();

    return user;
  },
);
