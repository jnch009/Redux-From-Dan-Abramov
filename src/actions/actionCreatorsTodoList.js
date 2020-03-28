import SID from "shortid";

// wrapping inside brackets means an expression rather than a block
// curly braces represent a block
// here we've converted to an object
const addTodo = text => ({
  type: "ADD_TODO",
  id: SID.generate(),
  text
});

const visibleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export { addTodo, visibleTodo };
