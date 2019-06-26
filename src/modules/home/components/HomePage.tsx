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
import { FireIcon } from 'mdi-react';

type HomePageConnectedProps = {
  fetchHotClips: (num: number) => void;
  hotClips: HomeState['hotClips'];
};

const styles = {
  gradientContainer: css({
    backgroundImage: colors.gradient,
    height: 300,
  }),
  shareContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  }),
  shareText: css({
    '@media (max-width: 800px)': {
      fontSize: '2rem',
    },
    fontSize: '2.5rem',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: '0.05em',
    lineHeight: 1,
  }),
  hotClipsContainer: css({
    backgroundImage: 'linear-gradient(190deg, rgba(196,214,252,1) 1%, rgba(196,214,252,0) 70.9% )',
    paddingTop: 60,
    paddingBottom: 60,
  }),
  hotClipsText: css({
    '& > svg': {
      marginRight: 12,
    },
    textAlign: 'center',
    color: colors.gray600,
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
      <div className={styles.hotClipsContainer}>
        <h2 className={styles.hotClipsText}>
          <FireIcon size={30} /> Hot clips
        </h2>
        <HotClips hotClips={hotClips} />
      </div>
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
