import { fromJS } from 'immutable';
import React, { useContext, useReducer } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import reducers from "../reducers/todo";




// Initial Data
export const Todo = React.createContext(fromJS({
  bikes: {
    all: [],
    filter: []
  },
  search: {
    title: '',
  },
  pagination: {
    page: 1,
    bikes: [],
  }
}));

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

