import React, { Component } from 'react';

import {
  BrowserRouter as Router
} from 'react-router-dom';
class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }

  onDeleteTask = () => {
    const { onDeleteTask, id } = this.props;
    onDeleteTask(id);
  }

  onEdit = () => {
    if (this.state.isEdit) {
      this.setState({ isEdit: false });
    } else {
      this.setState({ isEdit: true });
    }
  }

  onEditTask = (event) => {
    event.preventDefault();
    this.props.onEditTask(this.props.id, this.nameInput.value);
    this.setState({ isEdit: false });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.handleInputChange(this.props.id, value);
  }

  render() {
    const { id, taskName, isСompleted } = this.props;
    return (
      <Router>
        {
          this.state.isEdit
            ? (
              <li className="list-group-item">
                <div className="row no-gutters">
                  <div className="col">
                    <form onSubmit={this.onEditTask}>
                      <div className="form-group mb-3">
                        <div className="input-group-append">
                          <div className="row no-gutters">
                            <div className="col-8">
                              <input placeholder="Name" className="form-control" ref={nameInput => this.nameInput = nameInput} defaultValue={taskName} required />
                            </div>
                            <div className="col-4">
                              <div className="ui-group-buttons">
                                <button className="btn btn-success"><i className="fa fa-check"></i></button>
                                <div className="or"></div>
                                <button className="btn btn-danger" onClick={this.onEdit}><i className="fa fa-close"></i></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            )
            : (
              <li className="list-group-item box1">
                <div className="row no-gutters">
                  <label className="checkbox">
                    <input type="checkbox" defaultChecked={isСompleted} onChange={this.handleInputChange} />
                    <span className="success"></span>
                  </label>
                  <p className="item">
                    {
                      isСompleted ?
                        (
                          <s><span className="task-name">{taskName}</span></s>
                        ) : (
                          <span className="task-name">{taskName}</span>
                        )
                    }
                  </p>
                </div>
              </li>
            )
        }
      </Router>
    );
  }
}
export default TaskItem;