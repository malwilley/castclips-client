import HttpContent from 'src/components/HttpContent';
import { HomeState } from '../types';
import { css } from 'emotion';
import { range } from 'ramda';
import HotClip, { HotClipSkeleton } from './HotClip';
import React from 'react';
import StackGrid from 'src/components/StackGrid';

type HotClipsProps = {
  hotClips: HomeState['hotClips'];
};

const styles = {
  clipsContainer: css({
    '@media (max-width: 800px)': {
      padding: '0 10px',
    },
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
        <StackGrid minColumnWidth={300}>
          {range(0, 20).map(i => (
            <HotClipSkeleton key={i} />
          ))}
        </StackGrid>
      )}
      renderSuccess={clips => (
        <StackGrid minColumnWidth={300}>
          {clips.map(clip => (
            <HotClip clip={clip} key={clip.id} />
          ))}
        </StackGrid>
      )}
    />
  </div>
);

export default HotClips;
