
$(function () {

//default

    date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    if (month < 10)
        month = "0" + month;

    $('#fromDate').val('2015' + "-" + '11' + "-01");
    $('#toDate').val('2015' + "-" + '12' + "-01");
//    $('#fromDate').val(year + "-" + month + "-01");
//    $('#toDate').val(year + "-" + (month + 1) + "-01");
///////////////////  get filtres value  
    fromDateVal = ($("#fromDate").val()).replace(/-/g, '');
    toDateVal = ($("#toDate").val()).replace(/-/g, '');

    checkboxes = document.getElementsByName('abc');
    var selectedABC = "";
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedABC = selectedABC + (checkboxes[i].value);
        } else {
            selectedABC = selectedABC + "X";
        }
    }

    //abc =
    ////////
    getTSGOnPeriod(fromDateVal, toDateVal, selectedABC);

//for button
    $('#getData').click(function () {
        fromDateVal = ($("#fromDate").val()).replace(/-/g, '');
        toDateVal = ($("#toDate").val()).replace(/-/g, '');
        var checkboxes = document.getElementsByName('abc');
        var selectedABC = "";
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedABC = selectedABC + (checkboxes[i].value);
            } else {
                selectedABC = selectedABC + "X";
            }
        }
        getTSGOnPeriod(fromDateVal, toDateVal, selectedABC);
    });
});
/////////
function drowTicketsChart(jsonObject) {
    var div = document.getElementById('basic_donut_tickets');

    var data = [];

    jsonObject.forEach(function (value) {
        data.push({value: value.tickets,
            name: value.clusterId
        });
    });
    title = {
        text: 'Колличество чеков',
        subtext: 'Анализ по кластерам',
        x: 'center'
    };

    LoadPiesDonutChart(data, div, title);
}

function drowSalesChart(jsonObject) {
    var div = document.getElementById('basic_donut_sales');

    var data = [];
    jsonObject.forEach(function (value) {
        data.push({value: value.sales,
            name: value.clusterId
        });
    });
    title = {
        text: 'Продажи',
        subtext: 'Анализ по кластерам',
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
            name: value.clusterId
        });
    });
    title = {
        text: 'Прибыльность',
        subtext: 'Анализ по кластерам',
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
        'Продажи',
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
    $('#tickets').text(tickets);
    $('#sales').text(sales);
    $('#grossprofit').text(grossProfit);
}

///////////////
function getTSGOnPeriod(fromDate, toDate, abc) {

    $.ajax({
        url: getPath() + 'Eglitec/StoresMainIndexesServlet',
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
            drowTicketsChart(chartJson);
            drowSalesChart(chartJson);
            drowGrossprofitChart(chartJson);

            fillIndexes(chartJson);

            createTable(tableJson);
        }
    });
}
//////////////////



