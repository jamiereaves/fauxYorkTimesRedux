import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Articles from "./pages/Articles";
import SavedArticles from "./pages/SavedArticles";
import Nav from "./components/Nav";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  componentDidMount(){
    axios.get("/api/test").then((response) => {
      console.log(response);
    })
  }
  render() {
    return (
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
      <Router>
        <div>
        <Switch>
          <Route exact path="/" component={Articles} />
          <Route exact path="/savedArticles" component={SavedArticles} />
        <Articles />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
