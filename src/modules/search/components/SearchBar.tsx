import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Input from 'components/Input'
import { push } from 'connected-react-router'
import { stringify } from 'querystringify'
import { css } from 'emotion'
import { colors, fonts, breakpoints } from 'styles'
import zIndex from 'styles/zIndex'
import SearchIcon from 'mdi-react/SearchIcon'
import Button from 'components/Button'
import AccessibleLabel from 'components/AccessibleLabel'
import { KeyCode } from 'types'

type SearchBarProps = { className?: string; initialText?: string }

const styles = {
  main: css(fonts.text250, breakpoints.breakpoint600(fonts.text300), {
    '&:hover': {
      backgroundColor: colors.white,
      border: `1px solid ${colors.gray50}`,
    },
    '&:focus-within': {
      backgroundColor: colors.white,
      border: `1px solid ${colors.tertiary100}`,
      boxShadow: `0 0 0 5px ${colors.tertiary100alpha30}`,
    },
    backgroundColor: colors.gray20,
    border: `1px solid transparent`,
    borderRadius: 20,
    color: colors.gray700,
    position: 'relative',
    transition: 'box-shadow 200ms ease-out, background-color 200ms ease-out, border 200ms ease-out',
    zIndex: zIndex.card,
  }),
  input: css({
    '&::placeholder': {
      color: colors.gray400,
    },
    border: 'none',
    background: 'none',
    height: 40,
    width: '100%',
    padding: '0 64px 0 24px',
  }),
  searchButton: css({
    '&:disabled': {
      cursor: 'default',
    },
    position: 'absolute',
    right: -1,
    top: -1,
    height: 42,
    width: 60,
    borderRadius: '0 20px 20px 0',
    transition: 'all 500ms ease-out',
  }),
  searchButtonEnabled: css({
    '&:hover': {
      backgroundColor: colors.secondary500,
    },
    backgroundColor: colors.secondary300,
    color: colors.white,
    transition: 'all 200ms ease-out',
  }),
}

const SearchBar: React.FC<SearchBarProps> = ({ className, initialText }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState(initialText || '')
  useEffect(() => {
    if (initialText) {
      setText(initialText)
    }
  }, [initialText])

  const canSearch = text.length > 0
  const search = useCallback(() => {
    if (canSearch) {
      dispatch(push(`/search?${stringify({ q: text })}`))
    }
  }, [canSearch, dispatch, text])

  return (
    <div className={css(styles.main, className)}>
      <AccessibleLabel id="search-label">Search</AccessibleLabel>
      <Input
        aria-labelledby="search-label"
        className={styles.input}
        handleTextChange={setText}
        onKeyDown={(e) => {
          if (e.keyCode === KeyCode.Enter && canSearch) {
            search()
          }
        }}
        placeholder="Search for podcasts, episodes, and clips"
        role="search"
        type="text"
        value={text}
      />
      <Button
        active={canSearch}
        aria-labelledby="submit-label"
        className={css(styles.searchButton, canSearch && styles.searchButtonEnabled)}
        onClick={search}
      >
        <AccessibleLabel id="submit-label">Submit</AccessibleLabel>
        <SearchIcon aria-hidden size={20} />
      </Button>
    </div>
  )
}

export default SearchBar
