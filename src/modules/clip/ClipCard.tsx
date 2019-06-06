import { css } from 'emotion';
import * as React from 'react';
import { HttpRequest } from 'src/types';
import Card from 'src/components/Card';
import HttpContent from 'src/components/HttpContent';
import { ClipMetadata } from './types';
import TextSkeleton from 'src/components/TextSkeleton';
import { colors, fonts } from 'src/styles';
import { ChevronRightIcon } from 'mdi-react';
import { Link } from 'react-router-dom';
import LikeButton from './components/LikeButton';
import PlayerWithState from 'src/components/Player/PlayerWithState';

type ClipCardProps = {
  clip: HttpRequest<ClipMetadata>;
  id: string;
  likeClip: (id: string) => void;
  unlikeClip: (id: string) => void;
};

const styles = {
  bottomContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    padding: 20,
    width: '100%',
  }),
  main: css({
    overflow: 'visible',
    position: 'relative',
    width: '100%',
    maxWidth: 700,
  }),
  left: css(fonts.heading300, {
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    display: 'flex',
    alignItems: 'center',
    color: colors.secondary400,
    backgroundColor: colors.secondary20,
    borderRadius: 8,
    padding: '12px 18px',
  }),
  right: css(fonts.heading300, {
    '& > :not(:last-child)': {
      marginRight: 6,
    },
    '&:hover': {
      color: colors.gray700,
    },
    display: 'flex',
    alignItems: 'center',
    color: colors.gray500,
    padding: '6px 8px',
    transition: 'color 200ms ease-out',
  }),
};

const ClipCard: React.FC<ClipCardProps> = ({ clip, id, likeClip, unlikeClip }) => (
  <Card className={styles.main} feature>
    <HttpContent
      request={clip}
      renderFetching={() => (
        <>
          {/*<ClipPlayer clip={{ start: 0, end: 0, title: '', audio: '' }} />*/}
          <div className={styles.bottomContainer}>
            <TextSkeleton height={38} width={200} color={colors.gray50} />
          </div>
        </>
      )}
      renderSuccess={clipData => (
        <>
          <PlayerWithState
            audioUrl={`${clipData.audio}#time=${clipData.start},${clipData.end}`}
            title={clipData.title}
            start={clipData.start}
            end={clipData.end}
          />
          <div className={styles.bottomContainer}>
            <LikeButton
              {...{
                likeClip,
                unlikeClip,
                id,
                hasLiked: clipData.userHasLiked,
                numLikes: clipData.likesCount,
              }}
            />
            <Link className={styles.right} to={`/episode/${clipData.episode.id}`}>
              <span>Jump to full episode</span> <ChevronRightIcon size={18} />
            </Link>
          </div>
        </>
      )}
    />
  </Card>
);

export default ClipCard;
