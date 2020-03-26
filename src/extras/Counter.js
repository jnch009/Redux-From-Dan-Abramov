import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { createStore } from "redux";
import expect from "expect";

// TDD = Test Driven Development
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

expect(counter(0, { type: "INCREMENT" })).toEqual(1);
expect(counter(1, { type: "INCREMENT" })).toEqual(2);
expect(counter(2, { type: "DECREMENT" })).toEqual(1);
expect(counter(1, { type: "DECREMENT" })).toEqual(0);
expect(counter(1, { type: "SOMETHING" })).toEqual(1);
expect(counter(undefined, {})).toEqual(0);
console.log("tests pass");

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const store = createStore(counter);
// store.dispatch({ type: "INCREMENT" });

export const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => {
        store.dispatch({ type: "INCREMENT" });
      }}
      onDecrement={() => {
        store.dispatch({ type: "DECREMENT" });
      }}
    />,
    document.getElementById("root")
  );
};
// render will be called whenever the state changes
store.subscribe(render);
// for rendering the initial state
render();
