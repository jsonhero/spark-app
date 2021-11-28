import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { SparkService } from '../../../service'
import { Spark } from '../../../entity'
import { SparkCreateInput } from '../../graph';

@Resolver()
export class SparkResolver {
   constructor(private readonly sparkService: SparkService) {}

  @Query(() => [Spark])
  public async sparks(): Promise<Spark[]> {
    return this.sparkService.findAll();
  }

  @Mutation(() => Spark)
  async createSpark(
    @Args('input') input: SparkCreateInput,
  ): Promise<Spark> {
    return this.sparkService.create(input)
  }

}