import React, { useCallback } from 'react'
import { Box, Flex, IconButton, SimpleGrid, VStack, HStack, Icon, Text, useBoolean, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ImFileText2, ImFolder } from "react-icons/im";
import { ChevronRightIcon, ChevronDownIcon, PlusSquareIcon } from '@chakra-ui/icons';

import { Folder, Spark, FolderEntry } from '@operations'
import { extractTitleFromJSONDoc } from '@/utils'
import { globalStore } from '@/core/store'


const FolderNodeButton = () => {
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="fc" size="xs" icon={<PlusSquareIcon />} p="0px" onClick={(e) => {
        e.stopPropagation()
      }} />
      <MenuList>
        <MenuItem>New Folder</MenuItem>
        <MenuItem>New Spark</MenuItem>
      </MenuList>
    </Menu>
  )
}

interface FolderNodeProps {
  folder: Folder;
  depth: number;
}

const FolderNode: React.FC<FolderNodeProps> = ({ folder, depth }) => {

  const [isExpanded, setExpanded] = useBoolean(false)

  return (
    <Box width='100%'>
      <Flex align="center" onClick={setExpanded.toggle} sx={{
        width: '100%',
        borderRadius: '4px',
        _hover: {
          bg: 'gray.200',
          cursor: 'pointer'
        },
        pl: (8 * depth) + 'px'
      }}>
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <Icon as={ImFolder} ml="xxsm" />
        <Box ml="xxsm">
          <Text fontSize="sm">{folder.name}</Text>
        </Box>
        <Box ml="auto">
          <FolderNodeButton />
        </Box>
      </Flex>
      {folder.entries.length && isExpanded && <FolderTree folder={folder} depth={depth} />}
    </Box>

  )
}

interface SparkNodeProps {
  spark: Spark;
  depth: number;
}

const SparkNode: React.FC<SparkNodeProps> = ({ spark, depth }) => {

  return (
    <HStack spacing="xxsm" width="100%" sx={{
      borderRadius: '4px',
      _hover: {
        bg: 'gray.200',
        cursor: 'pointer'
      },
      pl: (8 * depth) + 'px'
    }} onClick={() => globalStore.openSparkInActiveEditor(spark.id)}>
      <Box width="16px"></Box>
      <Icon as={ImFileText2} />
      <Box>
        <Text fontSize="sm">{extractTitleFromJSONDoc(spark.doc)}</Text>
      </Box>
    </HStack>
  )
}

interface TreeNodeProps {
  folderEntry: FolderEntry;
  depth: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ folderEntry, depth }) => {
  const entity = folderEntry.entity; 
  if (entity.__typename === 'Folder') {
    return (
      <FolderNode folder={entity} depth={depth} />
    );
  } else if (entity.__typename === 'Spark') {
    return (
      <SparkNode spark={entity} depth={depth} />
    );
  }

  return null;
}

interface FolderTreeProps {
  folder: Folder;
  depth: number;
}

export const FolderTree: React.FC<FolderTreeProps> = ({ folder, depth }) => {
  return (
    <VStack align="start" spacing="0px">
      {folder.entries.map((folderEntry) => <TreeNode key={folderEntry.id} folderEntry={folderEntry} depth={depth + 1} />)}
    </VStack>
  )
}