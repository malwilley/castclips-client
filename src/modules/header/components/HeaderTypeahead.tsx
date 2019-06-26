import * as React from 'react';
import Typeahead from 'src/modules/search/components/Typeahead';
import { css } from 'emotion';
import { colors } from 'src/styles';

type HeaderTypeaheadProps = {};

const styles = {
  main: css({
    position: 'relative',
    height: 50,
  }),
  searchContainer: css({
    '& > svg': {
      position: 'absolute',
      right: 20,
      top: 12,
      fill: colors.gray300,
    },
    '& > input': {
      '&::placeholder': {
        color: colors.gray300,
      },
      padding: '0 40px 0 24px',
      color: colors.gray500,
    },
    position: 'relative',
    backgroundColor: colors.gray20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: '100%',
    height: '100%',
    transiton: 'background-color 300ms ease-out',
  }),
  suggestionContainer: css({
    top: 40,
  }),
};

const HeaderTypeahead: React.FC<HeaderTypeaheadProps> = () => (
  <Typeahead
    className={styles.main}
    searchContainerClassName={styles.searchContainer}
    suggestionContainerClassName={styles.suggestionContainer}
  />
);

export default HeaderTypeahead;
