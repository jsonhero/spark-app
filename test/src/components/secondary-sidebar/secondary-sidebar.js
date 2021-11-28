import React, { useCallback, useMemo } from 'react'
import { Box, Flex, Button, Text, Input, VStack, StackDivider } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-location'
import { DateTime } from 'luxon'

import { Tag } from '../tag'
import { extractTextFromJSONDoc, extractTitleFromJSONDoc } from '../../utils'

const notes = [
  { title: 'Test Title', description: 'Wow this is a really cool thing!'},
  { title: 'Other Title', description: "I'm writing about all kinds of different stuff."}
]

export const SecondarySidebar = observer(({ tagPopoverStore, globalStore, sparksStore }) => {

  const filteredSparks = useMemo(() => {
    return sparksStore.sparks.filter((spark) => {
      const all = globalStore.searchFilters.every((filter) => {
        if (filter.type === 'tag') {
          return spark.tags.includes(filter.data.name);
        }
        return false
      })
      return all
    })
  }, [sparksStore.sparks, globalStore.searchFilters.length])

  const onRemoveTagClick = useCallback((name) => {
    globalStore.removeSearchFilter({ type: 'tag', data: { name }})
  }, [])


  const onTagClick = useCallback((name) => {
    globalStore.addSearchFilter({ type: 'tag', data: { name }})
  }, [])


  return (
    <Box height="100%" minWidth="300px" width="300px" bg="#FDFDFD" borderRight="1px solid" borderColor="gray_2">
      <Box p="md" borderBottom="1px solid" borderColor="gray_2">
        <Box>
          <Text fontWeight="bold">All</Text>
        </Box>
        <Box mt="sm">
          <Input size="sm" bg="white" placeholder="Search" />
        </Box>
        <Flex justify="flex-start" flexWrap="wrap">
          {globalStore.searchFilters.map((filter, i) => <Box key={i} mr="xsm" mt="xsm" onClick={() => onRemoveTagClick(filter.data.name)}><Tag name={filter.data.name} closeable /></Box>)}
        </Flex>
      </Box>
      <Box height="20px" bg="gray_1" borderBottom="1px solid" borderColor="gray_2">
      </Box>
      <Box>
        <VStack
          spacing="0px"
          divider={<StackDivider borderColor="gray_2" />}
        >
          {
            filteredSparks.map((spark) => (
              <Box key={spark.id} position="relative" width="100%" minHeight="88px">
                <Box position="absolute" top="10px" right="15px">
                  <CloseIcon boxSize="10px" color="gray_3" onClick={() => sparksStore.remove(spark.id)} />
                </Box>
                <Flex flexDirection="column" justify="space-between" p="12px" width="100%" _hover={{
                  cursor: 'pointer'
                }} onClick={() => globalStore.setCurrentlyEditingSpark(spark.id)}>
                  <Text fontWeight="bold" fontSize="sm">{extractTitleFromJSONDoc(spark.doc)}</Text>
                  <Text fontSize="sm">{extractTextFromJSONDoc(spark.doc, 40)}</Text>
                  <Text mt="xxsm" fontSize="xsm" color="gray_3">{DateTime.fromISO(spark.timestamp).toLocaleString(DateTime.DATETIME_MED)}</Text>

                  <Flex justify="flex-start" flexWrap="wrap">
                    {spark.tags.map((name) => <Box key={name} mr="xsm" mt="xsm" onClick={() => onTagClick(name)}><Tag name={name} /></Box>)}
                  </Flex>
                </Flex>
              </Box>
            ))
          }
          <StackDivider borderColor="gray_2" />
        </VStack>
      </Box>
    </Box>
  )
})