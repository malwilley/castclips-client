import React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import Button, { ButtonProps } from './Button';

type PrimaryButtonProps = ButtonProps;

const styles = {
  main: css(fonts.heading300, {
    '&:disabled': {
      opacity: 0.5,
    },
    '&:hover:not(:disabled)': {
      backgroundColor: colors.primary700,
    },
    '& > svg': {
      marginLeft: 8,
    },
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    background: colors.primary500,
    color: colors.lightest,
    padding: '0 20px',
    height: 42,
    transition: 'background-color 200ms ease-out, opacity 200ms ease-out',
  }),
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className, ...props }) => (
  <Button className={css(styles.main, className)} {...props} />
);

export default PrimaryButton;
