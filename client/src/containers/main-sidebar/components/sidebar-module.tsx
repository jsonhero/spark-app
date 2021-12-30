import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface SidebarModuleProps {
  title: string;
}

export const SidebarModule: React.FC<SidebarModuleProps> = ({ title, children, ...rest }) => {
  return (
    <Box {...rest} mb='md'>
      <Box bg="#FCFCFC" borderY="1px solid" borderColor="#E3E7EF" mb="12px" py="2px">
        <Text pl="sm" fontWeight='bold' fontSize="sm">{title}</Text>
      </Box>
      <Box px="sm">
        {children}
      </Box>
    </Box>
  )
}