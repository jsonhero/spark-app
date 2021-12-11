import React, { useMemo, useState, useCallback, useRef } from 'react'
import { usePopper } from 'react-popper'
import { Flex, List, ListItem } from '@chakra-ui/react'
import { useCreateTagMutation } from '@operations'
import { globalStore } from '@/core/store'
import { useApolloClient } from '@apollo/client'
import { useEventEmitter } from '@/core/hooks'
import { AppEventType } from '@/core/events'

export const TagPopover = ({ tagPopoverStore }) => {
  const { useListener } = useEventEmitter()
  const listRef = useRef()
  const [selectedIndex, setSelectedIndex] = useState(-1) 

  const [popperElement, setPopperElement] = useState(null);
  const virtualReference = useMemo(() => {
    return {
      getBoundingClientRect: () => tagPopoverStore.props.clientRect()
    }
  }, [tagPopoverStore.props])

  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    placement: 'bottom-start',
  });

  const client = useApolloClient()

  const [createTagMutation, {}] = useCreateTagMutation()

  const query = tagPopoverStore.props.query

  const activeEditor = globalStore.activeEditors.find((editor) => editor.isActive)

  const onCreateTag = useCallback(() => {
    createTagMutation({
      variables: {
        input: {
          name: query,
          sparkId: activeEditor ? activeEditor.currentlyEditingSpark.id : null,
        }
      },
      onCompleted({ createTag }) {
        client.cache.modify({
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

  useListener(AppEventType.tagSuggestionKeyDown, (suggestion) => {
    const listLength = listRef.current.childNodes.length

    console.log(listLength, 'length')

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
    }

  })

  const listItems = useMemo(() => {
    const items = [];

    if (query.length) {
      items.push(null)
    }

    return items.concat(tagPopoverStore.possibleTags)

  }, [query.length, tagPopoverStore.possibleTags])


  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      <Flex w="300px" shadow="md" border="1px solid lightgray" bg="white">
        <List w='100%' ref={listRef} onMouseOut={() => setSelectedIndex(-1)}>
          {listItems.map((item, i) => {

            const props = {
              onMouseOver: () => setSelectedIndex(i),
              key: i,
              bg: i === selectedIndex && 'red'
            }
            if (item === null) {
              return <ListItem onClick={() => onCreateTag()} {...props}>Create '{tagPopoverStore.props.query}'</ListItem>
            }

            return <ListItem onClick={() => tagPopoverStore.selectItem(i)} {...props}>{item}</ListItem>

          })}
        </List>
      </Flex>

    </div>
  );
}