import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    height: 60,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 16px',
  }),
};

const Footer: React.SFC = ({ children }) => <div className={styles.main}>{children}</div>;

export default Footer;
