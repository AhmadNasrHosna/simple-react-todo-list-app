import React, { Component } from "react";
import TodoItems from "./todoitems";
import { DateTime } from "luxon";

class TodoList extends Component {
  constructor(props) {
    super(props);

    let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    this.state = {
      todoListItems: storedTodos
    };

    this.addTodoItem = this.addTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
    this.storeCheckedTodoItem = this.storeCheckedTodoItem.bind(this);
    this.handleEmptyListMessage = this.handleEmptyListMessage.bind(this);
  }

  componentDidMount() {
    this._inputElement.focus();
    this.handleEmptyListMessage();
  }

  componentDidUpdate() {
    this.handleEmptyListMessage();
  }

  handleEmptyListMessage() {
    // If our Todo list is empty:
    if (this.state.todoListItems.length == 0) {
      // show message
      if (this._emptyListMessage.classList.contains("is-hidden")) {
        this._emptyListMessage.classList.remove("is-hidden");
      }
    } else {
      // hide the message
      this._emptyListMessage.classList.add("is-hidden");
    }
  }

  addTodoItem(e) {
    e.preventDefault();

    const input = this._inputElement;

    if (input.value == "") return; // Stop adding empty values

    let newToDoItem = {
      text: input.value,
      key: Date.now(),
      isChecked: false
    };

    const updatedTodoList = this.state.todoListItems.concat(newToDoItem);

    this.setState(() => ({
      todoListItems: updatedTodoList
    }));

    localStorage.setItem("todos", JSON.stringify(updatedTodoList));

    input.value = "";
    input.focus();

    console.log(this.state.todoListItems);
  }

  deleteTodoItem(key) {
    const filteredTodoItems = this.state.todoListItems.filter((item) => {
      return item.key != key;
    });

    this.setState({
      todoListItems: filteredTodoItems
    });

    localStorage.setItem("todos", JSON.stringify(filteredTodoItems));
  }

  storeCheckedTodoItem(item) {
    item.isChecked = !item.isChecked;

    this.setState({
      todoListItems: this.state.todoListItems
    });

    localStorage.setItem("todos", JSON.stringify(this.state.todoListItems));
  }

  render() {
    // array does not exist, is not an array, or is empty

    return (
      <div className="c-todolist">
        <header className="c-todolist__header u-align-center">
          <div className="c-todolist__time">
            <time>{DateTime.fromJSDate(new Date()).toFormat("DDDD")}</time>
          </div>
          <img src="../../assets/images/illustration.jpg" alt="Todo List" />
          <h1 className="c-todolist__title">To do List</h1>
        </header>
        <div className="c-todolist__messages u-align-center">
          <p
            className="c-todolist__message"
            ref={(el) => (this._emptyListMessage = el)}
          >
            You haven&apos;t created any tasks yet!
          </p>
        </div>
        <div className="c-todolist__items">
          <TodoItems
            entries={this.state.todoListItems}
            deleteItem={this.deleteTodoItem}
            storeItem={this.storeCheckedTodoItem}
          />
        </div>
        <footer className="c-todolist__footer">
          <form onSubmit={this.addTodoItem}>
            <input
              ref={(el) => (this._inputElement = el)}
              type="text"
              placeholder="add task ..."
              className="u-align-center"
            ></input>
            <button type="submit" className="c-todolist__add">
              <span className="u-sr-only">Add new task</span>
            </button>
          </form>
        </footer>
      </div>
    );
  }
}

export default TodoList;

// I learnt how to check if an JS array is empty or does not exist from here:
// https://stackoverflow.com/questions/24403732/check-if-array-is-empty-or-does-not-exist-js
