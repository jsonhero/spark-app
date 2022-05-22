import * as path from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { DbModule } from './db';
import { ServiceModule } from './service';
import { ApiModule } from './api';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/junto'),
    DbModule,
    ServiceModule,
    ApiModule,

    // graphql
    GraphQLModule.forRoot({
      cors: {
        origin: [
          // dev
          'http://localhost:5278',
        ],
        credentials: true,
      },
      debug: true,
      playground: true,
      autoSchemaFile: path.join(__dirname, './schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
