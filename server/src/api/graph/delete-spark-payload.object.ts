import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteSparkPayload {
  @Field()
  id: string;
}
