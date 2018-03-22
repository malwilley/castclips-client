import * as React from 'react';
import './PodcastPlayer.css';
import { Episode, PlayStatus } from '../../types/index';
import Audio from '../Audio/Audio';
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

  changeTime(time: number) {
    this.audioEl!.currentTime = time;
  }

  setTime (time: number) {
    if (time === this.state.time) {
      return;
    }
    this.setState({ time });
  }

  setDuration (duration: number) {
    this.setState({ duration });
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
        <button onClick={() => this.playPause()}>
          {this.state.playStatus === PlayStatus.Playing ? 'pause' : 'play'}
        </button>
        <button onClick={() => this.changeTime(45)}>
          Set to 45 seconds
        </button>
        <div>
          {this.state.time + '/' + this.state.duration}
        </div>
      </div>
    );
  }
}

export default PodcastPlayer;