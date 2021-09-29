import axios from "axios";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import MedicalCondition from "../pages/medical_condition";

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      paytyp: [],
      pop: [],
      medicalCondition: [],
      treatment: [],
      checkboxValues: {},
      isChecked: false,
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/v1/pateintdetails/")
      .then((response) => {
        this.setState({ details: response.data.rows });
        this.setState({ paytyp: response.data.paytyp });
        this.setState({ pop: response.data.pop });
      })
      .then(() => {
        axios
          .get("http://localhost:4000/api/v1/medicalDetails")
          .then((response) => {
            this.setState({ medicalCondition: response.data.disease });
            this.setState({ treatment: response.data.treatment });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleCheckbox(e) {
    if (this.state.checkboxValues[e.target.value] != undefined) {
      console.log("Inside if");
      console.log(e.target.value);
      console.log(this.state.checkboxValues[e.target.value]);
      this.setState(
        {
          ...this.state.checkboxValues,
          [e.target.value]: !this.state.checkboxValues[e.target.value],
        },
        () => {
          console.log(this.state.checkboxValues);
        }
      );
    } else {
      this.setState(
        {
          checkboxValues: {
            ...this.state.checkboxValues,
            [e.target.value]: true,
          },
        },
        () => {
          console.log(this.state.checkboxValues);
        }
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <h3>State</h3>
            {this.state.details.map((detail) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={detail.state}
                    checked={detail.isChecked}
                    onChange={(e) => this.toggleCheckbox(e)}
                  />
                  <label className="form-check-label">{detail.state}</label>
                </div>
              );
            })}
            <h3>Payer Type</h3>
            {this.state.paytyp.map((detail) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={detail}
                    checked={detail.isChecked}
                    onChange={(e) => this.toggleCheckbox(e)}
                  />
                  <label className="form-check-label">{detail}</label>
                </div>
              );
            })}
            <h3>Payer cohort</h3>
            {this.state.pop.map((detail) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={detail}
                    checked={detail.isChecked}
                    onChange={this.toggleCheckbox}
                  />
                  <label className="form-check-label">{detail}</label>
                </div>
              );
            })}
            <h3>Meidcal Condition</h3>
            {this.state.medicalCondition.map((med) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={med.name}
                    checked={med.isChecked}
                    onChange={this.toggleCheckbox}
                  />
                  <div className="">
                    <label className="form-check-label">{med.name}</label>
                    <p>{med.label_val}</p>
                  </div>
                </div>
              );
            })}
            <h3>Treatment</h3>
            {this.state.treatment.map((treat) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={treat.name}
                    checked={treat.isChecked}
                    onChange={this.toggleCheckbox}
                  />
                  <div className="label">
                    <label className="form-check-label">{treat.name}</label>
                    <p>{treat.label_val}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-8">
            <h2>hello</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Page1;
