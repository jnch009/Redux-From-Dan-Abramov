import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";

import "./styles.css";

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

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

let nextTodoID = 0;
export default function CounterList() {
  const store = createStore(todoApp);

  // we need round brackets to define a functional component
  // the arguments need to be wrapped in curly braces for destructuring
  // => () means return immediately
  // => {} means you need to explicitly call return
  // Presentational Components do not specify any behaviour
  const Todo = ({ onClick, completed, text }) => {
    return (
      <li
        onClick={onClick}
        style={{
          textDecoration: completed ? "line-through" : "none"
        }}
      >
        {text}
      </li>
    );
  };

  const TodoList = ({ todos, onTodoClick }) => (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </ul>
  );

  const AddTodo = ({ onAddClick }) => {
    let input;
    return (
      <div>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button
          onClick={() => {
            onAddClick(input.value);
            input.value = "";
          }}
        >
          Add TODO
        </button>
      </div>
    );
  };

  // Passing children as a prop is the stuff that is inside the component
  const FilterLink = ({ filter, children, currentFilter, onClick }) => {
    if (filter === currentFilter) {
      return <span>{children}</span>;
    }

    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          onClick(filter);
        }}
      >
        {children}
      </a>
    );
  };

  const Footer = ({ visiblityFilter, onFilterClick }) => (
    <p>
      Show:{" "}
      <FilterLink
        filter="SHOW_ALL"
        currentFilter={visiblityFilter}
        onClick={onFilterClick}
      >
        All
      </FilterLink>{" "}
      <FilterLink
        filter="SHOW_ACTIVE"
        currentFilter={visiblityFilter}
        onClick={onFilterClick}
      >
        Active
      </FilterLink>{" "}
      <FilterLink
        filter="SHOW_COMPLETED"
        currentFilter={visiblityFilter}
        onClick={onFilterClick}
      >
        Completed
      </FilterLink>
    </p>
  );

  const TodoApp = ({ todos, visiblityFilter }) => (
    <div>
      <AddTodo
        onAddClick={text =>
          store.dispatch({
            type: "ADD_TODO",
            id: nextTodoID++,
            text
          })
        }
      />
      <TodoList
        todos={getVisibleTodos(todos, visiblityFilter)}
        onTodoClick={id =>
          store.dispatch({
            type: "TOGGLE_TODO",
            id
          })
        }
      />
      <Footer
        visiblityFilter={visiblityFilter}
        onFilterClick={filter =>
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter
          })
        }
      />
    </div>
  );

  const renderListTodo = () => {
    ReactDOM.render(
      <TodoApp {...store.getState()} />,
      document.getElementById("root")
    );
  };
  store.subscribe(renderListTodo);
  renderListTodo();
}
