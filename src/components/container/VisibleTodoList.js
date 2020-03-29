import { connect } from "react-redux";

import { visibleTodo } from "../../actions/actionCreatorsTodoList";
import TodoList from "../presentational/TodoList";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "active":
      return todos.filter(t => !t.completed);
    case "completed":
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

//mapStateToProps subscribes to the store
const mapVisibleTodoStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter)
});
const mapVisibleTodoDispatchToProps = dispatch => ({
  onTodoClick(id) {
    dispatch(visibleTodo(id));
  }
});

const VisibleTodoList = connect(
  mapVisibleTodoStateToProps,
  mapVisibleTodoDispatchToProps
)(TodoList);

export default VisibleTodoList;
