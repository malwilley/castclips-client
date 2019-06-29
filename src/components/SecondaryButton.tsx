import React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import Button, { ButtonProps } from './Button';

type SecondaryButtonProps = ButtonProps;

const secondaryButtonStyles = css(fonts.heading300, {
  '&:disabled': {
    opacity: 0.5,
  },
  '&:hover:not(:disabled)': {
    backgroundColor: colors.secondary10,
  },
  '& > svg': {
    marginLeft: 8,
  },
  alignItems: 'center',
  border: `1px solid ${colors.gray50}`,
  borderRadius: 8,
  display: 'flex',
  color: colors.secondary500,
  padding: '0 20px',
  height: 42,
  minWidth: 100,
  transition: 'background-color 200ms ease-out, opacity 200ms ease-out',
});

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ className, ...props }) => (
  <Button className={css(secondaryButtonStyles, className)} {...props} />
);

export { secondaryButtonStyles };
export default SecondaryButton;
