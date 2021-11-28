import React, { useCallback } from 'react'
import { Box, Flex, Button, SimpleGrid, Input } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"

import { SparkEditor } from '../components'


export const Home = observer(({ sparksStore }) => {

  const addSpark = useCallback((doc, tags) => {
    sparksStore.add(doc, tags)
  }, [])

  const updateSpark = useCallback((id, doc, tags) => {
    sparksStore.update(id, doc, tags)
  }, [])

  return (
    <Flex justify="center" width="100%" height="100%">
      <Box width="50%">
        <SparkEditor isNew addSpark={addSpark} updateSpark={updateSpark} width="auto" minHeight="200px" mt="90px" />
        {sparksStore.sparks.map((spark) => <SparkEditor key={spark.id} addSpark={addSpark} updateSpark={updateSpark} existingSpark={spark} width="auto" minHeight="200px" mt="90px" /> ).reverse()}
        <Box height="90px" />
      </Box>
    </Flex>
  )
})