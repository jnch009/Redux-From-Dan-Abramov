import React from "react";
import { addTodo } from "../../actions/actionCreatorsTodoList";
import { connect } from "react-redux";

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

export default AddTodo;
