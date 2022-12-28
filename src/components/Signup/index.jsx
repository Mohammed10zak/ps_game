import React, { Component } from "react";
import "./style.css";
import gamelogo from "../../images/gamelogo.png";
import google from "../../images/google.svg";
import bg from "../../images/bg.png";
import Button from "../../sections/Button";
import * as yup from "yup";
import ProgressBar from "./Progressbar";

const initialData = {
  name: "abdooo",
  email: "mhmd@gsg.com",
  password: "mhmd123",
  checked: false,
};

const defaults = {
  name: "",
  email: "",
  password: "",
  confirmpass: "",
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
    error: "",
    myData: initialData,
  };

  schema = yup.object().shape({
    name: yup.string().min(6, "Name Should be more than 8").max(16).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).matches(regularExpression).required(),
    confirmpass: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
    checked: yup.boolean().oneOf([true]).required(),
  });

  handleChangeInput = (e) => {
    const { value, id } = e.target;
    const checked = e.target.checked;

    this.setState({ [id]: value, checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();

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
      .then(() => {
        console.log("valid");
        this.setState((prevState) => ({
          myData: {
            name: prevState.name,
            email: prevState.email,
            password: prevState.password,
            confirmpass: prevState.confirmpass,
          },
          ...defaults,
        }));
      })
      .catch((e) =>
        this.setState({
          error: "Something error,Please check your input feild",
        })
      );
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
          {this.state.error && <p className="error">{this.state.error}</p>}

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
                type="password"
                placeholder="Password"
                onChange={this.handleChangeInput}
                value={this.state.password}
                onInput={this.passwordStrength}
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
