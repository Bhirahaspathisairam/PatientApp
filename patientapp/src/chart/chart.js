import React from "react";
import { Bar } from "react-chartjs-2";
import "./chart.css";

class Chart extends React.Component {
  getDataset() {
    let color = {
      ckb: "red",
      both: "blue",
      diab: "orange",
    };
    let len = Object.keys(this.props.chartdetails[0]).length;
    const LABELS = Object.keys(this.props.chartdetails[0]).splice(0, len);

    return this.props.chartdetails.map((detail) => {
      return {
        label: detail.POP,
        data: detail ? LABELS.map((val) => detail[val]) : [],
        backgroundColor: color[detail.POP],
        borderColor: [],
        borderWidth: 1,
      };
    });
  }
  render() {
    let len = Object.keys(this.props.chartdetails[0]).length;
    const LABELS = Object.keys(this.props.chartdetails[0]).splice(0, len);
    console.log(LABELS);
    return (
      <div>
        <div className="chart-details">
          <Bar
            data={{
              labels: LABELS,
              datasets: this.getDataset(),
            }}
            height={400}
            width={1000}
            options={{
              maintainAspectRatio: true,
              scales: {
                xAxes: [
                  {
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 25,
                },
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
