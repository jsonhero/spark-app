import { ChakraProvider, Flex, Box } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"

import { Layout } from './layout'
import { theme } from './theme'
import { TagPopover } from "./components";
import './App.css';

const App = observer(({ tagPopoverStore }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box height="100vh">
        <Layout />
      </Box>
      {tagPopoverStore.props && <TagPopover tagPopoverStore={tagPopoverStore} selectedIndex={tagPopoverStore.selectedIndex} />}
    </ChakraProvider>
  );
});

export default App;
