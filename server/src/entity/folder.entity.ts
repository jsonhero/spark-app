import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Node } from '../api/graph';
import { FolderEntry } from './folder-entry.entity';

@ObjectType({
  implements: Node
})
@Entity({ name: 'folder' })
export class Folder implements Node {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Field()
  @Column({
    type: 'boolean',
    name: 'is_root',
    default: false,
  })
  isRoot: boolean;


  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //

  @Field(() => [FolderEntry])
  @OneToMany(() => FolderEntry, (entry) => entry.folder)
  entries: FolderEntry[];
}
