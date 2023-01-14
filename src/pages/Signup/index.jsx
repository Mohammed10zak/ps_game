import "./style.css";

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "./../../config/api";
import axios from "axios";
import * as yup from "yup";

import Button from "../../sections/Button";
import ProgressBar from "../../sections/ProgressBar";

import gamelogo from "../../images/gamelogo.png";
import google from "../../images/google.svg";
import bg from "../../images/bg.png";
import passwordshow from "../../images/eye.png";


const initialData = {
  name: "abdooo",
  email: "mhmd@gsg.com",
  password: "mhmd123",
  checked: false,
};

const regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    checked: false,
    passwordType: "password",

    errors: [],
    isLoading: false,
    myData: initialData,
  };

  schema = yup.object().shape({
    name: yup
      .string()
      .min(6, "Name must be at least 6 characters long")
      .max(16, "Name must be no more than 16 characters")
      .required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(regularExpression, "Invalid Password")
      .required("Password is required"),
    confirmpass: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    checked: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required(),
  });

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    const checked = e.target.checked;
    this.setState({ [id]: value, checked });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });
    this.schema
      .validate(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirmpass: this.state.confirmpass,
          checked: this.state.checked,
        },
        { abortEarly: false }
      )
      .then(async ({ name, email, password }) => {
        const res = await axios.post(`${API_URL}/users/signup`, {
          name,
          email,
          password,
        });

        if (res) {
          localStorage.setItem("username", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("password", res.data.password);
          localStorage.setItem("token", res.data.token);
          this.props.login();
        }
      })
      .catch((error) => {
        if (error.errors) {
          this.setState({ errors: error.errors });
        } else {
          this.setState({ errors: [error.message] });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handlePasswordShow = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      passwordType: prevState.passwordType === "text" ? "password" : "text",
    }));
  };

  render() {
    return (
      <div className="sign_up">
        <div className="sign_desc">
          <img src={bg} alt="bg" className="bg" />
          <div className="overlay"></div>

          <img src={gamelogo} alt="game_logo" className="game_logo" />
          <div className="symbol">،،</div>
          <p className="game_desc">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <div className="gamer">Hideo Kojima</div>
          <div className="vector"></div>
        </div>
        <Link to="/login" className="back">
          &lt; back
        </Link>

        <form className="sign_form" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <h3 className="form_sign_title">Register Individual Account!</h3>
            <p className="form_sign_desc">
              For the purpose of gamers regulation, your details are required.
            </p>
          </div>
          {this.state.errors.map((error) => (
            <span style={{ color: "red" }}>{error} </span>
          ))}

          <div>
            <label htmlFor="name">User Name</label>
            <div>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={this.handleChangeInput}
                value={this.state.name}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email address*</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                onChange={this.handleChangeInput}
                value={this.state.email}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Create password*</label>
            <div>
              <input
                id="password"
                type={this.state.passwordType}
                placeholder="Password"
                onChange={this.handleChangeInput}
                value={this.state.password}
                onInput={this.passwordStrength}
              />
                 <img
                src={passwordshow}
                alt="passwordshow"
                className="passwordshow"
                onClick={this.handlePasswordShow}
              />
              {<ProgressBar password={this.state.password} />}
            </div>
          </div>
          <div>
            <label htmlFor="confirmpass">Repeat password*</label>
            <div>
              <input
                id="confirmpass"
                type="password"
                placeholder="Repeat password"
                onChange={this.handleChangeInput}
                value={this.state.confirmpass}
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="checked"
              checked={this.state.checked}
              onChange={this.handleChangeInput}
              name="checked"
            />
            <label htmlFor="repeatpassword*" className="label">
              I agree to terms & conditions
            </label>
          </div>
          <Button myBtn="Register Account" />
          {this.state.isLoading ? "Loading..." : ""}

          <div className="or">Or</div>
          <div className="go_to_login">
            <img src={google} alt="google" className="google" />

            <button className="login_button" type="button">
              <Link to="/login" className="link_to_login">
                login
              </Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
