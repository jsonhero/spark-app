import React, { useState, useCallback } from 'react'
import { Box, Flex }  from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import { toJS } from 'mobx'
import { useApolloClient } from '@apollo/client'
import _ from 'lodash'

import { SparkEditor, Tag } from '@/components'
import { useCreateSparkMutation, useDeleteSparkMutation, useUpdateSparkMutation, GetSparksDocument, Spark } from '@operations'
import { useEventEmitter, useThrottle, useDeleteSpark, useSpark } from '@/core/hooks'
import { AppEventType } from '@/core/events'
import { SparkEditorStore } from '@/core/store';

export const MainEditor = observer(() => {

  const [isSaving, setSaving] = useState(false)

  const [sparkEditor, setSparkEditor] = useState<SparkEditorStore | null>(null)

  const { useListener } = useEventEmitter()

  const client = useApolloClient()

  const [createSparkMutation, {}] = useCreateSparkMutation()

  const [onDeleteSpark, {}] = useDeleteSpark()

  const [updateSparkMutation, { loading: isSavingEditor,  }] = useUpdateSparkMutation({
    
  })

  const spark = useSpark(sparkEditor?.currentlyEditingSpark?.id)


  const saveEditor = useCallback((docJson) => {
    console.log("Attempting to save...")
    if (sparkEditor?.currentlyEditingSpark) {
      updateSparkMutation({
        variables: {
          id: sparkEditor.currentlyEditingSpark.id,
          doc: JSON.stringify(docJson)
        }
      })
    }
  }, [sparkEditor])


  const saveEditorThrottled = useThrottle(saveEditor, 2000)




  // const saveEditor = _.throttle(unthrottledSaveEditor, 2000)
  

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
        onDeleteSpark(sparkEditor?.currentlyEditingSpark?.id)
      } else if (sparkEditor?.currentlyEditingSpark) {
        client.cache.modify({
          id: client.cache.identify(sparkEditor?.currentlyEditingSpark),
          fields: {
            doc(cachedDoc) {
              return JSON.stringify(editor.getJSON())
            }
          }
        })
        saveEditorThrottled(editor.getJSON())
      }
    }
    
  })

  useListener(AppEventType.switchEditor, (event) => {
    sparkEditor?.setCurrentlyEditingSpark(event.spark, false)
  }, [sparkEditor])

  const setEditor = (editor: SparkEditorStore) => {    
    setSparkEditor(editor)
  }

  return (
    <Box width="100%" bg="gray_0" position="relative">
      <Box position="absolute" top="20px" right="150px">
        {isSavingEditor ? 'Saving...'  : ''}
      </Box>
      <Flex>
        {spark?.tags.map((tag) => (<Tag name={tag.name} closeable={false} color="orange" />))}
      </Flex>
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
