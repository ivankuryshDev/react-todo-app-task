import React, { Component } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import Footer from './components/Footer/Footer';

import './App.css';
class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Main/>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
