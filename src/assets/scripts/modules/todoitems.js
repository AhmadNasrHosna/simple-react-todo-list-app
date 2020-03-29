import React, { Component } from "react";

class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.creatTodoItems = this.creatTodoItems.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  creatTodoItems(item) {
    return (
      <li className="c-todolist__item" key={item.key}>
        {item.text}
        <button
          class="c-todolist__delete"
          onClick={() => this.deleteTodoItem(item.key)}
        >
          <span className="c-todolist__delete__icon"></span>
          <span className="u-sr-only">Delete this todo item</span>
        </button>
      </li>
    );
  }

  deleteTodoItem(key) {
    this.props.delete(key);
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.creatTodoItems);
    return <ul className="o-list-bare">{listItems}</ul>;
  }
}

export default TodoItems;
