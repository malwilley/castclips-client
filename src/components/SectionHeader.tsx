import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type SectionHeaderProps = {
  className?: string;
  light?: boolean;
};

const styles = {
  main: css({
    color: colors.dark,
    marginBottom: 10,
  }),
  text: css({
    marginBottom: 4,
  }),
  underline: css({
    backgroundColor: colors.tertiary,
    height: 4,
    width: 40,
  }),
  light: css({
    color: colors.light,
  }),
};

const SectionHeader: React.SFC<SectionHeaderProps> = ({ children, className, light }) => (
  <div className={css(styles.main, light && styles.light, className)}>
    <h6 className={styles.text}>{children}</h6>
    <div className={styles.underline} />
  </div>
);

export default SectionHeader;
