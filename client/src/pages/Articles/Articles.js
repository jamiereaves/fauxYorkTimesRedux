import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { DateInput } from "../../components/Form/DateInput";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import logo from '../../logo.svg';

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
            /*console.log(this.state.articles[0]);
            console.log("title: " + this.state.articles[0].headline.print_headline);
            console.log("byline: " + this.state.articles[0].byline.original);
            console.log("summary: " + this.state.articles[0].snippet);
            console.log("url: " + this.state.articles[0].web_url);
            console.log("image: https://www.nytimes.com/" + this.state.articles[0].multimedia[2].url);*/
          }))
        .catch(err => console.log(err));
  };

  //hides articles and displays the search bar
  changeView = () => {
    document.getElementById('articleDisplay').style.display = "none";
    document.getElementById('searchDisplay').style.display = "inherit";
  };

  handleSaveArticle = (x) => {
    //event.preventDefault();
    const targetArticle = this.state.articles.filter(article => article._id === x);
    console.log(targetArticle);
    const theRest = this.state.articles.filter(article => article._id !== x);
    console.log(theRest);
    this.setState({
      title: targetArticle[0].headline.print_headline ? targetArticle[0].headline.print_headline : targetArticle[0].headline.main, 
      byline: targetArticle[0].byline ? targetArticle[0].byline.original : targetArticle[0].news_desk,
      summary: targetArticle[0].snippet,
      url: targetArticle[0].web_url,
      image: targetArticle[0].multimedia[2] ? "https://www.nytimes.com/" + targetArticle[0].multimedia[2].url  : "https://umrengines.com.au/wp-content/uploads/2016/09/no-image-available.png",
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
          .then(this.setState({articles: theRest}))
      .catch(err => console.log(err));
      })
    
  };

  render() {
    return (
      <Container fluid>
      <Nav />
        <div id="searchDisplay">
        <Row>
          <Col size="lg-10 md-11 sm-12">
            <Jumbotron>
              <h1>search for an article by keyword.</h1>
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
        <div id="articleDisplay" style={{display: "none", marginBottom: "105px"}}>
        <Row >
          <Col size="lg-10 md-11 sm-12">
          <Jumbotron>
              <h1>articles about "{this.state.search}".</h1>
              <input type="button" value="change keyword" onClick={() => this.changeView()}/>
            </Jumbotron>
            <List>
            {this.state.articles.map(article => {
              return (
                <ListItem 
                  key={article._id}
                >
                  <a href={article.web_url} target="blank" rel="noopener noreferrer">
                    <strong>
                      {article.headline.print_headline ? article.headline.print_headline : article.headline.main}
                    </strong>
                  </a>
                  <p>
                    {article.byline ? article.byline.original : article.news_desk}
                  </p>
                  <p>
                    {article.snippet}
                  </p>
                  <img  className="caption" src={article.multimedia[2] ? "https://www.nytimes.com/" + article.multimedia[2].url  : "https://umrengines.com.au/wp-content/uploads/2016/09/no-image-available.png"}  placeholder={article.headline.print_headline}/>
                  <input type="button" value="Save Article" onClick={() => this.handleSaveArticle(article._id)} />
                </ListItem>
              )
            })} 
            </List>
          </Col>
        </Row>
        </div>
        <Footer>{<img src={logo} className="App-logo" alt="logo" />}</Footer>
      </Container>
    );
  }
}

export default Articles;
