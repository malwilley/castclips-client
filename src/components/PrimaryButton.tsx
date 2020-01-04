import React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'styles';
import Button, { ButtonProps } from './Button';

export type PrimaryButtonProps = ButtonProps & {
  destructive?: boolean;
};

const styles = {
  main: css(fonts.bold300, {
    '&:disabled': {
      opacity: 0.5,
    },
    '&:hover:not(:disabled)': {
      backgroundColor: colors.secondary500,
    },
    '& > svg': {
      marginLeft: 8,
    },
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    background: colors.secondary300,
    color: colors.white,
    padding: '0 20px',
    height: 42,
    minWidth: 100,
    transition: 'background-color 200ms ease-out, opacity 200ms ease-out',
  }),
  destructive: css({
    '&:hover:not(:disabled)': {
      backgroundColor: colors.red500,
    },
    backgroundColor: colors.red400,
  }),
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  destructive = false,
  ...props
}) => (
  <Button className={css(styles.main, destructive && styles.destructive, className)} {...props} />
);

export default PrimaryButton;
