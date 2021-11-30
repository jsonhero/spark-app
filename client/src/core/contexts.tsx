import * as React from 'react'
import { createContext } from 'react'

import { AppEmitter, createAppEmitter } from './events'



export const AppEventEmitterContext = createContext<AppEmitter>(
  null as any,
)

export const AppEventEmitterProvider: React.FC = (props) => {
  return (
    <AppEventEmitterContext.Provider value={createAppEmitter()}>
      {props.children}
    </AppEventEmitterContext.Provider>
  )
}