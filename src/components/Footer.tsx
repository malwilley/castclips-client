import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
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
  <div>
    <div className={styles.separator} />
    <div className={styles.content}>Footer</div>
  </div>
);

export default Footer;
