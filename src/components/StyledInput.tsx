import * as React from 'react';
import { css } from 'emotion';
import { colors, fontFamily } from '~/styles';

type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
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
    fontFamily: fontFamily.titleFont,
    marginBottom: 10,
  }),
};

const StyledInputLabel: React.SFC = ({ children }) => (
  <label className={styles.label}>{children}</label>
);

const StyledInput: React.SFC<StyledInputProps> = ({
  className,
  handleTextChange,
  text,
  ...inputProps
}) => (
  <input
    className={css(styles.input, className)}
    onChange={e => handleTextChange(e.target.value)}
    value={text}
    {...inputProps}
  />
);

export { StyledInputLabel };
export default StyledInput;