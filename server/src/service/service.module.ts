import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbModule } from '../db';
import { SparkService, TagService } from './services';

const services = [SparkService, TagService];

@Global()
@Module({
  imports: [DbModule],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
