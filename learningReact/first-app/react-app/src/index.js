import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Counter from "../src/components/counter";
const element = <h1>Hello World!</h1>;

ReactDOM.render(<Counter />, document.getElementById("root"));
ReactDOM.render(element, document.getElementById("root1"));
