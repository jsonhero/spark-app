import React, { useCallback } from 'react'
import { Box, Flex, Button, SimpleGrid, Input } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"

import { Tag } from '../../components'

export const Main = observer(({ globalStore, tagPopoverStore, children }) => {
  

  const onTagClick = useCallback((name) => {
    globalStore.removeSearchFilter({ type: 'tag', data: { name }})
  }, [])

  return (
    <Box width="calc(100% - 300px)" position="relative" overflowY="auto" bg="#FBFBFB">
      <Box width="calc(100% - 315px)" position="fixed" top="0px" zIndex={100} backdropFilter="blur(8px)">
        <Flex minHeight="80px" flexDirection="column" align="center" justify="center">
          <Box width="360px" >
            <Input size="sm" />
          </Box>
          <Flex justify="center" flexWrap="wrap">
            {globalStore.searchFilters.map((filter, i) => <Box key={i} mr="xsm" mt="xsm" onClick={() => onTagClick(filter.data.name)}><Tag name={filter.data.name} closeable /></Box>)}
          </Flex>
        </Flex>
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
})