import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Articles from "./pages/Articles";
import SavedArticles from "./pages/SavedArticles";
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
