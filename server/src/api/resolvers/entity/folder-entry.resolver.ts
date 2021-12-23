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
import { FolderEntryEntityUnion } from '../../graph'

@Resolver(() => FolderEntry)
export class FolderEntryResolver {
  constructor(
    private readonly folderEntryService: FolderEntryService,
    private readonly sparkService: SparkService, 
    ) {}


  @Query(() => [FolderEntry])
  public async folderEntries(): Promise<FolderEntry[]> {
    return this.folderEntryService.getRootFolderEntries()
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
