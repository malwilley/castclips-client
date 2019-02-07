import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import ClipPage from '~/modules/Clip/ClipPage';
import EpisodePage from '~/modules/Episode/EpisodePage';
import PodcastPage from '~/modules/Podcast/PodcastPage';
import SearchPage from '~/modules/Search/SearchPage';
import { css } from 'emotion';
import { colors } from '~/styles';

const styles = {
  logo: css({
    borderBottom: `4px solid ${colors.tertiary}`,
    color: colors.light,
    display: 'inline-block',
    fontSize: 28,
    padding: '0 6px',
  }),
  pageContainer: css({
    maxWidth: '1000px',
    margin: '0 auto',
    clear: 'both',
    position: 'relative',
  }),
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="bg-primary m0 py2 px3">
          <div className={styles.pageContainer}>
            <Link to="/">
              <h1 className={styles.logo}>castclips</h1>
            </Link>
          </div>
        </header>
        <Route exact={true} path="/" component={SearchPage} />
        <Route
          path="/podcast/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <PodcastPage id={id} />}
        />
        <Route
          path="/episode/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <EpisodePage id={id} />}
        />
        <Route
          path="/clip/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <ClipPage id={id} />}
        />
      </div>
    );
  }
}

export default App;
