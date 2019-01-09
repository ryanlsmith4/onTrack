//adminScripts
// for chart
// =============================================================================
var interval = setInterval(myTimer, 1500);
const weHelpWith = ["We're here to help",
    "Let's get organized",
    "Work smarter not harder",
    "Check us out",
    "Solving logistics one customer at a time"
];

let i = 0;

function myTimer() {
    // var d = new Date();
    if (i < weHelpWith.length) {
        document.getElementById("change-sign").innerHTML = weHelpWith[i];
        i++;
    } else {
        i = 0;
    }
}




var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        },
        legend: {
            display: false,
        }
    }
});
