import { css } from 'emotion';
import * as React from 'react';
import { animateSlideToFifty, card, downHalf } from '~/styles';
import FeatureCard from '~/components/FeatureCard/FeatureCard';
import PodcastPlayer from '~/modules/PodcastPlayer/PodcastPlayer';
import { EpisodeState, EpisodeMetadata } from './types';

type EpisodeCardProps = {
  episode: EpisodeState['metadata'];
};

type EpisodeCardState = {};

const styles = {
  main: css(card, animateSlideToFifty, downHalf, {
    display: 'flex',
    overflow: 'visible',
  }),
};

class EpisodeCard extends React.Component<EpisodeCardProps, EpisodeCardState> {
  constructor(props: EpisodeCardProps) {
    super(props);

    this.state = {};
  }

  renderEpisodeData(episode: EpisodeMetadata) {
    return (
      <div className={styles.main}>
        <div className="flex flex-column flex-auto left-align">
          <PodcastPlayer episode={episode} />
        </div>
      </div>
    );
  }

  render() {
    const { episode, ...rest } = this.props;
    return (
      <FeatureCard content={episode} renderContent={e => this.renderEpisodeData(e)} {...rest} />
    );
  }
}

export default EpisodeCard;
