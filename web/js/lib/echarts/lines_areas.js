//
//
$(function () {

    // var objectsList = [];
    //var series = [];
    require.config({
        paths: {
            echarts: 'js/pages/handsontable.js'
        }
    });

    var handsontable;
    // 1 month zoom
    $('#drowLineChartM').click(function ()
    {
        orgName = $("#orgList option:selected").attr('name');
        org = $("#orgList").val();
        var toDate = ($("#curDate").val()).replace(/-/g, '');
        var fromDate = toDate - 100;

        $("#panel-title").text(orgName + ' ( c ' + formatDate(fromDate) + ' по ' + formatDate(toDate) + ')');

        $.ajax({
            url: 'http://192.168.11.31:8080/EglitecWeb/EglitecServlet',
            type: 'POST',
            dataType: 'json',
            data: {
                fromDate: fromDate,
                toDate: toDate,
                org: org},
            success: function (data) {

                var timeIds_X = [];
                var tcks_Y = [];
                var series = [];
                var hot_data = [];
                var n = 1;
                $.each(data, function (key, value) {
                    
                    timeIdVal = value.timeId.toString();
                    //data for table
                    hot_data.push({n: n,
                        date: formatDate(timeIdVal),
                        week_day: getDayOfWeek(value.dayOfWeek),
                        tck_qty: value.ticketsQty});
                    //data for chart                    
                    timeIds_X.push(timeIdVal.substring(6, 8) + "/" + timeIdVal.substring(4, 6));
                    tcks_Y.push(value.ticketsQty);
                    n++;
                });
                lineObject = new Object();
                series.push({
                    name: orgName,
                    type: 'line',
                    data: tcks_Y,
                    markLine: {
                        data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                    }});
                lineObject.series = series;
                lineObject.color = getRandomColor();
                lineObject.days = timeIds_X;
                lineObject.name = orgName;
                //objectsList.push(lineObject);

                LoadChart(lineObject);
                handsontable = createHandsontable(hot_data);//handsontable.js
            }
        });
    });

    /////////////////////////
    $("#export_csv").on('click', function () {
//        rowRenderer.setHighlightedRow($(".highlightRow").index(this));

        var header = handsontable.getColHeader();
        var data = handsontable.getData();

        hrlatorCSV(header, data);//handsontable.js
    });
///////////////////////


    // 3 month zoom
    $('#drowLineChartQ').click(function ()
    {
        orgName = $("#orgList option:selected").attr('name');
        org = $("#orgList").val();

        var toDate = ($("#curDate").val()).replace(/-/g, '');
        var fromDate = toDate - 300;

        $("#panel-title").text(orgName + ' ( c ' + formatDate(fromDate) + ' по ' + formatDate(toDate) + ')');

        $.ajax({
            url: 'http://192.168.11.31:8080/EglitecWeb/EglitecServlet',
            type: 'POST',
            dataType: 'json',
            data: {
                fromDate: fromDate,
                toDate: toDate,
                org: org},
            success: function (data) {

                var timeIds_X = [];
                var tcks_Y = [];
                var series = [];
                var hot_data = [];
                var n = 1;
                $.each(data, function (key, value) {
                    
                    timeIdVal = value.timeId.toString();
                    //data for table
                    hot_data.push({n: n,
                        date: formatDate(timeIdVal),
                        week_day: getDayOfWeek(value.dayOfWeek),
                        tck_qty: value.ticketsQty});
                    //data for chart                    
                    timeIds_X.push(timeIdVal.substring(6, 8) + "/" + timeIdVal.substring(4, 6));
                    tcks_Y.push(value.ticketsQty);
                    n++;
                });
                lineObject = new Object();
                series.push({
                    name: orgName,
                    type: 'line',
                    data: tcks_Y,
                    markLine: {
                        data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                    }});
                lineObject.series = series;
                lineObject.color = getRandomColor();
                lineObject.days = timeIds_X;
                lineObject.name = orgName;
                //objectsList.push(lineObject);

                LoadChart(lineObject);
                handsontable = createHandsontable(hot_data);
            }
        });
    });

    // 6 month zoom

    $('#drowLineChartPY').click(function ()
    {
        orgName = $("#orgList option:selected").attr('name');
        org = $("#orgList").val();

        var toDate = ($("#curDate").val()).replace(/-/g, '');
        var fromDate = toDate - 600;

        $("#panel-title").text(orgName + ' ( c ' + formatDate(fromDate) + ' по ' + formatDate(toDate) + ')');

        $.ajax({
            url: 'http://192.168.11.31:8080/EglitecWeb/EglitecServlet',
            type: 'POST',
            dataType: 'json',
            data: {
                fromDate: fromDate,
                toDate: toDate,
                org: org},
            success: function (data) {

                var timeIds_X = [];
                var tcks_Y = [];
                var series = [];
                var hot_data = [];
                var n = 1;
                $.each(data, function (key, value) {
                    
                    timeIdVal = value.timeId.toString();
                    //data for table
                    hot_data.push({n: n,
                        date: formatDate(timeIdVal),
                        week_day: getDayOfWeek(value.dayOfWeek),
                        tck_qty: value.ticketsQty});
                    //data for chart                    
                    timeIds_X.push(timeIdVal.substring(6, 8) + "/" + timeIdVal.substring(4, 6));
                    tcks_Y.push(value.ticketsQty);
                    n++;
                });
                lineObject = new Object();
                series.push({
                    name: orgName,
                    type: 'line',
                    data: tcks_Y,
                    markLine: {
                        data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                    }});
                lineObject.series = series;
                lineObject.color = getRandomColor();
                lineObject.days = timeIds_X;
                lineObject.name = orgName;
                //objectsList.push(lineObject);

                LoadChart(lineObject);
                handsontable = createHandsontable(hot_data);
            }
        });
    });

    // YTD zoom

    $('#drowLineChartYTD').click(function ()
    {
        orgName = $("#orgList option:selected").attr('name');
        org = $("#orgList").val();

        var toDate = ($("#curDate").val()).replace(/-/g, '');
        var fromDate = toDate.substring(0, 4) + '0101';

        $("#panel-title").text(orgName + ' ( c ' + formatDate(fromDate) + ' по ' + formatDate(toDate) + ')');

        $.ajax({
            url: 'http://192.168.11.31:8080/EglitecWeb/EglitecServlet',
            type: 'POST',
            dataType: 'json',
            data: {
                fromDate: fromDate,
                toDate: toDate,
                org: org},
            success: function (data) {

                var timeIds_X = [];
                var tcks_Y = [];
                var series = [];
                var hot_data = [];
                var n = 1;
                $.each(data, function (key, value) {                    
                    timeIdVal = value.timeId.toString();
                    //data for table
                    hot_data.push({n: n,
                        date: formatDate(timeIdVal),
                        week_day: getDayOfWeek(value.dayOfWeek),
                        tck_qty: value.ticketsQty});
                    //data for chart                    
                    timeIds_X.push(timeIdVal.substring(6, 8) + "/" + timeIdVal.substring(4, 6));
                    tcks_Y.push(value.ticketsQty);
                    n++;
                });
                lineObject = new Object();
                series.push({
                    name: orgName,
                    type: 'line',
                    data: tcks_Y,
                    markLine: {
                        data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                    }});
                lineObject.series = series;
                lineObject.color = getRandomColor();
                lineObject.days = timeIds_X;
                lineObject.name = orgName;
                //objectsList.push(lineObject);

                LoadChart(lineObject);
                handsontable = createHandsontable(hot_data);
            }
        });
    });

    // 1 year zoom

    $('#drowLineChartY').click(function ()
    {
        orgName = $("#orgList option:selected").attr('name');
        org = $("#orgList").val();

        var toDate = ($("#curDate").val()).replace(/-/g, '');
        var fromDate = toDate - 10000;

        $("#panel-title").text(orgName + ' ( c ' + formatDate(fromDate) + ' по ' + formatDate(toDate) + ')');

        $.ajax({
            url: 'http://192.168.11.31:8080/EglitecWeb/EglitecServlet',
            type: 'POST',
            dataType: 'json',
            data: {
                fromDate: fromDate,
                toDate: toDate,
                org: org},
            success: function (data) {

                var timeIds_X = [];
                var tcks_Y = [];
                var series = [];
                var hot_data = [];
                var n = 1;
                $.each(data, function (key, value) {                    
                    timeIdVal = value.timeId.toString();
                    //data for table
                    hot_data.push({n: n,
                        date: formatDate(timeIdVal),
                        week_day: getDayOfWeek(value.dayOfWeek),
                        tck_qty: value.ticketsQty});
                    //data for chart                    
                    timeIds_X.push(timeIdVal.substring(6, 8) + "/" + timeIdVal.substring(4, 6));
                    tcks_Y.push(value.ticketsQty);
                    n++;
                });
                lineObject = new Object();
                series.push({
                    name: orgName,
                    type: 'line',
                    data: tcks_Y,
                    markLine: {
                        data: [{
                                type: 'average',
                                name: 'Average'
                            }]
                    }});
                lineObject.series = series;
                lineObject.color = getRandomColor();
                lineObject.days = timeIds_X;
                lineObject.name = orgName;
                //objectsList.push(lineObject);

                LoadChart(lineObject);
                handsontable = createHandsontable(hot_data);
            }
        });
    });

});

function LoadChart(orgObject) {

    // Set paths
    // ------------------------------
    require.config({
        paths: {
            echarts: 'js/lib/'
        }
    });
    // Configuration
    // ------------------------------

    require(
            [
                'echarts',
                'echarts/theme/limitless',
                'echarts/chart/bar',
                'echarts/chart/line',
            ],
            // Charts setup
                    function (ec, limitless) {


                        // Initialize charts
                        // ------------------------------

                        var basic_lines = ec.init(document.getElementById('basic_lines'), limitless);
                        var names = [];
                        var colors = [];
                        var days = [];
                        var series = [];


                        // Charts setup
                        // ------------------------------
                        //
                        // Basic lines options
                        //
                        // $.each(objectsList, function (key, objectsList) {

                        names.push(orgObject.name);
                        colors.push(orgObject.color);
                        days = orgObject.days;
                        series = orgObject.series;

                        basic_lines_options = {
                            // Setup grid
                            grid: {
                                x: 40,
                                x2: 40,
                                y: 35,
                                y2: 25
                            },
                            // Add tooltip
                            tooltip: {
                                trigger: 'axis'
                            },
                            // Add legend
                            legend: {
                                data: names
                            },
                            // Add custom colors
                            color: colors,
                            // Enable drag recalculate
                            calculable: true,
                            // Horizontal axis
                            xAxis: [{
                                    type: 'category',
                                    boundaryGap: false,
                                    data: days
                                }],
                            // Vertical axis
                            yAxis: [{
                                    type: 'value',
                                    axisLabel: {
                                        formatter: '{value}'
                                    }
                                }],
                            // Add series
                            series
                        };
                        // });

                        // Apply options
                        // ------------------------------
                        basic_lines.setOption(basic_lines_options);
                        // Resize charts
                        // ------------------------------

                        window.onresize = function () {
                            setTimeout(function () {
                                basic_lines.resize();
                            }, 200);
                        }
                    }
            );
        }
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function formatDate(timeIdVal) {

    var result = timeIdVal.toString().substring(6, 8) + '-'
            + timeIdVal.toString().substring(4, 6) + '-'
            + timeIdVal.toString().substring(0, 4);
    return result;
}
function getDayOfWeek(dayN) {

    if (dayN == 1) {
        return 'Понедельник';
    } else if (dayN == 2) {
        return 'Вторник';
    } else if (dayN == 3) {
        return 'Среда';
    } else if (dayN == 4) {
        return 'Четверг';
    } else if (dayN == 5) {
        return 'Пятница';
    } else if (dayN == 6) {
        return 'Суббота';
    } else if (dayN == 7) {
        return 'Воскресение';
    }

}


