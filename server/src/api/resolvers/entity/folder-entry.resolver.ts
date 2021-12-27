import {
  Args,
  Mutation,
  Query,
  Resolver,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { FolderEntryService, SparkService} from '@service';
import { FolderEntry } from '@entity';
import { FolderEntryEntityUnion, AddFolderEntryInput, AddFolderEntryPayload, RemoveFolderEntryPayload } from '../../graph'
import { toGlobalId, fromGlobalId } from '@graph/utils';

@Resolver(() => FolderEntry)
export class FolderEntryResolver {
  constructor(
    private readonly folderEntryService: FolderEntryService,
    private readonly sparkService: SparkService, 
  ) {}

  @Mutation(() => AddFolderEntryPayload)
  public async addFolderEntry(
    @Args('input') input: AddFolderEntryInput
  ): Promise<AddFolderEntryPayload> {
    const parsedEntityId = fromGlobalId(input.entityId);
    const addedEntry = await this.folderEntryService.addFolderEntry(parsedEntityId.id, parsedEntityId.type, fromGlobalId(input.folderId).id);

    return {
      addedEntry,
    }
  }

  @Mutation(() => RemoveFolderEntryPayload)
  public async removeFolderEntry(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<RemoveFolderEntryPayload> {
    const resolvedGlobalId = fromGlobalId(id);
    await this.folderEntryService.removeFolderEntry(resolvedGlobalId.id)
    
    return {
      removedFolderEntryId: resolvedGlobalId.id,
    }
  }

  @ResolveField(() => FolderEntryEntityUnion)
  entity(@Parent() entry: FolderEntry): Promise<typeof FolderEntryEntityUnion> {
    if (entry.entityType === 'folder') {
      return this.folderEntryService.getFolderById(entry.entityId)
    } else if (entry.entityType === 'spark') {
      return this.sparkService.findById(entry.entityId)
    } 
  }
  // @Query(() => [Spark])
  // public async sparks(
  //   @Args({ name: 'tags', nullable: true, type: () => [String] }) tags: string[],
  // ): Promise<Spark[]> {
  //   const sparks = await this.sparkService.findAll(tags);
  //   return sparks;
  // }

  // @ResolveField()
  // id(@Parent() spark: Spark): string {
  //   return toGlobalId(Spark.name, spark.id);
  // }
}
