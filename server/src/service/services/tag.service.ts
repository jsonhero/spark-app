import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, Spark } from '@schema';

import { DbConnection } from '../../db';
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
    @InjectModel(Tag.name) private readonly model: Model<Tag>,
    @InjectModel(Spark.name) private readonly sparkModel: Model<Spark>,
  ) {}

  findAll({ query = null }: { query?: string }): Promise<Tag[]> {
    // let options: FindManyOptions<Tag> = {
    //   order: {
    //     lastUsedAt: 'DESC',
    //   },
    // };

    // if (query) {
    //   options = {
    //     where: {
    //       name: ILike(`%${query}%`),
    //     },
    //     ...options,
    //   };
    // }

    return this.model
      .aggregate()
      .search({
        text: {
          query,
        },
      })
      .exec();

    // return this.repository.find(options);
  }

  async create(input: CreateTagInput) {
    const tagToCreate = new this.model({
      name: input.name,
      sparks: [input.sparkId],
    });

    const tag = await tagToCreate.save();

    await this.sparkModel.findByIdAndUpdate(input.sparkId, {
      $push: {
        'reference.tags': tag.id,
      },
    });

    return tag;
  }

  async addTagToSpark(input: AddTagToSparkInput) {
    const tagWithSpark = await this.model.findByIdAndUpdate(input.tagId, {
      $push: {
        sparks: input.sparkId,
      },
      $set: {
        lastUsedAt: Date.now(),
      },
    });

    await this.sparkModel.findByIdAndUpdate(input.sparkId, {
      $push: {
        'reference.tags': input.tagId,
      },
    });

    return tagWithSpark;
  }

  async deleteTagFromSpark(input: DeleteTagFromSparkInput) {
    const updatedTag = await this.model.findByIdAndUpdate(input.tagId, {
      $pullAll: {
        sparks: input.sparkId,
      },
    });

    if (updatedTag.sparks.length) {
      await this.model.findByIdAndDelete(updatedTag.id);
    }

    await this.sparkModel.findByIdAndUpdate(input.sparkId, {
      $pullAll: {
        'reference.tags': input.tagId,
      },
    });
  }
}
