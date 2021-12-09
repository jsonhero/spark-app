import { InputType, Field, ID } from '@nestjs/graphql';

import { fromGlobalIdMiddleware } from './middleware';
@InputType()
export class CreateTagInput {
  @Field()
  name: string;

  @Field(() => ID, {
    nullable: true,
    middleware: [fromGlobalIdMiddleware],
  })
  sparkId?: string;
}
