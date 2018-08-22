import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "antd/dist/antd.css";
import "./Sentiment.css";
// import { API } from "aws-amplify";
import SentimentAnalysis from "sentiment";

export default class Sentiment extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      sentimentText: ""
    };
  }

  getSentiment(text) {
    // return API.get("groups", "/detect_sentiment", {
    //   body: {
    //     LanguageCode: "en",
    //     Text: text.text
    //   }
    // });
    console.log(text.text);
    var sentiment = new SentimentAnalysis();
    var result = sentiment.analyze(String(text.text));
    return result;
  }

  validateForm() {
    return this.state.sentimentText.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="sentimentText">
          <ControlLabel>Check Sentiment</ControlLabel>
          <FormControl
            placeholder="Hello World"
            onChange={this.handleChange}
            value={this.state.sentimentText}
            componentClass="textarea"
          />
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
}
