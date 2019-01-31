import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  main: css({
    color: colors.tertiary,
    display: 'inline-block',
    marginLeft: 2,
  }),
};

const Asterisk: React.SFC = () => <div className={styles.main}>*</div>;

export default Asterisk;