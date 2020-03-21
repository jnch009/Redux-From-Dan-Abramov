import React from "react";

import { AddTodo, FilterLink, VisibleTodoList } from "../container/containerTodoList.js";

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

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </ul>
  );
};

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

export { TodoApp, TodoList, Link };
