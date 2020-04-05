import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/presentational/Root";
import configureStore from "./ConfigureStore";

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
