import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './Search/SearchPage';
import PodcastPage from './Podcast/PodcastPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="bg-primary m0 py2 px3">
            <div className="page-container">
              <h1 className="h2 m0 white">pod-clips</h1>
            </div>
          </header>
          <Route exact={true} path="/" component={SearchPage} />
          <Route path="/podcast" component={PodcastPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
