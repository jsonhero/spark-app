import React, { useCallback, useState, useEffect } from 'react'
import { Box, Flex, IconButton, HStack, Icon, Text, Menu, MenuButton, MenuList, MenuItem, Input } from '@chakra-ui/react'
import { ImFileText2, ImFolder } from "react-icons/im";
import { ChevronRightIcon, ChevronDownIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useApolloClient } from '@apollo/client'

import { Folder, Spark, useGetFoldersQuery, useCreateFolderMutation } from '@operations'
import { extractTitleFromJSONDoc } from '@/utils'
import { globalStore } from '@/core/store'
import { Tree, TreeTypeRendererProps, TreeNode } from '@/components'

function convertFolderToTree(folder: Folder): TreeNode<any> {
  let children: TreeNode<any>[] = []

  if (folder.entries.length) {
    // @ts-ignore
    children = folder.entries.map((folderEntry) => {
      const entity = folderEntry.entity;
      if (entity.__typename === 'Folder') {
        return convertFolderToTree(entity);
      } else if (entity.__typename === 'Spark') {
        return {
          id: folderEntry.id,
          data: entity,
          children: [],
          type: 'spark',
        }
      }
    })
  }

  return {
    id: folder.id,
    type: 'folder',
    children,
    data: folder,
  }
}

const FOLDER_OFFSET = 8

// @ts-ignore
const FolderNodeButton = ({ onNewFolderClick }) => {
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="fc" size="xs" icon={<PlusSquareIcon />} p="0px" onClick={(e) => {
        e.stopPropagation()
      }} />
      <MenuList>
        <MenuItem onClick={onNewFolderClick}>New 'Folder'</MenuItem>
        <MenuItem>New 'Spark'</MenuItem>
      </MenuList>
    </Menu>
  )
}

interface FolderNodeProps {
  rendererProps: TreeTypeRendererProps<Folder>;
  addNewFolder: (nodeId: string) => void;
}

const FolderNode: React.FC<FolderNodeProps> = ({ rendererProps, addNewFolder }) => {

  return (
    <Flex align="center" onClick={rendererProps.toggleExpanded} sx={{
      width: '100%',
      borderRadius: '4px',
      _hover: {
        bg: 'gray.200',
        cursor: 'pointer'
      },
      pl: (FOLDER_OFFSET * rendererProps.depth) + 'px',
    }}>
      {rendererProps.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      <Icon as={ImFolder} ml="xxsm" />
      <Box ml="xxsm">
        <Text fontSize="sm">{rendererProps.node.data.name}</Text>
      </Box>
      <Box ml="auto">
        <FolderNodeButton onNewFolderClick={(event: any) => {
            event.stopPropagation();
            addNewFolder(rendererProps.node.id)
          }} />
      </Box>
    </Flex>
  )
}

interface SparkNodeProps {
  rendererProps: TreeTypeRendererProps<Spark>;
}

const SparkNode: React.FC<SparkNodeProps> = ({ rendererProps }) => {

  return (
    <HStack spacing="xxsm" width="100%" sx={{
      borderRadius: '4px',
      _hover: {
        bg: 'gray.200',
        cursor: 'pointer'
      },
      pl: (FOLDER_OFFSET * rendererProps.depth) + 'px',
    }} onClick={() => globalStore.openSparkInActiveEditor(rendererProps.node.data.id)}>
      <Box width="16px"></Box>
      <Icon as={ImFileText2} />
      <Box>
        <Text fontSize="sm">{extractTitleFromJSONDoc(rendererProps.node.data.doc)}</Text>
      </Box>
    </HStack>
  )
}

interface NewFolderNodeProps {
  rendererProps: TreeTypeRendererProps<null>;
  onAddFolder: (name: string, nodeId: string) => void;
}

const NewFolderNode: React.FC<NewFolderNodeProps> = ({ rendererProps, onAddFolder }) => {

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = event.target.value

    if (value.length) {
      onAddFolder(value, rendererProps.node.id)
    }
  }


  return (
    <Flex align="center" sx={{
      width: '100%',
      borderRadius: '4px',
      _hover: {
        bg: 'gray.200',
        cursor: 'pointer'
      },
      pl: (FOLDER_OFFSET * rendererProps.depth) + 'px',
    }}>
      <Box width="16px"></Box>
      <Icon as={ImFolder} ml="xxsm" />
      <Box ml="xxsm">
        <Input placeholder='' size='xs' autoFocus onBlur={onBlurInput} />
      </Box>
    </Flex>
  )
}


function findNode(node: TreeNode<any> | null, nodeId: string): TreeNode<any> | null {
  if (!node) return null;

  if (node.id === nodeId) {
    return node;
  }

  for (let i = 0; i < node.children.length; i++) {
    const nodeChild = node.children[i];
    const foundNode = findNode(nodeChild, nodeId)
    if (foundNode != null) return foundNode;
  }

  return null;
}

function findParentNode(node: TreeNode<any> | null, nodeId: string): TreeNode<any> | null {
  if (!node || node.children.length === 0) return null;

  for (let i = 0; i < node.children.length; i++) {
    const nodeChild = node.children[i];
    if (nodeChild.id === nodeId) return node;
    const foundNode = findParentNode(nodeChild, nodeId)
    if (foundNode) return foundNode;
  }

  return null;
}

export const FolderTree = () => {
  const queryClient = useApolloClient()
  const { data: folderData, refetch: refetchFolders } = useGetFoldersQuery()
  const [createFolder, {}] = useCreateFolderMutation()

  const [tree, setTree] = useState<TreeNode<any> | null>(() => folderData ?
  // @ts-ignore 
  convertFolderToTree(folderData.folderTree) : null)

  useEffect(() => {
    if (folderData) {
      // @ts-ignore
      setTree(convertFolderToTree(folderData.folderTree))
    }
  }, [folderData])

  const addNewFolderNode = useCallback((nodeId) => {
    const foundNode = findNode(tree, nodeId)
    if (foundNode) {
      console.log('found node', foundNode)
      // @ts-ignore
      setTree((tree) => {
        foundNode.children = [...foundNode.children, {
          id: '__new__',
          data: null,
          type: 'newfolder',
          children: [],
        }]
        return { ...tree };
      })
    }    
  }, [tree])

  const createAndReplaceNewFolderNode = useCallback(async (name, nodeId) => {
    const foundParentNode = findParentNode(tree, nodeId);
    if (foundParentNode && foundParentNode.type === 'folder') {
      const folderParentNode = foundParentNode as TreeNode<Folder>;

      createFolder({
        variables: {
          input: {
            name,
            parentFolderId: folderParentNode.id,
          }
        },
        onCompleted(data) {
          // should do this a better way in cache
          refetchFolders()
        }
      })

      // createF
      // @ts-ignore
      // setTree((tree) => {
      //   foundParentNode.children = foundParentNode.children.map((childNode) => {
      //     if (childNode.id === nodeId) {
      //       return {
      //       }
      //     }
      //     return childNode;
      //   })
      //   return { ...tree };
      // })
    }
  }, [tree])

  const typeRenderers = {
    spark: (props: TreeTypeRendererProps<Spark>) => {
      return <SparkNode rendererProps={props} />
    },
    folder: (props: TreeTypeRendererProps<Folder>) => {
      return <FolderNode rendererProps={props} addNewFolder={addNewFolderNode} />
    },
    newfolder: (props: TreeTypeRendererProps<null>) => {
      return <NewFolderNode rendererProps={props} onAddFolder={createAndReplaceNewFolderNode} />
    }
  }

  console.log(tree, 'tree')

  return <Tree data={tree} types={typeRenderers} />;
}