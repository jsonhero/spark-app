import React, { useMemo, useState, useCallback } from 'react'
import { usePopper } from 'react-popper'
import { Flex, List, ListItem } from '@chakra-ui/react'
import { toJS } from 'mobx'
import { useCreateTagMutation } from '@operations'
import { globalStore } from '@/core/store'

export const TagPopover = ({ tagPopoverStore }) => {
  const [popperElement, setPopperElement] = useState(null);
  const virtualReference = useMemo(() => {
    return {
      getBoundingClientRect: () => tagPopoverStore.props.clientRect()
    }
  }, [tagPopoverStore.props])

  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    placement: 'bottom-start',
  });

  const [createTagMutation, {}] = useCreateTagMutation()

  const query = tagPopoverStore.props.query

  const activeEditor = globalStore.activeEditors.find((editor) => editor.isActive)
  console.log(toJS(globalStore.activeEditors), 'active')

  const onCreateTag = useCallback(() => {
    createTagMutation({
      variables: {
        input: {
          name: query,
          sparkId: activeEditor ? activeEditor.currentlyEditingSpark.id : null,
        }
      }
    })
  }, [activeEditor, query])

  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      <Flex w="300px" shadow="md" border="1px solid lightgray" bg="white">
        <List w='100%'>
          {query.length && (
             <ListItem onClick={() => onCreateTag()}>Create '{tagPopoverStore.props.query}'</ListItem>
          )}
          {tagPopoverStore.possibleTags.map((item, i) => {
            return <ListItem onClick={() => tagPopoverStore.selectItem(i)} key={i} bg={i === tagPopoverStore.selectedIndex && 'red'}>{item}</ListItem>
          })}
        </List>
      </Flex>

    </div>
  );
}