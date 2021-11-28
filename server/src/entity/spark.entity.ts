import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";

// https://codersera.com/blog/nestjs-typeorm-graphql-dataloader-tutorial-with-typescript/
@ObjectType()
@Entity({ name: 'spark' })
export class Spark {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: 'jsonb', default: null })
  doc: string;

  @Field()
  @Column({ type: 'jsonb', default: null })
  tags: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}