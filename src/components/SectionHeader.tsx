import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';

type SectionHeaderProps = {
  className?: string;
  light?: boolean;
  top?: boolean;
};

const styles = {
  main: css({
    color: colors.gray800,
    marginBottom: '1rem',
  }),
  text: css({
    marginBottom: 4,
  }),
  underline: css({
    backgroundColor: colors.tertiary100,
    height: 3,
    width: 40,
    borderRadius: 2,
  }),
  light: css({
    color: colors.lightest,
  }),
  top: css({
    marginTop: '2rem',
  }),
};

const SectionHeader: React.SFC<SectionHeaderProps> = ({ children, className, light, top }) => (
  <div className={css(styles.main, light && styles.light, top && styles.top, className)}>
    <h6 className={styles.text}>{children}</h6>
    <div className={styles.underline} />
  </div>
);

export default SectionHeader;
