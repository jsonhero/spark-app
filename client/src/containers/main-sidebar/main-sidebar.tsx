import React, { useCallback } from 'react'
import { Box, Flex, Button, Text, Icon, IconButton } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { FaAsterisk, FaPen} from 'react-icons/fa'

import { Tag } from '@/components'
import { GenericTagFragment, useGetTagsQuery } from '@operations'
import { GlobalStore } from '@/core/store'

import { FolderTree } from './containers'
import { SidebarModule } from './components'

interface MainSidebarProps {
  globalStore: GlobalStore;
}

const MainSidebarComponent: React.FC<MainSidebarProps> = ({ globalStore }) => {

  const { data } = useGetTagsQuery()

  const activeEditor = globalStore.activeEditors.find((editor) => editor.currentlyEditingSparkId != null)


  const onCreateClick = useCallback(() => {
    console.log(activeEditor, 'acitve')
    activeEditor?.clearCurrentlyEditingSpark()
  }, [activeEditor])

  const onTagClick = useCallback((tag: GenericTagFragment) => {
    globalStore.addSearchFilter('tag', {
      tag,
    })
  }, [])

  return (
    <Box height="100%" minWidth="300px" width="300px" bg="#F9F9F9" borderRight="1px solid #E3E7EF">
      <Box>
        <Flex px="sm" py="lg" justify="space-between">
          <Flex align="center">
            <Icon as={FaAsterisk} />
            <Text ml="xsm" fontWeight="bold">All Notes</Text>
          </Flex>
          <IconButton onClick={onCreateClick} variant="outline" aria-label="wow" size="sm" icon={<Icon as={FaPen} />}/>
        </Flex>
      </Box>

      <Box>
        {/* <SidebarModule title="Workspace">
          <FolderTree />
        </SidebarModule> */}
        <SidebarModule title="Tags">
          <Flex justify="flex-start" flexWrap="wrap">
            {data?.tags.map((tag, i) => <Box key={i} mr="xsm" mt="xsm" onClick={() => onTagClick(tag)}><Tag name={tag.name} closeable={false} /></Box>)}
          </Flex>
        </SidebarModule>
      </Box>
    </Box>
  )
}

export const MainSidebar = observer(MainSidebarComponent)