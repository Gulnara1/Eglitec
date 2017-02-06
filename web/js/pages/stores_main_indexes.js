

$(function () {

// Date
    $('[name="format-date"]').formatter({
        pattern: '{{99}}-{{99}}-{{9999}}'
    });
//default

    date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    function checkMonth(month) {
        if (month < 10)
            month = "0" + month;
        return month;
    }
    $('#fromDate').val('01' + "-" + '11-' + "2015");
    $('#toDate').val('01' + "-" + '12-' + "2015");

//    $('#fromDate').val('01'+ '-' + checkMonth(month) + '-' + year);
//    $('#toDate').val('01' + "-" + checkMonth(month + 1) + '-' + year);

    function submit() {
        ///////////////////  get filtres value  
        fromDateVal = ($("#fromDate").val()).split("-").reverse().join("");
        toDateVal = ($("#toDate").val()).split("-").reverse().join("");
        
        var checkboxes = document.getElementsByName('abc');
        var selectedABC = "";
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedABC = selectedABC + (checkboxes[i].value);
            } else {
                selectedABC = selectedABC + "X";
            }
        }
        //////// Tickets, Grossprofit, Sales
        getTSGOnPeriod(fromDateVal, toDateVal, selectedABC);
    }
    submit();
    $('#getData').click(function () {
        submit();
    });

//    $('#checkABC').click(function () {
//        submit();
//    });
//    $('#fromDate').click(function () {
//        submit();
//    });
//    $('#toDate').click(function () {
//        submit();
//    });
});
/////////
function drowTicketsChart(jsonObject) {
    var div = document.getElementById('basic_donut_tickets');

    var data = [];

    jsonObject.forEach(function (value) {
        data.push({value: value.tickets,
            name: value.abc
        });
    });
    title = {
        text: 'Колличество чеков',
        subtext: 'Анализ по ABC',
        x: 'center'
    };

    LoadPiesDonutChart(data, div, title);
}

function drowSalesChart(jsonObject) {
    var div = document.getElementById('basic_donut_sales');

    var data = [];
    jsonObject.forEach(function (value) {
        data.push({value: value.sales,
            name: value.abc
        });
    });
    title = {
        text: 'Продажи',
        subtext: 'Анализ по ABC',
        x: 'center'
    };

    LoadPiesDonutChart(data, div, title);
}

function drowGrossprofitChart(jsonObject) {
    //console.log(jsonObject);
    var div = document.getElementById('basic_donut_grossprofit');

    var data = [];
    jsonObject.forEach(function (value) {
        data.push({value: value.grossProfit,
            name: value.abc
        });
    });
    title = {
        text: 'Прибыльность',
        subtext: 'Анализ по ABC',
        x: 'center'
    };

    LoadPiesDonutChart(data, div, title);
}
////create Handsontable from jsonObject
function createTable(jsonObject) {
    container = document.getElementById('hot_table');
    hot_data = [];
    colHeaders = [];
    n = 1;
    jsonObject.forEach(function (value) {
        hot_data.push({n: n,
            id: value.id,
            desc: value.desc,
            floorSpace: value.floorSpace,
            clusteId: value.clusterId,
            sales: value.sales,
            grossProfit: value.grossProfit,
            tickets: value.tickets
        });
        n++;
    });
    colHeaders = [
        'N',
        'Код',
        'Адрес',
        'Торговая пл.',
        'Kластер',
        'Выручка',
        'Прибыль',
        'Кол-во чеков'
    ];
    handsontable = createHandsontable(hot_data, container, colHeaders);

    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}
function fillIndexes(jsonObject) {
    var sales = 0;
    var grossProfit = 0;
    var tickets = 0;

    jsonObject.forEach(function (value) {

        sales = sales + value.sales;
        grossProfit = grossProfit + value.grossProfit;
        tickets = tickets + value.tickets;
    });
    $('#tickets').text(tickets.toLocaleString('ru-RU'));
    $('#sales').text(Math.round(sales / 1000).toLocaleString('ru-RU'));
    $('#grossprofit').text(Math.round(grossProfit / 1000).toLocaleString('ru-RU'));
}

///////////////
function getTSGOnPeriod(fromDate, toDate, abc) {

    console.log(fromDate);
    console.log(toDate);
    console.log(abc);
    
    $.ajax({
        url: getPath() + 'eglitec/StoresMainIndexesServlet',
        type: 'POST',
        dataType: 'json',
        data: {
            fromDate: fromDate,
            toDate: toDate,
            abc: abc},
        success: function (data) {

            chartJson = [];
            tableJson = [];
            $.each(data, function (key, value) {

                chartJson = JSON.parse(data.chartJson);
                tableJson = JSON.parse(data.tableJson);

            });
            console.log(chartJson);
            console.log(tableJson);
            if (chartJson.length == 0) {
                document.getElementById('basic_donut_tickets').innerHTML = "Нет данных";
                document.getElementById('basic_donut_tickets').innerHTML = "";
                document.getElementById('basic_donut_tickets').innerHTML = "";
            } else {
                drowTicketsChart(chartJson);
                drowSalesChart(chartJson);
                drowGrossprofitChart(chartJson);
            }

            fillIndexes(chartJson);

            if (tableJson.length == 0) {
                document.getElementById('hot_table').innerHTML = "Нет данных";
            } else {
                createTable(tableJson);
            }
        }
    });
}
//////////////////



