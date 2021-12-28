import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {
  @Field(() => ID)
  parentFolderId: string;

  @Field()
  name: string;
}
