import { Injectable } from '@nestjs/common';
import { Repository, In, FindManyOptions } from 'typeorm';

import { DbConnection } from '../../db';
import { Spark } from '../../entity';
import { SparkCreateInput } from '../../api/graph';

@Injectable()
export class SparkService {
  constructor(private connection: DbConnection) {}

  private get repository(): Repository<Spark> {
    return this.connection.getRepository(Spark);
  }

  async findAll(tags: string[]): Promise<Spark[]> {
    let query = this.repository
      .createQueryBuilder('spark')
      .innerJoinAndSelect('spark.tags', 'tag')
      .orderBy('spark.updated_at', 'DESC');

    if (tags) {
      query = query.where('tag.name IN (:...tags)', {
        tags,
      });
    }

    const sparks = await query.getMany();

    return sparks;
  }

  async create(input: SparkCreateInput): Promise<Spark> {
    const spark = this.repository.create({
      doc: input.doc,
    });

    return await this.repository.save(spark);
  }

  async update(id: string, doc: string): Promise<Spark> {
    const spark = await this.repository.findOne({
      where: { id },
    });

    await this.repository.save({
      ...spark,
      doc,
    });

    return this.findById(id);
  }

  async delete(id: string) {
    return this.repository.delete({
      id,
    });
  }

  async findById(id: string) {
    return this.repository.findOne(
      {
        id,
      },
      {
        relations: ['tags'],
      },
    );
  }
}
