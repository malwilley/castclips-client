import * as React from 'react';
import { Episode, PlayMode, PlayStatus } from '~/types/index';
import Audio from '~/components/Audio';
import PlaybackSlider from './PlaybackSlider';
import ShareRange from './ShareRange';
import PlaybackControls from './PlaybackControls';
import ShareToggle from './ShareToggle';

type PodcastPlayerProps = {
  episode: Episode;
};

type PlayModeState = PlaybackState | ShareState;

type PlaybackState = {
  type: 'playback';
};

type ShareState = {
  type: 'share';
  min: number;
  max: number;
  start: number;
  end: number;
};

type PodcastPlayerState = {
  playStatus: PlayStatus;
  duration: number;
  modeState: PlayModeState;
  time: number;
};

class PodcastPlayer extends React.Component<PodcastPlayerProps, PodcastPlayerState> {
  private audioEl: HTMLAudioElement | null;

  constructor(props: PodcastPlayerProps) {
    super(props);

    this.state = {
      playStatus: PlayStatus.Paused,
      duration: 0,
      modeState: {
        type: 'playback',
      },
      time: 0,
    };

    this.audioEl = null;
  }

  playPause() {
    this.setState({
      playStatus:
        this.state.playStatus === PlayStatus.Playing ? PlayStatus.Paused : PlayStatus.Playing,
    });
  }

  changeTime(deltaTime: number) {
    this.audioEl!.currentTime = this.state.time + deltaTime;
  }

  setTime(time: number) {
    if (this.state.time === time) {
      return;
    }
    this.setState({
      time,
    });
  }

  setMode = (mode: PlayMode) => {
    switch (mode) {
      case PlayMode.Playback: {
        this.setState({
          modeState: {
            type: 'playback',
          },
          playStatus: PlayStatus.Paused,
        });
        break;
      }
      case PlayMode.Share:
      default: {
        this.setState({
          modeState: {
            type: 'share',
            min: Math.max(this.state.time - 10, 0),
            max: Math.min(this.state.time + 60, this.state.duration),
            start: this.state.time,
            end: this.state.time + 30,
          },
          playStatus: PlayStatus.Paused,
        });
        break;
      }
    }
  };

  onSeek = (time: number) => {
    this.seek(time);
  };

  onSeekRange = (start: number, end: number) => {
    this.setState({
      modeState:
        this.state.modeState.type === 'share'
          ? {
              ...this.state.modeState,
              end,
              start,
              type: 'share',
            }
          : { type: 'playback' },
      playStatus: PlayStatus.Paused,
      time: start,
    });
  };

  seek(time: number) {
    this.audioEl!.currentTime = time;
    this.setState({
      time,
    });
  }

  setDuration(duration: number) {
    this.setState({ duration });
  }

  renderControls() {
    return (
      <PlaybackControls
        playStatus={this.state.playStatus}
        handleBackClick={() => this.changeTime(-5)}
        handleForwardClick={() => this.changeTime(30)}
        handlePlayPauseClick={() => this.playPause()}
      />
    );
  }

  renderAudio() {
    return (
      <Audio
        src={this.props.episode.mediaUrl}
        title={this.props.episode.title}
        status={this.state.playStatus}
        onTimeChange={time => this.setTime(time)}
        onDuration={dur => this.setDuration(dur)}
        ref={ref => (this.audioEl = ref ? ref.audioEl : null)}
      />
    );
  }

  renderPlayerPlayback = () => (
    <div className="flex flex-column justify-around">
      {this.renderAudio()}
      <ShareToggle mode={PlayMode.Playback} handleToggle={this.setMode} />
      <PlaybackSlider duration={this.state.duration} time={this.state.time} onSeek={this.onSeek} />
      <div className="flex justify-between">
        <div>{this.state.time.toFixed(0)}</div>
        <div>{this.state.duration.toFixed(0)}</div>
      </div>
      {this.renderControls()}
    </div>
  );

  renderPlayerShare = ({ min, max, start, end }: ShareState) => (
    <div className="flex flex-column justify-around">
      {this.renderAudio()}
      <ShareToggle mode={PlayMode.Share} handleToggle={this.setMode} />
      <ShareRange
        {...{
          min,
          max,
          start,
          end,
          onSeek: this.onSeekRange,
        }}
      />
      <div className="flex justify-between">
        <div>{min.toFixed(0)}</div>
        <div>{max.toFixed(0)}</div>
      </div>
    </div>
  );

  render() {
    return this.state.modeState.type === 'playback'
      ? this.renderPlayerPlayback()
      : this.renderPlayerShare(this.state.modeState);
  }
}

export default PodcastPlayer;
