import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewGroup.css";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      meetingLocation: "",
      meetingDate: "08/08/2018",
      meetingTime: "12:00"
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleDateChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      meetingDate: dateString
    });
  };

  handleTimeChange = time => {
    console.log(time);
    this.setState({ meetingTime: time });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  render() {
    const format = "HH:mm";

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="meetingLocation">
          <FormControl
            onChange={this.handleChange}
            value={this.state.meetingLocation}
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup controlId="meetingDate">
          <DatePicker
            onChange={this.handleDateChange}
            value={moment(this.state.meetingDate)}
          />
        </FormGroup>
        <FormGroup controlId="meetingTime">
          <TimePicker
            onChange={this.handleTimeChange}
            value={moment(this.state.meetingTime, format)}
            format={format}
          />
        </FormGroup>
      </form>
    );
  }
}
