import { ObjectType, Field } from '@nestjs/graphql';
import { Spark } from '@entity';

@ObjectType()
export class UpdateSparkPayload {
  @Field(() => Spark)
  spark: Spark;
}
