import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddTagToSparkInput {
  @Field(() => ID)
  sparkId: string;

  @Field(() => ID)
  tagId: string;
}
