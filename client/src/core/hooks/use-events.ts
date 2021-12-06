import { useEffect, useContext, useCallback, DependencyList } from 'react'

import { AppEvents, ListenerType } from '../events'
import { AppEventEmitterContext } from '../contexts'

function useEmit() {
  const em = useContext(AppEventEmitterContext)

  return useCallback(
    <E extends keyof AppEvents>(type: E, ...args: ListenerType<AppEvents[E]>) => {
      em.emit(type, ...args)
  }, [em])
}

export function useEventEmitter() {
  const emit = useEmit()
  return {
    useListener: <E extends keyof AppEvents>(
      type: E,
      listener: (...args: ListenerType<AppEvents[E]>) => void,
      deps: DependencyList = [],
    ) => {
      const em = useContext(AppEventEmitterContext)
      useEffect(() => {
        em.addListener(type, listener)
        return () => {
          console.log("removing listener")
          // em.removeListener(type, listener)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [em, listener, type, ...deps])
    },
    emit,
  }
}