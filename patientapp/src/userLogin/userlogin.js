import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./userlogin.css";
import logo from "../logo.svg";

class userLogin extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      Password: "",
      error: "",
    };
  }

  onuserNameChange(value) {
    this.setState({
      userName: value,
    });
  }

  onPasswordChange(value) {
    this.setState({
      Password: value,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/login", {
        userName: this.state.userName,
        Password: this.state.Password,
      })
      .then((response) => {
        console.log(response);
        this.context.setLoginStatus(response.data.userName);
        this.props.history.push(`/page1`);
      })
      .catch((error) => {
        this.setState({ error: error.response.data.message });
      });
  };

  render() {
    console.log(this.state.Password);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <img src={logo} alt="logo" />
          </div>
          <div className="col-6">
            <div className="login-form">
              <form onSubmit={this.handleLogin}>
                <h2 className="text-center">Log in</h2>
                {this.state.error ? this.state.error : null}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required="required"
                    value={this.state.userName}
                    onChange={(e) => this.onuserNameChange(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                    value={this.state.Password}
                    onChange={(e) => this.onPasswordChange(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Log in
                  </button>
                </div>
              </form>
              <p className="text-center">
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default userLogin;
