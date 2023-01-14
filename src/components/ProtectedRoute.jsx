import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import ControlPanel from "../pages/ControlPanel/index";

export default class ProtectedRoute extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthorized ? (
          <>
            <ControlPanel logout={this.props.logout} admin={this.props.admin} />

            {/* <Outlet /> */}
          </>
        ) : (
          <Navigate to="/login" />
        )}
      </div>
    );
  }
}
