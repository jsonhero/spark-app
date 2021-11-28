import { Module } from '@nestjs/common';

import { ServiceModule } from '../service'
import { SparkResolver } from './resolvers'

const resolvers = [
  SparkResolver
]

@Module({
  imports: [ServiceModule],
  providers: [...resolvers],
  exports: [...resolvers]
})
export class ApiModule {}
