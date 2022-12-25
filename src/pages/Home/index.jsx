import React, { Component } from "react";
import "./style.css";
import Signup from "../../components/Signup";
import Login from "../../components/Login";

export default class Home extends Component {
  state = {
    form: "signup",
  };
  handleToggle = () => {
    this.setState((prevState) => ({
      form: prevState.form === "signup" ? "login" : "signup",
    }));
  };

  render() {
    return (
      <div className="home">
        {this.state.form === "signup" ? (
          <Signup toggle={this.handleToggle} />
        ) : (
          <Login toggle={this.handleToggle} />
        )}
      </div>
    );
  }
}
