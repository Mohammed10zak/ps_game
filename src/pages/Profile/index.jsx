import "./style.css";
import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "./../../config/api";
import { NavLink } from "react-router-dom";
export default class Profile extends Component {
  state = {
    username: "",
    email: "",
    admin: "",
    isLoading: true,
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.setState({
      username: res.data.name,
      email: res.data.email,
      admin: res.data.isAdmin,
      isLoading: false,
    });
  }

  render() {
    return (
      <div className="profile">
        <h1>My Profile</h1>
        {this.state.isLoading ? (
          "Loading..."
        ) : (
          <div className="profile_card">
            <p>Name: {this.state.username}</p>
            <p>Email: {this.state.email}</p>
          </div>
        )}

        {this.state.admin ? (
          <NavLink to="/userslist" className={"userslist"}>
            Users List
          </NavLink>
        ) : (
          ""
        )}
      </div>
    );
  }
}
