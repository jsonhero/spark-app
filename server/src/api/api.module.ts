import { Module } from '@nestjs/common';

import { ServiceModule } from '@service';
import { NodeResolver, SparkResolver, TagResolver } from '@resolvers';

const resolvers = [NodeResolver, SparkResolver, TagResolver];

@Module({
  imports: [ServiceModule],
  providers: [...resolvers],
  exports: [...resolvers],
})
export class ApiModule {}
