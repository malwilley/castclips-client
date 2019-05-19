import * as React from 'react';
import { css } from 'emotion';
import formatHrMinSec from '~/utils/formatHrMinSec';
import Button from '~/components/Button';
import { StopwatchIcon } from 'mdi-react';
import { colors } from '~/styles';

type TimeRecorderProps = {
  className?: string;
  handleRecordClick?: () => void;
  placeholder?: string;
  time: Maybe<number>; // seconds
};

const styles = {
  main: css({
    boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
    background: colors.lightest,
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 150,
    color: colors.dark,
    // border: `1px solid ${colors.gray500}`,
    borderRadius: 20,
    transition: '300ms background ease-out, 300ms color ease-out, 300ms box-shadow ease-out',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }),
  mainSet: css({
    boxShadow: 'none',
    color: colors.lightest,
    background: colors.gradient,
  }),
  input: css({
    flexGrow: 1,
    padding: '0 20px',
    background: 'none',
    border: 'none',
    width: 0,
  }),
  recordButton: css({
    '&:hover': {},
    boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
    width: 30,
    height: 30,
    borderRadius: 20,
    background: colors.gradient,
    marginRight: 5,
    color: colors.lightest,
    transition: '300ms background ease-out, 300ms color ease-out',
  }),
  recordButtonSet: css({
    background: colors.lightest,
    color: colors.dark,
  }),
};

const TimeRecorder: React.FC<TimeRecorderProps> = ({
  className,
  handleRecordClick,
  placeholder,
  time,
}) => (
  <div className={css(styles.main, time && styles.mainSet, className)}>
    <input
      className={styles.input}
      value={time ? formatHrMinSec(time) : ''}
      placeholder={placeholder}
    />
    <Button
      className={css(styles.recordButton, time && styles.recordButtonSet)}
      onClick={handleRecordClick}
    >
      <StopwatchIcon size={16} />
    </Button>
  </div>
);

export default TimeRecorder;
