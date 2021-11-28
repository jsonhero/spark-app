import React, { useCallback, useMemo } from 'react'
import { Box, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import { toJS } from 'mobx';

import { SparkEditor } from '../spark-editor'

export const MainEditor = observer(({ sparksStore, globalStore }) => {

  const addSpark = useCallback((doc, tags) => {
    sparksStore.add(doc, tags)
  }, [])

  const updateSpark = useCallback((id, doc, tags) => {
    sparksStore.update(id, doc, tags)
  }, [])

  const sparkToEdit = useMemo(() => {
    return sparksStore.sparks.find((spark) => spark.id === globalStore.currentlyEditingSparkId)
  }, [sparksStore, globalStore.currentlyEditingSparkId])

  return (
    <Box width="100%" bg="gray_0">
      <Box mt="120px">

      </Box>
      <Flex justify="center" width="100%" height="300px">
        <Box width="65%">
          <SparkEditor isNew={sparkToEdit === null} existingSpark={sparkToEdit} addSpark={addSpark} updateSpark={updateSpark} width="auto" minHeight="200px" />
        </Box>
      </Flex>
      </Box>
  )
})
