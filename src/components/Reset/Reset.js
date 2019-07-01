import React, { Component } from 'react';

class Reset extends Component {
  onReset = () => {
    this.props.onReset();
  }
  render() {
    return (
      <button onClick={this.onReset} className="reset">Reset</button>
    );
  }
}
export default Reset;