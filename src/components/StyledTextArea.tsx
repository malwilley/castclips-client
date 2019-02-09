import * as React from 'react';
import { css } from 'emotion';
import { colors, fontFamily } from '~/styles';

type StyledInputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  handleTextChange: (text: string) => void;
  text: string;
};

const styles = {
  textArea: css({
    '&::placeholder': {},
    height: 120,
    border: `1px solid ${colors.gray}`,
    borderRadius: 4,
    fontSize: 14,
    resize: 'none',
    width: '100%',
    padding: 12,
  }),
  label: css({
    color: colors.dark,
    display: 'block',
    fontFamily: fontFamily.titleFont,
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
