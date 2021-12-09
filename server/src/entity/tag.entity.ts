import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  Unique,
  JoinTable,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node } from '../api/graph';
import { Spark } from './spark.entity';
// https://codersera.com/blog/nestjs-typeorm-graphql-dataloader-tutorial-with-typescript/
@ObjectType({
  implements: Node,
})
@Entity({ name: 'tag' })
@Unique(['name'])
export class Tag implements Node {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [Spark])
  @ManyToMany(() => Spark, (spark) => spark.tags, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'spark_x_tag',
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'spark_id',
      referencedColumnName: 'id',
    },
  })
  sparks: Spark[];
}
