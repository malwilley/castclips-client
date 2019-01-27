import { css } from 'emotion';
import * as React from 'react';
import { animateSlideToFifty, card, downHalf } from '~/styles';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import { HttpRequest, EpisodeClip } from '../../types/index';
import { fontFamily } from '~/styles/text';
import ClipPlayer from '~/modules/Clip/ClipPlayer';

type ClipCardProps = {
  clip: HttpRequest<EpisodeClip>;
};

const styles = {
  bigText: css({
    fontFamily: fontFamily.titleFont,
    fontSize: 28,
    fontWeight: 'bold',
  }),
  smallText: css({
    fontSize: 16,
  }),
  bottomContainer: css({
    display: 'flex',
    marginTop: 60,
    padding: 20,
  }),
  main: css(card, animateSlideToFifty, downHalf, {
    display: 'flex',
    overflow: 'visible',
  }),
  playbackSlider: css({
    position: 'absolute',
    top: -5,
    left: 2,
    right: 2,
  }),
};

class ClipCard extends React.Component<ClipCardProps> {
  renderClipData = (clip: EpisodeClip) => {
    const { stars, views } = clip;
    return (
      <div className={styles.main}>
        <ClipPlayer clip={clip} />
        <div className={styles.bottomContainer}>
          <div>
            <span className={styles.bigText}>{views} </span>
            <span className={styles.smallText}>views</span>
          </div>
          <div>
            <span className={styles.bigText}>{stars} </span>
            <span className={styles.smallText}>stars</span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { clip } = this.props;
    return <FeatureCard content={clip} renderContent={this.renderClipData} />;
  }
}

export default ClipCard;
