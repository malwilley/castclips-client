import * as React from 'react';
import { css } from 'emotion';
import formatHrMinSec from 'src/utils/formatHrMinSec';
import Button from 'src/components/Button';
import { StopwatchIcon, MinusIcon, PlusIcon } from 'mdi-react';
import { colors, fonts } from 'src/styles';

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
    letterSpacing: 0.5,
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

const TimeRecorder: React.FC<TimeRecorderProps> = ({
  className,
  currentTime,
  handleRecordClick,
  placeholder,
  time,
}) => (
  <div className={css(styles.main, className)}>
    <div className={styles.plusMinusContainer}>
      <Button
        className={styles.recordButton}
        onClick={makeAdjustTimeHandler({ currentTime, handleRecordClick, time, timeModifier: -1 })}
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
      className={css(styles.input, time && styles.inputSet)}
      value={time ? formatHrMinSec(time) : ''}
      placeholder={placeholder}
    />
    <Button className={styles.recordButton} onClick={() => handleRecordClick(currentTime)}>
      <div>
        <StopwatchIcon size={16} />
        <div className={styles.setTimeText}>set current time</div>
      </div>
    </Button>
  </div>
);

export default TimeRecorder;
