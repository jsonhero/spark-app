import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { SparkService } from '../../../service'
import { Spark } from '../../../entity'

@Resolver()
export class SparkResolver {
   constructor(private readonly sparkService: SparkService) {}

  @Query(() => [Spark])
  public async sparks(): Promise<Spark[]> {
    return this.sparkService.findAll();
  }
}