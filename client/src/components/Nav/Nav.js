import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-md border-bottom mb-3 p-2 pl-3">
    <div className="navbar-header">
        <a href="/" className="navbar-brand text-dark mt-3 p-0"><h1>the Faux <span className="text-primary"> York </span> Times</h1></a>
    </div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon navbar-right"></span>
    </button>       
    <div className="collapse navbar-collapse justify-content-end text-dark" id="navbarSupportedContent">
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item  text-dark p-1 ml-3 border-highlight-nav border-secondary font-weight-bold" id="homeBtn"><a href="/" className="text-dark">Keyword Search</a></li>
            <li className="nav-item text-dark p-1 ml-3 font-weight-bold" id ="savedArticles"><a href="/savedArticles" className="text-dark"> Saved Articles</a></li>

        </ul>                
    </div>
</nav> 
);

export default Nav;