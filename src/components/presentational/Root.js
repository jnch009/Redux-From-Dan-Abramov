import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";

import TodoApp from "./TodoApp";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={TodoApp} />
      </Router>
    </Provider>
  );
};

export default Root;
