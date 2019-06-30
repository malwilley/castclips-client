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
    '@media (max-width: 800px)': {
      margin: '60px auto 40px auto',
    },
    margin: '260px auto 40px auto',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
    zIndex: zIndex.modal,
  }),
  main: css({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: colors.darkestAlpha30,
    zIndex: zIndex.modalBackground,
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
