import React from 'react'
import { css } from 'emotion'

type SelectOption<T> = {
  label: string
  value: T
}

type SelectProps<T extends string> = {
  className?: string
  handleSelectionChange: (val: T) => void
  options: SelectOption<T>[]
  value: T
}

const styles = {
  main: css({}),
}

const Select = <T extends string>({
  className,
  handleSelectionChange,
  options,
  value,
}: SelectProps<T>) => (
  <select
    className={css(styles.main, className)}
    onChange={e => {
      handleSelectionChange(e.target.value as T)
    }}
    value={value}
  >
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
)

export default Select
