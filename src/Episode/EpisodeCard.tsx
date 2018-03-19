import * as React from 'react';
import './EpisodeCard.css';
import { HttpRequest, Episode, PlayStatus } from '../types/index';
import FeatureCard from '../Common/FeatureCard/FeatureCard';
import AudioPlayer from '../Common/AudioPlayer/AudioPlayer';

interface Props {
  episode: HttpRequest<Episode>;
}

interface State {
  playStatus: PlayStatus;
  time: number;
  duration: number;
}

class EpisodeCard extends React.Component<Props, State> {

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

  setTime (time: number) {
    if (time === this.state.time) {
      return;
    }
    this.setState({ time });
  }

  setDuration (duration: number) {
    this.setState({ duration });
  }

  renderEpisodeData (episode: Episode) {
    return (
      <div className="flex card down-half slide-in-fifty">
        <div className="flex flex-column flex-auto left-align px3 py1">
          <h3 className="flex-none">{episode.title}</h3>
          <p className="flex-auto overflow-ellipsis m0">{episode.description}</p>
          <AudioPlayer
            src={episode.mediaUrl}
            title={episode.title}
            status={this.state.playStatus}
            onTimeChange={time => this.setTime(time)}
            onDuration={dur => this.setDuration(dur)}
            ref={ref => this.audioEl = ref ? ref.audioEl : null}
          />
          <button onClick={() => this.playPause()}>
            {this.state.playStatus === PlayStatus.Playing ? 'pause' : 'play'}
          </button>
          <div>
            {this.state.time + '/' + this.state.duration}
          </div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <FeatureCard content={this.props.episode} renderContent={e => this.renderEpisodeData(e)} />
    );
  }
}

export default EpisodeCard;