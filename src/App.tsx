import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './Search/SearchPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="bg-red m0 p2">
            <h1 className="m0 white">podclips</h1>
          </header>
          <Route path="/" component={SearchPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
