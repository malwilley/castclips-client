import { css } from 'emotion';
import * as React from 'react';
import { HttpRequest } from '~/types';
import { fontFamily } from '~/styles/text';
import ClipPlayer from '~/modules/Clip/ClipPlayer';
import Card from '~/components/Card';
import HttpContent from '~/components/HttpContent';
import { ClipMetadata } from './types';

type ClipCardProps = {
  clip: HttpRequest<ClipMetadata>;
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
  main: css({
    display: 'flex',
    overflow: 'visible',
    position: 'relative',
    width: 700,
  }),
  playbackSlider: css({
    position: 'absolute',
    top: -5,
    left: 2,
    right: 2,
  }),
};

const ClipCard: React.FC<ClipCardProps> = ({ clip }) => (
  <Card className={styles.main}>
    <HttpContent
      request={clip}
      renderSuccess={clipData => (
        <>
          <ClipPlayer clip={clipData} />
          <div className={styles.bottomContainer}>
            <div>
              <span className={styles.bigText}>{clipData.views} </span>
              <span className={styles.smallText}>views</span>
            </div>
            <div>
              <span className={styles.bigText}>{clipData.stars} </span>
              <span className={styles.smallText}>stars</span>
            </div>
          </div>
        </>
      )}
    />
  </Card>
);

export default ClipCard;
