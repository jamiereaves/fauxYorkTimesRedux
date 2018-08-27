import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { DateInput } from "../../components/Form/DateInput";

class Articles extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    search: "",
    startDate: "",
    endDate:"",
    title:"",
    byline:"",
    summary:"",
    image:"",
    url:"",
    NYTID:"",
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.replace(/-/g, "")
    }, function () {
      console.log(this.state.search);
      console.log(this.state.startDate);
      console.log(this.state.endDate);
    });
  };

  // When the form is submitted, use the API.getArticles method to retrieve relevant articles
  // from the NYT API
  handleFormSubmit = event => {
    event.preventDefault();
    document.getElementById('searchDisplay').style.display = "none";
    document.getElementById('articleDisplay').style.display = "inherit";
      API.getArticles(this.state.search, this.state.startDate, this.state.endDate)
        .then(res => 
          this.setState({ articles: res.data.response.docs}, function(){
            console.log(this.state.articles[0]);
            console.log("title: " + this.state.articles[0].headline.print_headline);
            console.log("byline: " + this.state.articles[0].byline.original);
            console.log("summary: " + this.state.articles[0].snippet);
            console.log("url: " + this.state.articles[0].web_url);
            console.log("image: https://www.nytimes.com/" + this.state.articles[0].multimedia[2].url);
          }))
        .catch(err => console.log(err));
  };

  changeView = () => {
    document.getElementById('searchDisplay').style.display = "inherit";
    document.getElementById('articleDisplay').style.display = "none";
  };

  handleSaveArticle = (x) => {
    //event.preventDefault();
    const targetArticle = this.state.articles.filter(article => article._id === x);
    this.setState({
      title: targetArticle[0].headline.print_headline, 
      byline: targetArticle[0].byline.original, 
      summary: targetArticle[0].snippet,
      url: targetArticle[0].web_url,
      image: "https://www.nytimes.com/" + targetArticle[0].multimedia[2].url,
      NYTID: targetArticle[0]._id
      }, function(){
        console.log(this.state.title)
        API.saveArticle({
          title: this.state.title,
          byline: this.state.byline,
          summary: this.state.summary,
          url: this.state.url,
          image: this.state.image,
          NYTID: this.state.NYTID
        })
          .then(console.log("HIDE THE ARTICLE THAT WAS ADDED!!!!!"))
      .catch(err => console.log(err));
      })
    
  };

  render() {
    return (
      <Container fluid>
        <div id="searchDisplay">
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for an article.</h1>
              <Link to={"/savedArticles"}>
                View Saved Articles
              </Link>
            </Jumbotron>
            <form>
              <Input
                onChange={this.handleInputChange}
                name="search"
                placeholder="keyword"
              />
              <DateInput
                onChange={this.handleInputChange}
                name="startDate"
                placeholder=""
              />
              <DateInput
                onChange={this.handleInputChange}
                name="endDate"
                placeholder=""
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        </div>
        <div id="articleDisplay" style={{display: "none"}}>
        <Row >
          <Col size="md-6">
          <Jumbotron>
              <h1>Articles about "{this.state.search}".</h1>
              <input type="button" value="Search for Articles" onClick={() => this.changeView()}/>
              <Link to={"/savedArticles"}>
                View Saved Articles
              </Link>
            </Jumbotron>
            <List>
            {this.state.articles.map(article => {
              return (
                <ListItem 
                  key={article._id}
                >
                  <a href={article.web_url}>
                    <strong>
                      {article.headline.print_headline}
                    </strong>
                  </a>
                  <p>
                    {article.byline.original}
                  </p>
                  <p>
                    {article.snippet}
                  </p>
                  <img src={"https://www.nytimes.com/" + article.multimedia[2].url} />
                  <input type="button" value="Save Article" onClick={() => this.handleSaveArticle(article._id)} />
                </ListItem>
              )
            })} 
            </List>
          </Col>
        </Row>
        </div>
      </Container>
    );
  }
}

export default Articles;
