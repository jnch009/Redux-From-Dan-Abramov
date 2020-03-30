import React from "react";

import AddTodo from "../container/AddTodo";
import VisibleTodoList from "../container/VisibleTodoList";
import Footer from "./Footer";

const TodoApp = params => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
