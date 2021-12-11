import * as React from 'react'
import { createContext } from 'react'

import { AppEmitter, appEmitter } from './events'



export const AppEventEmitterContext = createContext<AppEmitter>(
  null as any,
)

export const AppEventEmitterProvider: React.FC = (props) => {
  return (
    <AppEventEmitterContext.Provider value={appEmitter}>
      {props.children}
    </AppEventEmitterContext.Provider>
  )
}