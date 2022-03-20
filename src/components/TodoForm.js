import React, { useContext, useState } from "react";
import { Todo } from "../context/todo";

const TodoForm = () => {
  const { dispatch } = useContext(Todo);

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  function handleTodoChange(e) {
    setTitle(e.target.value);
    dispatch({ key: ['search', 'title'], payload: e.target.value });
    dispatch({ type: 'FILTER' });
  }



  return (<>
    <Form
      error={error}
      title={title}
      handleTodoChange={handleTodoChange}
    />
  </>);
};


const Form = ({ title, error, handleTodoChange }) =>
  <div className="row">
    <div className="col-md-12">
      <br />
      <div className="input-group">
        <input
          data-testid="input-data"
          className={(error && "form-control is-valid") || "form-control"}
          value={title}
          autoFocus={true}
          placeholder="Enter new todo"
          onChange={handleTodoChange}
        />

        <div className="input-group-append">
          <button data-testid="btn-add" className="btn btn-primary" >
            Add
          </button>
        </div>
      </div>
      {error && <small className="text-danger" >{error}</small>}
    </div>
  </div>;

export default TodoForm;
