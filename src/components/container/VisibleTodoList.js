import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
const mapVisibleTodoStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state.todos, match.params.filter || "all")
});

const VisibleTodoList = withRouter(
  // shorthand notation of mapDispatchToProps if the arguments of the action creator and the callback are the same
  connect(mapVisibleTodoStateToProps, { onTodoClick: visibleTodo })(TodoList)
);

export default VisibleTodoList;
