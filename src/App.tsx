import * as qs from 'querystringify';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ClipPage from 'src/modules/clip/components/ClipPage';
import EpisodePage from 'src/modules/episode/components/EpisodePage';
import PodcastPage from 'src/modules/podcast/PodcastPage';
import SigninPage from './modules/auth/components/SigninPage';
import HomePage from './modules/home/components/HomePage';
import SearchResultsPage from './modules/search/components/SearchResultsPage';
import { SearchType } from './modules/search/types';
import Footer from './components/Footer';
import { css } from 'emotion';

const styles = {
  main: css({
    minHeight: '100vh',
    paddingBottom: 100,
  }),
};

const App: React.FC = () => (
  <>
    <div className={styles.main}>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path="/signin" component={SigninPage} />
        <Route
          path="/podcast/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <PodcastPage id={id} />}
        />
        <Route path="/episode/:id" component={EpisodePage} />
        <Route
          path="/clip/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <ClipPage id={id} />}
        />
        <Route
          path="/search"
          render={({ location: { search } }) => {
            const { q, type } = qs.parse(search) as { q: string; type: SearchType };
            return <SearchResultsPage query={q} type={type} />;
          }}
        />
      </Switch>
    </div>
    <Footer />
  </>
);

export default App;
