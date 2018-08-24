import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  ControlLabel,
  Tabs,
  PageHeader,
  Tab,
  Image,
  Row,
  Col,
  Panel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "antd/dist/antd.css";
import "./Sentiment.css";
import { API } from "aws-amplify";
import SentimentAnalysis from "sentiment";
// import * as WebRequest from "web-request";

export default class Sentiment extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      sentimentText: "",
      movieReviewUrl: "",
      npm_sentiment: null,
      review: "",
      alertStyle: "",
      movieName: "",
      movieComponents: null,
      comprehend_sentiment: null
    };
  }

  getSentimentFromComprehend(text) {
    return API.post("groups", "/detect_sentiment", {
      body: {
        LanguageCode: "en",
        Text: text.text
      }
    });
  }

  getSentiment(text) {
    console.log(text.text);
    var sentiment = new SentimentAnalysis();
    var result = sentiment.analyze(String(text.text));
    this.setState({
      npm_sentiment: result
    });

    var currentReview = "Negative";
    var alertStyle = "danger";

    if (result.score > 0) {
      currentReview = "Positive";
      alertStyle = "success";
    } else if (result.score === 0) {
      currentReview = "Neutral";
      alertStyle = "warning";
    }
    this.setState({
      review: currentReview,
      alertStyle
    });
    return result;
  }

  validateForm() {
    return this.state.sentimentText.length > 0;
  }

  validateMovieForm() {
    return this.state.movieReviewUrl.length > 0;
  }

  validateMovieLookupForm() {
    return this.state.movieName.length > 0;
  }
  validateMovieLookupClearForm() {
    return this.state.movieComponents != null;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSentimentSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    var res = "";

    try {
      res = await this.getSentimentFromComprehend({
        text: this.state.sentimentText
      });
      console.log("Is This Going To Work");
      console.log(res);
      this.setState({
        comprehend_sentiment: res
      });
      res = await this.getSentiment({
        text: this.state.sentimentText
      });

      console.log(res);
      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      alert("what is going on?");
      this.setState({ isLoading: false });
    }
  };

  // getReviewDetails = async event => {
  //   event.preventDefault();
  //   var result = null;
  //   this.setState({ isLoading: true });
  //   console.log(this.state.movieReviewUrl);
  //   try {
  //     this.setState({ isLoading: false });
  //     // result = await WebRequest.get("http://www.google.com/");
  //   } catch (e) {
  //     console.log("Movie Review Error");
  //     console.log(e);
  //     this.setState({ isLoading: false });
  //   }
  //   console.log("Result is...");
  //   // console.log(result.content);
  //   return result;
  // };

  getMovieDetails = async event => {
    event.preventDefault();
    var result = null;
    this.setState({ isLoading: true });
    var t = this.state.movieName.toLowerCase().replace(" ", "+");
    try {
      var response = await window.fetch(
        "http://www.omdbapi.com/?t=" + t + "&apikey=6d706eee"
      );
      result = await response.json();

      this.setState({
        movieComponents: result
      });

      this.setState({ isLoading: false });
    } catch (e) {
      console.log("Movie Details Error");
      console.log(e);
      this.setState({ isLoading: false });
    }

    return result;
  };

  renderForm() {
    return (
      <form onSubmit={this.handleSentimentSubmit}>
        <FormGroup controlId="sentimentText">
          <ControlLabel>Check Sentiment</ControlLabel>
          <FormControl
            placeholder="Hello World"
            onChange={this.handleChange}
            value={this.state.sentimentText}
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup>
          {this.state.npm_sentiment ? (
            <Alert
              bsStyle={
                this.state.alertStyle ? this.state.alertStyle : "success"
              }
            >
              <h4>{this.state.review} Review</h4>
              <p>{JSON.stringify(this.state.npm_sentiment)}</p>
              <p>{JSON.stringify(this.state.comprehend_sentiment)}</p>
            </Alert>
          ) : (
            <div />
          )}
        </FormGroup>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Detect Sentiment"
          loadingText="Detecting…"
        />
      </form>
    );
  }

  handleMovieSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    var res = "";

    try {
      res = await this.getSentiment({
        text: this.state.sentimentText
      });

      console.log(res);
      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      alert("what is going on?");
      this.setState({ isLoading: false });
    }
  };

  renderMovieLookupForm() {
    return (
      <div className="MovieLookup">
        <form onSubmit={this.getMovieDetails}>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <FormGroup controlId="movieName">
                <ControlLabel>Enter Movie Name</ControlLabel>
                <FormControl
                  placeholder="The Dark Knight"
                  onChange={this.handleChange}
                  value={this.state.movieName}
                  componentClass="textarea"
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <LoaderButton
                block
                bsStyle="primary"
                bsSize="large"
                disabled={!this.validateMovieLookupForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Find Movie"
                loadingText="Finding..."
                id="movieLookupReviewButton"
              />
            </Col>
          </Row>
        </form>

        {this.state.movieComponents ? (
          <form>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <Image src={this.state.movieComponents.Poster} responsive />
              </Col>
              <Col xs={6} md={8}>
                <Panel bsStyle="primary">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">
                      {this.state.movieComponents.Title}
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>{this.state.movieComponents.Plot}</Panel.Body>
                </Panel>
              </Col>
            </Row>
          </form>
        ) : (
          <div />
        )}
      </div>
    );
  }

  // renderMovieReviewForm() {
  //   return (
  //     <div class="MovieReview">
  //       <form onSubmit={this.getReviewDetails}>
  //         <Row className="show-grid">
  //           <Col xs={12} md={8}>
  //             <FormGroup controlId="movieReviewUrl">
  //               <ControlLabel>Enter URL for movie review</ControlLabel>
  //               <FormControl
  //                 placeholder="https://www.imdb.com/review/rw1908115/?ref_=tt_urv"
  //                 onChange={this.handleChange}
  //                 value={this.state.movieReviewUrl}
  //                 componentClass="textarea"
  //               />
  //             </FormGroup>
  //           </Col>
  //           <Col xs={12} md={4}>
  //             <LoaderButton
  //               block
  //               bsStyle="primary"
  //               bsSize="large"
  //               disabled={!this.validateMovieForm()}
  //               type="submit"
  //               isLoading={this.state.isLoading}
  //               text="Detect Sentiment of Movie Review"
  //               loadingText="Detecting..."
  //               id="movieLookupReviewButton"
  //             />
  //           </Col>
  //         </Row>
  //       </form>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="Sentiment">
        <PageHeader>Detect Sentiment</PageHeader>
        <Tabs
          style={{ margin: "20px" }}
          defaultActiveKey={1}
          animation={false}
          id="noanim-tab-example"
        >
          <Tab style={{ margin: "20px" }} eventKey={1} title="Text">
            {this.renderForm()}
          </Tab>
          <Tab style={{ margin: "20px" }} eventKey={2} title="Movie Lookup">
            {this.renderMovieLookupForm()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
