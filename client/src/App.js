import { ChakraProvider, Flex, Box } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { ApolloProvider } from "@apollo/client";

import { Layout } from './layout'
import { apolloClient, theme } from "./core";
import { TagPopover } from "./components";
import { AppEventEmitterProvider } from '@/core/contexts'
import './App.css';

const App = observer(({ tagPopoverStore }) => {
  return (
      <AppEventEmitterProvider>
        <ApolloProvider client={apolloClient}>
          <ChakraProvider theme={theme}>
            <Box height="100vh">
              <Layout />
            </Box>
            {tagPopoverStore.props && <TagPopover tagPopoverStore={tagPopoverStore} selectedIndex={tagPopoverStore.selectedIndex} />}
          </ChakraProvider>
        </ApolloProvider>
      </AppEventEmitterProvider>
  );
});

export default App;
