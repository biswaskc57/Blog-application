import React from "react";
import PropTypes from "prop-types";
import "../style/login.css";
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <h3>Username:</h3>
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <h3>Password:</h3>
          <input
            id="password"
            type="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
        <p> username: Test</p>
        <p> password: Test</p>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
