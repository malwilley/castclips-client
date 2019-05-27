import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  main: css({
    marginTop: 100,
  }),
  content: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    color: colors.gray300,
  }),
  separator: css({
    height: 1,
    backgroundColor: colors.gray50,
  }),
};

const Footer: React.FC = () => (
  <div className={styles.main}>
    <div className={styles.separator} />
    <div className={styles.content}>Footer</div>
  </div>
);

export default Footer;
