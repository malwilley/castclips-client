import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';

type StyledInputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  handleTextChange: (text: string) => void;
  text: string;
};

const styles = {
  textArea: css({
    '&::placeholder': {
      color: colors.gray300,
    },
    '&:focus': {
      border: `1px solid ${colors.tertiary100}`,
      boxShadow: `0 1px 10px ${colors.tertiary100alpha30}`,
    },
    height: 120,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 8,
    fontSize: 14,
    resize: 'none',
    width: '100%',
    padding: 12,
    transition: 'all 300ms ease-out',
  }),
  label: css({
    color: colors.gray600,
    display: 'block',
    marginBottom: 10,
  }),
};

const StyledTextAreaLabel: React.SFC = ({ children }) => (
  <label className={styles.label}>{children}</label>
);

const StyledTextArea: React.SFC<StyledInputProps> = ({
  className,
  handleTextChange,
  text,
  ...inputProps
}) => (
  <textarea
    className={css(styles.textArea, className)}
    onChange={e => handleTextChange(e.target.value)}
    value={text}
    {...inputProps}
  />
);

export { StyledTextAreaLabel };
export default StyledTextArea;
