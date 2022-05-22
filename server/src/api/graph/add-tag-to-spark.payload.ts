import { ObjectType, Field } from '@nestjs/graphql';

import { Tag } from '@schema';

@ObjectType()
export class AddTagToSparkPayload {
  @Field(() => Tag)
  addedTag: Tag;
}
