import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 200, clear: "both", paddingTop: 70, textAlign: "center", margin: "10px auto" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
