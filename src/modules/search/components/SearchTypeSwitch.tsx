import React from 'react'
import { SearchType } from '../types'
import { css } from 'emotion'
import { colors, fonts } from 'styles'
import AccessibleLabel from 'components/AccessibleLabel'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { stringify, parse } from 'querystringify'

type SearchTypeSwitchProps = {
  className?: string
  type?: SearchType
}

const styles = {
  main: css({
    display: 'inline-flex',
    backgroundColor: colors.gray20,
    height: 50,
    borderRadius: 25,
  }),
  option: css(fonts.bold200, {
    '@media (min-width: 430px)': {
      ...fonts.bold250,
      padding: '0 2rem',
    },
    '&:hover': {
      color: colors.gray700,
    },
    color: colors.gray200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 1.25rem',
    textTransform: 'uppercase',
    borderRadius: 25,
    letterSpacing: '0.05em',
    transition: 'color 250ms ease-out',
  }),
  optionSelected: css({
    '&:hover': {
      color: colors.white,
    },
    cursor: 'default',
    background: colors.gradient,
    color: colors.white,
  }),
}

const SearchTypeOption: React.FC<{
  type: SearchType
  selected: SearchType
}> = ({ children, selected, type }) => {
  const { pathname, search } = useLocation()
  const params = parse(search)

  return (
    <Link
      aria-labelledby={`${type}-switch-label`}
      className={css(styles.option, type === selected && styles.optionSelected)}
      to={`${pathname}${stringify({ ...params, type }, true)}`}
    >
      <AccessibleLabel id={`${type}-switch-label`}>Search {type}s</AccessibleLabel>
      {children}
    </Link>
  )
}

const SearchTypeSwitch: React.FC<SearchTypeSwitchProps> = ({
  className,
  type = SearchType.Podcasts,
}) => (
  <div className={css(styles.main, className)}>
    <SearchTypeOption selected={type} type={SearchType.Podcasts}>
      Podcasts
    </SearchTypeOption>
    <SearchTypeOption selected={type} type={SearchType.Episodes}>
      Episodes
    </SearchTypeOption>
    <SearchTypeOption selected={type} type={SearchType.Clips}>
      Clips
    </SearchTypeOption>
  </div>
)

export default SearchTypeSwitch
