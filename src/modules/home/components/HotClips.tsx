import HttpContent from 'src/components/HttpContent';
import { HomeState } from '../types';
import { css } from 'emotion';
import HotClip from './HotClip';
import React from 'react';

type HotClipsProps = {
  hotClips: HomeState['hotClips'];
};

const styles = {
  clipsContainer: css({
    '@media (max-width: 800px)': {
      padding: '0 10px',
    },
    marginTop: -350,
    display: 'grid',
    alignItems: 'start',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    columnGap: 20,
    rowGap: 20,
    padding: '0 40px',
  }),
};

const HotClips: React.FC<HotClipsProps> = ({ hotClips }) => (
  <div className={styles.clipsContainer}>
    <HttpContent
      request={hotClips}
      renderSuccess={clips => (
        <>
          {clips.map(clip => (
            <HotClip clip={clip} key={clip.id} />
          ))}
        </>
      )}
    />
  </div>
);

export default HotClips;
