import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SparkCreateInput {
  @Field()
  doc: string;
}
