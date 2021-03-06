import React, { useState, useCallback } from 'react'
import { Box, Flex }  from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import { useApolloClient } from '@apollo/client'
import _ from 'lodash'

import { SparkEditor, Tag } from '@/components'
import { useCreateSparkMutation, useDeleteSparkMutation, useUpdateSparkMutation, GetSparksDocument, GenericSparkFragment } from '@operations'
import { useEventEmitter, useThrottle, useDeleteSpark, useSpark } from '@/core/hooks'
import { AppEventType } from '@/core/events'
import { SparkEditorStore } from '@/core/store';
import { SparkTag } from '@/containers'
import { Node } from 'prosemirror-model'
import { JSONContent } from '@tiptap/core'

function isEditorEmpty(n: Node, spark: GenericSparkFragment | null): boolean {
  const content = n.content
  const firstChild = n.content.firstChild
  const isDocEmpty = content.childCount <= 1 && firstChild?.type.name === 'fixedtitle' && firstChild?.textContent.length === 0;
  const isSparkEmpty = spark ? spark.tags.length === 0 : true
  return isDocEmpty && isSparkEmpty
}

export const MainEditor = observer(() => {

  const [isSaving, setSaving] = useState(false)

  const [sparkEditor, setSparkEditor] = useState<SparkEditorStore | null>(null)

  const { useListener } = useEventEmitter()

  const client = useApolloClient()

  const [createSparkMutation, {}] = useCreateSparkMutation()

  const [onDeleteSpark, {}] = useDeleteSpark()

  const [updateSparkMutation, { loading: isSavingEditor,  }] = useUpdateSparkMutation({
    
  })

  const spark = useSpark(sparkEditor?.currentlyEditingSparkId)

  const saveEditor = useCallback((docJson) => {
    console.log("Attempting to save...")
    if (spark) {
      updateSparkMutation({
        variables: {
          id: spark.id,
          doc: JSON.stringify(docJson)
        }
      })
    }
  }, [spark])


  const saveEditorThrottled = useThrottle(saveEditor, 2000)  

  useListener(AppEventType.updateEditor, (event) => {
    const transaction = event.transaction
    const editor = event.editorStore.editor

    if (editor) {
      const isPreviouslyEmpty = isEditorEmpty(transaction.before, spark)
      const isEmpty = isEditorEmpty(transaction.doc, spark)

      if (isPreviouslyEmpty && !isEmpty) {
        const docString: string = JSON.stringify(editor.getJSON())
        createSparkMutation({
          variables: {
            input: {
              doc: docString
            }
          },
          onCompleted: (completedData) => {
            client.cache.updateQuery({ query: GetSparksDocument, variables: {
              tags: null
            } }, (data) => ({
              sparks: [completedData.createSpark, ...data.sparks]
            }))
            if (sparkEditor) {
              sparkEditor.setCurrentlyEditingSparkId(completedData.createSpark.id, true)
            }
          }
        })
      } else if (!isPreviouslyEmpty && isEmpty && sparkEditor?.currentlyEditingSparkId) {
        onDeleteSpark(sparkEditor?.currentlyEditingSparkId)
      } else if (sparkEditor?.currentlyEditingSparkId && spark) {
        client.cache.modify({
          id: client.cache.identify(spark),
          fields: {
            doc(cachedDoc) {
              return editor.getJSON()
            }
          }
        })
        saveEditorThrottled(editor.getJSON())
      }
    }
    
  })

  useListener(AppEventType.switchEditor, (event) => {
    sparkEditor?.setCurrentlyEditingSparkId(event.spark.id, false)
  }, [sparkEditor])

  const setEditor = (editor: SparkEditorStore) => {    
    setSparkEditor(editor)
  }

  return (
    <Box width="100%" bg="#FFFFFF" position="relative">
      <Box position="absolute" top="20px" right="150px">
        {isSavingEditor ? 'Saving...'  : ''}
      </Box>
      <Box mt="120px">
      </Box>
      <Flex justify="center" width="100%" height="300px">
        <Box width="65%">
          <Box>
            <SparkEditor onRegisterEditor={setEditor} width="auto" minHeight="200px" />
          </Box>
          <Flex justify="flex-start" flexWrap="wrap">
            {spark?.tags.map((tag, i) => (
              <Box key={i} mr="xsm" mt="xsm">
                <SparkTag tag={tag} spark={spark} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
})
