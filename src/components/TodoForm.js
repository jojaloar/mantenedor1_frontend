import React, { useContext, useState } from "react";
import { Todo } from "../context/todo";
import TodoConsumer from "../api/TodoConsumer";

const TodoForm = () => {
  const { dispatch } = useContext(Todo);

  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);

  function handleTodoChange(e) {
    setTodo(e.target.value);
  }

  function handleTodoAdd() {
    if (!todo) {
      setError("Description required")
      return;
    }
    TodoConsumer.add(todo, (status) => {
      if (!status.error) {
        dispatch({ type: "ADD_TODO", payload: status.item });
        setTodo("");
      } else {
        setError(status.error);
      }

    });

  }

  function handleSubmitForm(event) {
    if (event.keyCode === 13) {
      handleTodoAdd();
    }
  }
  return (<>
    <Form
      error={error}
      todo={todo}
      handleTodoAdd={handleTodoAdd}
      handleSubmitForm={handleSubmitForm}
      handleTodoChange={handleTodoChange}
    />
  </>);
};


const Form = ({ todo, error, handleTodoAdd, handleSubmitForm, handleTodoChange }) =>
  <div className="row">
    <div className="col-md-12">
      <br />
      <div className="input-group">
        <input
          data-testid="input-data"
          className={(error && "form-control is-valid") || "form-control"}
          value={todo}
          autoFocus={true}
          placeholder="Enter new todo"
          onKeyUp={handleSubmitForm}
          onChange={handleTodoChange}
        />

        <div className="input-group-append">
          <button data-testid="btn-add" className="btn btn-primary" onClick={handleTodoAdd}>
            Add
          </button>
        </div>
      </div>
      {error && <small className="text-danger" >{error}</small>}
    </div>
  </div>;

export default TodoForm;
