import { useEffect, useContext, useCallback, DependencyList, useRef } from 'react'

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

  // https://usehooks.com/useEventListener/
  return {
    useListener: <E extends keyof AppEvents>(
      type: E,
      listener: (...args: ListenerType<AppEvents[E]>) => void,
      deps: DependencyList = [],
    ) => {
      const savedListener = useRef();
      // Update ref.current value if handler changes.
      // This allows our effect below to always get latest handler ...
      // ... without us needing to pass it in effect deps array ...
      // ... and potentially cause effect to re-run every render.
      useEffect(() => {
        // @ts-ignore
        savedListener.current = listener;
      }, [listener]);

      const em = useContext(AppEventEmitterContext)
      useEffect(() => {        

        // @ts-ignore
        const eventListener = (...args: ListenerType<AppEvents[E]>) => savedListener.current(...args);

        em.addListener(type, eventListener)
        return () => {
          em.removeListener(type, eventListener)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [em, type])
    },
    emit,
  }
}