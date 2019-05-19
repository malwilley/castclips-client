import { css } from 'emotion';
import * as React from 'react';
import Audio from '~/components/Audio';
import ShareButton from '~/modules/PodcastPlayer/ShareButton';
import { PlayStatus } from '~/types';
import PlaybackSlider from '~/modules/PodcastPlayer/PlaybackSlider';
import Show from '~/components/Show';
import CreateClipModal from '../Episode/components/CreateClipModal';
import { EpisodeMetadata } from '../Episode/types';
import TimeRecorder from './TimeRecorder';
import { ArrowRightIcon } from 'mdi-react';
import { colors } from '~/styles';
import ClipPreview from './ClipPreview';
import { isNil } from 'ramda';
import PreviewButton from './PreviewButton';
import ShowHideClipOptions from './ShowHideClipOptions';
import EpisodePlayerClipOptions from './EpisodePlayerClipOptions';

type PodcastPlayerProps = {
  episode: EpisodeMetadata;
};

type PodcastPlayerState = {
  playStatus: PlayStatus;
  duration: number;
  time: number;
  previewing: number | null;
  start: Maybe<number>;
  end: Maybe<number>;
};

const styles = {
  footerContainer: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  }),
  main: css({
    paddingTop: 50,
    position: 'relative',
  }),
  playbackSlider: css({
    position: 'absolute',
    top: -5,
    left: 2,
    right: 2,
  }),
};

class PodcastPlayer extends React.Component<PodcastPlayerProps, PodcastPlayerState> {
  private audioEl: HTMLAudioElement | null;

  constructor(props: PodcastPlayerProps) {
    super(props);

    this.state = {
      playStatus: PlayStatus.Paused,
      duration: 0,
      previewing: null,
      time: 0,
      start: null,
      end: null,
    };

    this.audioEl = null;
  }

  playPause = () => {
    this.setState({
      playStatus:
        this.state.playStatus === PlayStatus.Playing ? PlayStatus.Paused : PlayStatus.Playing,
    });
  };

  pause = () => {
    this.setState({
      playStatus: PlayStatus.Paused,
    });
  };

  changeTime = (deltaTime: number) => {
    this.audioEl!.currentTime = this.state.time + deltaTime;
  };

  setTime = (time: number) => {
    const { previewing: previewingState, start, end } = this.state;
    if (end && previewingState && time >= end) {
      this.setState({
        playStatus: PlayStatus.Paused,
        previewing: null,
      });
      this.seek(previewingState);
      return;
    }
    this.setState({
      time,
    });
  };

  onSeek = (time: number) => {
    this.seek(time);
  };

  onSeekRange = (start: number, end: number) => {
    this.setState({
      playStatus: PlayStatus.Paused,
      time: start,
    });
  };

  seek = (time: number) => {
    this.audioEl!.currentTime = time;
    this.setState({
      time,
    });
  };

  setDuration = (duration: number) => {
    this.setState({ duration });
  };

  handlePreviewStart = () => {
    if (!this.state.start || !this.state.end) {
      return;
    }
    this.setState(({ time }: PodcastPlayerState) => ({
      playStatus: PlayStatus.Playing,
      previewing: time,
    }));
    this.seek(this.state.start);
  };

  handlePreviewStop = () => {
    if (!this.state.previewing) {
      return;
    }
    this.seek(this.state.previewing);
    this.setState({
      playStatus: PlayStatus.Paused,
      previewing: null,
    });
  };

  render() {
    const { start, end } = this.state;
    return (
      <div className={styles.main}>
        <Audio
          src={this.props.episode.audio}
          title={this.props.episode.title}
          status={this.state.playStatus}
          onTimeChange={time => this.setTime(time)}
          onDuration={dur => this.setDuration(dur)}
          ref={ref => (this.audioEl = ref ? ref.audioEl : null)}
        />
        <PlaybackSlider
          className={styles.playbackSlider}
          duration={this.state.duration}
          disabled={this.state.duration <= 0 || this.state.previewing !== null}
          handleBackClick={() => this.changeTime(-5)}
          handleForwardClick={() => this.changeTime(30)}
          handlePlayPauseClick={this.playPause}
          time={this.state.time}
          onSeek={this.onSeek}
          playStatus={this.state.playStatus}
        />
        <EpisodePlayerClipOptions
          start={start}
          end={end}
          time={this.state.time}
          duration={this.state.duration}
          handleSetEnd={() => {
            this.setState({
              end: this.state.time,
            });
          }}
          handleSetStart={() => {
            this.setState({
              start: this.state.time,
            });
          }}
          previewing={!!this.state.previewing}
          handlePreviewClick={this.handlePreviewStart}
        />
      </div>
    );
  }
}

export default PodcastPlayer;
