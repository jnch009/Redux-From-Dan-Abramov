import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

import TodoApp from "./components/presentational/TodoApp";
import todoApp from "./reducers/reducersTodoList";

import "./styles.css";

export default function CounterList() {
  // const persistedState = {
  //   todos: [
  //     {
  //       id: 0,
  //       text: "Welcome Back",
  //       completed: true
  //     }
  //   ],
  //   visibilityFilter: "SHOW_COMPLETED"
  // };

  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);

  store.subscribe(
    throttle(() => {
      saveState({ todos: store.getState().todos });
    }, 1000)
  );

  console.log(store.getState());
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
}
