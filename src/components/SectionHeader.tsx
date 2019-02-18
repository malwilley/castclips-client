import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type SectionHeaderProps = {
  className?: string;
};

const styles = {
  text: css({
    marginBottom: 4,
  }),
  underline: css({
    backgroundColor: colors.tertiary,
    height: 4,
    width: 40,
  }),
};

const SectionHeader: React.SFC<SectionHeaderProps> = ({ children, className }) => (
  <div className={className}>
    <h6 className={styles.text}>{children}</h6>
    <div className={styles.underline} />
  </div>
);

export default SectionHeader;
