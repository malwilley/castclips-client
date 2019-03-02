import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  main: css({
    '& > *': {
      backgroundColor: colors.light,
      borderRadius: 8,
    },
  }),
  title: css({
    height: 40,
    width: 400,
    marginBottom: 6,
    opacity: 0.6,
  }),
  subTitle: css({
    height: 20,
    width: 300,
    opacity: 0.4,
  }),
};

const PageTitleFetching: React.FC = () => (
  <div className={styles.main}>
    <div className={styles.title} />
    <div className={styles.subTitle} />
  </div>
);

export default PageTitleFetching;
