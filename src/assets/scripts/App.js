import "../styles/styles.css";
if (module.hot) {
  module.hot.accept();
}

import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./modules/todolist";
var destination = document.querySelector("#root");

ReactDOM.render(<TodoList />, destination);
