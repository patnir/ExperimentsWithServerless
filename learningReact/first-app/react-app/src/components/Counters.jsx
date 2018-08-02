import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 0, value: 4 },
      { id: 1, value: 4 },
      { id: 2, value: 4 },
      { id: 3, value: 4 }
    ]
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({
      counters
    });
  };

  handleDelete = currid => {
    const counters = this.state.counters.filter(c => c.id !== currid);
    this.setState({
      counters: counters
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.handleReset}
          className="btn btn-primary m-4 btn-small"
        >
          Reset
        </button>
        {this.state.counters.map((counter, i) => (
          <div>
            <span>{counter.id}</span>
            <Counter
              key={counter.id}
              counter={counter}
              onDelete={this.handleDelete}
            >
              <h4>Counter ID: {counter.id}</h4>
            </Counter>
          </div>
        ))}
      </div>
    );
  }
}

export default Counters;
