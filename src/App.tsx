import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ClipPage from '~/modules/Clip/ClipPage';
import EpisodePage from '~/modules/Episode/EpisodePage';
import PodcastPage from '~/modules/Podcast/PodcastPage';
import SigninPage from './modules/auth/components/SigninPage';
import HomePage from './modules/home/components/HomePage';

class App extends React.Component {
  render() {
    return (
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
