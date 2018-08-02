import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value,
    imageUrl: "https://picsum.photos/50",
    tags: ["tag1", "tag2", "tag3"]
  };

  // updateIncrement = async event => {
  //   this.setState({
  //     value: this.state.value + 1
  //   });
  // };

  updateIncrement = incrementValue => {
    this.setState({
      value: this.state.value + incrementValue
    });
  };

  resetIncrement = () => {
    this.setState({
      value: 0
    });
  };

  formatCount() {
    return this.state.value === 0 ? "Zero" : this.state.value;
  }

  renderList() {
    if (this.state.value === 0) {
      return <h1> Zero Elements </h1>;
    }
    return (
      <ul>
        {this.state.tags.map((tag, i) => (
          <li key={tag}>
            {tag} {i}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    let classes = "badge m-4 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";

    return (
      <React.Fragment>
        <div>
          <img src={this.state.imageUrl} alt="" />

          <span
            style={{ fontWeight: "bold", fontSize: "30px" }}
            className={classes}
          >
            {this.formatCount()}
          </span>
          <button
            className="btn btn-secondary btn-sm m-4"
            onClick={() => this.updateIncrement(1)}
          >
            Increment
          </button>
          <button
            className="btn btn-secondary btn-sm m-4"
            onClick={this.resetIncrement}
          >
            Reset
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm m-4"
          >
            Delete
          </button>
          <div>
            {this.state.value === 0 && this.props.children}
            {/* {this.renderList()} */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Counter;
