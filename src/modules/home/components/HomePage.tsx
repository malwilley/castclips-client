import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';
import Header from '~/modules/header';
import Typeahead from '~/modules/search/components/Typeahead';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { thunks } from '../redux';
import { HomeState } from '../types';
import HotClip from './HotClip';
import HttpContent from '~/components/HttpContent';
import LayoutContainer from '~/components/LayoutContainer';

type HomePageConnectedProps = {
  fetchHotClips: (num: number) => void;
  hotClips: HomeState['hotClips'];
};

const styles = {
  main: css({
    display: 'grid',
    gridTemplateRows: '[gradient] 700px',
  }),
  gradientContainer: css({
    display: 'grid',
    gridTemplateRows: '[header] auto [title] 1fr [search] 1fr',
    gridTemplateArea: 'gradient',
    backgroundImage: colors.gradient2,
    color: colors.lightest,
  }),
  clipsContainer: css({
    marginTop: -150,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: 20,
    rowGap: 20,
    padding: '0 40px',
    maxWidth: 1400,
  }),
  header: css({
    gridTemplateArea: 'header',
    background: 'none',
  }),
  headerText: css({
    gridTemplateArea: 'title',
    marginTop: 150,
    textAlign: 'center',
    letterSpacing: 1,
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
    <div className={styles.main}>
      <div className={styles.gradientContainer}>
        <Header className={styles.header} showSearch={false} />
        <h1 className={styles.headerText}>Share your favorite podcast moments</h1>
        <Typeahead className={styles.search} />
      </div>
      <LayoutContainer className={styles.clipsContainer}>
        <HttpContent
          request={hotClips}
          renderSuccess={clips => (
            <>
              {clips.map(clip => (
                <HotClip clip={clip} />
              ))}
            </>
          )}
        />
      </LayoutContainer>
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
