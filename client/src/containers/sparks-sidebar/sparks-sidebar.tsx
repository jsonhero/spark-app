import React from 'react'
import { Box, Flex, Button, Text, Input, VStack, StackDivider } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'

import { extractTextFromJSONDoc, extractTitleFromJSONDoc } from '@/utils'
import { useGetSparksQuery } from '@operations'

export const SparksSidebar = () => {
  const { data, loading } = useGetSparksQuery()
  if (loading) { return null }

  


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
          {/* {globalStore.searchFilters.map((filter, i) => <Box key={i} mr="xsm" mt="xsm" onClick={() => onRemoveTagClick(filter.data.name)}><Tag name={filter.data.name} closeable /></Box>)} */}
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
            data?.sparks.map((spark) => {
              const parsedDoc: any = spark.doc && JSON.parse(spark.doc)
              return (
                <Box key={spark.id} position="relative" width="100%" minHeight="88px">
                  <Box position="absolute" top="10px" right="15px">
                    <CloseIcon boxSize="10px" color="gray_3" onClick={() => {}} />
                  </Box>
                  <Flex flexDirection="column" justify="space-between" p="12px" width="100%" _hover={{
                    cursor: 'pointer'
                  }} onClick={() => {}}>
                    <Text fontWeight="bold" fontSize="sm">{extractTitleFromJSONDoc(parsedDoc)}</Text>
                    <Text fontSize="sm">{extractTextFromJSONDoc(parsedDoc, 40)}</Text>
                    <Text mt="xxsm" fontSize="xsm" color="gray_3">{DateTime.fromISO(spark.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</Text>
  {/* 
                    <Flex justify="flex-start" flexWrap="wrap">
                      {spark.tags.map((name) => <Box key={name} mr="xsm" mt="xsm" onClick={() => onTagClick(name)}><Tag name={name} /></Box>)}
                    </Flex> */}
                  </Flex>
              </Box>
            )})
          }
          <StackDivider borderColor="gray_2" />
        </VStack>
      </Box>
    </Box>
  )
}