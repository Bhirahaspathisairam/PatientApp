import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
      Email: "",
      message: "",
      error: "",
      isError: false,
      isMsg: false,
    };
  }
  handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/register", this.state)
      .then((response) => {
        console.log(response);
        this.setState({
          message: response.data.message,
          isMsg: true,
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          error: error.response.data.message,
          isMsg: false,
          isError: true,
        });
      });
  };

  onUserNameChange(value) {
    this.setState({
      UserName: value,
    });
  }
  onPasswordChange(value) {
    this.setState({
      Password: value,
    });
  }
  onEmailChange(value) {
    this.setState({
      Email: value,
    });
  }

  render() {
    return (
      <div class="signup-form">
        <form onSubmit={this.handleRegistration}>
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p>
          {this.state.isMsg ? this.state.message : null}
          {this.state.isError ? this.state.error : null}
          <hr></hr>
          <div class="form-group">
            <input
              type="userName"
              class="form-control"
              name="userName"
              placeholder="userName"
              required="required"
              value={this.state.UserName}
              onChange={(e) => this.onUserNameChange(e.target.value)}
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="email"
              required="required"
              value={this.state.Email}
              onChange={(e) => this.onEmailChange(e.target.value)}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              required="required"
              value={this.state.Password}
              onChange={(e) => this.onPasswordChange(e.target.value)}
            />
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
