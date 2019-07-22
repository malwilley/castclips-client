import React, { useCallback } from 'react';
import { SearchType } from '../types';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import Button from 'src/components/Button';
import AccessibleLabel from 'src/components/AccessibleLabel';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { LocalStorageKey } from 'src/types';
import useChangeQueryParam from 'src/hooks/useChangeQueryParam';

type SearchTypeSwitchProps = {
  className?: string;
  type?: SearchType;
};

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
};

const SearchTypeOption: React.FC<{
  type: SearchType;
  selected: SearchType;
  setSearch: (searchType: SearchType) => void;
}> = ({ children, selected, setSearch, type }) => (
  <Button
    aria-labelledby={`${type}-switch-label`}
    className={css(styles.option, type === selected && styles.optionSelected)}
    onClick={() => setSearch(type)}
  >
    <AccessibleLabel id={`${type}-switch-label`}>Search {type}s</AccessibleLabel>
    {children}
  </Button>
);

const SearchTypeSwitch: React.FC<SearchTypeSwitchProps> = ({
  className,
  type = SearchType.Podcasts,
}) => {
  const changeQueryParam = useChangeQueryParam();
  const setSearchType = (searchType: SearchType) => {
    changeQueryParam('type', searchType);
  };

  return (
    <div className={css(styles.main, className)}>
      <SearchTypeOption selected={type} setSearch={setSearchType} type={SearchType.Podcasts}>
        Podcasts
      </SearchTypeOption>
      <SearchTypeOption selected={type} setSearch={setSearchType} type={SearchType.Episodes}>
        Episodes
      </SearchTypeOption>
      <SearchTypeOption selected={type} setSearch={setSearchType} type={SearchType.Clips}>
        Clips
      </SearchTypeOption>
    </div>
  );
};

export default SearchTypeSwitch;
