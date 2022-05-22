import {
  Args,
  Mutation,
  Query,
  Resolver,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { SparkService } from '@service';
import { Spark, Tag } from '@schema';
import {
  SparkCreateInput,
  DeleteSparkPayload,
  UpdateSparkPayload,
  SparkContentUnion
} from '../../graph';
import { toGlobalId, fromGlobalId } from '@graph/utils';

@Resolver(() => Spark)
export class SparkResolver {
  constructor(private readonly sparkService: SparkService) {}

  @Query(() => [Spark])
  public async sparks(
    @Args({ name: 'tags', nullable: true, type: () => [String] }) tags: string[],
  ): Promise<Spark[]> {
    const sparks = await this.sparkService.findAll(tags);
    return sparks;
  }

  @Mutation(() => Spark)
  async createSpark(@Args('input') input: SparkCreateInput): Promise<Spark> {
    return this.sparkService.create(input);
  }

  @Mutation(() => DeleteSparkPayload)
  async deleteSpark(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<DeleteSparkPayload> {
    const resolvedGlobalId = fromGlobalId(id);

    await this.sparkService.delete(resolvedGlobalId.id);
    return {
      id,
    };
  }

  @Mutation(() => UpdateSparkPayload)
  async updateSpark(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'doc', type: () => String }) doc: string,
  ): Promise<UpdateSparkPayload> {
    const resolvedGlobalId = fromGlobalId(id);

    const spark = await this.sparkService.update(resolvedGlobalId.id, doc);

    return { spark };
  }

  @ResolveField()
  id(@Parent() spark: Spark): string {
    return toGlobalId(Spark.name, spark.id);
  }

  // @ResolveField()
  // tags(@Parent() spark: Spark): Tag[] {
  //   return spark.tags || [];
  // }

  @ResolveField(() => SparkContentUnion)
  content(@Parent() spark: Spark): typeof SparkContentUnion {
    return spark.content;
  }
}
