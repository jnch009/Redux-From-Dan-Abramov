import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../actions/actionCreatorsTodoList";
import { fetchTodos } from "../../api";
import { getVisibleTodos } from "../../reducers";
import TodoList from "../presentational/TodoList";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos => receiveTodos(filter, todos));
  };

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />;
  }
}

//mapStateToProps subscribes to the store
//state param refers to store state
const mapVisibleTodoStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return { todos: getVisibleTodos(state, filter), filter };
};

//withRouter allows you to pass down router or URL params
VisibleTodoList = withRouter(
  connect(mapVisibleTodoStateToProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
