import { css } from 'emotion';
import * as React from 'react';

export type ButtonProps = {
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

const styles = {
  main: css({
    '&::-moz-focus-inner': {
      border: 0,
      name,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
    alignItems: 'center',
    background: 'none',
    border: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    outline: 0,
    padding: 0,
    userSelect: 'none',
  }),
};

const Button: React.SFC<ButtonProps> = ({ active = true, className, children, onClick }) => (
  <button className={css(styles.main, className)} disabled={!active} onClick={onClick}>
    {children}
  </button>
);

export default Button;
