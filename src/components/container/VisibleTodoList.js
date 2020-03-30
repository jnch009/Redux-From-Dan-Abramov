import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { visibleTodo } from "../../actions/actionCreatorsTodoList";
import { getVisibleTodos } from "../../reducers";
import TodoList from "../presentational/TodoList";

//mapStateToProps subscribes to the store
const mapVisibleTodoStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || "all")
});

//withRouter allows you to pass down router or URL params
const VisibleTodoList = withRouter(
  // shorthand notation of mapDispatchToProps if the arguments of the action creator and the callback are the same
  connect(mapVisibleTodoStateToProps, { onTodoClick: visibleTodo })(TodoList)
);

export default VisibleTodoList;
