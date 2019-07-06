import { css } from 'emotion';
import React, { useEffect } from 'react';
import { HttpRequest } from 'src/types';
import Card from 'src/components/Card';
import HttpContent from 'src/components/HttpContent';
import { ClipMetadata } from './types';
import TextSkeleton from 'src/components/TextSkeleton';
import { colors, fonts, clickable } from 'src/styles';
import { ChevronRightIcon } from 'mdi-react';
import { Link } from 'react-router-dom';
import LikeButton from './components/LikeButton';
import Player from 'src/components/Player';
import useAudioControls from 'src/hooks/useAudioControls';
import { stringify } from 'querystringify';
import Tooltip from 'src/components/Tooltip';

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
  jumpToEpisode: css(fonts.heading300, clickable, {
    '& > svg': {
      transition: 'transform 250ms ease-out',
    },
    '& > :not(:last-child)': {
      marginRight: 6,
    },
    '&:hover': {
      '& > svg': {
        transform: 'translateX(4px)',
      },
    },
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: colors.gray700,
    padding: '8px 4px',
    transition: 'all 300ms ease-out',
  }),
};

const ClipCardSuccess: React.FC<ClipMetadata> = ({
  id,
  title,
  audio,
  start,
  end,
  episode,
  userHasLiked,
  likesCount,
}) => {
  const ref = React.useRef<HTMLAudioElement>(null);
  const audioStateControls = useAudioControls(ref);
  const {
    state: { time },
  } = audioStateControls;

  useEffect(() => {
    if (time >= end) {
    }
  }, []);

  return (
    <>
      <Player
        audioRef={ref}
        audioUrl={`${audio}#time=${start},${end}`}
        title={title}
        start={start}
        end={end}
        {...audioStateControls}
      />
      <div className={styles.bottomContainer}>
        <LikeButton
          {...{
            id,
            hasLiked: userHasLiked,
            numLikes: likesCount,
          }}
        />
        <Link
          className={styles.jumpToEpisode}
          to={`/episode/${episode.id}${stringify({ time: audioStateControls.state.time }, true)}`}
        >
          <span>Jump to full episode</span> <ChevronRightIcon size={18} />
        </Link>
      </div>
    </>
  );
};

const ClipCard: React.FC<ClipCardProps> = ({ clip }) => (
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
      renderSuccess={clipData => <ClipCardSuccess {...clipData} />}
    />
  </Card>
);

export default ClipCard;
