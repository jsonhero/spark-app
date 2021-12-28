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
import { CreateFolderInput, CreateFolderPayload } from '../../graph';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(
    private readonly folderEntryService: FolderEntryService,
    ) {}


  @Query(() => Folder)
  public async folderTree(): Promise<Folder> {
    return this.folderEntryService.getRootFolder();
  }

  @Mutation(() => CreateFolderPayload)
  public async createFolder(
    @Args('input') input: CreateFolderInput
  ): Promise<FolderEntry> {
    return this.folderEntryService.createFolderInParent(input.name, fromGlobalId(input.parentFolderId).id)
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
