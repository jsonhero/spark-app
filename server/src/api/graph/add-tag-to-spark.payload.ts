import { ObjectType, Field } from '@nestjs/graphql';

import { Tag } from '@entity';

@ObjectType()
export class AddTagToSparkPayload {
  @Field(() => Tag)
  addedTag: Tag;
}
