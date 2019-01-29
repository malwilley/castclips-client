import { css } from 'emotion';
import * as React from 'react';
import Audio from '~/components/Audio';
import PreviewOrRecord from '~/modules/PodcastPlayer/PreviewOrRecord';
import ShareButton from '~/modules/PodcastPlayer/ShareButton';
import ShareRange, { ShareRangeState } from '~/modules/PodcastPlayer/ShareRange';
import { Episode, PlayStatus } from '~/types/index';
import PlaybackSlider from './PlaybackSlider';
import { addClip } from '~/api/firebase';
import Show from '~/components/Show';
import ShareModal from '~/modules/PodcastPlayer/ShareModal';

type PodcastPlayerProps = {
  episode: Episode;
};

type PodcastPlayerState = {
  playStatus: PlayStatus;
  duration: number;
  min: number;
  max: number;
  share: ShareRangeState;
  time: number;
  previewing: number | null;
  recording: number | null;
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
      min: 0,
      max: 0,
      previewing: null,
      recording: null,
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

  pause = () => {
    this.setState({
      playStatus: PlayStatus.Paused,
    });
  };

  changeTime = (deltaTime: number) => {
    this.audioEl!.currentTime = this.state.time + deltaTime;
  };

  setTime = (time: number) => {
    const { previewing: previewingState, share } = this.state;
    if (share && previewingState && time >= share.end) {
      this.setState({
        playStatus: PlayStatus.Paused,
        previewing: null,
      });
      this.seek(previewingState);
      return;
    }
    this.setState(({ duration, previewing, min, max }) => ({
      time,
      min: previewing ? min : Math.max(0, time - 120),
      max: previewing ? max : Math.min(duration, time + 120),
    }));
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

  handleBoundsChange = (start: number, end: number) => {
    this.pause();

    this.setState({
      share: {
        start,
        end,
      },
    });
  };

  handlePreviewStart = () => {
    if (!this.state.share) {
      return;
    }
    this.setState(({ time }: PodcastPlayerState) => ({
      playStatus: PlayStatus.Playing,
      previewing: time,
    }));
    this.seek(this.state.share.start);
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

  handleRecordStart = () => {
    this.setState(({ time }: PodcastPlayerState) => ({
      playStatus: PlayStatus.Playing,
      recording: time,
    }));
  };

  handleRecordStop = () => {
    this.setState(({ recording, time }: PodcastPlayerState) => ({
      playStatus: PlayStatus.Paused,
      recording: null,
      share: {
        start: recording!,
        end: time,
      },
    }));
  };

  handleReset = () => {
    this.setState({
      share: null,
    });
  };

  handleShare = async () => {
    if (!this.state.share) {
      return;
    }
    const { id } = await addClip({
      audio: this.props.episode.audio,
      description: '',
      title: '',
      episodeId: this.props.episode.id,
      podcastId: '',
      start: this.state.share.start,
      end: this.state.share.end,
    });
    alert(id);
  };

  render() {
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
          disabled={
            this.state.duration <= 0 ||
            this.state.previewing !== null ||
            this.state.recording !== null
          }
          handleBackClick={() => this.changeTime(-5)}
          handleForwardClick={() => this.changeTime(30)}
          handlePlayPauseClick={this.playPause}
          time={this.state.time}
          onSeek={this.onSeek}
          playStatus={this.state.playStatus}
        />
        <ShareRange
          min={this.state.min}
          max={this.state.max}
          range={this.state.share}
          onChange={this.handleBoundsChange}
          previewing={this.state.previewing !== null}
          recording={this.state.recording !== null}
          time={this.state.time}
        />
        <div className={styles.footerContainer}>
          <PreviewOrRecord
            canPreview={this.state.share !== null}
            onPreviewStart={this.handlePreviewStart}
            onPreviewStop={this.handlePreviewStop}
            onRecordStart={this.handleRecordStart}
            onRecordStop={this.handleRecordStop}
            onReset={this.handleReset}
            previewing={this.state.previewing !== null}
            recording={this.state.recording !== null}
          />
          <Show>
            {({ isOpen, toggle }) => (
              <>
                <ShareButton active={this.state.share !== null} onClick={toggle} />
                {isOpen && <ShareModal handleClose={toggle} />}
              </>
            )}
          </Show>
        </div>
      </div>
    );
  }
}

export default PodcastPlayer;
