import React, { Component } from 'react';

class AddTask extends Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddTaskInput = this.onAddTaskInput.bind(this);
  }
  
  onAddTaskInput(){
    this.props.onAddTaskInput();
  }

	onSubmit(event){
		event.preventDefault();
    this.props.onAddTask(this.nameInput.value);
		this.nameInput.value = '';
	}

	render() {
		return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <div className="input-group-append">
            <div className="row no-gutters">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="New task" aria-label="Name" aria-describedby="button-addon2" ref={nameInput => this.nameInput = nameInput} required/>
                <div className="input-group-append" id="button-addon2">
                  <button className="btn btn-outline-secondary"><i className="fa fa-check"></i></button>
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.onAddTaskInput}><i className="fa fa-close"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
		);
	}
}
export default AddTask;