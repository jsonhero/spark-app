import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DbConnection } from '../../db';
import { Spark, Tag, Spark_X_Tag } from '@entity';
import { CreateTagInput, AddTagToSparkInput } from '../../api/graph';
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

  findAll(): Promise<Tag[]> {
    return this.repository.find();
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
    const sparkToAdd = await this.sparkService.findById(input.sparkId);

    tagToReceiveSpark.sparks.push(sparkToAdd);

    return this.repository.save(tagToReceiveSpark);
  }
}
