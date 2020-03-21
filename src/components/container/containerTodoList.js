import React from "react";
import { connect } from "react-redux";

import { addTodo, getVisibleTodos, setFilter, visibleTodo } from "../../actions/actionCreatorsTodoList";
import { Link, TodoList } from "../presentational/presentationalTodoList";

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add TODO
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

//mapStateToProps subscribes to the store
const mapVisibleTodoStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visiblityFilter)
  };
};
const mapVisibleTodoDispatchToProps = dispatch => {
  return {
    onTodoClick: id => dispatch(visibleTodo(id))
  };
};
const VisibleTodoList = connect(
  mapVisibleTodoStateToProps,
  mapVisibleTodoDispatchToProps
)(TodoList);

const mapFilterLinkStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visiblityFilter,
    children: ownProps.children
  };
};
const mapFilterLinkDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(setFilter(ownProps.filter))
  };
};
const FilterLink = connect(
  mapFilterLinkStateToProps,
  mapFilterLinkDispatchToProps
)(Link);

export { FilterLink, AddTodo, VisibleTodoList };
