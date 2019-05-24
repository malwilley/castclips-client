import * as React from 'react';
import Typeahead from '~/modules/search/components/Typeahead';
import { css } from 'emotion';
import { colors } from '~/styles';

type HeaderTypeaheadProps = {};

const styles = {
  main: css({
    position: 'relative',
    height: 40,
  }),
  searchContainer: css({
    '& > svg': {
      position: 'absolute',
      right: 20,
      top: 8,
      fill: colors.lightest,
    },
    '& > input': {
      '&::placeholder': {
        color: '#ffffffaa',
      },
      padding: '0 40px 0 24px',
      color: colors.lightest,
    },
    position: 'relative',
    backgroundColor: '#ffffff33',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
