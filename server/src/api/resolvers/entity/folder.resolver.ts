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
import { toGlobalId, fromGlobalId } from '@graph/utils';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(
    private readonly folderEntryService: FolderEntryService,
    ) {}


  @Query(() => Folder)
  public async folderTree(): Promise<Folder> {
    return this.folderEntryService.getRootFolder();
  }

  @ResolveField(() => [FolderEntry])
  entries(@Parent() folder: Folder): Promise<FolderEntry[]> {
    return this.folderEntryService.getFolderEntries(folder.id);
  }

  @ResolveField()
  id(@Parent() folder: Folder): string {
    return toGlobalId(Folder.name, folder.id);
  }
}
