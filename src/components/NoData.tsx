import * as React from 'react';
import { EmoticonSadIcon } from 'mdi-react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';

type NoDataProps = {
  icon?: React.ReactNode;
  message: string;
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginBottom: 12,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colors.gray200,
    padding: 20,
    textAlign: 'center',
  }),
  message: css(fonts.text300, {
    lineHeight: 1.5,
  }),
};

const NoData: React.FC<NoDataProps> = ({ icon = <EmoticonSadIcon size={60} />, message }) => (
  <div className={styles.main}>
    {icon}
    <p className={styles.message}>{message}</p>
  </div>
);

export default NoData;
