import React, { Component } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  setLoginStatus: () => {},
  setLogoutStatus: () => {},
});

export class AuthProvider extends Component {
  // Context state
  state = {
    isLoggedIn: false,
  };

  setLoginStatus = (userName) => {
    console.log(userName);
    localStorage.setItem("userName", userName);
    console.log("indise setloginstatus");
    this.setState({ isLoggedIn: true });
  };

  setLogoutStatus = () => {
    localStorage.removeItem("userName");
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          setLoginStatus: this.setLoginStatus,
          setLogoutStatus: this.setLogoutStatus,
          isLoggedIn: this.state.isLoggedIn,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
