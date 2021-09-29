import axios from "axios";
import React from "react";
import { Link, withRouter } from "react-router-dom";

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meddetails: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/v1/medicalDetails/")
      .then((response) => {
        this.setState({ details: response.data.disease });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.meddetails);
    return (
      <div className="container-fluid">
        <div className="row">
          <h3>State</h3>
          {this.state.meddetails.map((detail) => {
            return (
              <div>
                <input
                  type="checkbox"
                  id="topping"
                  name="topping"
                  value={detail.name}
                />
                <label className="form-check-label">{detail.name}</label>
              </div>
            );
          })}
          <h3>Value</h3>
          {this.state.meddetails.map((detail) => {
            return (
              <div>
                <input
                  type="checkbox"
                  id="topping"
                  name="topping"
                  value={detail.label_val}
                />
                <label className="form-check-label">{detail.label_val}</label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Page1;
