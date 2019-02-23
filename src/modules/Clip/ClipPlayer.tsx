import { css } from 'emotion';
import * as React from 'react';
import { PlayStatus } from '~/types';
import Audio from '~/components/Audio';
import PlaybackSlider from '~/modules/PodcastPlayer/PlaybackSlider';
import { ClipMetadata } from './types';

type ClipPlayerProps = {
  clip: ClipMetadata;
};

type ClipPlayerState = {
  duration: number;
  playStatus: PlayStatus;
  time: number;
};

const styles = {
  playbackSlider: css({
    position: 'absolute',
    top: -5,
    left: 2,
    right: 2,
  }),
};

class ClipPlayer extends React.Component<ClipPlayerProps, ClipPlayerState> {
  state = {
    duration: 0,
    playStatus: PlayStatus.Paused,
    time: 0,
  };
  private audioEl: HTMLAudioElement | null = null;

  changeTime = (deltaTime: number) => {
    const { duration } = this.state;
    this.setState(({ time }) => ({
      time: Math.max(Math.min(time + deltaTime, 0), duration),
    }));
  };

  onSeek = (clipTime: number) => {
    this.seek(clipTime);
  };

  playPause = () => {
    this.setState(({ playStatus }) => ({
      playStatus: playStatus === PlayStatus.Playing ? PlayStatus.Paused : PlayStatus.Playing,
    }));
  };

  seek = (clipTime: number) => {
    const { start } = this.props.clip;
    this.audioEl!.currentTime = clipTime + start;
    this.setState({
      playStatus: PlayStatus.Paused,
    });
  };

  setTime = (audioTime: number) => {
    const { start, end } = this.props.clip;
    this.setState(({ playStatus }) => ({
      time: audioTime - start,
      playStatus: audioTime >= end ? PlayStatus.Paused : playStatus,
    }));
  };

  onLoadedMetadata = () => {
    const { start, end } = this.props.clip;

    this.audioEl!.currentTime = start;
    this.setState({ duration: end - start });
  };

  render() {
    const {
      clip: { audio, end, start, title },
    } = this.props;
    return (
      <>
        <Audio
          src={`${audio}#time=${start},${end}`}
          title={title}
          status={this.state.playStatus}
          onTimeChange={time => this.setTime(time)}
          onLoadedMetadata={this.onLoadedMetadata}
          ref={ref => (this.audioEl = ref ? ref.audioEl : null)}
        />
        <PlaybackSlider
          className={styles.playbackSlider}
          duration={this.state.duration}
          disabled={this.state.duration <= 0}
          handleBackClick={() => this.changeTime(-5)}
          handleForwardClick={() => this.changeTime(30)}
          handlePlayPauseClick={this.playPause}
          time={this.state.time}
          onSeek={this.onSeek}
          playStatus={this.state.playStatus}
        />
      </>
    );
  }
}

export default ClipPlayer;
