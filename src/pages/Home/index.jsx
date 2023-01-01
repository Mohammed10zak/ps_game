import React, { Component } from "react";
import "./style.css";
import Signup from "../../components/Signup";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Signup />
      </div>
    );
  }
}
