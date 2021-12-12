import React, { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'

import { useDeleteTagFromSparkMutation, GenericSparkFragment, GenericTagFragment } from '@operations'
import { Tag as TagComponent } from '@/components'

interface SparkTagProps {
  spark: GenericSparkFragment;
  tag: GenericTagFragment;
}

export const SparkTag: React.FC<SparkTagProps> = ({ tag, spark }) => {

  const client = useApolloClient()

  const [deleteTagFromSparkMutation, {}] = useDeleteTagFromSparkMutation()

  const onDeleteTag = useCallback(() => {
    deleteTagFromSparkMutation({
      variables: {
        input: {
          tagId: tag.id,
          sparkId: spark.id,
        }
      },
      onCompleted(data) {
        client.cache.modify({
          id: client.cache.identify(spark),
          fields: {
            tags(existingTagRefs, { readField }) {
              return existingTagRefs.filter((tagRef: any) => readField('id', tagRef) !== tag.id)
            }
          }
        })
      }
    })
  }, [tag.id, spark])

  return (
    <TagComponent onClick={onDeleteTag} name={tag.name} closeable={false} color="pink" />
  )

}