import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import loginlogo from "../../images/loginlogo.png";
import joystick from "../../images/joystick.png";
import google from "../../images/google.svg";
import github from "../../images/github.png";
import twerr from "../../images/twirr.svg";
import linked from "../../images/linked.png";
import Button from "../../sections/Button";

const initialData = {
  email: "mhmd@gsg.com",
  password: "mhmd123",
};

const defaults = {
  email: "",
  password: "",
};

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    myData: initialData,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", this.state);
    this.setState((prevState) => ({
      myData: {
        email: prevState.email,
        password: prevState.password,
      },
      ...defaults,
    }));
  };

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    return (
      <div className="login">
        <div className="login_desc">
          <img src={loginlogo} alt="loginlogo" className="loginlogo" />

          <div className="symbol_login">،،</div>
          <p className="game_desc_login">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <div className="gamer_login">Hideo Kojima</div>
          <img src={joystick} alt="joystick" className="joystick" />
        </div>

        <form className="login_form" onSubmit={this.handleSubmit}>
          <div>
            <h3 className="form_login_title">Join the game!</h3>
            <p className="form_login_desc">
              Go inside the best gamers social network!
            </p>
          </div>
          <div className="links">
            <a href="/#">
              <img src={google} alt="google" className="gooogle" />
            </a>
            <a href="/#">
              <img src={twerr} alt="tweitter" className="tweitter" />
            </a>
            <a href="/#">
              <img src={linked} alt="linked" className="linked" />
            </a>
            <a href="/#">
              <img src={github} alt="github" className="github" />
            </a>
          </div>

          <div>
            <label htmlFor="email">Your email</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Write your email"
                onChange={this.handleChangeInput}
                value={this.state.email}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Enter your password</label>
            <div>
              <input
                id="password"
                type="password"
                placeholder="•••••••••"
                onChange={this.handleChangeInput}
                value={this.state.password}
                required
              />
            </div>
          </div>
          <Link to="/controlPanel">
            <Button myBtn={"Login"} />
          </Link>

          <div className="reg_anchor">
            Don’t have an account?
            <Link to="/signup">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}
