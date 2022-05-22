import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

import { Node } from '../api/graph';
import { Spark } from './spark.schema';

@ObjectType()
@Schema()
export class SparkNoteContent {
  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  document: any;
}

const SparkNoteContentSchema = SchemaFactory.createForClass(SparkNoteContent);

@Schema({
  timestamps: true,
})
export class SparkNote extends Spark implements Node {
  @Prop({ type: SparkNoteContentSchema, required: true })
  content: SparkNoteContent;
}

export const SparkNoteSchema = SchemaFactory.createForClass(SparkNote);
// Discriminator key can only exist on parent
SparkNoteSchema.remove('kind');
