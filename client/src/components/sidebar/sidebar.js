import React, { useCallback } from 'react'
import { Box, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-location'

import { Tag } from '../tag'

const _tags = ['Food', 'Music', 'Turtles', 'Movies', 'Banana', 'People', 'Food', 'Music', 'Turtles', 'Movies', 'Banana', 'People']

export const Sidebar = observer(({ tagPopoverStore, globalStore }) => {
  const navigate = useNavigate()

  const onTagClick = useCallback((name) => {
    globalStore.addSearchFilter({ type: 'tag', data: { name }})
    // navigate({ to: '/search', replace: true })
  }, [])

  const onCreateClick = useCallback(() => {
    navigate({ to: '/' })
    globalStore.clearSearchFilters()
  }, [])

  return (
    <>
      <Box height="100%" minWidth="300px" width="300px" bg="gray_1" borderRight="1px solid rgba(178, 178, 178, 0.11)">
        <Box p="md">
          <Box>
            <Button onClick={onCreateClick} colorScheme="blue" isFullWidth>
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
            {tagPopoverStore.possibleTags.map((name, i) => <Box key={i} mr="xsm" mt="xsm" onClick={() => onTagClick(name)}><Tag name={name} /></Box>)}
          </Flex>
        </Box>
      </Box>
    </>
  )
})