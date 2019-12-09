import React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'styles';

type ContinueListeningProps = {
  show?: boolean;
};

const styles = {
  main: css(fonts.bold300, {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: -46,
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  box: css({
    backgroundColor: colors.secondary20,
    color: colors.secondary500,
    borderRadius: 8,
    padding: '0.5em 1em',
    whiteSpace: 'nowrap',
  }),
  triangle: css({
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: `10px solid ${colors.secondary20}`,
  }),
};

const ContinueListening: React.FC<ContinueListeningProps> = ({ show = false }) => (
  <div>
    {show && (
      <div className={styles.main}>
        <div className={styles.box}>Continue listening!</div>
        <div className={styles.triangle} />
      </div>
    )}
  </div>
);

export default ContinueListening;
