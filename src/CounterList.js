import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import "./styles.css";

let nextTodoID = 0;
const addTodo = text => {
  return {
    type: "ADD_TODO",
    id: nextTodoID++,
    text
  };
};

const visibleTodo = id => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};

const setFilter = filter => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter
  };
};

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

export default function CounterList() {
  let AddTodo = ({ dispatch }) => {
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
            dispatch(addTodo(input.value));
            input.value = "";
          }}
        >
          Add TODO
        </button>
      </div>
    );
  };
  AddTodo = connect()(AddTodo);

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

  //subscribes to the store
  const mapVisibleTodoStateToProps = state => {
    return {
      todos: getVisibleTodos(state.todos, state.visiblityFilter)
    };
  };

  const mapVisibleTodoDispatchToProps = dispatch => {
    return {
      onTodoClick: id => dispatch(visibleTodo(id))
    };
  };

  const VisibleTodoList = connect(
    mapVisibleTodoStateToProps,
    mapVisibleTodoDispatchToProps
  )(TodoList);

  // Presentational Component
  // children is simply what is inside the component
  const Link = ({ active, children, onClick }) => {
    if (active) {
      return <span>{children}</span>;
    }

    return (
      <a href="#" onClick={onClick}>
        {children}
      </a>
    );
  };

  const mapFilterLinkStateToProps = (state, ownProps) => {
    return {
      active: ownProps.filter === state.visiblityFilter,
      children: ownProps.children
    };
  };

  const mapFilterLinkDispatchToProps = (dispatch, ownProps) => {
    return {
      onClick: () => dispatch(setFilter(ownProps.filter))
    };
  };

  const FilterLink = connect(
    mapFilterLinkStateToProps,
    mapFilterLinkDispatchToProps
  )(Link);

  const Footer = () => (
    <p>
      Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
      {", "}
      <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
      {", "}
      <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
  );

  const TodoApp = () => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );

  const store = createStore(todoApp);
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
}
