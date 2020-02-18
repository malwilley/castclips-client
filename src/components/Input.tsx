import React, { useCallback } from 'react'
import useFocus from 'hooks/useFocus'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Partial<{
    handleTextChange: (text: string) => void
    focus?: boolean
  }>

const Input: React.FC<InputProps> = ({ handleTextChange, focus = false, ...props }) => {
  const ref = useFocus<HTMLInputElement>(focus)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleTextChange && handleTextChange(e.target.value)
    },
    [handleTextChange]
  )

  return <input ref={ref} onChange={onChange} {...props} />
}

export default Input
