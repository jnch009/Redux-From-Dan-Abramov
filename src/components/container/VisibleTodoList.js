import { visibleTodo } from "../../actions/actionCreatorsTodoList";
import { connect } from "react-redux";
import TodoList from "../presentational/TodoList";

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

//mapStateToProps subscribes to the store
const mapVisibleTodoStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
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
