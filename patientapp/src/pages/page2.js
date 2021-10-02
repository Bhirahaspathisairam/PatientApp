import axios from "axios";
import React from "react";
import Chart from "../chart/chart";
import "./page2.css";

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      paytyp: [],
      pop: [],
      medicalCondition: [],
      treatment: [],
      reportData: {},
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

  toggleCheckboxValue(categoryType, index) {
    switch (categoryType) {
      case "state":
        this.setState({
          details: this.updateState(this.state.details, index),
        });
        break;
      case "payTyp":
        this.setState({
          paytyp: this.updateState(this.state.paytyp, index),
        });
        break;
      case "medicalCondition":
        this.setState({
          medicalCondition: this.updateState(
            this.state.medicalCondition,
            index
          ),
        });
        break;
      case "pop":
        this.setState({
          pop: this.updateState(this.state.pop, index),
        });
        break;
      case "treatment":
        this.setState({
          treatment: this.updateState(this.state.treatment, index),
        });
        break;
      default:
        break;
    }
  }

  updateState = (stateToUpdate, index) => {
    const newState = [...stateToUpdate];
    newState[index] = {
      ...newState[index],
      isChecked: !newState[index].isChecked,
    };
    return newState;
  };

  getFilteredValue(state) {
    return state.filter((item) => item.isChecked);
  }

  fetchReport = () => {
    const reportParams = {
      details: this.getFilteredValue(this.state.details),
      paytyp: this.getFilteredValue(this.state.paytyp),
      pop: this.getFilteredValue(this.state.pop),
      medicalCondition: this.getFilteredValue(this.state.medicalCondition),
      treatment: this.getFilteredValue(this.state.treatment),
    };
    axios
      .post("http://localhost:4000/api/v1/generatetreport", { reportParams })
      .then((response) => {
        this.setState({ reportData: response.data.reportData });
      });
  };

  render() {
    var chart;
    if (this.state.reportData.length > 0) {
      chart = <Chart chartdetails={this.state.reportData} />;
    }
    console.log(this.state.reportData);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 border-right">
            <div className="check">
              <h3>State</h3>
              {this.state.details.map((detail, index) => {
                return (
                  <div className="row check-center">
                    <input
                      key={index}
                      className="col-1"
                      type="checkbox"
                      id="topping"
                      name="topping"
                      value={detail.state}
                      checked={detail.isChecked}
                      onChange={() => this.toggleCheckboxValue("state", index)}
                    />
                    <label className="col-5 form-check-label">
                      {detail.state}
                    </label>
                  </div>
                );
              })}
              <h3>Payer Type</h3>
              {this.state.paytyp.map((paytyp, index) => {
                return (
                  <div className="row">
                    <input
                      key={index}
                      className="col-1"
                      type="checkbox"
                      id="topping"
                      name="topping"
                      value={paytyp.name}
                      checked={paytyp.isChecked}
                      onChange={() => this.toggleCheckboxValue("payTyp", index)}
                    />
                    <label className="col-5 form-check-label">
                      {paytyp.name}
                    </label>
                  </div>
                );
              })}
              <h3>Payer cohort</h3>
              {this.state.pop.map((pop, index) => {
                return (
                  <div className="row">
                    <input
                      className="col-1"
                      type="checkbox"
                      id="topping"
                      name="topping"
                      value={pop.name}
                      checked={pop.isChecked}
                      onChange={() => this.toggleCheckboxValue("pop", index)}
                    />
                    <label className="col-5 form-check-label">{pop.name}</label>
                  </div>
                );
              })}
              <h3>Medical Condition</h3>
              {this.state.medicalCondition.map((med, index) => {
                return (
                  <div className="row">
                    <input
                      className="col-1"
                      type="checkbox"
                      id="topping"
                      name="topping"
                      value={med.name}
                      checked={med.isChecked}
                      onChange={(e) =>
                        this.toggleCheckboxValue("medicalCondition", index)
                      }
                    />
                    <label className="col-5 form-check-label">{med.name}</label>
                  </div>
                );
              })}
              <h3>Treatment</h3>
              {this.state.treatment.map((treat, index) => {
                return (
                  <div className="row">
                    <input
                      className="col-1"
                      type="checkbox"
                      id="topping"
                      name="topping"
                      value={treat.name}
                      checked={treat.isChecked}
                      onChange={() =>
                        this.toggleCheckboxValue("treatment", index)
                      }
                    />
                    <label className="col-5 form-check-label">
                      {treat.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-8 container">
            <h2>Report</h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.fetchReport}
            >
              Fetch Details
            </button>
            {chart}
          </div>
        </div>
      </div>
    );
  }
}

export default Page1;
