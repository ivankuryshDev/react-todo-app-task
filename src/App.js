import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Clock from 'react-live-clock';

import ListItem from '../src/listItem';
import AddList from '../src/addList';

import logo from './logo.svg';
import './App.css';

// Default tasks
var isEmptyLists = JSON.parse(localStorage.getItem('lists'));
if (isEmptyLists === null){
	var lists = [
		{
			id: 1,
      name: 'Example',
      todo: 2,
			tasks: [
        {
          id: 1,
          taskName: 'Task 1',
          isСompleted: false
        },
        {
          id: 2,
          taskName: 'Task 2',
          isСompleted: false
        }
			]
		}
	];
  localStorage.setItem('lists', JSON.stringify(lists));
}

// Checking if user exists
var isEmptyUserName = JSON.parse(localStorage.getItem('userName'));
function isEmpty(user) {
  for(var prop in user) {
    if(user.hasOwnProperty(prop))
        return user;
  }
  return true;
}
var user = isEmpty(isEmptyUserName);
class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      role: null,
      id: null,
      name: null,
      lists: JSON.parse(localStorage.getItem('lists')),
      isAdded: false,
      userName: user
    };
    this.onAddList = this.onAddList.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onAddListInput = this.onAddListInput.bind(this);
		this.onDeleteList = this.onDeleteList.bind(this);
    this.onEditList = this.onEditList.bind(this);
    this.reset = this.reset.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
  }

  getLists(){
		return this.state.lists;
  }
  
  isEmpty(){
    for(var p in this.state.userName) {
      if(this.state.userName.hasOwnProperty(p)){
        return true;
      }
    }
    return false;
  }

  onAddUser(event){
    event.preventDefault();
    localStorage.setItem('userName', JSON.stringify(this.nameInput.value));
    this.setState({ userName: this.nameInput.value});
    this.nameInput.value = '';
  }

  onAddList(name){
    var lists = this.getLists();
    var id = lists.length + 1;
    var todo = 0;
    lists.push({
      id,
      name,
      todo
    });
    this.setState({lists: lists, isAdded: false});
    localStorage.setItem("lists", JSON.stringify(lists));
    
  }
  onAddTask(listId, taskName){
    var lists = this.getLists();
    lists = lists.map(list => {
			if (list.id === listId){
				list.todo = list.todo + 1;
			}
			return list;
    });
    
    for(var item in lists){
      if(lists[item].id === listId){
        if(lists[item].tasks !== undefined){
          var id = lists[item].tasks.length + 1;
          lists[item].tasks.push({
            id,
            taskName,
            isСompleted: false
          });
        } else{
          var id = 1;
          lists[item].tasks = [];
          lists[item].tasks.push({
            id,
            taskName,
            isСompleted: false
          });
        }
      }
      this.setState({lists});
      localStorage.setItem("lists", JSON.stringify(lists));
    }
  }
  onDeleteList(listId){
    const lists = this.getLists();
    for(var item in lists){
      if(lists[item].id === listId){
        var index = lists.findIndex(x => x.id === listId);
        lists.splice(index, 1);
      }
    }
    this.setState({lists: lists});
    localStorage.setItem("lists", JSON.stringify(lists));
  }
  
  onEditList(name, id){
    let lists = this.getLists();
		lists = lists.map(list => {
			if (list.id === id){
				list.name = name;
			}
			return list;
		});
    this.setState({ lists });
    localStorage.setItem("lists", JSON.stringify(lists));
  }
  
  onAddListInput(){
    if(this.state.isAdded){
      this.setState({ isAdded: false});
    }else{
      this.setState({ isAdded: true});
    }
  }
  reset(){
    let lists = this.getLists();
    lists = [];
    localStorage.clear();
    this.setState({lists});
    this.setState({userName: true});
  }
  handleInputChange(listId, taskId, value){
    console.log("value", value);
    let lists = this.getLists();
    for(var item in lists){
      for(var task in lists[item].tasks){
        if(lists[item].tasks[task].id === taskId && lists[item].id === listId){
          lists[item].tasks[task].isСompleted = value;
        }
      }
    }

    lists = lists.map(list => {
			if (list.id === listId){
        if(value){
          list.todo = list.todo - 1;
        }else{
          list.todo = list.todo + 1;
        }
			}
			return list;
		});
    this.setState({ lists: lists });
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <span>React</span>
              <button onClick={this.reset} className="reset">Reset</button>
            </div>
          </header>
          <main>
            <div className="container-fluid">
              {
                 this.state.userName === true ?
                (
                  <div className="row">
                      <div className="col">
                        <div className="row">
                          <div className="col">
                            <div className="welcome">
                                Welcome to React To-Do!
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="question">
                              <p>What is your name?</p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="input-user-name">
                                <div className="input-group mb-3">
                                  <input type="text" className="form-control" maxLength="12" placeholder="up to 12 characters" ref={nameInput => this.nameInput = nameInput} required/>
                                  <div className="input-group-append">
                                    <button className="btn btn-outline-secondary btn-go" type="button" id="button-addon2" onClick={this.onAddUser}>Go</button>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  ):(
                    <div className="row">
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col">
                            <div className="time">
                              <Clock className="time-clock" format={'HH:mm'} ticking={true} timezone={'Europe/Warsaw'} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="greeting">
                              <p>Hi {this.state.userName}!</p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="phrase">
                                It's a beautiful day, isn't it?
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 to-do-lists-column-container">
                        <div className="to-do-lists">
                        <div className="accordion" id="accordionExample">
                          {
                            typeof this.state.lists !== "undefined" ?
                            (
                              this.state.lists.map((list) => {
                                return (
                                  <div key={list.id} className="">
                                    <div className="card">
                                      <ListItem
                                        key={list.id}
                                        {...list}
                                        onDeleteList={this.onDeleteList}
                                        onEditList={this.onEditList}
                                        onAddTask={this.onAddTask}
                                        handleInputChange={this.handleInputChange}
                                      />
                                    </div> 
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
                              <AddList onAddList={this.onAddList} onAddListInput={this.onAddListInput}/>
                            ):(
                              <div className="add-list" onClick={this.onAddListInput}>  
                                <span>Add list</span>
                              </div>
                            )
                          }
                          </div>
                        </div>
                      </div>
                    </div>
                )
              }
            </div>
          </main>
          <footer>
            <div className="container-fluid">
              <div className="row">
                <div className="App-footer">
                  <span></span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}
export default App;
