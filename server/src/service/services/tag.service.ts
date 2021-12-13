import { Injectable } from '@nestjs/common';
import { Repository, ILike, FindManyOptions } from 'typeorm';

import { DbConnection } from '../../db';
import { Spark, Tag, Spark_X_Tag } from '@entity';
import {
  CreateTagInput,
  AddTagToSparkInput,
  DeleteTagFromSparkInput,
} from '../../api/graph';
import { SparkService } from './spark.service';

@Injectable()
export class TagService {
  constructor(
    private connection: DbConnection,
    private sparkService: SparkService,
  ) {}

  private get repository(): Repository<Tag> {
    return this.connection.getRepository(Tag);
  }

  findAll({ query = null }: { query?: string }): Promise<Tag[]> {
    let options: FindManyOptions<Tag> = {
      order: {
        createdAt: 'DESC',
      },
    };

    if (query) {
      options = {
        where: {
          name: ILike(`%${query}%`),
        },
        ...options,
      };
    }

    return this.repository.find(options);
  }

  async create(input: CreateTagInput) {
    const tagToCreate = this.repository.create({
      name: input.name,
    });

    const tag = await this.repository.save(tagToCreate);

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(Spark_X_Tag)
      .values({
        spark_id: input.sparkId,
        tag_id: tag.id,
      })
      .execute();

    return tag;
  }

  async addTagToSpark(input: AddTagToSparkInput) {
    const tagToReceiveSpark = await this.repository.findOne(input.tagId);

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(Spark_X_Tag)
      .values({
        spark_id: input.sparkId,
        tag_id: input.tagId,
      })
      .execute();

    return tagToReceiveSpark;
  }

  async deleteTagFromSpark(input: DeleteTagFromSparkInput) {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Spark_X_Tag)
      .where('spark_id = :sparkId', { sparkId: input.sparkId })
      .andWhere('tag_id = :tagId', { tagId: input.tagId })
      .execute();

    // Remove tag altogether if it's the last
    const count = await this.connection.rawConnection.createQueryBuilder()
      .from(Spark_X_Tag, 'spark_x_tag')
      .where('tag_id = :tagId', { tagId: input.tagId })
      .distinct()
      .getCount();

    if (count === 0) {
      await this.repository.delete({
        id: input.tagId,
      });
    }
  }
}
