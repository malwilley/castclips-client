import * as React from 'react';
import { EpisodeState } from '../types';
import Card from 'src/components/Card';
import HttpContent from 'src/components/HttpContent';
import { CalendarClockIcon } from 'mdi-react';
import formatPublishDate from 'src/utils/formatPublishDate';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';

type EpisodeInformationProps = {
  episodeMetadata: EpisodeState['metadata'];
};

const styles = {
  main: css({
    display: 'flex',
    padding: 20,
    alignItems: 'flex-start',
  }),
  thumbnail: css({
    height: '4rem',
    width: '4rem',
    borderRadius: 8,
    marginRight: '1rem',
  }),
  text: css(fonts.heading300, {
    '& > :first-child': {
      marginRight: '0.5em',
    },
    display: 'flex',
    alignItems: 'center',
    color: colors.gray600,
  }),
};

const EpisodeInformation: React.FC<EpisodeInformationProps> = ({ episodeMetadata }) => (
  <Card>
    <HttpContent
      request={episodeMetadata}
      renderSuccess={({ published, thumbnail }) => (
        <div className={styles.main}>
          <img className={styles.thumbnail} src={thumbnail} />
          <div className={styles.text}>
            <CalendarClockIcon size="1.2em" /> {`Published ${formatPublishDate(published)}`}
          </div>
        </div>
      )}
    />
  </Card>
);

export default EpisodeInformation;
