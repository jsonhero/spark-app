import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbModule } from '../db'
import { SparkService } from './services';

const services = [
  SparkService
]

@Global()
@Module({
  imports: [DbModule],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
