import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DbModule } from '../db';
import { SparkService, TagService } from './services';
import {
  Spark,
  Tag,
  SparkSchema,
  TagSchema,
  SparkNote,
  SparkNoteSchema,
} from '@schema';

const services = [SparkService, TagService];

@Global()
@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([
      {
        name: Spark.name,
        schema: SparkSchema,
        discriminators: [
          {
            name: SparkNote.name,
            schema: SparkNoteSchema,
          },
        ],
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
  ],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
