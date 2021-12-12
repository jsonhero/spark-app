import React, { useCallback } from 'react'
import { Box, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { Tag } from '@/components'
import { GenericTagFragment, useGetTagsQuery} from '@operations'
import { GlobalStore } from '@/core/store'

interface MainSidebarProps {
  globalStore: GlobalStore;
}

const MainSidebarComponent: React.FC<MainSidebarProps> = ({ globalStore }) => {

  const { data } = useGetTagsQuery()

  const onCreateClick = useCallback(() => {
  
  }, [])

  const onTagClick = useCallback((tag: GenericTagFragment) => {
    globalStore.addSearchFilter('tag', {
      tag,
    })
  }, [])

  return (
    <Box height="100%" minWidth="300px" width="300px" bg="gray_1" borderRight="1px solid rgba(178, 178, 178, 0.11)">
      <Box p="md">
        <Box>
          <Button colorScheme="blue" isFullWidth>
            Create
          </Button>
        </Box>
        <Box marginTop="md">
          <Button colorScheme="pink" isFullWidth>Log</Button>
        </Box>
      </Box>
      <Box borderTop="1px solid rgba(178, 178, 178, 0.11)" p="md">
        <Box>
          Recent Tags
        </Box>
        <Flex justify="flex-start" flexWrap="wrap">
          {data?.tags.map((tag, i) => <Box key={i} mr="xsm" mt="xsm" onClick={() => onTagClick(tag)}><Tag name={tag.name} closeable={false} /></Box>)}
        </Flex>
      </Box>
    </Box>
  )
}

export const MainSidebar = observer(MainSidebarComponent)