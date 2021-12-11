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
import { Tag, Spark } from '@entity';
import {
  CreateTagPayload,
  CreateTagInput,
  AddTagToSparkInput,
  AddTagToSparkPayload,
  DeleteTagFromSparkInput,
  DeleteTagFromSparkPayload,
} from '../../graph';
import { toGlobalId, fromGlobalId } from '@graph/utils';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag])
  public async tags(
    @Args({ name: 'query', nullable: true }) query: string,
  ): Promise<Tag[]> {
    return this.tagService.findAll({ query });
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
    input.tagId = fromGlobalId(input.tagId).id;
    input.sparkId = fromGlobalId(input.sparkId).id;

    const tagWithAddedSpark = await this.tagService.addTagToSpark(input);

    return {
      addedTag: tagWithAddedSpark,
    };
  }

  @Mutation(() => DeleteTagFromSparkPayload)
  public async deleteTagFromSpark(
    @Args('input') input: DeleteTagFromSparkInput,
  ): Promise<DeleteTagFromSparkPayload> {
    const globalizedInput = {
      sparkId: fromGlobalId(input.sparkId).id,
      tagId: fromGlobalId(input.tagId).id,
    };

    await this.tagService.deleteTagFromSpark(globalizedInput);

    return {
      deleteTagId: input.tagId,
      relatedSparkId: input.sparkId,
    };
  }

  @ResolveField()
  id(@Parent() tag: Tag): string {
    return toGlobalId(Tag.name, tag.id);
  }

  @ResolveField()
  sparks(@Parent() tag: Tag): Spark[] {
    // TODO: Implement retrieve sparks by tag id
    return [];
  }
}
