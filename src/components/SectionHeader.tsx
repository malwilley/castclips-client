import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type SectionHeaderProps = {
  className?: string;
};

const styles = {
  underline: css({
    backgroundColor: colors.tertiary,
    height: 4,
    width: 40,
  }),
};

const SectionHeader: React.SFC<SectionHeaderProps> = ({ children, className }) => (
  <>
    <h6 className={className}>{children}</h6>
    <div className={styles.underline} />
  </>
);

export default SectionHeader;
