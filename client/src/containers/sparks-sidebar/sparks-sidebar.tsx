import React, { useCallback, useMemo } from 'react'
import { Box, Flex, Button, Text, Input, VStack, StackDivider } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react-lite'

import { extractTextFromJSONDoc, extractTitleFromJSONDoc } from '@/utils'
import { useGetSparksQuery, useGetSparkNodeLazyQuery, useDeleteSparkMutation } from '@operations'
import { useEventEmitter, useDeleteSpark } from '@/core/hooks'
import { AppEventType } from '@/core/events'
import { Tag } from '@/components'
import { GlobalStore, SearchTagFilter } from '@/core/store'

interface SparksSidebarProps {
  globalStore: GlobalStore
}

export const SparksSidebarComponent: React.FC<SparksSidebarProps> = ({
  globalStore
}) => {
  const { emit } = useEventEmitter()


  const tagsArg = useMemo(() => {

    const tagFilters = globalStore.searchFilters.filter((filter) => filter.type === 'tag')
    
    if (tagFilters.length === 0) return null;

    return tagFilters.map((filter: any) => filter.data.tag.name)

  }, [globalStore.searchFilters.length])

  const { data, loading } = useGetSparksQuery({
    variables: {
      tags: tagsArg,
    }
  })
  
  const [getSparkNode, {}] = useGetSparkNodeLazyQuery({
    onCompleted(data) {
      if (data.node?.__typename === 'Spark') {
        emit(AppEventType.switchEditor, {
          spark: data.node
        })
      }
    }
  })

  const onClickSpark = useCallback(async (sparkId) => {
    await getSparkNode({
      variables: {
        id: sparkId
      },
    })
  }, [])

  const [onDeleteSpark, {}] = useDeleteSpark()

  // if (loading) { return null }

  return (
    <Box height="100vh" minWidth="300px" width="300px" bg="#FFFDFD" borderRight="1px solid" borderColor="#E3E7EF">
      <Box p="md" borderBottom="1px solid" borderColor="gray_2">
        <Box>
          <Input size="sm" bg="white" placeholder="Search" borderRadius="6px"/>
        </Box>
        <Flex justify="flex-start" flexWrap="wrap">
          {globalStore.searchFilters.filter((filter) => filter.type === 'tag').map((filter, i) => {
            // @ts-ignore
            const data: SearchTagFilter = filter.data
            return (
              <Box key={i} mr="xsm" mt="xsm" onClick={() => globalStore.removeSearchFilter(filter)}><Tag name={data.tag.name} closeable /></Box>
            )
          })}
        </Flex>
      </Box>
      <Box overflow="auto" height="calc(100% - 200px)">
        <VStack
          spacing="0px"
          divider={<StackDivider borderColor="gray_2" />}
        >
          {
            data?.sparks.map((spark) => {
              const parsedDoc: any = spark.doc && spark.doc
              return (
                <Box key={spark.id} position="relative" width="100%" minHeight="88px" cursor="pointer">
                  <Box position="absolute" top="10px" right="15px">
                    <CloseIcon boxSize="10px" color="gray_3" onClick={() => onDeleteSpark(spark.id)} />
                  </Box>
                  <Flex flexDirection="column" minHeight="88px" justify="space-between" p="12px" width="100%" _hover={{
                    cursor: 'pointer'
                  }} onClick={() => onClickSpark(spark.id)}>
                    <Text fontWeight="bold" fontSize="sm">{extractTitleFromJSONDoc(parsedDoc)}</Text>
                    <Text fontSize="sm">{extractTextFromJSONDoc(parsedDoc, 40)}</Text>
                    <Text mt="xxsm" fontSize="xsm" color="gray_3">{DateTime.fromISO(spark.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</Text>
  
                    <Flex justify="flex-start" flexWrap="wrap">
                      {spark.tags.slice(0, 4).map((tag) => <Box key={tag.id} mr="xsm" mt="xsm" onClick={() => {}}><Tag name={tag.name} closeable={false} /></Box>)}
                    </Flex>
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

export const SparksSidebar = observer(SparksSidebarComponent)
