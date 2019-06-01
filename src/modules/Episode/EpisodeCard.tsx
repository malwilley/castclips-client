import { css } from 'emotion';
import * as React from 'react';
import PodcastPlayer from 'src/modules/PodcastPlayer/PodcastPlayer';
import { EpisodeState } from './types';
import Card from 'src/components/Card';
import HttpContent from 'src/components/HttpContent';

type EpisodeCardProps = {
  episode: EpisodeState['metadata'];
};

const styles = {
  main: css({
    display: 'flex',
    overflow: 'visible',
    width: '100%',
    maxWidth: 700,
  }),
  success: css({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    textAlign: 'left',
  }),
};

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => (
  <Card className={styles.main} feature>
    <HttpContent
      request={episode}
      renderSuccess={episodeData => (
        <div className={styles.success}>
          <PodcastPlayer episode={episodeData} />
        </div>
      )}
    />
  </Card>
);

export default EpisodeCard;
