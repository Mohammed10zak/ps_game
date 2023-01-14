import "./style.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { object, string } from "yup";
import { API_URL } from "../../config/api";

import Button from "../../sections/Button";

import loginlogo from "../../images/loginlogo.png";
import joystick from "../../images/joystick.png";
import google from "../../images/google.svg";
import github from "../../images/github.png";
import twerr from "../../images/twirr.svg";
import linked from "../../images/linked.png";
import passwordshow from "../../images/eye.png";

const initialData = {
  email: "mhmd@gsg.com",
  password: "mhmd123",
};

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    passwordType: "password",
    isLoading: false,
    errors: [],
    myData: initialData,
  };

  schema = object().shape({
    email: string().required(),
    password: string().required(),
  });

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });
    try {
      await this.schema.validate(
        { email: this.state.email, password: this.state.password },
        { abortEarly: false }
      );

      const { data } = await axios.post(`${API_URL}/users/login`, {
        email: this.state.email,
        password: this.state.password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.name);
      localStorage.setItem("Admin", data.isAdmin);

      this.props.login();
    } catch (error) {
      if (error.errors) {
        this.setState({ errors: error.errors });
      } else {
        this.setState({ errors: [error.message] });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  handlePasswordShow = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      passwordType: prevState.passwordType === "text" ? "password" : "text",
    }));
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

        <form className="login_form" onSubmit={(e) => this.handleSubmit(e)}>
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
            {this.state.errors.map((error) => (
              <span style={{ color: "red" }}>{error} </span>
            ))}
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
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Enter your password</label>
            <div>
              <input
                id="password"
                type={this.state.passwordType}
                placeholder="•••••••••"
                onChange={this.handleChangeInput}
                value={this.state.password}
              />

              <img
                src={passwordshow}
                alt="passwordshow"
                className="passwordshow"
                onClick={this.handlePasswordShow}
              />
            </div>
          </div>

          <Button myBtn="login" />
          {this.state.isLoading ? "Loading..." : ""}
          <div className="reg_anchor">
            Don’t have an account?
            <Link to="/signup">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}
