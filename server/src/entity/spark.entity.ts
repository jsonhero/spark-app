import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: 'spark' })
export class Spark {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: 'jsonb' })
  doc: string;

  @Field()
  @Column({ type: 'jsonb' })
  tags: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}