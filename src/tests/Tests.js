import expect from "expect";
import {
  addCounter,
  removeCounter,
  incrementCounter,
  toggleTodo,
  todo,
  todos
} from "../CounterList";

const deepFreeze = require("deep-freeze");

export default function TodoTests() {
  const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
  };

  const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);

    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
  };

  const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);

    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
  };

  const testToggleTodo = () => {
    const todoBefore = {
      id: 0,
      text: "Learn Redux",
      completed: false
    };
    const todoAfter = {
      id: 0,
      text: "Learn Redux",
      completed: true
    };

    deepFreeze(todoBefore);
    expect(toggleTodo(todoBefore)).toEqual(todoAfter);
  };

  const testAddTodo = () => {
    const stateBefore = [];
    const action = {
      type: "ADD_TODO",
      id: 0,
      text: "Learn Redux"
    };
    const stateAfter = [
      {
        id: 0,
        text: "Learn Redux",
        completed: false
      }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  };

  const testToggleTodoListElement = () => {
    const stateBefore = [
      { id: 0, text: "Learn Redux", completed: false },
      { id: 1, text: "Learn Redux", completed: false }
    ];
    const action = {
      type: "TOGGLE_TODO",
      id: 1
    };
    const stateAfter = [
      { id: 0, text: "Learn Redux", completed: false },
      { id: 1, text: "Learn Redux", completed: true }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  };

  testAddCounter();
  testRemoveCounter();
  testIncrementCounter();
  testToggleTodo();
  testAddTodo();
  testToggleTodoListElement();
  console.log("All Test Passed!");
}
