import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

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
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
              <Link to={"/"}>
                Search Articles
              </Link>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url}>
                    <strong>
                      {article.title}
                    </strong>
                  </a>
                  <p>
                    byline: {article.byline}
                  </p>
                  <p>
                    {article.summary}
                  </p>
                  <img src={article.image} />
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>You have no saved articles to display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedArticles;