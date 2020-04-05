import React from "react";
import ReactDOM from "react-dom";

import { fetchTodos } from "./api";
import Root from "./components/presentational/Root";
import configureStore from "./ConfigureStore";

fetchTodos("all").then(todos => console.log(todos));

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
