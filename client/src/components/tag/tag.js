import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export const Tag = ({ name, color, closeable, ...rest }) => {
  return (
    <Flex justify="center" align="center" maxWidth="fit-content" minWidth="20px" px="2px" py="0px" borderRadius="4px" bg={"#E2E8F0"} border="1px solid #CBD5E0" {...rest}>
      <Text color="#4A5568" fontSize="12px">{`#${name}`}</Text>
      {closeable && <CloseIcon ml="xsm" boxSize="8px" />}
    </Flex>
  )
}