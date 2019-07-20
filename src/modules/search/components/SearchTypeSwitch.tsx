import * as React from 'react';
import { SearchType } from '../types';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import Button from 'src/components/Button';
import AccessibleLabel from 'src/components/AccessibleLabel';

type SearchTypeSwitchProps = {
  className?: string;
  setSearch: (params: { query?: string; type?: SearchType }) => void;
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
    color: colors.gray200,
    padding: '0 1.25rem',
    textTransform: 'uppercase',
    borderRadius: 25,
    letterSpacing: '0.05em',
  }),
  optionSelected: css({
    background: colors.gradient,
    color: colors.white,
  }),
};

const SearchTypeOption: React.FC<{
  type: SearchType;
  selected: SearchType;
  setSearch: SearchTypeSwitchProps['setSearch'];
}> = ({ children, selected, setSearch, type }) => (
  <Button
    aria-labelledby={`${type}-switch-label`}
    className={css(styles.option, type === selected && styles.optionSelected)}
    onClick={() => setSearch({ type })}
  >
    <AccessibleLabel id={`${type}-switch-label`}>Search {type}s</AccessibleLabel>
    {children}
  </Button>
);

const SearchTypeSwitch: React.FC<SearchTypeSwitchProps> = ({
  className,
  setSearch,
  type = SearchType.Podcasts,
}) => (
  <div className={css(styles.main, className)}>
    <SearchTypeOption selected={type} setSearch={setSearch} type={SearchType.Podcasts}>
      Podcasts
    </SearchTypeOption>
    <SearchTypeOption selected={type} setSearch={setSearch} type={SearchType.Episodes}>
      Episodes
    </SearchTypeOption>
    <SearchTypeOption selected={type} setSearch={setSearch} type={SearchType.Clips}>
      Clips
    </SearchTypeOption>
  </div>
);

export default SearchTypeSwitch;
