import * as React from 'react';
import { EmoticonSadIcon } from 'mdi-react';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginBottom: 12,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colors.gray,
    padding: 20,
    textAlign: 'center',
  }),
};

const PodcastClipsNoData: React.FC = () => (
  <div className={styles.main}>
    <EmoticonSadIcon size={60} />
    <p>No one has made any clips for this podcast yet. Be the first!</p>
  </div>
);

export default PodcastClipsNoData;
