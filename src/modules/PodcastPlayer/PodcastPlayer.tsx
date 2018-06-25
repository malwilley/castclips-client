import * as React from 'react';
import { Episode, PlayMode, PlayStatus } from '~/types/index';
import Audio from '~/components/Audio';
import PlaybackSlider from './PlaybackSlider';
import { Range } from 'rc-slider';
import PlaybackControls from './PlaybackControls';
import ShareToggle from './ShareToggle';

interface Props {
  episode: Episode;
}

interface State {
  playStatus: PlayStatus;
  time: number;
  duration: number;
  mode: PlayMode;
}

class PodcastPlayer extends React.Component<Props, State> {
  private audioEl: HTMLAudioElement | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      playStatus: PlayStatus.Paused,
      time: 0,
      duration: 0,
      mode: PlayMode.Playback
    };

    this.audioEl = null;
  }

  playPause() {
    this.setState({
      playStatus:
        this.state.playStatus === PlayStatus.Playing ? PlayStatus.Paused : PlayStatus.Playing
    });
  }

  changeTime(time: number) {
    this.audioEl!.currentTime = time;
  }

  setTime(time: number) {
    if (time === this.state.time) {
      return;
    }
    this.setState({ time });
  }

  onSeek = (time: number) => {
    this.seek(time);
  };

  seek(time: number) {
    this.audioEl!.currentTime = time;
    this.setState({ time });
  }

  setDuration(duration: number) {
    this.setState({ duration });
  }

  renderControls() {
    return (
      <PlaybackControls
        playStatus={this.state.playStatus}
        handleBackClick={() => this.changeTime(this.state.time - 5)}
        handleForwardClick={() => this.changeTime(this.state.time + 30)}
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

  renderPlayer(mode: PlayMode) {
    return mode === PlayMode.Playback ? (
      <div className="flex flex-column justify-around">
        {this.renderAudio()}
        <ShareToggle mode={mode} handleToggle={newMode => this.setState({ mode: newMode })} />
        <PlaybackSlider
          duration={this.state.duration}
          time={this.state.time}
          onSeek={this.onSeek}
        />
        <div className="flex justify-between">
          <div>{this.state.time.toFixed(0)}</div>
          <div>{this.state.duration.toFixed(0)}</div>
        </div>
        {this.renderControls()}
      </div>
    ) : (
      <div className="flex flex-column justify-around">
        {this.renderAudio()}
        <ShareToggle mode={mode} handleToggle={newMode => this.setState({ mode: newMode })} />
        <Range
          min={0}
          max={this.state.duration}
          pushable={1}
          value={[this.state.time, this.state.time + 10]}
        />
        <div className="flex justify-between">
          <div>{this.state.time.toFixed(0)}</div>
          <div>{this.state.duration.toFixed(0)}</div>
        </div>
        {this.renderControls()}
      </div>
    );
  }

  render() {
    return this.renderPlayer(this.state.mode);
  }
}

export default PodcastPlayer;
