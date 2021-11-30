import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node } from '../api/graph';

// https://codersera.com/blog/nestjs-typeorm-graphql-dataloader-tutorial-with-typescript/
@ObjectType({
  implements: Node,
})
@Entity({ name: 'spark' })
export class Spark implements Node {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'jsonb', default: null })
  doc: string;

  @Field({ nullable: true })
  @Column({ type: 'jsonb', default: null })
  tags: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
