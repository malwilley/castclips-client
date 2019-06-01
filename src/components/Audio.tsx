import * as React from 'react';
import { PlayStatus } from 'src/types';

interface Props {
  status: PlayStatus;

  autoPlay?: boolean;
  controls?: boolean;
  controlsList?: string;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  preload?: string;
  src: string;
  title: string;

  onDuration?: (duration: number) => void;
  onTimeChange?: (duration: number) => void;
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

  onDuration: (duration: number) => void;
  onTimeChange: (duration: number) => void;
  listenInterval: number;
  onCanPlay: (ev: Event) => void;
  onCanPlayThrough: (ev: Event) => void;
  onEnded: (ev: Event) => void;
  onError: (ev: ErrorEvent) => void;
  onListen: (ev: Event) => void;
  onLoadedMetadata: (ev: Event) => void;
}

type PropsWithDefaults = Props & DefaultProps;

interface State {}

class Audio extends React.Component<Props, State> {
  public static defaultProps: DefaultProps = {
    autoPlay: false,
    controls: false,
    controlsList: '',
    listenInterval: 10000,
    loop: false,
    muted: false,
    onDuration: () => undefined,
    onTimeChange: () => undefined,
    onCanPlay: () => undefined,
    onCanPlayThrough: () => undefined,
    onEnded: () => undefined,
    onError: () => undefined,
    onListen: () => undefined,
    onLoadedMetadata: () => undefined,
    preload: 'metadata',
    volume: 1.0,
  };

  public audioEl: HTMLAudioElement | null = null;
  private timer: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const audio = this.audioEl as HTMLAudioElement;

    const {
      onError,
      onCanPlay,
      onCanPlayThrough,
      onEnded,
      onLoadedMetadata,
      onTimeChange,
      onDuration,
    } = this.props as PropsWithDefaults;

    this.timer = setInterval(() => onTimeChange(audio.currentTime), 100);

    audio.addEventListener('error', e => {
      onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', e => {
      onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', e => {
      onCanPlayThrough(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener('ended', e => {
      onEnded(e);
    });

    audio.addEventListener('loadedmetadata', e => {
      onLoadedMetadata(e);
    });

    audio.addEventListener('durationchange', e => {
      onDuration(audio.duration);
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updateAudio(nextProps as PropsWithDefaults);
  }

  updateAudio(props: PropsWithDefaults) {
    const audio = this.audioEl as HTMLAudioElement;
    const { status, volume } = props;

    if (volume !== audio.volume) {
      audio.volume = volume;
    }

    if (audio.paused && status !== PlayStatus.Paused) {
      audio.play();
    } else if (!audio.paused && status === PlayStatus.Paused) {
      audio.pause();
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
        ref={ref => (this.audioEl = ref)}
        title={this.props.title}
      >
        <source src={this.props.src} type="audio/mp3" />
        <p>
          Your browser does not support the <code>audio</code> element.
        </p>
      </audio>
    );
  }
}

export default Audio;
