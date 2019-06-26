import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    height: 80,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.gray20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 20px',
  }),
};

const Footer: React.SFC = ({ children }) => <div className={styles.main}>{children}</div>;

export default Footer;
