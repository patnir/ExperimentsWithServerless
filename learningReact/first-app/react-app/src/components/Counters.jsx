import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
  state = {
    totalCreated: 4,
    counters: [
      { id: 0, value: 0 },
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 }
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

  handleAdd = () => {
    const counters = [...this.state.counters];
    const totalCreated = this.state.totalCreated;
    counters.push({
      id: totalCreated,
      value: 0
    });

    // alert(counters.length);
    this.setState({
      counters: counters,
      totalCreated: totalCreated + 1
    });
  };

  handleDelete = currid => {
    const counters = this.state.counters.filter(c => c.id !== currid);
    this.setState({
      counters: counters
    });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({
      counters
    });
  };

  handleCounterRest = currentCounter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(currentCounter);
    counters[index] = { ...currentCounter };
    counters[index].value = 0;
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
        <button
          onClick={this.handleAdd}
          className="btn btn-primary m-4 btn-small"
        >
          Add
        </button>
        {this.state.counters.map((counter, i) => (
          <div>
            <Counter
              key={counter.id}
              counter={counter}
              onDelete={this.handleDelete}
              onReset={this.handleCounterRest}
              onIncrement={this.handleIncrement}
            >
              <h6>Counter ID: {counter.id}</h6>
            </Counter>
          </div>
        ))}
      </div>
    );
  }
}

export default Counters;
