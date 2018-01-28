declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'react-audio-player' {
  interface AudioPlayerProps {
    autoPlay?: boolean;
    className?: string;
    controls?: boolean;
    controlsList?: string;
    loop?: boolean;
    muted?: boolean;
    volume?: number;
    preload?: string;
    src: string;
    style?: object;

    lsitenInterval?: number;
    onAbort?: (ev: Event) => void;
    onCanPlay?: (ev: Event) => void;
    onCanPlayThrough?: (ev: Event) => void;
    onEnded?: (ev: Event) => void;
    onError?: (ev: Event) => void;
    onSeeked?: (ev: Event) => void;
    onVolumeChanged?: (ev: Event) => void;
    onLoadedMetadata?: (ev: Event) => void;
    ref?: (instance: ReactAudioPlayer) => void;
  }

  class ReactAudioPlayer extends React.Component<AudioPlayerProps, {}> {
    audioEl: HTMLAudioElement;
  }

  export default ReactAudioPlayer;
}
