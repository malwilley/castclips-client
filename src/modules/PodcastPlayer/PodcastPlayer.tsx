import { css } from 'emotion';
import * as React from 'react';
import Audio from '~/components/Audio';
import { Episode, PlayStatus } from '~/types/index';
import PlaybackControls from './PlaybackControls';
import PlaybackSlider from './PlaybackSlider';

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

  playPause = () => {
    this.setState({
      playStatus:
        this.state.playStatus === PlayStatus.Playing ? PlayStatus.Paused : PlayStatus.Playing,
    });
  };

  changeTime = (deltaTime: number) => {
    this.audioEl!.currentTime = this.state.time + deltaTime;
  };

  setTime = (time: number) => {
    if (this.state.time === time) {
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

  render() {
    return (
      <div className={styles.main}>
        {this.renderAudio()}
        <PlaybackSlider
          className={styles.playbackSlider}
          duration={this.state.duration}
          handleBackClick={() => this.changeTime(-5)}
          handleForwardClick={() => this.changeTime(30)}
          handlePlayPauseClick={this.playPause}
          time={this.state.time}
          onSeek={this.onSeek}
          playStatus={this.state.playStatus}
        />
        {this.renderControls()}
      </div>
    );
  }
}

export default PodcastPlayer;
