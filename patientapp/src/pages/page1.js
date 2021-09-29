import React from "react";
import { Link, withRouter } from "react-router-dom";

class Page1 extends React.Component {
  render() {
    return (
      <div className="container">
        <div class="col-md-2">
          <div class="row">
            <Link to="/page2">Page2</Link>
          </div>
        </div>
        <div class="col-md-9">
          <p>Go to page 2</p>
        </div>
      </div>
    );
  }
}

export default Page1;
