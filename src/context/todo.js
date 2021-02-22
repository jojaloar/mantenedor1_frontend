import React, { useContext, useReducer } from "react";

import reducers from "../reducers/todo";

import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

// Initial Data
export const Todo = React.createContext({
  todos: []
});

export default () => {
  const globalStore = useContext(Todo);
  const [state, dispatch] = useReducer(reducers, globalStore);
  return (
    <Todo.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </Todo.Provider>
  );
};

