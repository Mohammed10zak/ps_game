import "./style.css";
import React, { Component } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { API_URL } from "./../../config/api";

export default function UserDetails() {
  const { id } = useParams();
  return <Details id={id} />;
}

class Details extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    isLoading: true,
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/users/${this.props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({
        name: res.data.name,
        email: res.data.email,
        id: res.data._id,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ul className="users_details">
        <h3>{this.state.name} Details: </h3>

        {this.state.isLoading ? (
          "Loading..."
        ) : (
          <li className="details">
            <div>Id: {this.state.id}</div>
            <div>Name: {this.state.name}</div>
            <div>Email: {this.state.email}</div>
          </li>
        )}
      </ul>
    );
  }
}
