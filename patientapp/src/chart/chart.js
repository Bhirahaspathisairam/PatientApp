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

    return [
      {
        label: this.props.chartdetails.POP,
        data: this.props.chartdetails,
        backgroundColor: color[this.props.chartdetails.POP],
        borderColor: [],
        borderWidth: 1,
      },
    ];
  }
  render() {
    let len = Object.keys(this.props.chartdetails).length;
    const LABELS = Object.keys(this.props.chartdetails).splice(1, len - 2);
    return (
      <div>
        <div className="chart-details">
          <Bar
            data={{
              labels: LABELS,
              datasets: this.getDataset(),
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
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
