import * as React from 'react';
import Background from 'src/components/Modal/Background';
import { css } from 'emotion';
import Header, { HeaderProps } from 'src/components/Modal/Header';
import Footer from 'src/components/Modal/Footer';
import { colors } from 'src/styles';
import { ButtonProps } from '../Button';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

type ModalProps = HeaderProps & {
  handleClose: () => void;
  primaryButtonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
};

const styles = {
  bodyContainer: css({
    backgroundColor: colors.white,
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
        {secondaryButtonProps && <SecondaryButton {...secondaryButtonProps} />}
        {primaryButtonProps && <PrimaryButton {...primaryButtonProps} />}
      </Footer>
    </div>
  </Background>
);

export default Modal;
