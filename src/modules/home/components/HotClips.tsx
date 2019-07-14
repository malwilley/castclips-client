import HttpContent from 'src/components/HttpContent';
import { HomeState } from '../types';
import { css } from 'emotion';
import { range } from 'ramda';
import HotClip, { HotClipSkeleton } from './HotClip';
import React from 'react';

type HotClipsProps = {
  hotClips: HomeState['hotClips'];
};

const styles = {
  clipsContainer: css({
    '@media (max-width: 800px)': {
      padding: '0 10px',
    },
    display: 'grid',
    alignItems: 'start',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    columnGap: 20,
    rowGap: 20,
    padding: '0 40px',
    margin: '0 auto',
    maxWidth: 1400,
  }),
};

const HotClips: React.FC<HotClipsProps> = ({ hotClips }) => (
  <div className={styles.clipsContainer}>
    <HttpContent
      request={hotClips}
      renderFetching={() => (
        <>
          {range(0, 20).map(i => (
            <HotClipSkeleton key={i} />
          ))}
        </>
      )}
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
