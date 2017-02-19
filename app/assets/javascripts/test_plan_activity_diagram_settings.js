function init_test_activities_diagrams() {

  // console.log('function init_test_activities_diagrams()');
  if($('#testingActivities').length) {
  var ctx = document.getElementById("test_cases_counting_chart");
    var lineChartData = {
    labels: gon.date,
    datasets: [
        {
          label: 'Positive #',
           fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 0.8)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(255, 99, 132,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255, 99, 132,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          pointHitRadius: 10,
          lineTension: 0,
          spanGaps: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          data: gon.positive
        },
        {
          label: 'Negative #',
          fill: false,
          backgroundColor: "rgba(54, 162, 235, 0.8)",
          borderColor: "rgba(54, 162, 235, 0.8)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(54, 162, 235,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(54, 162, 235,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          pointHitRadius: 10,
          spanGaps: false,
          lineTension: 0,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: gon.negative
        },
         {
           label: 'Integrated #',
           fill: false,
           backgroundColor: "rgba(255, 206, 86, 0.8)",
           borderCapStyle: 'butt',
           borderDash: [],
           borderDashOffset: 0.0,
           borderJoinStyle: 'miter',
           pointBorderColor: "rgba(255, 206, 86,1)",
           pointBackgroundColor: "#fff",
           pointBorderWidth: 1,
           pointHoverRadius: 5,
           pointHoverBackgroundColor: "rgba(255, 206, 86,1)",
           pointHoverBorderWidth: 1,
           pointRadius: 4,
           pointHitRadius: 10,
           lineTension: 0,
           spanGaps: false,
           borderColor: 'rgba(255, 206, 86, 1)',
           data: gon.integration
          },
        {
            label: 'Limited #',
            fill: false,
            backgroundColor: "rgba(204, 204, 204, 0.8)",
            borderColor: "rgba(204, 204, 204, 0.8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(204, 204, 204,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            lineTension: 0,
            pointHoverBackgroundColor: "rgba(204, 204, 204,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            spanGaps: false,
            data: gon.limited
        },
        {
            label: 'UI #',
            fill: false,
            backgroundColor: "rgba(75,192,192,0.8)",
            borderColor: "rgba(75,192,192,0.8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            lineTension: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: gon.ui,
            spanGaps: false,
        },
        {
            label: 'Localization #',
            fill: false,
            backgroundColor: "rgba(140, 72, 159, 0.8)",
            borderColor: "rgba( 140, 72, 159, 0.8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(140, 72, 159,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            lineTension: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(140, 72, 159,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            spanGaps: false,
            data: gon.localization
        },
    ],
    }
  new Chart(ctx, {
   type: 'line',
   data: lineChartData,
    options: {
      scales: {
      yAxes: [{
               ticks: {
                  min: 0,
                  stepSize: 5,
              }

          }]
        }
    }
  });

  var ctx = document.getElementById("test_cases_status_calculating_chart");
    var lineChartData = {
    labels: gon.date2,
    datasets: [
        {
            label: 'Passed #',
            fill: false,
            backgroundColor: "rgba(75,192,192,0.8)",
            borderColor: "rgba(75,192,192,0.8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            lineTension: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: gon.ui,
            spanGaps: false,
            data: gon.pass
        },
        {
          label: 'Blocked #',
          fill: false,
          backgroundColor: "rgba(54, 162, 235, 0.8)",
          borderColor: "rgba(54, 162, 235, 0.8)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(54, 162, 235,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(54, 162, 235,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          pointHitRadius: 10,
          spanGaps: false,
          lineTension: 0,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: gon.block
        },
        {
          label: 'Failed #',
           fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 0.8)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(255, 99, 132,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255, 99, 132,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          pointHitRadius: 10,
          lineTension: 0,
          spanGaps: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          data: gon.failed
        },
    ],
    };
    new Chart(ctx, {
     type: 'line',
     data: lineChartData,
      options: {
        scales: {
        yAxes: [{
                 ticks: {
                    min: 0,
                    stepSize: 5,
                }

            }]
          }
      }
    });
  }
}
