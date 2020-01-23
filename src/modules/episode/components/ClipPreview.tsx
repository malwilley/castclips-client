import React from 'react'
import { css } from 'emotion'
import { colors } from 'styles'
import { isNil } from 'ramda'

type ClipPreviewProps = {
  time: number
  length: number
  start: Maybe<number>
  end: Maybe<number>
}

const styles = {
  completedClip: css({
    backgroundColor: colors.secondary80,
    position: 'absolute',
    top: 0,
    bottom: 0,
  }),
  main: css({
    width: '100%',
    padding: '40px 0',
  }),
  content: css({
    backgroundColor: colors.gray20,
    height: 50,
    position: 'relative',
  }),
  startEndNeedle: css({
    backgroundColor: colors.secondary80,
    width: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
  }),
  timeNeedle: css({
    backgroundColor: colors.tertiary100,
    width: 1,
    position: 'absolute',
    top: -10,
    bottom: -10,
  }),
}

const ClipPreview: React.FC<ClipPreviewProps> = ({ end, length, start, time }) => (
  <div className={styles.main}>
    <div className={styles.content}>
      {!isNil(start) && (
        <div className={styles.startEndNeedle} style={{ left: `${(start / length) * 100}%` }} />
      )}
      {!isNil(end) && (
        <div className={styles.startEndNeedle} style={{ left: `${(end / length) * 100}%` }} />
      )}
      {!isNil(start) && !isNil(end) && (
        <div
          className={styles.completedClip}
          style={{ left: `${(start / length) * 100}%`, right: `${(1 - end / length) * 100}%` }}
        />
      )}
      <div className={styles.timeNeedle} style={{ left: `${(time / length) * 100}%` }} />
    </div>
  </div>
)

export default ClipPreview
