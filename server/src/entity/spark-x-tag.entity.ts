import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { Tag } from './tag.entity';
import { Spark } from './spark.entity';

@Entity({ name: 'spark_x_tag' })
export class Spark_X_Tag {
  @PrimaryColumn()
  tag_id: string;

  @PrimaryColumn()
  spark_id: string;

  @ManyToOne(() => Tag, (tag) => tag.sparks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
  tag: Tag;

  @ManyToOne(() => Spark, (spark) => spark.tags, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'spark_id', referencedColumnName: 'id' })
  spark: Spark;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
