import * as React from 'react';

interface Props {
  autoPlay?: boolean;
  controls?: boolean;
  controlsList?: string;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  preload?: string;
  src: string;
  title: string;

  listenInterval?: number;
  onAbort?: (ev: UIEvent) => void;
  onCanPlay?: (ev: Event) => void;
  onCanPlayThrough?: (ev: Event) => void;
  onEnded?: (ev: Event) => void;
  onError?: (ev: ErrorEvent) => void;
  onSeeked?: (ev: Event) => void;
  onListen?: (ev: Event) => void;
  onPause?: (ev: Event) => void;
  onPlay?: (ev: React.SyntheticEvent<HTMLAudioElement>) => void;
  onVolumeChanged?: (ev: Event) => void;
  onLoadedMetadata?: (ev: Event) => void;
}

interface DefaultProps {
  autoPlay: boolean;
  controls: boolean;
  controlsList: string;
  loop: boolean;
  muted: boolean;
  volume: number;
  preload: string;

  listenInterval: number;
  onAbort: (ev: UIEvent) => void;
  onCanPlay: (ev: Event) => void;
  onCanPlayThrough: (ev: Event) => void;
  onEnded: (ev: Event) => void;
  onError: (ev: ErrorEvent) => void;
  onSeeked: (ev: Event) => void;
  onListen: (ev: Event) => void;
  onPause: (ev: Event) => void;
  onPlay: (ev: Event) => void;
  onVolumeChanged: (ev: Event) => void;
  onLoadedMetadata: (ev: Event) => void;
}

type PropsWithDefaults = Props & DefaultProps;

interface State {

}

class AudioPlayer extends React.Component<Props, State> {

  public static defaultProps: DefaultProps = {
    autoPlay: false,
    controls: false,
    controlsList: '',
    listenInterval: 10000,
    loop: false,
    muted: false,
    onAbort: () => undefined,
    onCanPlay: () => undefined,
    onCanPlayThrough: () => undefined,
    onEnded: () => undefined,
    onError: () => undefined,
    onListen: () => undefined,
    onPause: () => undefined,
    onPlay: () => undefined,
    onSeeked: () => undefined,
    onVolumeChanged: () => undefined,
    onLoadedMetadata: () => undefined,
    preload: 'metadata',
    volume: 1.0,
  };

  private audioEl: HTMLAudioElement | null;

  constructor (props: Props) {
    super(props);
  }

  componentDidMount() {
    const audio = this.audioEl as HTMLAudioElement;

    const { 
      volume, onError, onCanPlay, onCanPlayThrough, 
      onPlay, onAbort, onEnded, onPause, onSeeked, 
      onLoadedMetadata, onVolumeChanged 
    } = this.props as PropsWithDefaults;

    this.updateVolume(volume);

    audio.addEventListener('error', (e) => {
      onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', (e) => {
      onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', (e) => {
      onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener('play', (e) => {
      onPlay(e);
    });

    // When unloading the audio player (switching to another src)
    audio.addEventListener('abort', (e) => {
      onAbort(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener('ended', (e) => {
      onEnded(e);
    });

    // When the user pauses playback
    audio.addEventListener('pause', (e) => {
      onPause(e);
    });

    // When the user drags the time indicator to a new time
    audio.addEventListener('seeked', (e) => {
      onSeeked(e);
    });

    audio.addEventListener('loadedmetadata', (e) => {
      onLoadedMetadata(e);
    });

    audio.addEventListener('volumechange', (e) => {
      onVolumeChanged(e);
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    const { volume } = this.props as PropsWithDefaults;
    this.updateVolume(volume);
  }

  /**
   * Set the volume on the audio element from props
   * @param {Number} volume
   */
  updateVolume(volume: number) {
    const audio = this.audioEl as HTMLAudioElement;

    if (typeof volume === 'number' && volume !== audio.volume) {
      audio.volume = volume;
    }
  }

  render() {
    const { autoPlay, controls, loop, muted, onPlay, preload } = this.props as PropsWithDefaults;

    return (
      <audio
        autoPlay={autoPlay}
        controls={controls}
        loop={loop}
        muted={muted}
        onPlay={onPlay}
        preload={preload}
        ref={(ref) => { this.audioEl = ref; }}
        src={this.props.src}
        title={this.props.title}
      >
        <p>Your browser does not support the <code>audio</code> element.</p>
      </audio>
    );
  }
}

export default AudioPlayer;
