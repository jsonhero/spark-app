import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddFolderEntryInput {
  @Field(() => ID)
  folderId: string;

  @Field(() => ID)
  entityId: string;
}
