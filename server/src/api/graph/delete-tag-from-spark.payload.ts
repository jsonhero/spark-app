import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DeleteTagFromSparkPayload {
  @Field(() => ID)
  deleteTagId: string;

  @Field(() => ID)
  relatedSparkId: string;
}
