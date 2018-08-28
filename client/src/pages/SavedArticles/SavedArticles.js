import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import logo from '../../logo.svg';

class SavedArticles extends Component {
  state = {
    savedArticles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ savedArticles: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticles(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container fluid>
      <Nav />
        <div style={{marginBottom: "105px"}}>
        <Row >
          <Col size="lg-10 md-11 sm-12">
            <Jumbotron>
              <h1>saved articles.</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} target="blank" rel="noopener noreferrer">
                    <strong>
                      {article.title}
                    </strong>
                  </a>
                  <p>
                    {article.byline}
                  </p>
                  <p>
                    {article.summary}
                  </p>
                  <img src={article.image} className="caption" />
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>You have no saved articles to display</h3>
            )}
          </Col>
        </Row>
        </div>
        <Footer>{<img src={logo} className="App-logo" alt="logo" />}</Footer>
      </Container>
    );
  }
}

export default SavedArticles;