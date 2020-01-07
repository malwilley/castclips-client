import React, { useRef } from 'react'
import useAudioControls from 'hooks/useAudioControls'
import Player from '.'

type PlayerWithStateProps = {
  audioUrl: string
  title: string
  start?: number
  end?: number
}

const PlayerWithState: React.FC<PlayerWithStateProps> = ({ audioUrl, title, start, end }) => {
  const ref = useRef<HTMLAudioElement>(null)
  const audioStateControls = useAudioControls(ref)

  return (
    <Player
      audioRef={ref}
      audioUrl={audioUrl}
      title={title}
      start={start}
      end={end}
      {...audioStateControls}
    />
  )
}

export default PlayerWithState
