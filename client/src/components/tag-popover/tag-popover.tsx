import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { usePopper } from 'react-popper'
import { observer } from 'mobx-react-lite'
import { Flex, List, ListItem } from '@chakra-ui/react'
import { GenericTagFragment, useCreateTagMutation, useGetTagsQuery, useAddTagToSparkMutation } from '@operations'
import { globalStore, TagSuggestionStore } from '@/core/store'
import { useApolloClient } from '@apollo/client'
import { useEventEmitter } from '@/core/hooks'
import { AppEventType } from '@/core/events'
interface TagPopoverProps {
  tagSuggestionStore: TagSuggestionStore;
}

// @ts-ignore
const TagPopoverComponent: React.FC<TagPopoverProps> = ({ tagSuggestionStore }) => {
  const { useListener } = useEventEmitter()
  const listRef = useRef<HTMLUListElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1) 

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const virtualReference = useMemo(() => {
    return {
      // @ts-ignore
      getBoundingClientRect: () => tagSuggestionStore.props?.clientRect()
    }
  }, [tagSuggestionStore.props])

  // @ts-ignore
  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    placement: 'bottom-start',
  });

  const client = useApolloClient()

  const [createTagMutation, {}] = useCreateTagMutation()
  const [addTagToSparkMutation, {}] = useAddTagToSparkMutation()

  const query = useMemo(() => tagSuggestionStore.props?.query || '', [tagSuggestionStore.props?.query])


  const { data } = useGetTagsQuery({
    variables: {
      query,
    },
    // skip: query.length === 0,
  })

  const activeEditor = globalStore.activeEditors.find((editor) => editor.isActive)

  const onCreateTag = useCallback(() => {
    if (query.length) {
      createTagMutation({
        variables: {
          input: {
            name: query,
            sparkId: activeEditor ? activeEditor.currentlyEditingSpark?.id : null,
          }
        },
        onCompleted({ createTag }) {
          client.cache.modify({
            // @ts-ignore
            id: client.cache.identify(activeEditor.currentlyEditingSpark),
            fields: {
              tags(cachedTags) {
                return [...cachedTags, createTag.createdTag]
              }
            }
          })
        }
      })
    }
  }, [activeEditor, query])

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
          id: client.cache.identify(activeEditor.currentlyEditingSpark),
          fields: {
            tags(cachedTags) {
              return [...cachedTags, addTagToSpark.addedTag]
            }
          }
        })
      }
    })
  }, [activeEditor])

  const onItemClick = useCallback((item: GenericTagFragment | null) => {
    if (item === null) {
      onCreateTag()
      tagSuggestionStore.props?.command({})
    } else {
      if (activeEditor?.currentlyEditingSpark?.id) {
        onAddTagToSpark(item.id, activeEditor.currentlyEditingSpark.id)
        tagSuggestionStore.props?.command({})
      }
    }

  }, [activeEditor?.currentlyEditingSpark?.id, onCreateTag])

  const listItems: (GenericTagFragment | null)[] = useMemo(() => {
    const items = [];
    

    if (query.length) {
      if (data?.tags.length) {
        const matchedExistingTag = data.tags.find((tag) => tag.name === query)
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

  }, [query.length, data])

  // Automatically select tag if it exists
  useEffect(() => {
    const matchingExistingTagIndex = listItems.findIndex((tag) => {
      if (tag) {
        return tag.name === query
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

  useListener(AppEventType.tagSuggestionKeyDown, ({ suggestion }) => {
    const listLength = listRef.current?.childNodes.length || 0

    if (suggestion.event.key === 'ArrowDown') {
      if (selectedIndex === -1 || selectedIndex === listLength - 1) {
        setSelectedIndex(0)
      } else {
        setSelectedIndex(selectedIndex + 1)
      }
    } else if (suggestion.event.key === 'ArrowUp') {
      if (selectedIndex === -1 || selectedIndex === 0) {
        setSelectedIndex(listLength - 1)
      } else {
        setSelectedIndex(selectedIndex - 1)
      }
    } else if (suggestion.event.key === 'Enter') {

      if (selectedIndex !== -1) {
        const possibleNode = listRef.current?.childNodes[selectedIndex] as HTMLLIElement
        if (possibleNode) {
          possibleNode.click()
        }
      } else {
        // tagSuggestionStore.setProps(null)
      }
    } else {
      setSelectedIndex(-1)
    }
  })

  if (!tagSuggestionStore.props) return null;
  


  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      <Flex w="300px" shadow="md" border="1px solid lightgray" bg="white">
        <List w='100%' ref={listRef} onMouseOut={() => setSelectedIndex(-1)}>
          {listItems.map((item, i) => {

            const props = {
              onMouseOver: () => setSelectedIndex(i),
              key: item ? item.id : 'create',
              bg: i === selectedIndex && 'red',
              onClick: () => onItemClick(item)
            }
            if (item === null) {
              // @ts-ignore
              return <ListItem {...props}>Create '{query}'</ListItem>
            }

            // @ts-ignore
            return <ListItem {...props}>{item.name}</ListItem>

          })}
        </List>
      </Flex>

    </div>
  );
}

export const TagPopover = observer(TagPopoverComponent)