import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export const Tag = ({ name, color, closeable, ...rest }) => {
  return (
    <Flex justify="center" align="center" maxWidth="fit-content" minWidth="20px" px="xxsm" py="2px" borderRadius="4px" bg={"#FFBB56"} border="1px solid #EFA433" {...rest}>
      <Text fontSize="12px">{`#${name}`}</Text>
      {closeable && <CloseIcon ml="xsm" boxSize="8px" />}
    </Flex>
  )
}