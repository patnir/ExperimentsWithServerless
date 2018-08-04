import React, { Component } from "react";
import LocationPicker from "react-location-picker";

/* Default position */
const defaultPosition = {
  lat: 30.9878,
  lng: 86.925
};

// handleLocationChange = ({ position, address }) => {
//   // Set new location
//   this.setState({ position, address });
// };

export default () => (
  <LocationPicker
    containerElement={<div style={{ height: "100%", marginBottom: "20px" }} />}
    mapElement={<div style={{ height: "400px" }} />}
    defaultPosition={defaultPosition}
    onChange={this.handleLocationChange}
  />
);
