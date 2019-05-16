import * as React from 'react';
import { css } from 'emotion';
import formatHrMinSec from '~/utils/formatHrMinSec';
import Button from '~/components/Button';
import { StopwatchIcon } from 'mdi-react';
import { colors } from '~/styles';

type TimeRecorderProps = {
  className?: string;
  handleRecordClick?: () => void;
  time?: number; // seconds
};

const styles = {
  main: css({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 120,
    color: colors.dark,
    border: `1px solid ${colors.gray500}`,
    borderRadius: 20,
  }),
  input: css({
    flexGrow: 1,
    padding: '0 20px',
    background: 'none',
    border: 'none',
    width: 0,
  }),
  recordButton: css({
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    marginRight: 5,
    color: colors.lightest,
  }),
};

const TimeRecorder: React.FC<TimeRecorderProps> = ({ className, handleRecordClick, time }) => (
  <div className={css(styles.main, className)}>
    <input className={styles.input} value={time ? formatHrMinSec(time) : ''} />
    <Button className={styles.recordButton} onClick={handleRecordClick}>
      <StopwatchIcon size={16} />
    </Button>
  </div>
);

export default TimeRecorder;
