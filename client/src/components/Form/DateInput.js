import React from "react";

export const DateInput = props => (
  <div className="form-group">
    <input type="date" max="2018-12-31" min="1887-1-1" className="form-control" {...props}/>
 </div>
);