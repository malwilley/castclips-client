import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import SearchPage from './Search/SearchPage';
import PodcastPage from './Podcast/PodcastPage';
import EpisodePage from './Episode/EpisodePage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="bg-primary m0 py2 px3">
            <div className="page-container">
              <Link to="/">
                <h1 className="h2 m0 white">castclips</h1>
              </Link>
            </div>
          </header>
          <Route exact={true} path="/" component={SearchPage} />
          <Route path="/podcast" component={PodcastPage} />
          <Route path="/episode" component={EpisodePage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
