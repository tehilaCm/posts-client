import React, { useEffect, useRef, useState } from "react";
import { BiHide } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../actions";
import { signIn } from "../api";
import { useAuth } from "../contexts/AuthContext";

import Alert from "./Alert";
import LoginSpinner from "./LoginSpinner";

const Login = ({ auth }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { fb_login, fb_logout } = useAuth();

  const history = useHistory();

  useEffect(async () => {
    await fb_logout();
  }, []);

  const switchPasswordVisibiliity = () => {
    setIsShowPassword(!isShowPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailRef.current.value) {
      return setError("Please enter you'r email");
    }
    if (!passwordRef.current.value) {
      return setError("Please enter you'r password");
    }
    try {
      setError("");
      setLoading(true);
      await fb_login(emailRef.current.value, passwordRef.current.value);
      const { data } = await signIn({
        email: emailRef.current.value,
      });
      auth(data);
      setLoading(false);
      history.push("/home");
    } catch (error) {
      setLoading(false);
      setError("Faild to log in. Please check you'r email & password!");
    }
  }

  return (
    <div>
      <form className="auth-form signin-form" onSubmit={handleSubmit}>
        <h3 className="log-form-header">Log in</h3>
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

        <button className="btn theme-color-btn sign" disabled={loading}>
          {loading ? <LoginSpinner /> : "Login"}
        </button>
        <p className="auth-form-change-mode">
          Need an account?{" "}
          <Link to="/" className="sign-link">
            Sign up
          </Link>
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

export default connect(null, mapDispatchToProps)(Login);
