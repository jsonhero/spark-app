import React, { useCallback, useMemo, useContext } from 'react'
import { Box, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import { toJS } from 'mobx';
import { useApolloClient } from '@apollo/client'

import { SparkEditor } from '@/components'
import { useCreateSparkMutation, useDeleteSparkMutation, GetSparksDocument, Spark, GetSparksQuery } from '@operations'
import { EditorOptions } from '@tiptap/react';

import { findTags, extractTextFromJSONDoc } from '@/utils'
import { MainEditorContext } from '@/core/store'


export const MainEditor = observer(() => {

  const client = useApolloClient()

  const mainEditor = useContext(MainEditorContext)
  const [createSparkMutation, {}] = useCreateSparkMutation({
    onCompleted(completedData) {
      client.cache.updateQuery({ query: GetSparksDocument }, (data) => ({
        sparks: [completedData.createSpark, ...data.sparks]
      }))
      mainEditor.setCurrentlyEditingSpark(completedData.createSpark.id)
    }
  })

  const [deleteSparkMutation, {}] = useDeleteSparkMutation({
    onCompleted() {
      client.cache.updateQuery({ query: GetSparksDocument }, (data) => ({
        sparks: data.sparks.filter((spark: Spark) => spark.id !== mainEditor.currentlyEditingSparkId)
      }))
      mainEditor.clearCurrentlyEditingSpark()
    }
  })

  const currentSpark: Spark | null | undefined = useMemo(() => {
    const data: GetSparksQuery | null = client.cache.readQuery({ query: GetSparksDocument })
    return data && data.sparks.find((spark: Spark) => spark.id === mainEditor.currentlyEditingSparkId)
  }, [mainEditor.currentlyEditingSparkId])
  console.log(currentSpark, 'sparky')

  const editorOptions: Partial<EditorOptions> = useMemo(() => ({
    onUpdate: ({ editor, transaction }) => {
      const isPreviouslyEmpty = transaction.before.textContent.length === 0
      const isEmpty = transaction.doc.textContent.length === 0
      console.log(currentSpark, 'spark??')
      if (isPreviouslyEmpty && !isEmpty) {
        const docString: string = JSON.stringify(editor.getJSON())
        
        createSparkMutation({
          variables: {
            input: {
              doc: docString
            }
          }
        })
      } else if (!isPreviouslyEmpty && isEmpty && mainEditor.currentlyEditingSparkId) {
        deleteSparkMutation({
          variables: {
            id: mainEditor.currentlyEditingSparkId
          }
        })
      } else if (currentSpark) {
        console.log("Modify!", client.cache.identify(currentSpark))
        client.cache.modify({
          id: client.cache.identify(currentSpark),
          fields: {
            doc(cachedDoc) {
              console.log('cached??')
              return JSON.stringify(editor.getJSON())
            }
          }
        })
      }
      
    },
  }), [mainEditor.currentlyEditingSparkId, currentSpark])

  return (
    <Box width="100%" bg="gray_0">
      <Box mt="120px">

      </Box>
      <Flex justify="center" width="100%" height="300px">
        <Box width="65%">
          <SparkEditor editorOptions={editorOptions} spark={currentSpark} width="auto" minHeight="200px" />
        </Box>
      </Flex>
      </Box>
  )
})
