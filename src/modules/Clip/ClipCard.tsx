import { css } from 'emotion';
import * as React from 'react';
import { animateSlideToFifty, card, downHalf } from '~/styles';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import { HttpRequest, EpisodeClip } from '../../types/index';

type ClipCardProps = {
  clip: HttpRequest<EpisodeClip>;
};

type ClipCardState = {};

const styles = {
  main: css(card, animateSlideToFifty, downHalf, {
    display: 'flex',
    overflow: 'visible',
  }),
};

class ClipCard extends React.Component<ClipCardProps, ClipCardState> {
  constructor(props: ClipCardProps) {
    super(props);

    this.state = {};
  }

  renderClipData({ stars, views }: EpisodeClip) {
    return (
      <div className={styles.main}>
        <div className="flex flex-column flex-auto left-align">
          <div className="flex">
            <div>{views} views</div>
            <div>{stars} stars</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { clip, ...rest } = this.props;
    return <FeatureCard content={clip} renderContent={this.renderClipData} {...rest} />;
  }
}

export default ClipCard;
