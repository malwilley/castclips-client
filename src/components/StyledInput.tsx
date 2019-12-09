import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'styles';
import Input, { InputProps } from './Input';

type StyledInputProps = InputProps;

type StyledInputLabelProps = {
  htmlFor: string;
};

const styles = {
  input: css({
    '&::placeholder': {
      color: colors.gray300,
    },
    '&:focus': {
      border: `1px solid ${colors.tertiary100}`,
      boxShadow: `0 1px 10px ${colors.tertiary100alpha30}`,
    },
    height: 42,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    padding: '0 12px',
    transition: 'all 200ms ease-out',
  }),
  label: css({
    color: colors.gray600,
    display: 'block',
    marginBottom: 10,
    fontWeight: 'bold',
  }),
};

const StyledInputLabel: React.FC<StyledInputLabelProps> = ({ children, htmlFor }) => (
  <label className={styles.label} htmlFor={htmlFor}>
    {children}
  </label>
);

const StyledInput: React.FC<StyledInputProps> = ({
  className,
  handleTextChange,
  ...inputProps
}) => {
  return (
    <Input
      className={css(styles.input, className)}
      handleTextChange={handleTextChange}
      {...inputProps}
    />
  );
};

export { StyledInputLabel };
export default StyledInput;
