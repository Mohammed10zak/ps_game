import "./style.css";
import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "./../../config/api";
import { NavLink } from "react-router-dom";

export default class UserList extends Component {
  state = {
    username: "",
    allUsers: [],
    isLoading: true,
    isDeleting: false,
  };

  async componentDidMount() {
    try {
      const username = localStorage.getItem("name");
      this.setState({ username });
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({ allUsers: res.data });
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }
  handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.setState({ isDeleting: true });
      try {
        await axios.delete(`${API_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.setState({
          allUsers: this.state.allUsers.filter((user) => user._id !== id),
        });
        this.setState({ isDeleting: false });
      } catch (error) {
        console.log(error);
        this.setState({ isDeleting: false });
      }
    }
  };

  render() {
    return (
      <div className="all_users">
        <p>{this.state.username}</p>
        <ol className="users_list">
          <div className="user_title">All Users</div>
          {this.state.isLoading
            ? "Loading .. "
            : this.state.isDeleting
            ? "Deleting.."
            : this.state.allUsers.map((user) => (
                <li className="user_card" key={user._id}>
                  <NavLink className="email-link" to={`${user._id}`}>
                    <p>{user.email}</p>
                  </NavLink>

                  <button
                    className="delete"
                    onClick={() => this.handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
        </ol>
      </div>
    );
  }
}
