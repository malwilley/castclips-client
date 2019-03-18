import { css } from 'emotion';
import * as React from 'react';
import PodcastPlayer from '~/modules/PodcastPlayer/PodcastPlayer';
import { EpisodeState } from './types';
import Card from '~/components/Card';
import HttpContent from '~/components/HttpContent';

type EpisodeCardProps = {
  episode: EpisodeState['metadata'];
};

const styles = {
  main: css({
    display: 'flex',
    overflow: 'visible',
    width: 700,
  }),
};

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => (
  <Card className={styles.main} feature>
    <HttpContent
      request={episode}
      renderSuccess={episodeData => (
        <div className="flex flex-column flex-auto left-align">
          <PodcastPlayer episode={episodeData} />
        </div>
      )}
    />
  </Card>
);

export default EpisodeCard;
