import { useCallback } from 'react'
import { useDeleteSparkMutation, DeleteSparkMutationOptions, GetSparksDocument, Spark, DeleteSparkMutationResult } from '@operations'
import { useApolloClient } from '@apollo/client'
import { globalStore } from '@/core/store'

export const useDeleteSpark = (options?: DeleteSparkMutationOptions): [(sparkId: string) => void, DeleteSparkMutationResult] => {
  const client = useApolloClient()
  const [deleteSparkMutation, info] = useDeleteSparkMutation(options)

  const appDeleteSparkMutation = useCallback((sparkId: string) => {
    deleteSparkMutation({
      variables: {
        id: sparkId
      },
      onCompleted() {
        client.cache.updateQuery({ query: GetSparksDocument }, (data) => ({
          sparks: data.sparks.filter((spark: Spark) => spark.id !== sparkId)
        }))

        const activeEditor = globalStore.activeEditors.find((editor) => editor.currentlyEditingSpark?.id === sparkId)
        if (activeEditor) {
          activeEditor.clearCurrentlyEditingSpark()
        }
      }
    })
  }, [deleteSparkMutation])

  return [appDeleteSparkMutation, info]

}