import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node } from '../api/graph';
import { Spark } from './spark.schema';

export type TagDocument = Tag & mongoose.Document;

@ObjectType({
  implements: Node,
})
@Schema({
  timestamps: true,
})
export class Tag implements Node {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;

  @Field(() => [Spark])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spark' }] })
  sparks: Spark[];

  @Field()
  @Prop({ type: Date, default: Date.now })
  lastUsedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
