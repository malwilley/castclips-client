import * as React from 'react'

type AudioProps = {
  src: string
  audioRef?: React.RefObject<HTMLAudioElement>
} & React.ButtonHTMLAttributes<HTMLAudioElement>

const Audio: React.FC<AudioProps> = ({ audioRef: ref, src, ...audioProps }) => {
  return (
    <audio ref={ref} {...audioProps}>
      <source src={src} type="audio/mp3" />
      <p>
        Your browser does not support the <code>audio</code> element.
      </p>
    </audio>
  )
}

export default Audio
