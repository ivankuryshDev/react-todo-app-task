import React, { Component } from 'react';

import Welcome from '../../components/Welcome/Welcome';
import Question from '../../components/Question/Question';
import InputUserName from '../../components/InputUserName/InputUserName';
import Clock from '../../components/Clock/Clock';
import Greeting from '../../components/Greeting/Greeting';
import Phrase from '../../components/Phrase/Phrase';
import Reset from '../../components/Reset/Reset';
import ToDoLists from '../../components/ToDoLists/ToDoLists';


// Default tasks
var isEmptyLists = JSON.parse(localStorage.getItem('lists'));
if (isEmptyLists === null) {
  var lists = [];
  localStorage.setItem('lists', JSON.stringify(lists));
}

// Checking if user exists
var isEmptyUserName = JSON.parse(localStorage.getItem('userName'));
function isEmpty(user) {
  for (var prop in user) {
    if (user.hasOwnProperty(prop))
      return user;
  }
  return true;
}
var user = isEmpty(isEmptyUserName);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: JSON.parse(localStorage.getItem('lists')),
      isAdded: false,
      userName: user
    };
  }

  getLists() {
    return this.state.lists;
  }

  isEmpty = () => {
    for (var p in this.state.userName) {
      if (this.state.userName.hasOwnProperty(p)) {
        return true;
      }
    }
    return false;
  }

  onAddUser = (user) => {
    localStorage.setItem('userName', JSON.stringify(user));
    this.setState({ userName: user });
  }

  onAddList = (lists) => {
    this.setState({ lists: lists, isAdded: false });
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  onAddTask = (lists) => {
    this.setState({ lists });
    localStorage.setItem("lists", JSON.stringify(lists));
  }
  onDeleteList = (lists) => {
    this.setState({ lists: lists });
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  onEditList = (lists) => {
    this.setState({ lists });
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  onAddListInput = (isAdd) => {
    if (isAdd) {
      this.setState({ isAdded: true });
    } else {
      this.setState({ isAdded: false });
    }
  }

  onReset = () => {
    let lists = this.getLists();
    lists = [];
    localStorage.clear();
    this.setState({ lists });
    this.setState({ userName: true });
  }

  handleInputChange = (lists) => {
    this.setState({ lists: lists });
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  render() {
    return (
      <main>
        <div className="container-fluid">
          {
            this.state.userName === true ?
              (
                <div className="row">
                  <div className="col">
                    <Welcome />
                    <Question />
                    <InputUserName onAddUser={this.onAddUser}/>
                  </div>
                </div>
              ) : (


                <div className="row">
                  <div className="col-md-9">
                    <Clock />
                    <Greeting userName={this.state.userName}/>
                    <Phrase />
                    <Reset onReset={this.onReset}/>
                  </div>
                  <div className="col-md-3 to-do-lists-column-container">
                    <ToDoLists 
                      lists={this.state.lists} 
                      isAdded={this.state.isAdded} 
                      onDeleteList={this.onDeleteList}
                      onEditList={this.onEditList}
                      onAddTask={this.onAddTask}
                      handleInputChange={this.handleInputChange}
                      
                      onAddList={this.onAddList}
                      onAddListInput={this.onAddListInput}
                      />
                    {/* <div className="to-do-lists">
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
                              <AddList onAddList={this.onAddList} onAddListInput={this.onAddListInput} />
                            ) : (
                              <div className="add-list" onClick={this.onAddListInput}>
                                <span>Add list</span>
                              </div>
                            )
                        }
                      </div>
                    </div> */}
                  </div>
                </div>



              )
          }
        </div>
      </main>
    );
  }
}
export default Main;