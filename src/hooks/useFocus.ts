import { useRef, useEffect } from 'react'

const useFocus = <T extends HTMLElement>(shouldFocus = true) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus()
    }
  }, [ref, shouldFocus])

  return ref
}

export default useFocus
