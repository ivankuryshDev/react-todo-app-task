import React, { Component } from 'react';


class Welcome extends Component {

  onAddUser = (event) => {
    event.preventDefault();
    this.props.onAddUser(this.nameInput.value);
    this.nameInput.value = '';
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="input-user-name">
            <div className="input-group mb-3">
              <input type="text" className="form-control" maxLength="12" placeholder="up to 12 characters" ref={nameInput => this.nameInput = nameInput} required />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-go" type="button" id="button-addon2" onClick={this.onAddUser}>Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Welcome;