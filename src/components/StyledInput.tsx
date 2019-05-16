import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  focus?: boolean;
  handleTextChange: (text: string) => void;
  text: string;
};

const styles = {
  input: css({
    '&::placeholder': {},
    height: 42,
    border: `1px solid ${colors.gray}`,
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    padding: '0 12px',
  }),
  label: css({
    color: colors.dark,
    display: 'block',
    marginBottom: 10,
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
  const inputEl = React.useRef<HTMLInputElement>(null);
  if (focus && inputEl.current) {
    inputEl.current.focus();
  }

  return (
    <input
      className={css(styles.input, className)}
      ref={inputEl}
      onChange={e => handleTextChange(e.target.value)}
      value={text}
      {...inputProps}
    />
  );
};

export { StyledInputLabel };
export default StyledInput;
