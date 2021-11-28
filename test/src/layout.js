import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import {
  Link,
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
  useMatch,
} from "react-location";

import { Header, Sidebar, SecondarySidebar, Main, MainEditor } from './components'
import { Home, Search } from './routes'
import { tagPopoverStore, sparksStore, globalStore } from './store'

const location = new ReactLocation();

export const Layout = () => {  

  return (
    <>
      {/* <Header /> */}
      <Flex height="100%">
        <Router
          location={location}
          routes={[
            { path: '/', element: <MainEditor sparksStore={sparksStore} globalStore={globalStore} /> }
            // { path: "/", element: <Home sparksStore={sparksStore} /> },
            // { path: "/search", element: <Search sparksStore={sparksStore} globalStore={globalStore} /> },
          ]}
        >
          <Sidebar tagPopoverStore={tagPopoverStore} globalStore={globalStore} />
          <SecondarySidebar tagPopoverStore={tagPopoverStore} globalStore={globalStore} sparksStore={sparksStore} />
          <Outlet />
          {/* <Main tagPopoverStore={tagPopoverStore} globalStore={globalStore}>
            <Outlet />
          </Main> */}
        </Router>
      </Flex>
    </>
  )
}