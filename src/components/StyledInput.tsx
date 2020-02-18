import React from 'react'
import { css } from 'emotion'
import { colors, fonts } from 'styles'
import Input, { InputProps } from './Input'

type StyledInputProps = InputProps

type StyledInputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const styles = {
  input: css({
    '&::placeholder': {
      color: colors.gray200,
    },
    '&:focus': {
      border: `1px solid ${colors.tertiary100}`,
      boxShadow: `0 1px 10px ${colors.tertiary100alpha30}`,
    },
    height: 38,
    border: `1px solid ${colors.gray50}`,
    borderRadius: 4,
    width: '100%',
    padding: '0 12px',
    transition: 'all 200ms ease-out',
    ...fonts.text250,
  }),
  label: css({
    ...fonts.bold300,
    display: 'block',
    marginBottom: 6,
  }),
}

const StyledInputLabel: React.FC<StyledInputLabelProps> = ({ children, htmlFor }) => (
  <label className={styles.label} htmlFor={htmlFor}>
    {children}
  </label>
)

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
  )
}

export { StyledInputLabel }
export default StyledInput
