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

//unsure if this is an actual reducer
//this is more like a helper function, but the structure is similar to a reducer so I'll leave it here
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

export { addTodo, visibleTodo, setFilter, getVisibleTodos };
