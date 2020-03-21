import PropTypes from "prop-types";
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
  const AddTodo = (props, { store }) => {
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
            store.dispatch({
              type: "ADD_TODO",
              id: nextTodoID++,
              text: input.value
            });
            input.value = "";
          }}
        >
          Add TODO
        </button>
      </div>
    );
  };
  AddTodo.contextTypes = {
    store: PropTypes.object
  };

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

  class VisibleTodoList extends React.Component {
    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const props = this.props;
      const { store } = this.context;
      const state = store.getState();

      return (
        <TodoList
          todos={getVisibleTodos(state.todos, state.visiblityFilter)}
          onTodoClick={id =>
            store.dispatch({
              type: "TOGGLE_TODO",
              id
            })
          }
        />
      );
    }
  }
  VisibleTodoList.contextTypes = {
    store: PropTypes.object
  };

  // Presentational Component
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

  // Passing 'children' as a prop is the stuff that is inside the component
  // Container Component
  class FilterLink extends React.Component {
    //Need to subscribe to the store to get the latest state
    //forceUpdate will force the component to re-render when store changes
    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const props = this.props;
      const { store } = this.context;
      const state = store.getState();

      return (
        <Link
          active={props.filter === state.visiblityFilter}
          onClick={() => {
            store.dispatch({
              type: "SET_VISIBILITY_FILTER",
              filter: props.filter
            });
          }}
          children={props.children}
        />
      );
    }
  }
  FilterLink.contextTypes = {
    store: PropTypes.object
  };

  const Footer = () => (
    <p>
      Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
      {", "}
      <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
      {", "}
      <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
  );

  class Provider extends React.Component {
    getChildContext() {
      return {
        store: this.props.store
      };
    }

    render() {
      return this.props.children;
    }
  }
  Provider.childContextTypes = {
    store: PropTypes.object
  };

  const TodoApp = () => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );

  ReactDOM.render(
    <Provider store={createStore(todoApp)}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
}
