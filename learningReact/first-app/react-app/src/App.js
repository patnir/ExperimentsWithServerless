import React, { Component } from "react";
import Counters from "./components/Counters";
import Navbar from "./components/Navbar";
class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Counters />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
