import React, { useRef, useState } from "react";
import { BiHide } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Alert from "./Alert";

import actions from "../actions";
import { signUp } from "../api";
import { useAuth } from "../contexts/AuthContext";

const Signup = ({ auth }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { fb_signup } = useAuth();

  const history = useHistory();

  const switchPasswordVisibiliity = () => {
    setIsShowPassword(!isShowPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await fb_signup(emailRef.current.value, passwordRef.current.value);
      const { data } = await signUp({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      auth(data);
      setLoading(false);
      history.push("/home");
    } catch (error) {
      setLoading(false);
      if (passwordRef.current.value.length < 6)
        setError("Password must contain at least 6 characters");
      else setError("Faild to create an account");
    }
  }

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="log-form-header">Sign up</h3>
        {error && <Alert message={error} />}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="input-container">
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              ref={passwordRef}
            />
            {isShowPassword ? (
              <GrView
                onClick={switchPasswordVisibiliity}
                className="password-visibillity"
              />
            ) : (
              <BiHide
                onClick={switchPasswordVisibiliity}
                className="password-visibillity"
              />
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="confirmPassword"
            ref={confirmPasswordRef}
          />
        </div>

        <button className="btn theme-color-btn" disabled={loading}>
          Sign Up
        </button>
        <p className="auth-form-change-mode">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (data) => dispatch(actions.auth(data)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
