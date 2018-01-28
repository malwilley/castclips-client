import * as React from 'react';
import Background from 'src/components/Modal/Background';
import { css } from 'emotion';
import Header, { HeaderProps } from 'src/components/Modal/Header';
import Footer from 'src/components/Modal/Footer';
import ModalButton, { ModalButtonProps } from 'src/components/Modal/ModalButton';
import { colors } from 'src/styles';

type ModalProps = HeaderProps & {
  handleClose: () => void;
  primaryButtonProps?: Omit<ModalButtonProps, 'type'>;
  secondaryButtonProps?: Omit<ModalButtonProps, 'type'>;
};

const styles = {
  bodyContainer: css({
    backgroundColor: colors.lightest,
  }),
  main: css({
    borderRadius: 8,
    boxShadow: 'var(--modal-dropshadow)',
    maxWidth: 600,
    width: '100%',
  }),
};

const Modal: React.SFC<ModalProps> = ({
  children,
  handleClose,
  icon,
  title,
  primaryButtonProps,
  secondaryButtonProps,
}) => (
  <Background handleClose={handleClose}>
    <div className={styles.main}>
      <Header {...{ handleClose, icon, title }} />
      <div className={styles.bodyContainer}>{children}</div>
      <Footer>
        {secondaryButtonProps && <ModalButton type="secondary" {...secondaryButtonProps} />}
        {primaryButtonProps && <ModalButton type="primary" {...primaryButtonProps} />}
      </Footer>
    </div>
  </Background>
);

export default Modal;
