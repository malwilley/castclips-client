import React, { useMemo } from 'react'
import useResizeObserver from 'hooks/useResizeObserver'
import { css } from 'emotion'
import { range } from 'ramda'

type MasonryGridProps = {
  minColumnWidth: number
}

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginRight: '1rem',
    },
    display: 'flex',
  }),
  column: css({
    '& > :not(:last-child)': {
      marginBottom: '0.5rem',
    },
    flex: 1,
  }),
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children, minColumnWidth }) => {
  const {
    ref,
    dimensions: { width },
  } = useResizeObserver<HTMLDivElement>()

  const numColumns = Math.floor(width / minColumnWidth) || 1

  const itemsByColumn = useMemo(() => {
    return React.Children.toArray(children).reduce<React.ReactNode[][]>(
      (acc, next, i) => {
        acc[i % numColumns].push(next)
        return acc
      },
      range(0, numColumns).map(() => [])
    )
  }, [children, numColumns])

  const content = range(0, numColumns).map((i) => (
    <div className={styles.column} key={i}>
      {itemsByColumn[i]}
    </div>
  ))

  return (
    <div className={styles.main} ref={ref}>
      {/* Prevents from rendering a single column before rerendering with the correct number */}
      {width ? content : null}
    </div>
  )
}

export default MasonryGrid
