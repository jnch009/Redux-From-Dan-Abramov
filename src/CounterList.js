import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { createStore, combineReducers } from "redux";

export const addCounter = list => {
  return [...list, 0];
};

export const removeCounter = (list, index) => {
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

export const incrementCounter = (list, index) => {
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};

export const toggleTodo = todo => {
  return { ...todo, completed: !todo.completed };
};

//Reducer Composition with Arrays
export const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { id: action.id, text: action.text, completed: false };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }

      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

export const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// adding a new property
const visiblityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visiblityFilter
});

let nextTodoID = 0;
export default function CounterList() {
  const store = createStore(todoApp);

  class TodoApp extends React.Component {
    render() {
      return (
        <div>
          <input
            ref={node => {
              this.input = node;
            }}
          />
          <button
            onClick={() => {
              store.dispatch({
                type: "ADD_TODO",
                text: this.input.value,
                id: nextTodoID++
              });
              this.input.value = "";
            }}
          >
            Add TODO
          </button>
          <ul>
            {this.props.todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  const renderListTodo = () => {
    ReactDOM.render(
      <TodoApp todos={store.getState().todos} />,
      document.getElementById("root")
    );
  };
  store.subscribe(renderListTodo);
  renderListTodo();
}
