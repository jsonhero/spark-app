import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { Inject, forwardRef } from '@nestjs/common';

import { ResolvedGlobalId, fromGlobalId } from '@graph/utils';
import { Node } from '../../graph';
import { Spark } from '../../../entity';
import { SparkService } from '@service';

@Resolver('Node')
export class NodeResolver {
  constructor(
    @Inject(forwardRef(() => SparkService))
    private sparkService: SparkService,
  ) {}

  private static wrapNodeWithType(node: Node, type: string): Node {
    // Needed for Node resolve type
    node['__typename'] = type;
    return node;
  }

  private async resolveObjectTypeFromService(
    resolvedGlobalId: ResolvedGlobalId,
  ): Promise<Node> {
    switch (resolvedGlobalId.type) {
      case Spark.name:
        return this.sparkService.findById(resolvedGlobalId.id);
      default:
        return null;
    }
  }

  @Query(() => Node, { nullable: true })
  async node(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<Node> | null {
    const resolvedGlobalId = fromGlobalId(id);
    if (!isUUID(resolvedGlobalId.id)) {
      throw new Error('Invalid ID.');
    }

    const object = await this.resolveObjectTypeFromService(resolvedGlobalId);
    if (object) {
      return NodeResolver.wrapNodeWithType(object, resolvedGlobalId.type);
    }

    throw new Error('No matching node.');
  }

  @Query(() => [Node])
  nodes(@Args({ name: 'ids', type: () => [ID] }) ids: [string]): unknown[] {
    return ids.map((id) => this.node(id));
  }
}
