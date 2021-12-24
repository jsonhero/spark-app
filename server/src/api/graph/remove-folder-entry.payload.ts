import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class RemoveFolderEntryPayload {
  @Field(() => ID)
  removedFolderEntryId: string;
}
