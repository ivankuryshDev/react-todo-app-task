import React, { Component } from 'react';

import logo from '../../logo.svg';

class Header extends Component {

	render() {
    return (	
      <header>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span>React</span>
        </div>
      </header>
    );
	}
}
export default Header;