import React from "react";
import { render, fireEvent, getByTestId } from 'react-testing-library'
import { Todo } from "../../context/todo";
import TodoConsumer from "../../api/TodoConsumer";
import TodoForm from "../../components/TodoForm";


test("<TodoForm /> #addTodo-CHANGE", () => {
  const dispatch = jest.fn();

  const { container } = render(
    <Todo.Provider value={{ dispatch }} >
      <TodoForm />
    </Todo.Provider >
  );

  fireEvent.keyUp(getByTestId(container, 'input-data'));
  fireEvent.change(getByTestId(container, 'input-data'));

});

test("<TodoForm /> #addTodo-ERROR", () => {
  const dispatch = jest.fn();

  //dependencia que consume la API
  jest.spyOn(TodoConsumer, "add");
  TodoConsumer.add = jest.fn((todo, cb) => cb({ error: "ERROR", isResult: 'error' }));

  const { container } = render(
    <Todo.Provider value={{ dispatch }} >
      <TodoForm />
    </Todo.Provider >
  );

  fireEvent.click(getByTestId(container, 'btn-add'));//on click

  expect(container.querySelector('.text-danger').textContent).toEqual('Description required');
});
