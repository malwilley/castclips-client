import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  main: css({
    backgroundColor: colors.gray50,
  }),
  content: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    color: colors.gray300,
  }),
};

const Footer: React.FC = () => (
  <div className={styles.main}>
    <div className={styles.content}>Footer</div>
  </div>
);

export default Footer;
