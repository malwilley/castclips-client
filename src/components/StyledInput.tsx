import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';

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
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
    fontSize: 14,
    width: '100%',
    padding: '0 12px',
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
  const inputEl = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (focus && inputEl.current) {
      inputEl.current.focus();
    }
  }, [focus, inputEl]);

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
