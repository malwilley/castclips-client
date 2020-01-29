import React from 'react'
import { css } from 'emotion'
import { colors, fonts } from 'styles'

type StyledInputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  handleTextChange: (text: string) => void
  text: string
}

const styles = {
  textArea: css({
    '&::placeholder': {
      color: colors.gray200,
    },
    '&:focus': {
      border: `1px solid ${colors.tertiary100}`,
      boxShadow: `0 1px 10px ${colors.tertiary100alpha30}`,
    },
    height: 120,
    border: `1px solid ${colors.gray50}`,
    borderRadius: 4,
    resize: 'none',
    width: '100%',
    padding: 12,
    transition: 'all 300ms ease-out',
    ...fonts.text250,
  }),
  label: css({
    ...fonts.bold300,
    display: 'block',
    marginBottom: 6,
  }),
}

const StyledTextAreaLabel: React.SFC = ({ children }) => (
  <label className={styles.label}>{children}</label>
)

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
)

export { StyledTextAreaLabel }
export default StyledTextArea
