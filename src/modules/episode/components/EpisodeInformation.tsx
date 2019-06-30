import * as React from 'react';
import { EpisodeState } from '../types';
import Card from 'src/components/Card';
import HttpContent from 'src/components/HttpContent';
import { CalendarClockIcon, CalendarDayIcon, ClockOutlineIcon } from 'mdi-react';
import formatPublishDate from 'src/utils/formatPublishDate';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import ParagraphSkeleton from 'src/components/ParagraphSkeleton';
import formatAudioLength from 'src/utils/formatClipLength';
import formatMinutes from 'src/utils/formatMinutes';

type EpisodeInformationProps = {
  episodeMetadata: EpisodeState['metadata'];
};

const styles = {
  main: css({
    '& > :not(:last-child)': {
      marginBottom: 12,
    },
  }),
  item: css(fonts.text300, {
    display: 'flex',
    alignItems: 'center',
    color: colors.gray700,
  }),
  icon: css({
    '& > svg': {
      height: 16,
      width: 16,
    },
    color: colors.secondary500,
    backgroundColor: colors.secondary50,
    height: 30,
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: '50%',
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
  <HttpContent
    request={episodeMetadata}
    renderFetching={() => <ParagraphSkeleton />}
    renderSuccess={({ audioLength, published }) => (
      <div className={styles.main}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <CalendarDayIcon />
          </div>
          {`Published ${formatPublishDate(published)}`}
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <ClockOutlineIcon />
          </div>
          {formatMinutes(audioLength)}
        </div>
      </div>
    )}
  />
);

export default EpisodeInformation;
