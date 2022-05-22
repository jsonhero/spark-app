import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DbConnection } from '../../db';

import { Spark, SparkDocument, SparkSchema } from '@schema';
import { SparkCreateInput } from '../../api/graph';

@Injectable()
export class SparkService {
  model: Model<Spark>;

  constructor(private connection: DbConnection) {
    this.model = this.connection.getModel(Spark.name, SparkSchema);
  }

  // https://stackoverflow.com/questions/46391630/mongoosejs-filter-out-populate-results
  async findAll(tags: string[]): Promise<Spark[]> {
    const sparks = this.model
      .find()
      .populate('tags')
      .sort({ updatedAt: 'desc' });

    // if (tags != null) {
    //   query = query.where('tag.name IN (:...tags)', {
    //     tags,
    //   });
    // }

    return sparks;
  }

  async create(input: SparkCreateInput): Promise<Spark> {
    const spark = new this.model({
      document: input.doc,
    });

    return await spark.save();
  }

  async update(id: string, doc: string): Promise<Spark> {
    const spark = await this.model.findById(id);

    spark.set('document', doc);

    await spark.save();

    return this.findById(id);
  }

  async delete(id: string) {
    return this.model.findOneAndDelete({
      id,
    });
  }

  async findById(id: string) {
    return this.model.findById(id).populate('tags');
  }
}
