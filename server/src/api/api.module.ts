import { Module } from '@nestjs/common';

import { ServiceModule } from '@service';
import { NodeResolver, SparkResolver, TagResolver, FolderEntryResolver, FolderResolver } from '@resolvers';

const resolvers = [NodeResolver, SparkResolver, TagResolver, FolderEntryResolver, FolderResolver];

@Module({
  imports: [ServiceModule],
  providers: [...resolvers],
  exports: [...resolvers],
})
export class ApiModule {}
