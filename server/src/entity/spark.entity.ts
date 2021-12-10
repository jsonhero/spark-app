import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node } from '../api/graph';

import { Tag } from './tag.entity';

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

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // https://github.com/typeorm/typeorm/issues/1224
  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.sparks, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'spark_x_tag',
    joinColumn: {
      name: 'spark_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
