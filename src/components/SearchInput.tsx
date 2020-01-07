import React from 'react'
import SearchIcon from 'mdi-react/SearchIcon'
import { css } from 'emotion'
import StyledInput from './StyledInput'
import { InputProps } from './Input'
import { colors } from 'styles'

type SearchInputProps = InputProps

const styles = {
  main: css({
    position: 'relative',
    width: '100%',
  }),
  icon: css({
    position: 'absolute',
    left: 6,
    top: 0,
    width: '2.25rem',
    height: '2.25rem',
    padding: '0.5rem',
    fill: colors.gray100,
  }),
  input: css({
    height: '2.25rem',
    borderRadius: '1.125rem',
    width: '100%',
    padding: '0 1rem 0 2.5rem',
    border: `1px solid ${colors.gray80}`,
  }),
}

const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => (
  <div className={css(styles.main, className)}>
    <SearchIcon className={styles.icon} />
    <StyledInput className={styles.input} {...props} />
  </div>
)

export default SearchInput
