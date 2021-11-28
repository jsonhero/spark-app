import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbConnection } from './db-connection';

// import { Spark } from '../entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Spark
    ]),
  ],
  providers: [DbConnection],
  exports: [DbConnection],
})
export class DbModule {}
