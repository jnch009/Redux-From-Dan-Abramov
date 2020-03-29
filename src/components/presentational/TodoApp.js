import React from "react";

import AddTodo from "../container/AddTodo";
import VisibleTodoList from "../container/VisibleTodoList";
import Footer from "./Footer";

const TodoApp = params => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.match.params.filter || "all"} />
    <Footer />
  </div>
);

export default TodoApp;
