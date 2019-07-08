import React, { useState, useCallback } from 'react';
import { css, keyframes } from 'emotion';
import { colors, fonts } from 'src/styles';

type TooltipProps = {
  className?: string;
  bottom?: boolean;
  text: string;
};

const styles = {
  main: css({
    position: 'relative',
    overflow: 'visible',
  }),
  tooltip: css({
    '@media (hover: none)': {
      display: 'none',
    },
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: -34,
    transform: 'translateX(-50%)',
    left: '50%',
  }),
  tooltipBottom: css({
    top: 'auto',
    bottom: -34,
  }),
  box: css(fonts.text200, {
    backgroundColor: colors.gray700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    borderRadius: 4,
    padding: '0.4em 1em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  }),
  triangleDown: css({
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: `6px solid ${colors.gray700}`,
  }),
  triangleUp: css({
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: `6px solid ${colors.gray700}`,
  }),
};

const Tooltip: React.FC<TooltipProps> = ({ bottom = false, children, className, text }) => {
  const [show, setShow] = useState(false);
  const onMouseOver = useCallback(() => {
    setShow(true);
  }, [setShow]);
  const onMouseLeave = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <div
      className={css(styles.main, className)}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseLeave}
    >
      {show && (
        <div className={css(styles.tooltip, bottom && styles.tooltipBottom)}>
          {bottom && <div className={styles.triangleUp} />}
          <div className={styles.box}>{text}</div>
          {!bottom && <div className={styles.triangleDown} />}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
