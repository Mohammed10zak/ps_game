import React, { Component } from "react";
import "./style.css";
import gamelogo from "../../images/gamelogo.png";
import google from "../../images/google.svg";
import bg from "../../images/bg.png";
import Button from "../../sections/Button";

const initialData = {
  email: "mhmd@gsg.com",
  password: "mhmd123",
  confirmpass: "mhmd123",
  checked: false,
};

const defaults = {
  email: "",
  password: "",
  confirmpass: "",
  checked: false,
};

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmpass: "",
    checked: false,
    error: "",
    message: "",
    myData: initialData,
  };

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    const checked = e.target.checked;

    this.setState({ [id]: value, checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmpass) {
      this.setState((prevState) => ({
        myData: {
          email: prevState.email,
          password: prevState.password,
          confirmpass: prevState.confirmpass,
          checked: prevState.checked,
        },
        ...defaults,
      }));
    } else {
      this.setState({ error: "check your passward inputs!" });
    }
  };

  passwordStrength = (e) => {
    const password = e.target.value;

    if (
      password < 8 &&
      !password.match(/[!@#$%^&*]/) &&
      !password.match(/[0-9]/) &&
      !password.match(/[a-z]/) &&
      !password.match(/[A-Z]/)
    )
      this.setState({ password });
    this.setState({ message: "your passward is not a good" });
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

        <button className="back" onClick={this.props.toggle}>
          &lt; back
        </button>
        <form className="sign_form" onSubmit={this.handleSubmit}>
          <div>
            <h3 className="form_sign_title">Register Individual Account!</h3>
            <p className="form_sign_desc">
              For the purpose of gamers regulation, your details are required.
            </p>
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
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Create password*</label>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChangeInput}
                value={this.state.password}
                onInput={this.passwordStrength}
                required
              />
              {this.state.message && (
                <p className="error">{this.state.message}</p>
              )}
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
                required
              />
              {this.state.error && <p className="error">{this.state.error}</p>}
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="checked"
              checked={this.state.checked}
              onChange={this.handleChangeInput}
              name="checked"
              required
            />
            <label htmlFor="repeatpassword*" className="label">
              I agree to terms & conditions
            </label>
          </div>
          <Button myBtn={"Register Account"} />
          <div className="or">Or</div>
          <div className="go_to_login">
            <img src={google} alt="google" className="google" />

            <button
              className="login_button"
              type="button"
              onClick={this.props.toggle}
            >
              login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
