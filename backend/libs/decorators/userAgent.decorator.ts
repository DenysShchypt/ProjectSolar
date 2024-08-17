import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(
  (_: void, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['user-agent'];
  },
);
