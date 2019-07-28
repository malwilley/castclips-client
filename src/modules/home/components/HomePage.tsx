import React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/redux/types';
import { thunks } from '../redux';
import BoxContainer from 'src/components/BoxContainer';
import TextPointer from './TextPointer';
import HotClips from './HotClips';

const styles = {
  gradientContainer: css({
    backgroundImage: colors.gradient,
    height: '25rem',
    marginTop: -32,
    zIndex: -1,
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
    fontSize: '3rem',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 1,
  }),
  downPointer: css({
    marginBottom: 40,
  }),
  upPointer: css({
    marginTop: 32,
  }),
  hotClipsContainer: css({
    marginTop: -70,
    paddingBottom: 60,
  }),
  search: css({
    gridTemplateArea: 'search',
    margin: '0 auto',
  }),
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const hotClips = useSelector((state: AppState) => state.home.hotClips);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(thunks.fetchHotClips(0));
  }, []);

  return (
    <div>
      <BoxContainer
        className={styles.gradientContainer}
        containerClassName={styles.shareContainer}
        bottom
      >
        <TextPointer className={styles.upPointer} direction="up">
          Try searching for a podcast you like
        </TextPointer>
        <h1 className={styles.shareText}>Share your favorite podcast moments.</h1>
        <TextPointer className={styles.downPointer} direction="down">
          Or see what's popular
        </TextPointer>
      </BoxContainer>
      <div className={styles.hotClipsContainer}>
        <HotClips hotClips={hotClips} />
      </div>
    </div>
  );
};

export default HomePage;
