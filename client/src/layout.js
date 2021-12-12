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

import { Header, Sidebar, Main } from './components'
import { SparksSidebar, MainEditor, MainSidebar } from './containers'
import { Home, Search } from './routes'
import { tagPopoverStore, sparksStore, globalStore } from './core/store'

const location = new ReactLocation();

export const Layout = () => {  

  return (
    <>
      {/* <Header /> */}
      <Flex height="100%">
        <Router
          location={location}
          routes={[
            { path: '/', element: <MainEditor /> }
            // { path: "/", element: <Home sparksStore={sparksStore} /> },
            // { path: "/search", element: <Search sparksStore={sparksStore} globalStore={globalStore} /> },
          ]}
        >
          <MainSidebar globalStore={globalStore} />
          <SparksSidebar globalStore={globalStore} />
          <Outlet />
        </Router>
      </Flex>
    </>
  )
}