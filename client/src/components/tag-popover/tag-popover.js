import React, { useMemo, useState } from 'react'
import { usePopper } from 'react-popper'
import { Flex, List, ListItem } from '@chakra-ui/react'

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

  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      <Flex w="300px" shadow="md" border="1px solid lightgray" bg="white">
        <List w='100%'>
          {tagPopoverStore.possibleTags.map((item, i) => {
            return <ListItem onClick={() => tagPopoverStore.selectItem(i)} key={i} bg={i === tagPopoverStore.selectedIndex && 'red'}>{item}</ListItem>
          })}
        </List>
      </Flex>

    </div>
  );
}