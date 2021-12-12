import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DbConnection } from '../../db';
import { Spark } from '../../entity';
import { SparkCreateInput } from '../../api/graph';

@Injectable()
export class SparkService {
  constructor(private connection: DbConnection) {}

  private get repository(): Repository<Spark> {
    return this.connection.getRepository(Spark);
  }

  async findAll(): Promise<Spark[]> {
    const sparks = await this.repository.find({
      relations: ['tags'],
      order: {
        createdAt: 'DESC',
      },
    });
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
