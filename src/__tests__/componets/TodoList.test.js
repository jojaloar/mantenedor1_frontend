import React from "react";
import { render, fireEvent, waitForElement } from 'react-testing-library'
import { Todo } from "../../context/todo";
import TodoConsumer from "../../api/TodoConsumer";
import TodoList from "../../components/TodoList";

test("<TodoList /> #display",  () => {

  const todos = [
    { item: "task 1", id: 1 },
    { item: "task 2", id: 2 },
    { item: "task 3", id: 3 }
  ];
  const dispatch = jest.fn();//mock validar el dispatch

  //dependencia que consume la API
  jest.spyOn(TodoConsumer, "getAll");
  TodoConsumer.getAll = jest.fn(cb => cb({ data: todos, isResult: 'success' }));

  //renderiza el contenedor
  const { container, getByTestId } = render(
    <Todo.Provider value={{ state: { todos: todos }, dispatch }}>
      <TodoList />
    </Todo.Provider>
  );

  expect(container.getElementsByTagName("li").length).toBe(3);
  //caputar el html de test ID y lo guarda
  expect(getByTestId('all-list').innerHTML).toMatchSnapshot();
  
  expect(TodoConsumer.getAll).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith({ type: "SET_TODO", payload: todos });
});

test("<TodoList /> #completeCalls", () => {

  const dispatch = jest.fn();//mock validar el dispatch
  const todos = [
    { item: "task 1", id: 1 },
    { item: "task 2", id: 2 },
    { item: "task 3", id: 3 }
  ];

  jest.spyOn(TodoConsumer, "update");
  TodoConsumer.update = jest.fn((data, cb) => cb({ item: {id: 200}}));

  const { container } = render(
    <Todo.Provider value={{ state: { todos }, dispatch }}>
      <TodoList />
    </Todo.Provider>
  );

  for (let element of container.querySelectorAll("li > button")) {
    fireEvent.click(element);
  }

  expect(TodoConsumer.update.mock.calls.length).toBe(3);
});

test("<TodoList /> #allTodosAreDone", async () => {
  const state = { todos: [] };
  const dispatch = jest.fn();//mock validar el dispatch
 
  const { queryByText } = render(
    <Todo.Provider value={{ state , dispatch}}>
      <TodoList />
    </Todo.Provider>
  );
  expect(queryByText(/Yay! All todos are done!/i).hasChildNodes()).toBe(true)
});

test("<TodoList /> #oneITem",  () => {
  const state = { todos: [ { item: "task 1", id: 1 }] };
  const dispatch = jest.fn();//mock validar el dispatch
  const { queryByText } = render(
    <Todo.Provider value={{ state, dispatch }}>
      <TodoList />
    </Todo.Provider>
  );
  expect(queryByText(/There is/i).hasChildNodes()).toBe(true)
});
