import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SparkNote, Spark } from '@schema';
import { SparkCreateInput } from '../../api/graph';

@Injectable()
export class SparkService {
  constructor(
    @InjectModel(Spark.name) private readonly model: Model<Spark>,
    @InjectModel(SparkNote.name) private readonly sparkNoteModel: Model<SparkNote>,
  ) {}

  // https://stackoverflow.com/questions/46391630/mongoosejs-filter-out-populate-results
  async findAll(tags: string[]): Promise<Spark[]> {
    const sparks = this.model
      .find()
      .populate('reference.tags')
      .sort({ updatedAt: 'desc' });

    // if (tags != null) {
    //   query = query.where('tag.name IN (:...tags)', {
    //     tags,
    //   });
    // }

    return sparks;
  }

  async create(input: SparkCreateInput): Promise<Spark> {
    const spark = new this.sparkNoteModel({
      content: {
        document: input.doc,
      },
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
    return this.model.findById(id).populate('reference.tags');
  }
}
