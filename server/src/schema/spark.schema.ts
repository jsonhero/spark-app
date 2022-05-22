import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

import { Node } from '../api/graph';
import { Tag } from './tag.schema';

export type SparkDocument = Spark & mongoose.Document;

@ObjectType({
  implements: Node,
})
@Schema({
  timestamps: true,
})
export class Spark implements Node {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  document: any;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;

  @Field(() => [Tag])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  // @Field(() => [Spark])
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Spark.name })
  // relatedSparks: Spark[];
}

export const SparkSchema = SchemaFactory.createForClass(Spark);
