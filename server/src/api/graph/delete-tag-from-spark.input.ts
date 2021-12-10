import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class DeleteTagFromSparkInput {
  @Field(() => ID)
  sparkId: string;

  @Field(() => ID)
  tagId: string;
}
