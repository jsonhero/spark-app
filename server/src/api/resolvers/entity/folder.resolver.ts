import {
  Args,
  Mutation,
  Query,
  Resolver,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { FolderEntryService } from '@service';
import { Folder, FolderEntry } from '@entity';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(
    private readonly folderEntryService: FolderEntryService,
    ) {}


  @ResolveField(() => [FolderEntry])
  entries(@Parent() folder: Folder): Promise<FolderEntry[]> {
    return this.folderEntryService.getFolderEntries(folder.id);
  }
}
