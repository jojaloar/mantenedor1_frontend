import React, { useContext, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import TodoConsumer from "../api/TodoConsumer";
import { Todo } from "../context/todo";
import TodoHeader from "./TodoHeader";


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

  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    dispatch({ key: ['pagination', 'page'], payload: pageNumber });
    dispatch({
      key: ['pagination', 'bikes'], payload: state.getIn(['bikes','filter'])
        .slice(pageNumber * 10 - 10, pageNumber * 10 - 1)
    });
  }


  useEffect(() => {
    TodoConsumer.getAll((status) => {
      setIsResult(status.isResult);
      if (status.isResult === 'success') {
        dispatch({ key: ['bikes','all'], payload: status.data.bikes });
        dispatch({ key: ['bikes','filter'], payload: status.data.bikes });
        dispatch({ key: ["pagination", 'bikes'], payload: status.data.bikes.slice(0, 9) });
      }
    })
  }, [state.todos]);

  useEffect(() => {
    console.log('entro al serach')
    dispatch({
      key: ['pagination', 'bikes'], payload: state.getIn(['bikes','filter'])
        .slice(0, 9)
    });
  }, [state.getIn(['search'])]);

  return <>{
    {
      success: <List handleComplete={handleComplete} state={state} deleteTask={deleteTask} handlePageChange={handlePageChange} />,
      error: <div className="alert alert-dark">Error in the request</div>,
      null: <div>Loading</div>
    }[isResult]
  }</>;
}

function heander(state) {
  const pluralize = count =>
    count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`;

  return state.get('bikes').length === 0 ? (
    <h4>Yay! All todos are done! Take a rest!</h4>
  ) : (
    <TodoHeader>
      <span className="float-right">{pluralize(state.get('bikes').length)}</span>
    </TodoHeader>
  );
}



const List = ({ state, handleComplete, deleteTask, handlePageChange }) => <div className="row">
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

            state.getIn(['pagination', 'bikes'])
              .map(t => (
                <li key={t.id} className="list-group-item" >
                  {`${t.title} | ${new Date(t.createdDate).toLocaleString()}`}
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

        <div>
          <Pagination
            activePage={state.getIn(['pagination', 'page'])}
            itemsCountPerPage={10}
            totalItemsCount={state.getIn(['bikes','filter']).length}
            pageRangeDisplayed={5}
            onChange={(page) => handlePageChange(page)}
          />
        </div>

      </div>
    </div>
  </div>
</div>;

export default TodoList;
