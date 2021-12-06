import { ObjectType, Field } from '@nestjs/graphql';

import { Tag } from '@entity';

@ObjectType()
export class CreateTagPayload {
  @Field(() => Tag)
  createdTag: Tag;
}
