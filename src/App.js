import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup/index";
import Login from "./pages/Login/index";
import ProtectedRoute from "./pages/ProtectedRoute";

import React, { Component } from "react";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails/index";

export default class App extends Component {
  state = {
    isAuthorized: false,
    isAdmin: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuthorized: true });
    }
    const admin = localStorage.getItem("Admin");
    if (admin !== "true") {
      this.setState({ isAdmin: false });
    }else {
      this.setState({isAdmin:true})
    }
  }
  
  login = () => this.setState({ isAuthorized: true });
  
  admin = () => {
    this.setState({ isAdmin: true });
  };
  
  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("Admin");
    
    this.setState({ isAuthorized: false });
  };

  render() {
    return (
      <div className="App">
        <Routes>
          <Route index="true" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              <>
                {this.state.isAuthorized ? (
                  <Navigate to="/controlPanel" />
                ) : (
                  <Login login={this.login} admin={this.admin} />
                )}
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {this.state.isAuthorized ? (
                  <Navigate to="/controlPanel" />
                ) : (
                  <Signup login={this.login} />
                )}
              </>
            }
          />

          <Route
            path="/controlPanel"
            element={
              <ProtectedRoute
                isAuthorized={this.state.isAuthorized}
                logout={this.logout}
                admin={this.state.isAdmin}
              />
            }
          />
          <Route path="/profile" element={<Profile 
                admin={this.state.isAdmin}
                />} />
          <Route
            path="userslist/:id"
            element={
              this.state.isAdmin ? (
                <UserDetails />
              ) : (
                <Navigate to="/controlPanel" />
              )
            }
          />
          <Route
            path="/userslist"
            element={
              this.state.isAdmin ? (
                <UserList />
              ) : (
                <Navigate to="/controlPanel" />
              )
            }
          />
          <Route path="*" element={<h1>page not found 404</h1>} />
        </Routes>
      </div>
    );
  }
}
