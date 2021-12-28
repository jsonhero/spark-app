import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Box, VStack, useBoolean } from '@chakra-ui/react'

export interface TreeNode<T> {
  id: string;
  type: string;
  children: TreeNode<any>[];
  data: T;
}

export interface TreeTypeRendererProps<T> {
  node: TreeNode<T>;
  toggleExpanded: () => void;
  isExpanded: boolean;
  depth: number;
}

interface TreeTypes {
  [key: string]: (...args: any) => any;
}

export interface TreeProps {
  types: TreeTypes;
  data: TreeNode<any> | null;
}

interface TreeItemProps {
  node: TreeNode<any>;
  types: TreeTypes;
  depth: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, types, depth }) => {

  const [isExpanded, setExpanded] = useBoolean(false)

  const typeRenderer = useCallback((props: TreeTypeRendererProps<any>) => types[node.type](props), [types, node.type])

  const nextDepth = depth + 1;
  

  return (
    <Box width="100%" position="relative">
      {depth > 0 ? <Box width="1px" height="100%" position="absolute" bg="gray.300" left="7px" /> : null}
      <Box width="100%">
        {typeRenderer({
          node,
          isExpanded,
          toggleExpanded: setExpanded.toggle,
          depth,
        })}
      </Box>
      {isExpanded && node.children.length ? (
        <VStack align="start" spacing="0px">
          {node.children.map((node) => <TreeItem key={node.id} node={node} types={types} depth={nextDepth} />)}
        </VStack>
      ) : null}
    </Box>
  )
}

export const Tree: React.FC<TreeProps> = ({ data, types }) => {

  return (
    <VStack align="start" spacing="0px">
      {data && data.children.map((node) => <TreeItem key={node.id} node={node} types={types} depth={0} />)}
    </VStack>
  )
}