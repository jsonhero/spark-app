import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Folder } from './folder.entity';
import { FolderEntryEntityUnion } from '../api/graph'

// https://stackoverflow.com/questions/51364182/file-storage-system-for-a-postgresql-database
// https://www.cybertec-postgresql.com/en/recursive-queries-postgresql/
@ObjectType()
@Entity({ name: 'folder_entry' })
export class FolderEntry {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'entity_id',
  })
  entityId: string;

  @Field()
  @Column({
    name: 'entity_type',
  })
  entityType: string;

  @Field()
  @Column()
  order: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;


  @Field(() => Folder)
  @ManyToOne(() => Folder)
  @JoinColumn({
    name: 'folder_id',
  })
  folder: Folder;


  @Field(() => FolderEntryEntityUnion)
  entity: typeof FolderEntryEntityUnion;
}
