import React from "react";

export const Container = ({ fluid, children }) => (
  <div className={`container${fluid ? "-fluid" : ""} mother`} style={{paddingLeft:0, paddingRight:0}}>
    {children}
  </div>
);
