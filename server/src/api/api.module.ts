import { Module } from '@nestjs/common';

import { ServiceModule } from '@service';
import { SparkResolver, NodeResolver } from '@resolvers';

const resolvers = [SparkResolver, NodeResolver];

@Module({
  imports: [ServiceModule],
  providers: [...resolvers],
  exports: [...resolvers],
})
export class ApiModule {}
