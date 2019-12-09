import * as React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'styles';

type SectionHeaderProps = {
  className?: string;
  light?: boolean;
  top?: boolean;
};

const styles = {
  main: css({
    color: colors.gray700,
    marginBottom: '1rem',
    marginTop: '2rem',
  }),
  text: css(fonts.heading100, {
    letterSpacing: '0.1em',
    marginBottom: 4,
    textTransform: 'uppercase',
  }),
  underline: css({
    backgroundColor: colors.tertiary100,
    height: 3,
    width: 40,
    borderRadius: 2,
  }),
  light: css({
    color: colors.white,
  }),
  top: css({
    marginTop: '2rem',
  }),
};

const SectionHeader: React.SFC<SectionHeaderProps> = ({ children, className, light, top }) => (
  <div className={css(styles.main, light && styles.light, top && styles.top, className)}>
    <h2 className={styles.text}>{children}</h2>
    <div className={styles.underline} />
  </div>
);

export default SectionHeader;
