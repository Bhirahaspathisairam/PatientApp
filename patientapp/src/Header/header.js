import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function Header({ props }) {
  let history = useHistory();

  function logout() {
    history.push("/");
    setLogoutStatus();
  }
  const authContext = useContext(AuthContext);
  const { isLoggedIn, setLogoutStatus } = authContext;
  console.log(isLoggedIn);

  return (
    <div classNameName="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            PatientApp
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Login
                    </Link>
                  </li>
                  <li classNameName="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <Link onClick={logout} to="/" className="nav-link">
                  Logout
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* <nav classNameName="navbar navbar-expand-lg navbar-light fixed-top">
        <div classNameName="container">
          <Link classNameName="navbar-brand" to="/">
            WEBAPP
          </Link>
          <div classNameName="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul classNameName="navbar-nav ml-auto">
              {!isLoggedIn && (
                <>
                  <li classNameName="nav-item">
                    <Link classNameName="nav-link" to="/">
                      Login
                    </Link>
                  </li>
                  <li classNameName="nav-item">
                    <Link classNameName="nav-link" to="/signup">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <Link onClick={logout} to="/">
                  Logout
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav> */}
    </div>
  );
}

export default withRouter(Header);
