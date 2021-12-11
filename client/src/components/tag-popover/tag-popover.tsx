import React, { useMemo, useState, useCallback, useRef } from 'react'
import { usePopper } from 'react-popper'
import { observer } from 'mobx-react-lite'
import { Flex, List, ListItem } from '@chakra-ui/react'
import { GenericTagFragment, useCreateTagMutation, useGetTagsQuery } from '@operations'
import { globalStore, TagSuggestionStore } from '@/core/store'
import { useApolloClient } from '@apollo/client'
import { useEventEmitter } from '@/core/hooks'
import { AppEventType } from '@/core/events'

interface TagPopoverProps {
  tagSuggestionStore: TagSuggestionStore;
}

// @ts-ignore
const TagPopoverComponent: React.FC<TagPopoverProps> = ({ tagSuggestionStore }) => {
  console.log("le render?")
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

  const query = useMemo(() => tagSuggestionStore.props?.query || '', [tagSuggestionStore.props?.query])


  const { data } = useGetTagsQuery({
    variables: {
      query,
    },
    skip: query.length === 0,
  })

  const activeEditor = globalStore.activeEditors.find((editor) => editor.isActive)

  const onCreateTag = useCallback(() => {
    createTagMutation({
      variables: {
        input: {
          // @ts-ignore
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
  }, [activeEditor, query])

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
        const possibleNode = listRef.current?.childNodes[selectedIndex]
        if (possibleNode) {
          // @ts-ignore
          possibleNode.click()
        }
      }
      tagSuggestionStore.setProps(null)
    }

  })

  const onItemClick = useCallback((item) => {
    if (item === null) {
      onCreateTag()
    } else {
      tagSuggestionStore.props?.command({
        id: item.name,
      })
      // tagPopoverStore.selectItem(selectedIndex)
    }

  }, [selectedIndex, onCreateTag])

  const listItems: (GenericTagFragment | null)[] = useMemo(() => {
    const items = [];

    if (query.length) {
      items.push(null)
    }

    if (data?.tags) {
      return [...items, ...data.tags]
    }

    return items;

  }, [query.length, data])

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