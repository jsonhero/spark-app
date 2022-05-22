import { ObjectType, Field } from '@nestjs/graphql';
import { Spark } from '@schema';

@ObjectType()
export class UpdateSparkPayload {
  @Field(() => Spark)
  spark: Spark;
}
