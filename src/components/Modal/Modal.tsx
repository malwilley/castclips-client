import * as React from 'react';
import Background from 'src/components/Modal/Background';
import { css } from 'emotion';
import ModalHeader, { ModalHeaderProps } from 'src/components/Modal/ModalHeader';
import ModalFooter from 'src/components/Modal/ModalFooter';
import { colors, boxShadow } from 'src/styles';
import { ButtonProps } from '../Button';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

type ModalProps = ModalHeaderProps & {
  handleClose: () => void;
  isOpen: boolean;
  primaryButtonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
};

const styles = {
  bodyContainer: css({
    padding: '0 24px',
  }),
  main: css({
    borderRadius: 8,
    background: colors.white,
    boxShadow: boxShadow.cardHover,
    width: '100%',
  }),
};

const Modal: React.SFC<ModalProps> = ({
  children,
  handleClose,
  isOpen,
  icon,
  title,
  primaryButtonProps,
  secondaryButtonProps,
}) => (
  <Background handleClose={handleClose} isOpen={isOpen}>
    <div className={styles.main}>
      <ModalHeader {...{ handleClose, icon, title }} />
      <div className={styles.bodyContainer}>{children}</div>
      <ModalFooter>
        {secondaryButtonProps && <SecondaryButton {...secondaryButtonProps} />}
        {primaryButtonProps && <PrimaryButton {...primaryButtonProps} />}
      </ModalFooter>
    </div>
  </Background>
);

export default Modal;
