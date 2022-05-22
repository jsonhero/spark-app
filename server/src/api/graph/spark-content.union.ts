import { createUnionType } from '@nestjs/graphql';

import { SparkNoteContent } from '@schema';

export const SparkContentUnion = createUnionType({
  name: 'SparkContentUnion',
  types: () => [SparkNoteContent],
  resolveType(value) {
    if (value.document !== undefined) {
      return SparkNoteContent;
    }
    return null;
  },
});
