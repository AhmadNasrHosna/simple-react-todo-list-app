if (module.hot) {
  module.hot.accept();
}

import "../styles/styles.css";

import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./modules/todolist";
const destination = document.querySelector("#root");

ReactDOM.render(<TodoList />, destination);
