import { ChakraProvider, Flex, Box } from "@chakra-ui/react"
import { ApolloProvider } from "@apollo/client";

import { Layout } from './layout'
import { apolloClient, theme } from "./core";
import { EditorPopovers } from '@/containers'
import { AppEventEmitterProvider } from '@/core/contexts'
import './App.css';

const App = () => {
  return (
      <AppEventEmitterProvider>
        <ApolloProvider client={apolloClient}>
          <ChakraProvider theme={theme}>
            <Box height="100vh">
              <Layout />
            </Box>
            <EditorPopovers />
          </ChakraProvider>
        </ApolloProvider>
      </AppEventEmitterProvider>
  );
};

export default App;
