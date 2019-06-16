import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';
import Header from 'src/modules/header';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from '../redux';
import { HomeState } from '../types';
import BoxContainer from 'src/components/BoxContainer';
import TextPointer from './TextPointer';
import HotClips from './HotClips';

type HomePageConnectedProps = {
  fetchHotClips: (num: number) => void;
  hotClips: HomeState['hotClips'];
};

const styles = {
  gradientContainer: css({
    backgroundImage: colors.gradient2,
    height: 500,
  }),
  shareContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  }),
  shareText: css({
    fontSize: '2.5rem',
    color: colors.lightest,
    textAlign: 'center',
    letterSpacing: '0.05em',
  }),
  hotClipsBox: css({
    backgroundImage:
      'radial-gradient( circle farthest-corner at 36.4% 18.8%,  rgba(243,149,94,1) 1.3%, rgba(236,173,7,1) 100.2% )',
    height: 500,
  }),
  hotClipsContainer: css({
    paddingTop: 60,
  }),
  hotClipsText: css({
    textAlign: 'center',
    color: colors.gray500,
    fontSize: '2.5rem',
  }),
  search: css({
    gridTemplateArea: 'search',
    margin: '0 auto',
  }),
};

const HomePage: React.FC<HomePageConnectedProps> = ({ fetchHotClips, hotClips }) => {
  React.useEffect(() => {
    fetchHotClips(0);
  }, [fetchHotClips]);

  return (
    <div>
      <Header />
      <BoxContainer
        className={styles.gradientContainer}
        containerClassName={styles.shareContainer}
        top
      >
        <TextPointer direction="up">Try searching for a podcast you like</TextPointer>
        <h1 className={styles.shareText}>Share your favorite podcast moments</h1>
        <TextPointer direction="down">Or see what's popular</TextPointer>
      </BoxContainer>
      <BoxContainer
        className={styles.hotClipsBox}
        containerClassName={styles.hotClipsContainer}
        bottom
      >
        <h2 className={styles.hotClipsText}>🔥 Hot clips</h2>
      </BoxContainer>
      <HotClips hotClips={hotClips} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  hotClips: state.home.hotClips,
});

const mapDispatchToProps = {
  fetchHotClips: thunks.fetchHotClips,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
