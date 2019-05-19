import * as React from 'react';
import { SearchType } from '../types';
import { css } from 'emotion';
import { colors } from '~/styles';
import Button from '~/components/Button';

type SearchTypeSwitchProps = {
  className?: string;
  setSearch: (params: { query?: string; type?: SearchType }) => void;
  type?: SearchType;
};

const styles = {
  main: css({
    display: 'inline-flex',
    backgroundColor: colors.gray50,
    height: 50,
    borderRadius: 25,
  }),
  option: css({
    color: colors.gray200,
    padding: '0 30px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderRadius: 25,
    fontSize: 13,
    letterSpacing: 1,
  }),
  optionSelected: css({
    color: colors.gray600,
    backgroundColor: colors.lightest,
  }),
};

const SearchTypeOption: React.FC<{
  type: SearchType;
  selected: SearchType;
  setSearch: SearchTypeSwitchProps['setSearch'];
}> = ({ children, selected, setSearch, type }) => (
  <Button
    className={css(styles.option, type === selected && styles.optionSelected)}
    onClick={() => setSearch({ type })}
  >
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
