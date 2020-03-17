import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { createStore } from "redux";
import expect from "expect";

import { render } from "./Counter.js";
import CounterList from "./CounterList";
import TodoTests from "./Tests";

export default function App() {
  render();
  TodoTests();
  CounterList();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
