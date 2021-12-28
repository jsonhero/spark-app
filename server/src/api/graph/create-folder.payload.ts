import { ObjectType, Field } from '@nestjs/graphql';

import { FolderEntry } from '@entity';

@ObjectType()
export class CreateFolderPayload {
  @Field(() => FolderEntry)
  folderEntry: FolderEntry;
}
