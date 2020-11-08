import { css } from 'emotion'
import { EpisodeState, EpisodeMetadata } from '../types'
import Card from 'components/Card'
import Player from 'components/Player'
import React, { useState, useEffect } from 'react'
import EpisodePlayerClipOptions from './EpisodePlayerClipOptions'
import useAudioControls from 'hooks/useAudioControls'
import { clamp } from 'ramda'
import MapUnion from 'components/MapUnion'
import NoData from 'components/NoData'
import { PlayerFetching } from 'components/Player/Player'

type EpisodeCardProps = {
  episode: EpisodeState['metadata']
  time?: number
}

const styles = {
  main: css({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    width: '100%',
    maxWidth: 700,
    minHeight: 160,
    position: 'relative',
  }),
}

const EpisodeCardSuccess: React.FC<EpisodeMetadata & Pick<EpisodeCardProps, 'time'>> = ({
  audio,
  title,
  time: initialTime,
}) => {
  const { ref, ...audioStateControls } = useAudioControls({ initialTime })
  const {
    state: { canPlay, duration, time },
    controls: { seek, pause, play },
  } = audioStateControls
  const [start, setStart] = useState<Maybe<number>>(null)
  const [end, setEnd] = useState<Maybe<number>>(null)
  const [previewing, setPreviewing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (previewing && time >= end!) {
      seek(end!)
      pause()
      setPreviewing(false)
    }
  }, [previewing, time, end, seek, pause])

  const handlePreviewStart = () => {
    seek(start!)
    play()
    setPreviewing(true)
  }

  const handlePreviewStop = () => {
    pause()
    setPreviewing(false)
  }

  return (
    <>
      <Player
        audioRef={ref}
        audioUrl={audio}
        title={title}
        captureKeyboardInput={!modalOpen}
        {...audioStateControls}
      />
      {canPlay && (
        <EpisodePlayerClipOptions
          start={start}
          end={end}
          time={time}
          duration={duration}
          handleSetStart={(newTime) => {
            if (end && newTime > end) {
              setEnd(null)
            }
            setStart(clamp(0, duration, newTime))
          }}
          handleSetEnd={(newTime) => {
            if (start && newTime < start) {
              setStart(null)
            }
            setEnd(clamp(0, duration, newTime))
          }}
          previewing={previewing}
          handlePreviewStart={handlePreviewStart}
          handlePreviewStop={handlePreviewStop}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  )
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, time }) => (
  <Card className={styles.main} feature>
    <MapUnion
      map={{
        not_asked: () => null,
        success: ({ data: episodeData }) => <EpisodeCardSuccess {...episodeData} time={time} />,
        fetching: () => <PlayerFetching />,
        error: () => <NoData message="Failed to load episode." />,
      }}
      union={episode}
    />
  </Card>
)

export default EpisodeCard
