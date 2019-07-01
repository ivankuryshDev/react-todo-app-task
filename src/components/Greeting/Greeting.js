import React, { Component } from 'react';

class Greeting extends Component {

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="greeting">
            <p>Hi {this.props.userName}!</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Greeting;