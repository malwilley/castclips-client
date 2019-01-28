import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type ModalBackgroundProps = {
  handleClose: () => void;
};

const styles = {
  main: css({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: colors.darkestAlpha30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

const ModalBackground: React.SFC<ModalBackgroundProps> = ({ children, handleClose }) => (
  <div className={styles.main} onClick={handleClose}>
    {children}
  </div>
);

export default ModalBackground;
