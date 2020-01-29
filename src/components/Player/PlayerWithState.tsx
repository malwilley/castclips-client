import React from 'react'
import useAudioControls from 'hooks/useAudioControls'
import Player from '.'

type PlayerWithStateProps = {
  audioUrl: string
  title: string
  start?: number
  end?: number
  initialTime?: number
}

const PlayerWithState: React.FC<PlayerWithStateProps> = ({
  audioUrl,
  title,
  start,
  end,
  initialTime,
}) => {
  const { ref, state, controls } = useAudioControls({ initialTime })

  return (
    <Player
      audioRef={ref}
      audioUrl={audioUrl}
      title={title}
      start={start}
      end={end}
      state={state}
      controls={controls}
    />
  )
}

export default PlayerWithState
