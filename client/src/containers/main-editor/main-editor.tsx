import React, { useState } from 'react'
import { Box, Flex }  from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import { useApolloClient } from '@apollo/client'

import { SparkEditor } from '@/components'
import { useCreateSparkMutation, useDeleteSparkMutation, useUpdateSparkMutation, GetSparksDocument, Spark } from '@operations'
import { useEventEmitter } from '@/core/hooks'
import { AppEventType } from '@/core/events'
import { SparkEditorStore } from '@/core/store';

export const MainEditor = observer(() => {

  const [sparkEditor, setSparkEditor] = useState<SparkEditorStore | null>(null)

  const { useListener } = useEventEmitter()

  const client = useApolloClient()

  const [createSparkMutation, {}] = useCreateSparkMutation()

  const [deleteSparkMutation, {}] = useDeleteSparkMutation()

  const [updateSparkMutation, {}] = useUpdateSparkMutation({
    
  })

  useListener(AppEventType.updateEditor, (event) => {
    const transaction = event.transaction
    const editor = event.editorStore.editor


    if (editor) {
      const isPreviouslyEmpty = transaction.before.textContent.length === 0
      const isEmpty = transaction.doc.textContent.length === 0
      if (isPreviouslyEmpty && !isEmpty) {
        const docString: string = JSON.stringify(editor.getJSON())
        createSparkMutation({
          variables: {
            input: {
              doc: docString
            }
          },
          onCompleted: (completedData) => {
            client.cache.updateQuery({ query: GetSparksDocument }, (data) => ({
              sparks: [completedData.createSpark, ...data.sparks]
            }))
            if (sparkEditor) {
              sparkEditor.setCurrentlyEditingSpark(completedData.createSpark, true)
            }
          }
        })
      } else if (!isPreviouslyEmpty && isEmpty && sparkEditor?.currentlyEditingSpark?.id) {
        deleteSparkMutation({
          variables: {
            id: sparkEditor?.currentlyEditingSpark?.id
          },
          onCompleted() {
            if (sparkEditor) {
              client.cache.updateQuery({ query: GetSparksDocument }, (data) => ({
                sparks: data.sparks.filter((spark: Spark) => spark.id !== sparkEditor.currentlyEditingSpark?.id)
              }))
              sparkEditor.clearCurrentlyEditingSpark()
            }
          }
        })
      } else if (sparkEditor?.currentlyEditingSpark) {
        // client.cache.modify({
        //   id: client.cache.identify(sparkEditor?.currentlyEditingSpark),
        //   fields: {
        //     doc(cachedDoc) {
        //       return JSON.stringify(editor.getJSON())
        //     }
        //   }
        // })
        updateSparkMutation({
          variables: {
            id: sparkEditor.currentlyEditingSpark.id,
            doc: JSON.stringify(editor.getJSON())
          }
        })
      }
    }
    
  }, [sparkEditor])

  useListener(AppEventType.switchEditor, (event) => {
    sparkEditor?.setCurrentlyEditingSpark(event.spark, false)
  }, [sparkEditor])

  const setEditor = (editor: SparkEditorStore) => {    
    setSparkEditor(editor)
  }

  return (
    <Box width="100%" bg="gray_0">
      <Box mt="120px">

      </Box>
      <Flex justify="center" width="100%" height="300px">
        <Box width="65%">
          <SparkEditor onRegisterEditor={setEditor} width="auto" minHeight="200px" />
        </Box>
      </Flex>
      </Box>
  )
})
