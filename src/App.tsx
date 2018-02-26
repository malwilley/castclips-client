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
            <h1 className="m0 white">pod-clips</h1>
          </header>
          <Route path="/" component={SearchPage} />
          <Route path="/podcast" component={PodcastPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
