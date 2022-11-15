$(document).ready(function () {
    Chart.defaults.global.defaultFontSize = 16;

    if (jQuery('#barChart').length > 0) {
        var BarChartCtx = document.getElementById('barChart').getContext('2d');
        var BarChartWindowWidth = $(window).width() > 479;

        var barChart = new Chart(BarChartCtx, {
            type: 'bar',
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                datasets: [
                    {
                        label: "Ice Cream Sales ",
                        fill: true,
						backgroundColor: "#71BF44",
                        data: [1.5, 3.5, 2, 2.5, 4, 3.2, 5, 4.5, 4, 3.8, 5, 4.1],
                    },
					{
                        label: "Ice Cream Sales ",
                        fill: true,
						backgroundColor: "#240B14",
                        data: [2.5, 2.5, 2.3, 2.5, 4, 3, 5, 4.8, 4, 3, 5, 4.1],
                    }						
                ]
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: false,
                    text: 'Ice Cream Truck Report',
                    position: 'bottom'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 6,
                            stepSize: 1,
                            backdropPadding: 1,
                            padding: 20,
                            crossAlign: 'start',
                            fontColor: ' #757575',
                        },
                        gridLines: {
                            color: '#848484',
                            zeroLineColor: '#848484',
                            drawBorder: false,
                        },

                    }],
                    xAxes: [{
                        barThickness: BarChartWindowWidth ? 13 : 6,
                        ticks: {
                            fontColor: ' #757575',
                        },
                        gridLines: {
                            display: false,
                        }
                    }],

                },
                tooltips: {
                    backgroundColor: "#757575",
                    bodyFontColor: "#fff",
                    bodyFontFamily: 'Montserrat-Medium',
                    bodyFontSize: 18,
                    bodyLineHeight: 28,
                    yAlign: 'bottom',
                    borderWidth: 0,
                    titleFontSize: 15,
                    xPadding: 15,
                    yPadding: 7,
                    callbacks: {
                        labelPointStyle: function (context) {
                            return {
                                borderColor: 'rgb(0, 0, 255)',
                                backgroundColor: 'rgb(255, 0, 0)',
                                borderWidth: 2,
                                borderDash: [2, 2],
                                borderRadius: 2,
                            };
                        },
                        title: function () { }
                    }
                }
            }
        });
    }

    if (jQuery('#pieChart').length > 0) {
        var PieChartCtx = document.getElementById("pieChart").getContext('2d');
        var chartData = [120, 90, 100];
        var chartLabels = ['CDPQ return ', 'CDPQ annualized return ', 'CDPQ annualized '];
        var chart = new Chart(PieChartCtx, {
            type: 'pie',
            data: {
                labels: chartLabels,
                datasets: [{
                    backgroundColor: [
                        "#240B14",
                        "#F7F7F7",
                        "#00AAAD",
                    ],
                    data: chartData,
                }]
            },
            options: {
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    var text = [];
                    text.push('<ul class="0-legend">');
                    var ds = chart.data.datasets[0];
                    var sum = ds.data.reduce(function add(a, b) { return a + b; }, 0);
                    for (var i = 0; i < ds.data.length; i++) {
                        text.push(' <li class="dataList">');
                        var perc = Math.round(100 * ds.data[i] / sum, 0);
                        text.push('<span class="legendBox" style="background-color:' + ds.backgroundColor[i] + '">' + '</span>' + '<span class="labels" style="background-color:' + ds.backgroundColor[i] + '">' + '</span>' + chart.data.labels[i]);
                        text.push('</li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                }
            }
        });

        var myLegendContainer = document.getElementById("legend");
        // generate HTML legend
        myLegendContainer.innerHTML = chart.generateLegend();
        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", legendClickCallback, false);
        }
        //style="text-decoration: line-through"
        const dltLabel = document.getElementsByClassName("dataList")
        function legendClickCallback(event) {
            event = event || window.event;

            var target = event.target || event.srcElement;
            while (target.nodeName !== 'LI') {
                target = target.parentElement;
            }
            var parent = target.parentElement;
            var chartId = parseInt(parent.classList[0].split("-")[0], 10);
            var chart = Chart.instances[chartId];
            var index = Array.prototype.slice.call(parent.children).indexOf(target);
            var meta = chart.getDatasetMeta(0);
            if (dltLabel[index].style.textDecoration == "line-through")
                dltLabel[index].style.textDecoration = "none"
            else
                dltLabel[index].style.textDecoration = "line-through"

            var item = meta.data[index];

            if (item.hidden === null || item.hidden === false) {
                item.hidden = true;
                target.classList.add('hidden');
            } else {
                target.classList.remove('hidden');
                item.hidden = null;
            }
            chart.update();
        }
    }


    if (jQuery('#lineChart').length > 0) {
        var LineChartCtx = document.getElementById('lineChart').getContext('2d');
        var LineChartWindowWidth = $(window).width() < 767;
        if (LineChartWindowWidth) {
            var chartEl = document.getElementById("lineChart");
            chartEl.height = 250;
        }
        var myChart = new Chart(LineChartCtx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [{
                    label: 'CDPQ return',
                    backgroundColor: "#240B14",
                    borderColor: "#240B14",
                    fill: false,
                    data: [
                        3.5,
                        3.5,
                        1,
                        1,
                        2,
                        1.8,
                        2.5,
                        2,
                        3,
                        4,
                        3.5,
                        5
                    ],
                }, {
                    label: 'CDPQ return',
                    backgroundColor: "#00AAAD",
                    borderColor: "#00AAAD",
                    fill: false,
                    data: [
                        5.5,
                        2,
                        2,
                        1.8,
                        1,
                        3,
                        .5,
                        4.5,
                        1.5,
                        2,
                        4.3,
                        5.5

                    ],

                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Logarithmic'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: ' #757575',
                        },
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            max: 6,
                            backdropPadding: 1,
                            padding: 20,
                            crossAlign: 'start',
                            fontColor: ' #757575',
                        },
                        gridLines: {
                            color: '#DDDDDD',
                            zeroLineColor: '#DDDDDD',
                            drawBorder: false,
                        },

                    }],
                },
                tooltips: {
                    backgroundColor: "#757575",
                    bodyFontColor: "#fff",
                    bodyFontFamily: 'Montserrat-Medium',
                    bodyFontSize: 18,
                    bodyLineHeight: 28,
                    yAlign: 'bottom',
                    borderWidth: 0,
                    titleFontSize: 15,
                    xPadding: 15,
                    yPadding: 7,
                    callbacks: {
                        labelPointStyle: function (context) {
                            return {
                                borderColor: 'rgb(0, 0, 255)',
                                backgroundColor: 'rgb(255, 0, 0)',
                                borderWidth: 2,
                                borderDash: [2, 2],
                                borderRadius: 2,
                            };
                        },
                        title: function () { }
                    }
                }
            },
        });
    }
});