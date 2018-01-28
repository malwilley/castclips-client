import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';
import { Portal } from 'react-portal';
import zIndex from 'src/styles/zIndex';

type ModalBackgroundProps = {
  handleClose: () => void;
};

const styles = {
  contentContainer: css({
    position: 'absolute',
    top: 260,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }),
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
    zIndex: zIndex.modal,
  }),
};

const ModalBackground: React.SFC<ModalBackgroundProps> = ({ children, handleClose }) => (
  <Portal>
    <div className={styles.main} onClick={handleClose}>
      <div className={styles.contentContainer} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  </Portal>
);

export default ModalBackground;
