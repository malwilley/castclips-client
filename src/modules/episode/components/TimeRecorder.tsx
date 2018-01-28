import { css } from 'emotion';
import formatHrMinSec from 'src/utils/formatHrMinSec';
import Button from 'src/components/Button';
import React, { useState, useEffect } from 'react';
import { colors, fonts } from 'src/styles';
import { addIndex, pipe, isNil, reverse, split, take, map, reduce } from 'ramda';

type TimeRecorderProps = {
  className?: string;
  handleRecordClick: (time: number) => void;
  placeholder?: string;
  time: Maybe<number>; // seconds
  currentTime: number;
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      borderBottom: `1px solid ${colors.gray80}`,
    },
    height: 150,
    width: 150,
    color: colors.gray600,
    border: `1px solid ${colors.gray80}`,
    borderRadius: 8,
    fontWeight: 'bold',
    overflow: 'hidden',
  }),
  input: css({
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
  recordButton: css({
    '&:hover': {
      backgroundColor: colors.secondary20,
    },
    height: 50,
    color: colors.primary500,
    transition: '200ms background-color ease-out',
    width: '100%',
  }),
  plusMinusContainer: css({
    '& > :not(:last-child)': {
      borderRight: `1px solid ${colors.gray80}`,
    },
    display: 'flex',
    height: 50,
  }),
  setTimeText: css(fonts.attribute300, {
    color: colors.primary500,
    margin: 0,
  }),
};

const makeAdjustTimeHandler = ({
  currentTime,
  handleRecordClick,
  time,
  timeModifier,
}: Pick<TimeRecorderProps, 'currentTime' | 'time' | 'handleRecordClick'> & {
  timeModifier: number;
}) => () => {
  const newTime = time ? time + timeModifier : currentTime + timeModifier;
  console.log(newTime);
  handleRecordClick(newTime);
};

const parseInput = pipe<string, string[], string[], string[], number[], number>(
  split(':'),
  reverse,
  take(3),
  map((str: string) => Number(str) || 0),
  addIndex<number, number>(reduce)(
    (seconds, next, index) => seconds + next * Math.pow(60, index),
    0
  )
);

const TimeRecorder: React.FC<TimeRecorderProps> = ({
  className,
  currentTime,
  handleRecordClick,
  placeholder,
  time,
}) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (!isNil(time)) {
      setValue(formatHrMinSec(time));
    }
  }, [time, setValue]);

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
      <input
        className={css(styles.input, !isNil(time) && styles.inputSet)}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={() => {
          handleRecordClick(parseInput(value));
        }}
        placeholder={placeholder}
      />
      <Button className={styles.recordButton} onClick={() => handleRecordClick(currentTime)}>
        <div className={styles.setTimeText}>set current time</div>
      </Button>
    </div>
  );
};

export default TimeRecorder;
