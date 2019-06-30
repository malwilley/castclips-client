import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';
import Input from './Input';

type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  focus?: boolean;
  handleTextChange: (text: string) => void;
  text: string;
};

const styles = {
  input: css({
    '&::placeholder': {
      color: colors.gray300,
    },
    '&:focus': {
      border: `1px solid ${colors.tertiary100}`,
    },
    height: 42,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    padding: '0 12px',
    transition: 'border 300ms ease-out',
  }),
  label: css({
    color: colors.gray600,
    display: 'block',
    marginBottom: 10,
    fontWeight: 'bold',
  }),
};

const StyledInputLabel: React.SFC = ({ children }) => (
  <label className={styles.label}>{children}</label>
);

const StyledInput: React.SFC<StyledInputProps> = ({
  className,
  focus = false,
  handleTextChange,
  text,
  ...inputProps
}) => {
  return (
    <Input
      className={css(styles.input, className)}
      handleTextChange={handleTextChange}
      value={text}
      {...inputProps}
    />
  );
};

export { StyledInputLabel };
export default StyledInput;
