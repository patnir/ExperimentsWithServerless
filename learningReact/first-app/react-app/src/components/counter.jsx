import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0
  };

  updateIncrement = async event => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Hello World Yo!</h1>
        <div>
          <span>{this.state.count}</span>
        </div>
        <button onClick={this.updateIncrement}>Increment</button>
      </React.Fragment>
    );
  }
}

export default Counter;
