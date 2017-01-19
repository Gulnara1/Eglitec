

$(function () {

    date = new Date();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    if (month < 10)
        month = "0" + month;
    today = year + "-" + month;
    $('#date_month').val(today);

    dateMonth = ($("#date_month").val()).replace(/-/g, '');
    checkboxes = document.getElementsByName('abc');
    selectedABC = "";
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedABC = selectedABC + (checkboxes[i].value);
        } else {
            selectedABC = selectedABC + "X";
        }
    }
    getData(dateMonth, selectedABC);

    $('#submit').click(function () {

        dateMonth = ($("#date_month").val()).replace(/-/g, '');
        checkboxes = document.getElementsByName('abc');
        selectedABC = "";
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedABC = selectedABC + (checkboxes[i].value);
            } else {
                selectedABC = selectedABC + "X";
            }
        }
        getData(dateMonth, selectedABC);
    });

});

function getData(dateMonth, abc) {

    $.ajax({
        url: getPath() + 'Eglitec/NextBestPricesServlet',
        type: 'POST',
        dataType: 'json',
        data: {
            dateMonth: dateMonth,
            abc: abc},
        success: function (data) {

            $.each(data, function (key, value) {

                storeJson = JSON.parse(data.chartJson);
                catJson = JSON.parse(data.tableJson);

            });
            createStoresTable(storeJson);
            createCategoriesTable(catJson);
        }
    });
}

function createStoresTable(jsonObject) {
    container = document.getElementById('stores');
    hot_data = [];
    colHeaders = [];
    n = 1;
    jsonObject.forEach(function (value) {
        hot_data.push({n: n,
            idStore: value.idStore,
            descr: value.descr,
            abc: value.abc,
            salesOptim: value.salesOptim,
            gprofitOptim: value.gprofitOptim,
            salesNext: value.salesNext,
            gprofitNext: value.gprofitNext,
        });
        n++;
    });
    colHeaders = [
        'N',
        'Код',
        'Адрес',
        'ABC',
        'salesOptim',
        'gprofitOptim',
        'salesNext',
        'gprofitNext'
    ];
    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.color = '#000000';
        if (!value || value === 0) {
            td.style.background = '#DCDCDC';
        }
    }
    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
    var handsontable = new Handsontable(container, {
        data: hot_data,
        stretchH: 'all',
        minRows: 2,
        minCols: 2,
        columnSorting: true,
        manualColumnResize: true,
        sortIndicator: true,
        readOnly: true,
        currentRowClassName: 'currentRow',
        outsideClickDeselects: false,
        afterInit: function () {
            console.log("Handsontable initialized!");
        },
        afterSelection: function (row, col, row1, col1) {
            console.log(this.getData(row, 1, row, 1));
        },
        colHeaders,
        cells: function (row, col, prop) {
            var cellProperties = {};

            if (row === 0 || this.instance.getData()[row][col] === 'readOnly') {
                cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
            }
            if (col === 0)
            {
                cellProperties.className = "htCenter htMiddle";
            }
            cellProperties.renderer = "negativeValueRenderer"; // uses lookup map
            return cellProperties;
        }
    });
    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}

function createCategoriesTable(jsonObject) {
    container = document.getElementById('categories');
    hot_data = [];
    colHeaders = [];
    n = 1;
    jsonObject.forEach(function (value) {
        hot_data.push({n: n,
            idCat: value.idCat,
            descr: value.descr,
            salesOptim: value.salesOptim,
            gprofitOptim: value.gprofitOptim,
            salesNext: value.salesNext,
            gprofitNext: value.gprofitNext,
        });
        n++;
    });
    colHeaders = [
        'N',
        'Код',
        'Адрес',
        'salesOptim',
        'gprofitOptim',
        'salesNext',
        'gprofitNext'
    ];
    handsontable = createHandsontable(hot_data, container, colHeaders);

    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}

