import React, { useContext, useEffect, useState, useCallback } from "react";
import { Todo } from "../context/todo";
import TodoHeader from "./TodoHeader";
import TodoConsumer from "../api/TodoConsumer";

const TodoList = () => {
  const { state, dispatch } = useContext(Todo);
  const [isResult, setIsResult] = useState(null);

  function handleComplete(item) {
    const data = { ...item, isActive: !item.isActive }
    TodoConsumer.update(data, (status) => {
      dispatch({ type: "COMPLETE", payload: status.item });
    })
  }

  function deleteTask(item) {
    TodoConsumer.delete(item, (status) => {

      dispatch({ type: "DELETE", payload: item });
    })
  }


  useEffect(() => {
    TodoConsumer.getAll((status) => {
      setIsResult(status.isResult);
      if (status.isResult === 'success') {
        dispatch({ key: "todos", payload: status.data.bikes });
      }
    })
  }, [state.todos]);

  return <>{
    {
      success: <List handleComplete={handleComplete} state={state} deleteTask={deleteTask} />,
      error: <div className="alert alert-dark">Error in the request</div>,
      null: <div>Loading</div>
    }[isResult]
  }</>;
}

function heander(state) {
  const pluralize = count =>
    count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`;

  return state.get('todos').length === 0 ? (
    <h4>Yay! All todos are done! Take a rest!</h4>
  ) : (
    <TodoHeader>
      <span className="float-right">{pluralize(state.get('todos').length)}</span>
    </TodoHeader>
  );
}

const List = ({ state, handleComplete, deleteTask }) => <div className="row">
  <div className="col-md-12">
    <div className="row">
      <div className="col-md-12">
        <br />
        {heander(state)}
        {console.log(state.toJS())}
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ul className="list-group" data-testid="all-list">

          {
            state.get('todos').map(t => (
              <li key={t.id} className="list-group-item" >
                {`${t.description} | ${new Date(t.createdDate).toLocaleString()}`}
                <button
                  className="float-right btn btn-danger btn-sm"
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteTask(t)}
                >
                  eliminar
                </button>
                <button
                  className="float-right btn btn-primary btn-sm"
                  style={{ marginLeft: 10 }}
                  onClick={() => handleComplete(t)}
                >
                  {t.isActive ? 'complete' : 'incomplete'}
                </button>


              </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
</div>;

export default TodoList;
