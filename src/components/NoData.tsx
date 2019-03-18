import * as React from 'react';
import { EmoticonSadIcon } from 'mdi-react';
import { css } from 'emotion';
import { colors } from '~/styles';

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
    color: colors.gray700,
    padding: 20,
    textAlign: 'center',
  }),
};

const NoData: React.FC<NoDataProps> = ({ icon = <EmoticonSadIcon size={60} />, message }) => (
  <div className={styles.main}>
    {icon}
    <p>{message}</p>
  </div>
);

export default NoData;
