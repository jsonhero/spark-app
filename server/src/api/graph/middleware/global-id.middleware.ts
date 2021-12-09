import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

import { fromGlobalId } from '../utils';

export const fromGlobalIdMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();

  return value ? fromGlobalId(value).id : value;
};
