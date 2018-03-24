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

  changeTime (time: number) {
    this.audioEl!.currentTime = time;
  }

  setTime (time: number) {
    if (time === this.state.time) {
      return;
    }
    this.setState({ time });
  }

  onSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.seek(event.target.valueAsNumber);
  }

  seek (time: number) {
    this.audioEl!.currentTime = time;
    this.setState({time});
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
        <div className="slider">
          <input
            type="range" 
            min="0"
            max={this.state.duration}
            value={this.state.time}
            onChange={this.onSeek}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={() => this.changeTime(this.state.time - 30)}>
            back 30s
          </button>
          <button onClick={() => this.playPause()}>
            {this.state.playStatus === PlayStatus.Playing ? 'pause' : 'play'}
          </button>
          <button onClick={() => this.changeTime(this.state.time + 30)}>
            forward 30s
          </button>
        </div>
        
        <div>
          {this.state.time.toFixed(0) + '/' + this.state.duration.toFixed(0) + 's'}
        </div>
      </div>
    );
  }
}

export default PodcastPlayer;