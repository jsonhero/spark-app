import {
  Args,
  Mutation,
  Query,
  Resolver,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { TagService } from '@service';
import { Tag } from '@entity';
import {
  CreateTagPayload,
  CreateTagInput,
  AddTagToSparkInput,
  AddTagToSparkPayload,
} from '../../graph';
import { toGlobalId, fromGlobalId } from '@graph/utils';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag])
  public async tags(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Mutation(() => CreateTagPayload)
  public async createTag(
    @Args('input') input: CreateTagInput,
  ): Promise<CreateTagPayload> {
    input.sparkId = input.sparkId
      ? fromGlobalId(input.sparkId).id
      : input.sparkId;

    const createdTag = await this.tagService.create(input);
    return {
      createdTag,
    };
  }

  @Mutation(() => AddTagToSparkPayload)
  public async addTagToSpark(
    @Args('input') input: AddTagToSparkInput,
  ): Promise<AddTagToSparkPayload> {
    const tagWithAddedSpark = await this.tagService.addTagToSpark(input);

    return {
      addedTag: tagWithAddedSpark,
    };
  }

  @ResolveField()
  id(@Parent() tag: Tag): string {
    return toGlobalId(Tag.name, tag.id);
  }
}
