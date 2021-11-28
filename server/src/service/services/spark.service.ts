import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DbConnection } from '../../db'
import { Spark } from '../../entity'
import { SparkCreateInput } from '../../api/graph'

@Injectable()
export class SparkService {

    constructor(
        private connection: DbConnection,
    ) {}


    private getRepository(): Repository<Spark> {
      return this.connection.getRepository(Spark)
    }

    findAll(): Promise<Spark[]> {
      return this.getRepository().find()
    }

    async create(input: SparkCreateInput): Promise<Spark> {
      const spark = await this.getRepository().create({
        doc: input.doc,
      })

      return spark
    }

}