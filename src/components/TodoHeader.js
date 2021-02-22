import React from "react";

export default (props) => (
  <div className="row">
    <div className="col-md-8">
      <h5>  Todo List | Created Date</h5>
    </div>
    <div className="col-md-4">
      {props.children}
    </div>
  </div>
);
