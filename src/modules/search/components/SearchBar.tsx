import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Input from 'src/components/Input';
import { push } from 'connected-react-router';
import { SearchType } from '../types';
import { stringify } from 'querystringify';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import zIndex from 'src/styles/zIndex';
import { SearchIcon } from 'mdi-react';
import Button from 'src/components/Button';

type SearchBarProps = { className?: string; initalText?: string };

const styles = {
  main: css(fonts.text300, {
    '&:hover': {
      border: `1px solid ${colors.gray50}`,
    },
    backgroundColor: colors.gray20,
    border: `1px solid transparent`,
    borderRadius: 20,
    color: colors.gray500,
    position: 'relative',
    transition: 'border 200ms ease-out',
    zIndex: zIndex.card,
  }),
  input: css({
    '&::placeholder': {
      color: colors.gray300,
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
    borderRadius: '4px 20px 20px 4px',
    transition: 'all 500ms ease-out',
  }),
  searchButtonEnabled: css({
    '&:hover': {
      backgroundColor: colors.primary700,
    },
    backgroundColor: colors.primary500,
    color: colors.white,
  }),
};

const SearchBar: React.FC<SearchBarProps> = ({ className, initalText }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  useEffect(() => {
    if (initalText) {
      setText(initalText);
    }
  }, [initalText]);

  const canSearch = text.length > 0;
  const search = useCallback(() => {
    if (canSearch) {
      dispatch(push(`/search?${stringify({ q: text, type: SearchType.Podcasts })}`));
    }
  }, [dispatch, push, text]);

  return (
    <div className={css(styles.main, className)}>
      <Input
        className={styles.input}
        handleTextChange={setText}
        onKeyDown={e => {
          if (e.keyCode === 13 && canSearch) {
            search();
          }
        }}
        placeholder="Search for podcasts, episodes, and clips"
        value={text}
      />
      <Button
        active={canSearch}
        className={css(styles.searchButton, canSearch && styles.searchButtonEnabled)}
        onClick={search}
      >
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default SearchBar;
