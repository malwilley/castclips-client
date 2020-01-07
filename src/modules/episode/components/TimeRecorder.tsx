import { css } from 'emotion'
import formatHrMinSec from 'utils/formatHrMinSec'
import parseHrMinSec from 'utils/parseHrMinSec'
import Button from 'components/Button'
import React, { useState, useEffect } from 'react'
import { colors, fonts } from 'styles'
import { isNil } from 'ramda'

type TimeRecorderProps = {
  className?: string
  handleRecordClick: (time: number) => void
  placeholder?: string
  time: Maybe<number> // seconds
  currentTime: number
}

const styles = {
  main: css({
    flexBasis: 150,
    color: colors.gray600,
    border: `1px solid ${colors.gray50}`,
    borderRadius: 8,
    fontWeight: 'bold',
    overflow: 'hidden',
  }),
  inputContainer: css({
    borderBottom: `1px solid ${colors.gray50}`,
    borderTop: `1px solid ${colors.gray50}`,
  }),
  input: css(fonts.text300, {
    '&::placeholder': {
      color: colors.gray200,
    },
    padding: '0 20px',
    background: 'none',
    border: 'none',
    height: 50,
    textAlign: 'center',
    transition: '300ms background ease-out, 300ms color ease-out',
    width: '100%',
  }),
  inputSet: css({
    background: colors.green20,
    color: colors.green500,
  }),
  recordButton: css(fonts.bold300, {
    '&:hover': {
      backgroundColor: colors.secondary20,
    },
    height: 50,
    color: colors.secondary500,
    transition: '200ms background-color ease-out',
    width: '100%',
  }),
  plusMinusContainer: css({
    '& > :not(:last-child)': {
      borderRight: `1px solid ${colors.gray50}`,
    },
    display: 'flex',
    height: 50,
  }),
  setTimeText: css({
    color: colors.secondary500,
    margin: 0,
    fontWeight: 'bold',
    fontSize: '0.9rem',
  }),
}

const makeAdjustTimeHandler = ({
  currentTime,
  handleRecordClick,
  time,
  timeModifier,
}: Pick<TimeRecorderProps, 'currentTime' | 'time' | 'handleRecordClick'> & {
  timeModifier: number
}) => () => {
  const newTime = time ? time + timeModifier : currentTime + timeModifier
  handleRecordClick(newTime)
}

const TimeRecorder: React.FC<TimeRecorderProps> = ({
  className,
  currentTime,
  handleRecordClick,
  placeholder,
  time,
}) => {
  const [value, setValue] = useState('')
  useEffect(() => {
    if (!isNil(time)) {
      setValue(formatHrMinSec(time))
    }
  }, [time, setValue])

  return (
    <div className={css(styles.main, className)}>
      <div className={styles.plusMinusContainer}>
        <Button
          className={styles.recordButton}
          onClick={makeAdjustTimeHandler({
            currentTime,
            handleRecordClick,
            time,
            timeModifier: -1,
          })}
        >
          -1
        </Button>
        <Button
          className={styles.recordButton}
          onClick={makeAdjustTimeHandler({ currentTime, handleRecordClick, time, timeModifier: 1 })}
        >
          +1
        </Button>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={css(styles.input, !isNil(time) && styles.inputSet)}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => {
            handleRecordClick(parseHrMinSec(value))
          }}
          placeholder={placeholder}
        />
      </div>
      <Button className={styles.recordButton} onClick={() => handleRecordClick(currentTime)}>
        <div className={styles.setTimeText}>Set current time</div>
      </Button>
    </div>
  )
}

export default TimeRecorder
