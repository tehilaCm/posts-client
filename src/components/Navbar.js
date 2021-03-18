import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { VscSignOut } from "react-icons/vsc";

import actions from "../actions";
import { useAuth } from "../contexts/AuthContext";

import Alert from "./Alert";

const Navbar = ({ signout }) => {
  const [error, setError] = useState("");

  const { currentUser, fb_logout } = useAuth();

  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await fb_logout();
      signout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  if (!currentUser) return false;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <i>
          <b>
            <Link
              className="navbar-brand"
              style={{ color: "rgb(132, 11, 156)" }}
              to="/home"
            >
              Posts
            </Link>
          </b>
        </i>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className="nav-link active linke"
              aria-current="page"
              to="/home"
            >
              Home
            </Link>
            <Link className="nav-link" to="/saved">
              Saved
            </Link>
            <Link className="nav-link" to="/userPosts">
              My Posts
            </Link>
          </div>
        </div>
        {error && <Alert message={error} />}
      </div>
      <button className="btn log-out-btn" onClick={handleLogout}>
        <VscSignOut />
      </button>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
