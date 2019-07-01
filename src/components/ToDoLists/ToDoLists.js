import React, { Component } from 'react';

import ListItem from '../../containers/Main/ListItem/ListItem';
import AddList from '../AddList/AddList';

class ToDoLists extends Component {

  onAddTask = (listId, taskName) => {
    var lists = this.props.lists;
    for (var item in lists) {
      if (lists[item].id === listId) {
        ++lists[item].todo;
        if (lists[item].tasks !== undefined) {
          var id = lists[item].tasks.length + 1;
        } else {
          var id = 1;
          lists[item].tasks = [];
        }
        lists[item].tasks.push({
          id,
          taskName,
          isСompleted: false
        });
      }
    }
    this.props.onAddTask(lists);
  }

  onEditList = (name, id) => {
    let lists = this.props.lists;
    lists = lists.map(list => {
      if (list.id === id) {
        list.name = name;
      }
      return list;
    });
    this.props.onEditList(lists);
  }

  onDeleteList = (listId) => {
    const lists = this.props.lists;
    for (var item in lists) {
      if (lists[item].id === listId) {
        var index = lists.findIndex(x => x.id === listId);
        lists.splice(index, 1);
      }
    }
    this.props.onDeleteList(lists);
  }

  handleInputChange = (listId, taskId, value) => {
    let lists = this.props.lists;
    for (var item in lists) {
      for (var task in lists[item].tasks) {
        if (lists[item].tasks[task].id === taskId && lists[item].id === listId) {
          lists[item].tasks[task].isСompleted = value;
        }
      }
    }

    lists = lists.map(list => {
      if (list.id === listId) {
        if (value) {
          --list.todo;
        } else {
          ++list.todo;
        }
      }
      return list;
    });
    this.props.handleInputChange(lists);
  }

  onAddList = (name) => {
    var lists = this.props.lists;
    var id = lists.length + 1;
    var todo = 0;
    lists.push({
      id,
      name,
      todo
    });
    this.props.onAddList(lists);
  }

  onAddListInput = () => {
    if (this.props.isAdded) {
      this.props.onAddListInput(false);
    } else {
      this.props.onAddListInput(true);
    }
  }
  
  render() {
    return (
      <div className="to-do-lists">
        <div className="accordion" id="accordionExample">
          {
            typeof this.props.lists !== "undefined" ?
              (
                this.props.lists.map((list) => {
                  return (
                    <div key={list.id} className="">
                      <div className="card">
                        <ListItem
                          key={list.id}
                          {...list}
                          onAddTask={this.onAddTask}
                          onEditList={this.onEditList}
                          onDeleteList={this.onDeleteList}
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
            this.props.isAdded ?
              (
                <AddList onAddList={this.onAddList} onAddListInput={this.onAddListInput} />
              ) : (
                <div className="add-list" onClick={this.onAddListInput}>
                  <span>Add list</span>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}
export default ToDoLists;