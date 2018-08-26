import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
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
    endDate:""
  };

  /* When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
  }*/

  /* Loads all books  and sets them to this.state.books
  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };*/

  /* Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };*/

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

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for an article.</h1>
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
              <Link to={"/savedArticles"}>
                View Saved Articles
              </Link>
            </form>
          </Col>
          {/*<Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>*/}
        </Row>
        <Row>
          <Col size="md-6">
          <Jumbotron>
              <h1>Articles about "{this.state.search}".</h1>
            </Jumbotron>
            <List>
            {this.state.articles.map(article => {
              return (
                <ListItem key={article._id}>
                  <a href={article.web_url}>
                    <strong>
                      {article.headline.print_headline}
                    </strong>
                  </a>
                  <p>
                    byline: {article.byline.original}
                  </p>
                  <p>
                    {article.snippet}
                  </p>
                  <img src={"https://www.nytimes.com/" + article.multimedia[2].url} />
                  <DeleteBtn onClick={() => this.deleteBook(article._id)} />
                </ListItem>
              )
            })} 
            </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
