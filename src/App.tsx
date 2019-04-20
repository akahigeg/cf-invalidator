import * as React from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
      <SiteHeader />
        <h1 className="App-title">Welcome to React</h1>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      <SiteFooter />
      </div>
    );
  }
}

export default App;
