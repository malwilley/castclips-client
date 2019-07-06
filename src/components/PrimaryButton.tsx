import React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import Button, { ButtonProps } from './Button';

type PrimaryButtonProps = ButtonProps;

const styles = {
  main: css(fonts.bold300, {
    '&:disabled': {
      opacity: 0.5,
    },
    '&:hover:not(:disabled)': {
      backgroundColor: colors.secondary300,
    },
    '& > svg': {
      marginLeft: 8,
    },
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    background: colors.secondary500,
    color: colors.white,
    padding: '0 20px',
    height: 42,
    minWidth: 100,
    transition: 'background-color 200ms ease-out, opacity 200ms ease-out',
  }),
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className, ...props }) => (
  <Button className={css(styles.main, className)} {...props} />
);

export default PrimaryButton;
