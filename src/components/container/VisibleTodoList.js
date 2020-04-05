import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { visibleTodo } from "../../actions/actionCreatorsTodoList";
import { fetchTodos } from "../../api";
import { getVisibleTodos } from "../../reducers";
import TodoList from "../presentational/TodoList";

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

//mapStateToProps subscribes to the store
const mapVisibleTodoStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return { todos: getVisibleTodos(state, filter), filter };
};

//withRouter allows you to pass down router or URL params
VisibleTodoList = withRouter(
  // shorthand notation of mapDispatchToProps if the arguments of the action creator and the callback are the same
  connect(mapVisibleTodoStateToProps, { onTodoClick: visibleTodo })(
    VisibleTodoList
  )
);

export default VisibleTodoList;
