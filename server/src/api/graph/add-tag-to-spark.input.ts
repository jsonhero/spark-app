import { InputType, Field, ID } from '@nestjs/graphql';

import { fromGlobalIdMiddleware } from './middleware';

@InputType()
export class AddTagToSparkInput {
  @Field(() => ID, {
    middleware: [fromGlobalIdMiddleware],
  })
  sparkId: string;

  @Field(() => ID, {
    middleware: [fromGlobalIdMiddleware],
  })
  tagId: string;
}
