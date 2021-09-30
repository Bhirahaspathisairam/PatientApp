import React from "react";
import { Link } from "react-router-dom";
import "./page1.css";
class Page1 extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 min-vh-100 divide">
            <Link className="para" to="/page2">
              Page2
            </Link>
          </div>
          <div className="col-8 min-vh-100 divide1">
            <p className="para1">Go to page 2 to see the results</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Page1;
