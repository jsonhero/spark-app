import React, { useRef, useEffect, useCallback } from 'react'
import _ from "lodash"

export function useThrottle(cb: (...args: any) => void, delay: number) {
  const options = { leading: false, trailing: true }; // add custom lodash options
  const cbRef = useRef(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => { cbRef.current = cb; });
  return useCallback(
    // @ts-ignore
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
}