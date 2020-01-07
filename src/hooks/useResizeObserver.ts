import { useLayoutEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = <T extends Element>() => {
  const ref = useRef<T>(null)

  const [dimensions, changeDimensions] = useState({
    height: 0,
    width: 0,
  })

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries) || !entries.length) {
        return
      }

      const { contentRect } = entries[0]

      changeDimensions({
        height: contentRect.height,
        width: contentRect.width,
      })
    })

    resizeObserver.observe(element)

    return () => resizeObserver.unobserve(element)
  }, [])

  return {
    dimensions,
    ref,
  }
}

export default useResizeObserver
