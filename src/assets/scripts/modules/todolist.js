import React, { Component } from "react";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooListItems: []
    };

    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();

    const input = this._inputElement;

    if (input.value == "") return;

    let newToDoItem = {
      text: input.value,
      key: Date.now()
    };

    this.setState(({ tooListItems }) => ({
      tooListItems: tooListItems.concat(newToDoItem)
    }));

    input.value = "";
    input.focus();

    console.log(this.state.tooListItems);
  }

  componentDidMount() {
    this._inputElement.focus();
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              ref={(el) => (this._inputElement = el)}
              placeholder="enter task"
            ></input>
            <button type="submit">add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoList;
