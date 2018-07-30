import { css } from 'emotion';
import * as React from 'react';
import Audio from '~/components/Audio';
import { Episode, PlayStatus } from '~/types/index';
import PlaybackControls from './PlaybackControls';
import PlaybackSlider from './PlaybackSlider';
import ShareRange from './ShareRange';

type PodcastPlayerProps = {
  episode: Episode;
};

type ShareState = {
  min: number;
  max: number;
  start: number;
  end: number;
};

type PodcastPlayerState = {
  playStatus: PlayStatus;
  duration: number;
  share: ShareState | null;
  time: number;
};

const styles = {
  main: css({
    position: 'relative',
    paddingTop: 50,
  }),
  playbackSlider: css({
    position: 'absolute',
    top: -7,
    width: '100%',
    borderTopLeftRadius: 4,
  }),
};

class PodcastPlayer extends React.Component<PodcastPlayerProps, PodcastPlayerState> {
  private audioEl: HTMLAudioElement | null;

  constructor(props: PodcastPlayerProps) {
    super(props);

    this.state = {
      playStatus: PlayStatus.Paused,
      duration: 0,
      share: null,
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

  onSeek = (time: number) => {
    this.seek(time);
  };

  onSeekRange = (start: number, end: number) => {
    this.setState({
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
    return (
      <div className={styles.main}>
        {this.renderAudio()}
        <PlaybackSlider
          className={styles.playbackSlider}
          duration={this.state.duration}
          time={this.state.time}
          onSeek={this.onSeek}
        />
        {this.renderControls()}
      </div>
    );
  }
}

export default PodcastPlayer;
