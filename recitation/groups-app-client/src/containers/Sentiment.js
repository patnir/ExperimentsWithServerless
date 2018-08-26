import React, { Component } from "react";
import { Tabs, PageHeader, Tab } from "react-bootstrap";
import "./Sentiment.css";
import Sentiment_Comprehend from "./Sentiment/Sentiment_Comprehend";
import Sentiment_NPM from "./Sentiment/Sentiment_NPM";
import Movie_Lookup from "./Sentiment/Movie_Lookup";

export default class Sentiment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      movieReviewUrl: ""
    };
  }

  validateMovieForm() {
    return this.state.movieReviewUrl.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="Sentiment">
        <PageHeader>
          Detect Sentiment <small>With...</small>
        </PageHeader>
        <Tabs
          style={{ margin: "20px" }}
          defaultActiveKey={1}
          animation={false}
          id="noanim-tab-example"
        >
          <Tab style={{ margin: "20px" }} eventKey={1} title="AWS Comprehend">
            {<Sentiment_Comprehend />}
          </Tab>
          <Tab
            style={{ margin: "20px" }}
            eventKey={2}
            title="NPM Sentiment Analysis"
          >
            {<Sentiment_NPM />}
          </Tab>
          <Tab style={{ margin: "20px" }} eventKey={3} title="Movie Lookup">
            {<Movie_Lookup />}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
