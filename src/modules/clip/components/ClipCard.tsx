import { css } from 'emotion'
import React from 'react'
import { HttpRequest } from 'types'
import Card from 'components/Card'
import HttpContent from 'components/HttpContent'
import { ClipMetadata } from '../types'
import TextSkeleton from 'components/TextSkeleton'
import { colors, fonts } from 'styles'
import ChevronRightIcon from 'mdi-react/ChevronRightIcon'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Player from 'components/Player'
import useAudioControls from 'hooks/useAudioControls'
import { stringify } from 'querystringify'
import ContinueListening from './ContinueListening'
import { PlayerFetching } from 'components/Player/Player'

type ClipCardProps = {
  clip: HttpRequest<ClipMetadata>
}

const styles = {
  bottomContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    padding: 20,
    width: '100%',
    height: 70,
  }),
  main: css({
    overflow: 'visible',
    position: 'relative',
    width: '100%',
    maxWidth: 700,
  }),
  jumpToEpisode: css(fonts.bold300, {
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
}

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
  const ref = React.useRef<HTMLAudioElement>(null)
  const audioStateControls = useAudioControls(ref)
  const {
    state: { time },
  } = audioStateControls

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
          <ContinueListening show={time > end - 1} />
          <span>Jump to full episode</span> <ChevronRightIcon size={18} />
        </Link>
      </div>
    </>
  )
}

const ClipCard: React.FC<ClipCardProps> = ({ clip }) => (
  <Card className={styles.main} feature>
    <HttpContent
      request={clip}
      renderFetching={() => (
        <>
          <PlayerFetching />
          <div className={styles.bottomContainer}>
            <TextSkeleton height={38} width={80} color={colors.gray50} />
            <TextSkeleton height={38} width={200} color={colors.gray50} />
          </div>
        </>
      )}
      renderSuccess={clipData => <ClipCardSuccess {...clipData} />}
    />
  </Card>
)

export default ClipCard
