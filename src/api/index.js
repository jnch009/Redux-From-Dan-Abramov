import { v4 } from "node-uuid";

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: "hey",
      completed: true
    },
    {
      id: v4(),
      text: "ho",
      completed: true
    },
    {
      id: v4(),
      text: "hi",
      completed: false
    },
    {
      id: v4(),
      text: "Go for a walk",
      completed: false
    },
    {
      id: v4(),
      text: "Become a front end web developer",
      completed: false
    }
  ]
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(500).then(() => {
    switch (filter) {
      case "all":
        return fakeDatabase.todos;
      case "active":
        return fakeDatabase.todos.filter(entry => !entry.completed);
      case "completed":
        return fakeDatabase.todos.filter(entry => entry.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
