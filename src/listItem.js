import React, { Component } from 'react';

import{
	BrowserRouter as Router
} from 'react-router-dom';

import TaskItem from './taskItem';
import AddTask from './addTask';
class ListItem extends Component {
    constructor(props){
		super(props);
		this.state = {
      isEdit: false,
      isAdded: false
		};
		this.onDeleteList = this.onDeleteList.bind(this);
		this.onDeleteTask = this.onDeleteTask.bind(this);
		this.onEdit = this.onEdit.bind(this);
    this.onEditList = this.onEditList.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onAddTaskInput = this.onAddTaskInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onDeleteList(){
    var {onDeleteList, id} = this.props;
		onDeleteList(id);
  }

  onDeleteTask(taskId){
    var {onDeleteTask, id} = this.props;
    onDeleteTask(id, taskId);
  }

  onEdit(){
    if(this.state.isEdit){
      this.setState({ isEdit: false });
    }else{
      this.setState({ isEdit: true });
    }
  }

  onEditList(event){
    event.preventDefault();
    this.props.onEditList(this.nameInput.value, this.props.id);
		this.setState({ isEdit: false });
  }

  onEditTask(taskId, taskName){
    var {onEditTask, id} = this.props;
    onEditTask(id, taskId, taskName);
  }

  onAddTask(name){
    var {onAddTask, id} = this.props;
    onAddTask(id, name);
    this.setState({ isAdded: false});
  }
  onAddTaskInput(){
    if(this.state.isAdded){
      this.setState({ isAdded: false});
    }else{
      this.setState({ isAdded: true});
    }
  }
  handleInputChange(taskId, value){
    var {handleInputChange, id} = this.props;
    handleInputChange(id, taskId, value);
  }
  
  render() {
    var {id, name, tasks, todo} = this.props;
    return (
      <Router>
            <div className="card-header" id={`heading${id}`}>
              <div className="" type="button" data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="true" aria-controls={`collapse${id}`}>
                  {
                    this.state.isEdit ?
                    (
                      <form onSubmit={this.onEditList}>
                        <div className="row no-gutters">
                          <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="button-addon2" ref={nameInput => this.nameInput = nameInput} defaultValue={name} required/>
                            <div className="input-group-append" id="button-addon2">
                              <button className="btn btn-outline-secondary"><i className="fa fa-check"></i></button>
                              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.onEdit}><i className="fa fa-close"></i></button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ):(
                      <div className="row no-gutters">
                        <div className="col-10">
                          <p className="task">{name} <span>({todo} TO DO)</span></p>
                        </div>
                        <div className="col-2">
                          <div className="dropdown">
                            <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-cog" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" onClick={this.onEdit}><i className="fa fa-edit fa-fw"></i>Edit</a>
                              <a className="dropdown-item" onClick={this.onDeleteList}><i className="fa fa-close fa-fw"></i>Delete</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
              </div>
            </div>

            <div id={`collapse${id}`} className="collapse" aria-labelledby={`heading${id}`} data-parent="#accordionExample">
              <div className="card-body">
              {
                typeof tasks !== "undefined" ?
                (
                  tasks.map((task) => {
                    return (
                      <div key={task.id} className="">
                        <TaskItem
                          key={task.id}
                          {...task}
                          onDeleteTask={this.onDeleteTask}
                          onEditList={this.onEditList}
                          onEditTask={this.onEditTask}
                          handleInputChange={this.handleInputChange}
                          />
                      </div>
                          );
                        })
                ) : (
                  <div></div>
                )
              }
              {
                this.state.isAdded ?
                (
                  <AddTask onAddTask={this.onAddTask} onAddTaskInput={this.onAddTaskInput}/>
                ):(
                  <li className="list-group-item" onClick={this.onAddTaskInput}>
                    <div className="row">
                      <div className="col">
                        <span>Add task</span>
                      </div>
                    </div>
                  </li>
                )
              }
              </div>
            </div>
      </Router>
    );
  }
}
export default ListItem;