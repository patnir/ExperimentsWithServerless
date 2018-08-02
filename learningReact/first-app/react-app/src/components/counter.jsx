import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    imageUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"]
  };

  updateIncrement = async event => {
    this.setState({
      count: this.state.count + 1
    });
  };

  formatCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }

  render() {
    let classes = "badge badge-";
    classes += this.state.count === 0 ? "warning" : "primary";

    return (
      <React.Fragment>
        <h1>Hello World Yo!</h1>
        <img src={this.state.imageUrl} alt="" />
        <div>
          <span
            style={{ fontWeight: "bold", fontSize: "30px" }}
            className={classes}
          >
            {this.formatCount()}
          </span>
          <button
            className="btn btn-secondary btn-sm m-4"
            onClick={this.updateIncrement}
          >
            Increment
          </button>
          <ul>
            {this.state.tags.map((tag, i) => (
              <li key={tag}>
                {tag} {i}
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Counter;
