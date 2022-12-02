$(document).ready(function () {
    Chart.defaults.global.defaultFontSize = 16;

    if (jQuery('#barChart').length > 0) {
        let xAxisLabelsVal = document.getElementById('barChartAxis').value;
        let xAxisLabels = xAxisLabelsVal.split(",");

        let data1_label = document.getElementById('dataSetLabelOne').value;
        let dataset_data1val = document.getElementById('dataSetValuesFirstArr').value;
        let dataset_data1 = dataset_data1val.split(",");

        let data2_label = document.getElementById('dataSetLabelTwo').value;
        let dataset_data2val = document.getElementById('dataSetValuesSecondArr').value;
        let dataset_data2 = dataset_data2val.split(",");

		let maxsizeval = document.getElementById('maxSize').value;
        let maxsize = parseInt(maxsizeval);

		let stepsizeval = document.getElementById('stepSize').value;
        let stepsize = parseInt(stepsizeval);

        var BarChartWindowWidth = $(window).width() < 768;
        var BarChartWindowWidthsmall = $(window).width() < 479;
        var BarChartData = {
            type: 'bar',
            data: {
                labels: xAxisLabels,  
                //labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],              
                datasets: [
                    {
                        label: data1_label,
                        fill: true,
                        backgroundColor: "#71BF44",
                        data: dataset_data1,
                    },
                    {
                        label: data2_label,
                        fill: true,
                        backgroundColor: "#240B14",
                        data: dataset_data2,
                    }
                ]
            },
            plugins: [{
                afterDraw: chart => {
                    var ctx = chart.chart.ctx;
                    ctx.save();
                    ctx.font = BarChartWindowWidth ? "12px Montserrat-Medium" : "18px Montserrat-Medium",
                        ctx.fillStyle = "#240B14";
                    var y = 15;
                    ctx.textAlign = 'start';
                    ctx.fillText('Users', BarChartWindowWidth ? "0" : "30", y);
                    ctx.textAlign = 'end';
                    ctx.fillText('Month', chart.chart.width - 10, chart.chart.height - 35);
                    ctx.restore();
                },
            }],
            options: {
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: {
                        top: BarChartWindowWidth ? "40" : "50",
                        right: BarChartWindowWidthsmall ? 60 : BarChartWindowWidth ? "60" : "80",
                    }
                },
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    var text = [];
                    text.push('<ul class="' + chart.id + '-legend">');
                    for (var i = 0; i < chart.data.datasets.length; i++) {
                        text.push('<li  >')
                        text.push('<span class="legendColor" style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>')
                        text.push('<span id="legend-' + i + '-item" >');
                        if (chart.data.datasets[i].label) {
                            text.push(chart.data.datasets[i].label);
                        }
                        text.push('</span></li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                },
                title: {
                    display: false,
                    text: '',
                    position: 'bottom'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxsize,
                            stepSize: stepsize,
                            backdropPadding: 1,
                            padding: BarChartWindowWidth ? 5 : 15,
                            crossAlign: 'start',
                            fontColor: '#240B14',
                            fontSize: BarChartWindowWidth ? "12" : "18",
                        },
                        gridLines: {
                            color: '#848484',
                            zeroLineColor: '#848484',
                            tickMarkLength: BarChartWindowWidth ? 10 : 15,
                        },
                    }],
                    
                    xAxes: [{
                        barThickness: BarChartWindowWidthsmall ? 5 : BarChartWindowWidth ? 10 : 14,
                        ticks: {
                            fontColor: '#240B14',
                            fontSize: BarChartWindowWidth ? "12" : "18",
                        },
                        gridLines: {
                            display: false,
                        }
                    }],
                },
                tooltips: {
                    backgroundColor: "#282c2cb8",
                    bodyFontColor: "#fff",
                    bodyFontFamily: 'Montserrat-Medium',
                    // bodyFontSize: BarChartWindowWidth ? "14" : "18",
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
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
            }
            
        };

        var BarChartctxd = document.getElementById('barChart').getContext('2d');
        window.myBarChart = new Chart(BarChartctxd, BarChartData);
        $("#BarChartLegend").html(window.myBarChart.generateLegend());
        // Show/hide chart by click legend
        updateBarChart = function (e, datasetIndex, li) {
            var index = datasetIndex;
            var BarChartci = e.view.myBarChart;
            var BarChartMeta = BarChartci.getDatasetMeta(datasetIndex);
            (BarChartMeta.hidden == true) ? BarChartMeta.hidden = false : BarChartMeta.hidden = true;
            if (BarChartMeta.hidden) {
                const spanLength = li.querySelectorAll('span')
                li.querySelectorAll('span')[1].style.textDecoration = "line-through"
            }
            else {
                li.querySelectorAll('span')[1].style.textDecoration = "none"
            }
            BarChartci.update();
        };
        var BarChartLegendItems = document.getElementsByTagName('li');
        for (let i = 0; i < BarChartLegendItems.length; i += 1) {
            BarChartLegendItems[i].addEventListener("click", (event) => updateBarChart(event, i, BarChartLegendItems[i]), true);
        }
    }

    if (jQuery('#pieChart').length > 0) {
        var PieChartCtx = document.getElementById("pieChart").getContext('2d');

        let chartDataVal = document.getElementById("pieChartValuesFirstArr").value;
        let chartLabelsVal = document.getElementById("pieChartValuesSecondArr").value;
        let chartData = chartDataVal.split(",");
        let chartLabels = chartLabelsVal.split(",");

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
                },
                tooltips: {
                    backgroundColor: "#282c2cb8",
                    bodyFontColor: "#fff",
                    bodyFontFamily: 'Montserrat-Medium',
                    // bodyFontSize: BarChartWindowWidth ? "14" : "18",
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
                },
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

        let xAxisLabelsVal = document.getElementById('xAxisLabel').value;
        let xAxisLabels = xAxisLabelsVal.split(",");

        let data1_label = document.getElementById('lineChartLabelOne').value;
        let dataset_data1val = document.getElementById('dataSetLineFirst').value;
        let dataset_data1 = dataset_data1val.split(",");

        let data2_label = document.getElementById('lineChartLabelTwo').value;
        let dataset_data2val = document.getElementById('dataSetLineSecond').value;
        let dataset_data2 = dataset_data2val.split(",");
		let maxSizeLine = document.getElementById('maxSizeLineChart').value;
		let stepSizeLine = document.getElementById('stepSizeLineChart').value;

        var LineChartWindowWidthsmall = $(window).width() < 479;
        var LineChartWindowWidth = $(window).width() < 768;
        if (LineChartWindowWidth) {
            var chartEl = document.getElementById("lineChart");
            chartEl.height = 250;
        }
        var LineChartData = {
            type: 'line',
            data: {
                labels: xAxisLabels,
                datasets: [{
                    label: data1_label,
                    backgroundColor: "#240B14",
                    borderColor: "#240B14",
                    fill: false,
                    data: dataset_data1,
                }, {
                    label: data2_label,
                    backgroundColor: "#00AAAD",
                    borderColor: "#00AAAD",
                    fill: false,
                    data: dataset_data2,

                }]
            },
            plugins: [{
                afterDraw: chart => {
                    var ctx = chart.chart.ctx;
                    ctx.save();
                    ctx.font = LineChartWindowWidth ? "12px Montserrat-Medium" : "18px Montserrat-Medium",
                        ctx.fillStyle = "#240B14";
                    var y = 15;
                    ctx.textAlign = 'start';
                    ctx.fillText('Users', "0", y);
                    ctx.textAlign = 'end';
                    ctx.fillText('Month', chart.chart.width - 10, chart.chart.height - 35);
                    ctx.restore();
                },
            }],
            options: {
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: {
                        top: "20",
                        right: LineChartWindowWidthsmall ? 60 : LineChartWindowWidth ? "60" : "90",
                    }
                },
                title: {
                    display: true,
                    // text: 'Chart.js Line Chart - Logarithmic'
                },
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    var text = [];
                    text.push('<ul class="' + chart.id + '-legend">');
                    for (var i = 0; i < chart.data.datasets.length; i++) {
                        text.push('<li  >')
                        text.push('<span class="legendColor" style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>')
                        text.push('<span id="legend-' + i + '-item" >');
                        if (chart.data.datasets[i].label) {
                            text.push(chart.data.datasets[i].label);
                        }
                        text.push('</span></li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                },
                scales: {
                    xAxes: [{
                        barThickness: LineChartWindowWidthsmall ? 5 : LineChartWindowWidth ? 10 : 14,
                        ticks: {
                            fontColor: '#240B14',
                            fontSize: LineChartWindowWidth ? "14" : "18",
                        },
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 6,
                            stepSize: 1,
                            backdropPadding: 1,
                            padding: LineChartWindowWidth ? 5 : 15,
                            crossAlign: 'start',
                            fontColor: '#240B14',
                            fontSize: LineChartWindowWidth ? "12" : "18",
                        },
                        gridLines: {
                            color: '#848484',
                            zeroLineColor: '#848484',
                            drawBorder: false,
                        },
                    }],
                },
                tooltips: {
                    backgroundColor: "#282c2cb8",
                    bodyFontColor: "#fff",
                    bodyFontFamily: 'Montserrat-Medium',
                    // bodyFontSize: BarChartWindowWidth ? "14" : "18",
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
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
            },
        };
        var LineChartctxd = document.getElementById('lineChart').getContext('2d');
        window.myLineChart = new Chart(LineChartctxd, LineChartData);
        $("#LineChartLegend").html(window.myLineChart.generateLegend());
        // Show/hide chart by click legend
        updateLineChart = function (e, datasetIndex, li) {
            var index = datasetIndex;
            var LineChartci = e.view.myLineChart;
            var LineChartMeta = LineChartci.getDatasetMeta(datasetIndex);
            (LineChartMeta.hidden == true) ? LineChartMeta.hidden = false : LineChartMeta.hidden = true;
            if (LineChartMeta.hidden) {
                //const spanLength = li.querySelectorAll('span')
                li.querySelectorAll('span')[1].style.textDecoration = "line-through"
            }
            else {
                li.querySelectorAll('span')[1].style.textDecoration = "none"
            }
            LineChartci.update();
        };
        var LineChartLegendItems = document.getElementsByTagName('li');
        // console.log(legendItems)
        for (let i = 0; i < LineChartLegendItems.length; i += 1) {
            LineChartLegendItems[i].addEventListener("click", (event) => updateLineChart(event, i, LineChartLegendItems[i]), true);
        }
    }
});