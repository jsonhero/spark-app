import React, { useCallback, useMemo } from 'react'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"

import { SparkEditor } from '../components'


export const Search = observer(({ globalStore, sparksStore }) => {

  const updateSpark = useCallback((id, doc, tags) => {
    sparksStore.update(id, doc, tags)
  }, [])

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


  return (
    <Flex justify="center" width="100%" height="100%">
      <Box width="70%">
        <SimpleGrid autoRows columns={3} gridGap={"lg"}>
          {filteredSparks.map((spark) => <SparkEditor key={spark.id} updateSpark={updateSpark} existingSpark={spark} width="auto" minHeight="200px" mt="90px" /> ).reverse()}
        </SimpleGrid>
        <Box height="90px" />
      </Box>
    </Flex>
  )
})