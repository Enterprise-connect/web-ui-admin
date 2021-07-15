import React from "react";

export default class Dashboard extends React.Component {
  /* istanbul ignore next */
  componentDidMount() {
        this.highChart();
  }

  /* istanbul ignore next */
  highChart() {
    Highcharts.chart("pieChart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Types of usage by different Agents",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "Postgres",
              y: 61.41,
              sliced: true,
              selected: true,
            },
            {
              name: "SSH",
              y: 11.84,
            },
            {
              name: "Database",
              y: 10.85,
            },
            {
              name: "MySQL",
              y: 4.67,
            },
            {
              name: "Oracle",
              y: 4.18,
            },
            {
              name: "Redis",
              y: 1.64,
            },
            {
              name: "QQ",
              y: 2.8,
            },
            {
              name: "Other",
              y: 2.61,
            },
          ],
        },
      ],
    });

    Highcharts.chart("lineChart", {
      title: {
        text: "Connectivity over time, 2016-2021",
      },
      /* 
      subtitle: {
        text: "Source: thesolarfoundation.com",
      }, */

      yAxis: {
        title: {
          text: "Number of Users",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2016 to 2021",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2016,
        },
      },

      series: [
        {
          name: "Installation",
          data: [43934, 52503, 57177, 69658, 97031, 119931],
        },
        {
          name: "Manufacturing",
          data: [24916, 24064, 29742, 29851, 32490, 30282],
        },
        {
          name: "Sales & Distribution",
          data: [11744, 17722, 16005, 19771, 20185, 24377],
        },
        {
          name: "Project Development",
          data: [null, null, 7988, 12169, 15112, 22452],
        },
        {
          name: "Other",
          data: [12908, 5948, 8105, 11248, 8989, 11816],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });

    Highcharts.chart("barChart", {
      chart: {
        type: "column",
      },

      title: {
        text: "Connectivity usage between  different Gateways",
      },

      xAxis: {
        categories: [
          "Gateway",
          "Agents",
          "Server",
          "SuperConnections",
          "Sessions",
        ],
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: "Number of Gateways",
        },
      },

      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.x +
            "</b><br/>" +
            this.series.name +
            ": " +
            this.y +
            "<br/>" +
            "Total: " +
            this.point.stackTotal
          );
        },
      },

      plotOptions: {
        column: {
          stacking: "normal",
        },
      },

      series: [
        {
          name: "John",
          data: [5, 3, 4, 7, 2],
          stack: "male",
        },
        {
          name: "Joe",
          data: [3, 4, 4, 2, 5],
          stack: "male",
        },
        {
          name: "Jane",
          data: [2, 5, 6, 2, 1],
          stack: "female",
        },
        {
          name: "Janet",
          data: [3, 0, 4, 4, 3],
          stack: "female",
        },
      ],
    });
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      /* istanbul ignore next */
      <div className="Dashboard row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div id="lineChart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div id="barChart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div id="pieChart"></div>
            </div>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
