import { createUnionType } from '@nestjs/graphql';

import { Spark, Folder } from '@entity'

export const FolderEntryEntityUnion = createUnionType({
  name: 'FolderEntryEntityUnion',
  types: () => [Spark, Folder],
});