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

export { addTodo, visibleTodo, setFilter };
