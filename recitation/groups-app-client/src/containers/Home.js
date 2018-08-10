import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>ClassGroup</h1>
          <p>
            <strong>Sign up</strong> for a study group
          </p>
          <p>
            <strong>Meet</strong> new students
          </p>
          <p>
            <strong>Ace</strong> your exam
          </p>
        </div>
      </div>
    );
  }
}
