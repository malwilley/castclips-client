import { parse } from 'querystringify';
import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SearchType } from './modules/search/types';
import Footer from './components/Footer';
import { css } from 'emotion';
import PulsingLogo from './components/PulsingLogo';
import Header from './modules/header';

const styles = {
  main: css({
    minHeight: '100vh',
    paddingBottom: 100,
  }),
};

const HomePage = lazy(() => import('src/modules/home/components/HomePage'));
const SearchResultsPage = lazy(() => import('src/modules/search/components/SearchResultsPage'));
const SigninPage = lazy(() => import('src/modules/auth/components/SigninPage'));
const PodcastPage = lazy(() => import('src/modules/podcast/components/PodcastPage'));
const EpisodePage = lazy(() => import('src/modules/episode/components/EpisodePage'));
const ClipPage = lazy(() => import('src/modules/clip/components/ClipPage'));

const App: React.FC = () => (
  <>
    <Suspense fallback={<PulsingLogo />}>
      <div className={styles.main}>
        <Route
          path="/"
          render={({ location: { search } }) => {
            const { q } = parse(search) as { q?: string };
            return <Header searchText={q} />;
          }}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
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
              const { q, type, page } = parse(search) as {
                q: string;
                type: SearchType;
                page: number;
              };
              return <SearchResultsPage query={q} type={type} page={page} />;
            }}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  </>
);

export default App;
