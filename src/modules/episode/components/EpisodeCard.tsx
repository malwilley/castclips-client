import { css } from 'emotion';
import { EpisodeState, EpisodeMetadata } from '../types';
import Card from 'src/components/Card';
import HttpContent from 'src/components/HttpContent';
import Player from 'src/components/Player';
import React, { useState, useRef, useEffect } from 'react';
import EpisodePlayerClipOptions from './EpisodePlayerClipOptions';
import useAudioControls from 'src/hooks/useAudioControls';
import { clamp } from 'ramda';

type EpisodeCardProps = {
  episode: EpisodeState['metadata'];
};

const styles = {
  main: css({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    width: '100%',
    maxWidth: 700,
    position: 'relative',
  }),
};

const EpisodeCardSuccess: React.FC<EpisodeMetadata> = ({ audio, title }) => {
  const ref = useRef<HTMLAudioElement>(null);
  const audioStateControls = useAudioControls(ref);
  const {
    state: { time, duration },
    controls,
  } = audioStateControls;
  const [start, setStart] = useState<Maybe<number>>(null);
  const [end, setEnd] = useState<Maybe<number>>(null);
  const [previewing, setPreviewing] = useState<boolean>(false);

  useEffect(() => {
    if (previewing && time >= end!) {
      controls.seek(end!);
      controls.pause();
      setPreviewing(false);
    }
  }, [previewing, time, end]);

  const handlePreviewStart = () => {
    controls.seek(start!);
    controls.play();
    setPreviewing(true);
  };

  const handlePreviewStop = () => {
    controls.pause();
    setPreviewing(false);
  };

  return (
    <>
      <Player audioRef={ref} audioUrl={audio} title={title} {...audioStateControls} />
      <EpisodePlayerClipOptions
        start={start}
        end={end}
        time={time}
        duration={duration}
        handleSetStart={newTime => {
          if (end && newTime > end) {
            setEnd(null);
          }
          setStart(clamp(0, duration, newTime));
        }}
        handleSetEnd={newTime => {
          if (start && newTime < start) {
            setStart(null);
          }
          setEnd(clamp(0, duration, newTime));
        }}
        previewing={previewing}
        handlePreviewStart={handlePreviewStart}
        handlePreviewStop={handlePreviewStop}
      />
    </>
  );
};

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => (
  <Card className={styles.main} feature>
    <HttpContent
      request={episode}
      renderSuccess={episodeData => <EpisodeCardSuccess {...episodeData} />}
    />
  </Card>
);

export default EpisodeCard;
