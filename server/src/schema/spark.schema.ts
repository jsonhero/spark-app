import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node, SparkContentUnion } from '../api/graph';
import { Tag } from './tag.schema';
import { SparkKind } from '@type';

@ObjectType()
@Schema()
class SparkReference {
  @Field(() => [Tag])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];
}

const SparkReferenceSchema = SchemaFactory.createForClass(SparkReference);

@ObjectType({
  implements: Node,
})
@Schema({
  timestamps: true,
  discriminatorKey: 'kind',
})
export class Spark implements Node {
  @Field(() => ID)
  id: string;

  @Field(() => SparkKind)
  @Prop({
    type: String,
    required: true,
    enum: [SparkKind.NOTE, SparkKind.DATABASE],
  })
  kind: SparkKind;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;

  @Field(() => SparkReference)
  @Prop({ type: SparkReferenceSchema, required: true, default: {} })
  reference: SparkReference;

  @Field(() => SparkContentUnion)
  content: typeof SparkContentUnion;
}

export const SparkSchema = SchemaFactory.createForClass(Spark);
