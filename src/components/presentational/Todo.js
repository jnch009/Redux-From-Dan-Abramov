import React from "react";

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

export default Todo;
