import React, { Component } from 'react';

import Clock from 'react-live-clock';


class Clockf extends Component {

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="time">
            <Clock className="time-clock" format={'HH:mm'} ticking={true} timezone={'Europe/Warsaw'} />
          </div>
        </div>
      </div>
    );
  }
}
export default Clockf;