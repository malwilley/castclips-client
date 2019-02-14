import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ClipPage from '~/modules/Clip/ClipPage';
import EpisodePage from '~/modules/Episode/EpisodePage';
import PodcastPage from '~/modules/Podcast/PodcastPage';
import SearchPage from '~/modules/Search/SearchPage';

/*
const styles = {
  logo: css({
    borderBottom: `4px solid ${colors.tertiary}`,
    color: colors.light,
    display: 'inline-block',
    fontSize: 28,
    padding: '0 6px',
  }),
};
*/

class App extends React.Component {
  render() {
    return (
      <Switch>
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
      </Switch>
    );
  }
}

export default App;
