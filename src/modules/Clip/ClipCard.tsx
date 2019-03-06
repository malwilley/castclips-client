import { css } from 'emotion';
import * as React from 'react';
import { HttpRequest } from '~/types';
import { fontFamily } from '~/styles/text';
import ClipPlayer from '~/modules/Clip/ClipPlayer';
import Card from '~/components/Card';
import HttpContent from '~/components/HttpContent';
import { ClipMetadata } from './types';
import CopyLink from '~/components/CopyLink';

type ClipCardProps = {
  clip: HttpRequest<ClipMetadata>;
  id: string;
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 60,
    padding: 20,
    width: '100%',
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
  leftContainer: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    display: 'flex',
    alignItems: 'center',
  }),
  shareContainer: css({
    display: 'flex',
    alignItems: 'center',
  }),
  linkCopy: css({
    width: 200,
  }),
};

const ClipCard: React.FC<ClipCardProps> = ({ clip, id }) => (
  <Card className={styles.main}>
    <HttpContent
      request={clip}
      renderSuccess={clipData => (
        <>
          <ClipPlayer clip={clipData} />
          <div className={styles.bottomContainer}>
            <div className={styles.leftContainer}>
              <div>
                <span className={styles.bigText}>{clipData.views} </span>
                <span className={styles.smallText}>views</span>
              </div>
              <div>
                <span className={styles.bigText}>{clipData.stars} </span>
                <span className={styles.smallText}>stars</span>
              </div>
            </div>
            <div className={styles.shareContainer} />
          </div>
        </>
      )}
    />
  </Card>
);

export default ClipCard;
