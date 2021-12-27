import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo
} from 'react'
import {
  forwardRef,
  Flex,
  List,
  ListItem,
  FlexProps
} from '@chakra-ui/react'
import { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion'
import { useApolloClient } from '@apollo/client'

import { GenericTagFragment, useCreateTagMutation, useGetTagsQuery, useAddTagToSparkMutation } from '@operations'
import { globalStore, TagSuggestionStore } from '@/core/store'
import { useSpark } from '@/core/hooks'

interface TagListProps extends SuggestionProps, FlexProps {

}


export const TagList = forwardRef<SuggestionProps, 'div'>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(-1) 
  const listRef = useRef<HTMLUListElement | null>(null)

  const client = useApolloClient()

  const { data } = useGetTagsQuery({
    variables: {
      query: props.query,
    },
    // skip: query.length === 0,
  })

  const [createTagMutation, {}] = useCreateTagMutation()
  const [addTagToSparkMutation, {}] = useAddTagToSparkMutation()

  const activeEditor = globalStore.activeEditors.find((editor) => editor.isActive)
  const spark = useSpark(activeEditor?.currentlyEditingSparkId)

  const onCreateTag = useCallback(() => {
    if (props.query.length) {
      createTagMutation({
        variables: {
          input: {
            name: props.query,
            sparkId: spark ? spark.id : null,
          }
        },
        onCompleted({ createTag }) {
          client.cache.modify({
            // @ts-ignore
            id: client.cache.identify(spark),
            fields: {
              tags(cachedTags) {
                return [...cachedTags, createTag.createdTag]
              }
            }
          })
        }
      })
    }
  }, [spark, props.query])

  const onAddTagToSpark = useCallback((tagId: string, sparkId: string) => {
    addTagToSparkMutation({
      variables: {
        input: {
          tagId,
          sparkId,
        }
      },
      onCompleted({ addTagToSpark  }) {
        client.cache.modify({
          // @ts-ignore
          id: client.cache.identify(spark),
          fields: {
            tags(cachedTags) {
              return [...cachedTags, addTagToSpark.addedTag]
            }
          }
        })
      }
    })
  }, [spark])

  const onItemClick = useCallback((item: GenericTagFragment | null) => {
    if (item === null) {
      onCreateTag()
      props.command({})
    } else {

      if (spark) {
        const doesTagExistOnSparkAlready = spark.tags.find((tag) => tag.id === item.id)
        if (!doesTagExistOnSparkAlready) {
          onAddTagToSpark(item.id, spark.id)
        }
        props.command({})
      }
    }

  }, [spark, onCreateTag])

  const listItems: (GenericTagFragment | null)[] = useMemo(() => {
    const items = [];
    

    if (props.query.length) {
      if (data?.tags.length) {
        const matchedExistingTag = data.tags.find((tag) => tag.name === props.query)
        // add if there isn't a matching tag
        if (!matchedExistingTag) {
          items.push(null)
        }
      } else {
        items.push(null)
      }
    }

    if (data?.tags) {
      return [...items, ...data.tags.slice(0, 8)]
    }

    return items;

  }, [props.query.length, data])

  // Automatically select tag if it exists
  useEffect(() => {
    const matchingExistingTagIndex = listItems.findIndex((tag) => {
      if (tag) {
        return tag.name === props.query
      }
      return false;
    })

    if (matchingExistingTagIndex !== -1) {
      setSelectedIndex(matchingExistingTagIndex)
      return;
    }

    // Select 'create' if matching doesn't exist
    if (listItems.length >= 1 && listItems[0] === null) {
      setSelectedIndex(0)
      return;
    }

  }, [listItems])


  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: SuggestionKeyDownProps) => {
      const listLength = listRef.current?.childNodes.length || 0

      if (event.key === 'ArrowDown') {
        if (selectedIndex === -1 || selectedIndex === listLength - 1) {
          setSelectedIndex(0)
        } else {
          setSelectedIndex(selectedIndex + 1)
        }

        return true
      } else if (event.key === 'ArrowUp') {
        if (selectedIndex === -1 || selectedIndex === 0) {
          setSelectedIndex(listLength - 1)
        } else {
          setSelectedIndex(selectedIndex - 1)
        }
        return true
      } else if (event.key === 'Enter') {

        if (selectedIndex !== -1) {
          const possibleNode = listRef.current?.childNodes[selectedIndex] as HTMLLIElement
          if (possibleNode) {
            possibleNode.click()
          }
        } else {
          // tagSuggestionStore.setProps(null)
        }

        return true
      } else {
        setSelectedIndex(-1)
      }

      return false
    }
  }))

  return (
    <Flex w="300px" shadow="md" border="1px solid lightgray" bg="white" ref={ref}>
      <List w='100%' ref={listRef} onMouseOut={() => setSelectedIndex(-1)}>
        {listItems.map((item, i) => {

          const itemProps = {
            onMouseOver: () => setSelectedIndex(i),
            key: item ? item.id : 'create',
            bg: i === selectedIndex && 'gray.300',
            onClick: () => onItemClick(item),
            px: 'xsm',
            py: 'xxsm'
          }
          if (item === null) {
            // @ts-ignore
            return <ListItem {...itemProps}>{`Create '${props.query}'`}</ListItem>
          }

          // @ts-ignore
          return <ListItem {...itemProps}>{item.name}</ListItem>

        })}
      </List>
    </Flex>
  )
})

