import { ObjectType, Field } from '@nestjs/graphql';

import { FolderEntry } from '@entity';

@ObjectType()
export class AddFolderEntryPayload {
  @Field(() => FolderEntry)
  addedEntry: FolderEntry;
}
