import * as React from 'react';
import { Back5, Forward30, Pause, Play } from '../../icons';
import { Episode, PlayStatus } from '../../types/index';
import Audio from '../Audio/Audio';
import Slider, { Range } from 'rc-slider';
import './PodcastPlayer.css';

interface Props {
  episode: Episode;
}

interface State {
  playStatus: PlayStatus;
  time: number;
  duration: number;
}

class PodcastPlayer extends React.Component<Props, State> {

  private audioEl: HTMLAudioElement | null;

  constructor (props: Props) {
    super(props);

    this.state = {
      playStatus: PlayStatus.Paused,
      time: 0,
      duration: 0
    };

    this.audioEl = null;
  }

  playPause () {
    this.setState({
      playStatus: this.state.playStatus === PlayStatus.Playing
        ? PlayStatus.Paused 
        : PlayStatus.Playing
    });
  }

  changeTime (time: number) {
    this.audioEl!.currentTime = time;
  }

  setTime (time: number) {
    if (time === this.state.time) {
      return;
    }
    this.setState({ time });
  }

  onSeek = (time: number) => {
    this.seek(time);
  }

  seek (time: number) {
    this.audioEl!.currentTime = time;
    this.setState({time});
  }

  setDuration (duration: number) {
    this.setState({ duration });
  }

  playPauseButton (playStatus: PlayStatus) {
    return playStatus === PlayStatus.Playing 
      ? <Pause className="play-icon mx2 clickable" onClick={() => this.playPause()} />
      : <Play className="play-icon mx2 clickable" onClick={() => this.playPause()} />;
  }

  render () {
    return (
      <div className="">
        <Audio
          src={this.props.episode.mediaUrl}
          title={this.props.episode.title}
          status={this.state.playStatus}
          onTimeChange={time => this.setTime(time)}
          onDuration={dur => this.setDuration(dur)}
          ref={ref => this.audioEl = ref ? ref.audioEl : null}
        />
        <Slider
          min={0}
          max={this.state.duration}
          value={this.state.time}
          onChange={this.onSeek}
        />
        <Range
          min={0}
          max={this.state.duration}
          pushable={1}
          value={[this.state.time, this.state.time + 10]}
        />
        <div className="flex justify-center">
          <Back5 className="seek-icon clickable"  onClick={() => this.changeTime(this.state.time - 5)} />
          {this.playPauseButton(this.state.playStatus)}
          <Forward30 className="seek-icon clickable" onClick={() => this.changeTime(this.state.time + 30)} />
        </div>
        
        <div>
          {this.state.time.toFixed(0) + '/' + this.state.duration.toFixed(0) + 's'}
        </div>
      </div>
    );
  }
}

export default PodcastPlayer;