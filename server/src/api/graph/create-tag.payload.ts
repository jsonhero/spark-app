import { ObjectType, Field } from '@nestjs/graphql';

import { Tag } from '@schema';

@ObjectType()
export class CreateTagPayload {
  @Field(() => Tag)
  createdTag: Tag;
}
