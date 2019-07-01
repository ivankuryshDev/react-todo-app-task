import React, { Component } from 'react';

class AddList extends Component {

	onSubmit = (event) => {
		event.preventDefault();
    this.props.onAddList(this.nameInput.value);
		this.nameInput.value = '';
  }
  
  onAddListInput = () => {
    this.props.onAddListInput();
  }

	render() {
		return (
        <form onSubmit={this.onSubmit}>
          <div className="form-group mb-3">
            <div className="input-group-append">
              <div className="row no-gutters">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="New list" aria-label="New list" aria-describedby="button-addon2" ref={nameInput => this.nameInput = nameInput} required/>
                  <div className="input-group-append" id="button-addon2">
                    <button className="btn btn-outline-secondary"><i className="fa fa-check"></i></button>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.onAddListInput}><i className="fa fa-close"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
		);
	}
}
export default AddList;