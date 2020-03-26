import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import TodoApp from "./components/presentational/TodoApp";
import todoApp from "./reducers/reducersTodoList";

import "./styles.css";

export default function CounterList() {
  const store = createStore(todoApp);
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
}
