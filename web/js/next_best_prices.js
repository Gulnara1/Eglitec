
var selectedStoreId;
var selectedCatId;
var dateMonth;
$(function () {
//item div not visible while store and  category are not checked
    $('#itemsDiv').hide();
//
//select dateMonth (six month)
    date = new Date();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    function checkMonth() {
        if (month < 10)
            month = "0" + month;
    }
    for (var i = 1; i < 7; i++) {
        checkMonth();
        $('#date_month').append('<option value="' + year + month + '" name="' + year + "-" + month + '"+>' + year + "-" + month + '</option>');
        month = month - 1;
        if (month <= 0) {
            month = 12;
            year = year - 1;
        }
    }
///////////////
///get selected date_month and abc
    dateMonth = $("#date_month").val();
    checkboxes = document.getElementsByName('abc');
    selectedABC = "";
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedABC = selectedABC + (checkboxes[i].value);
        } else {
            selectedABC = selectedABC + "X";
        }
    }
/////////////////
////request to server, get data and create tables Stores and Categories
    getStoresCategories(dateMonth, selectedABC);
/////////
    $('#panel-body').click(function () {
///get selected date_month and abc
        $('#itemsDiv').hide();
        dateMonth = $("#date_month").val();
        checkboxes = document.getElementsByName('abc');
        selectedABC = "";
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedABC = selectedABC + (checkboxes[i].value);
            } else {
                selectedABC = selectedABC + "X";
            }
        }
/////   
////request to server, get data and create tables Stores and Categories
        getStoresCategories(dateMonth, selectedABC);
////        
    });
});
///////
function getItems() {


    $.ajax({
        url: getPath() + 'Eglitec/NextBestPricesServlet',
        type: 'POST',
        dataType: 'json',
        data: {
            dateMonth: dateMonth,
            storeId: selectedStoreId,
            catId: selectedCatId,
            p: 'i'},
        success: function (data) {

            $('#itemsDiv').show();
            if (data.length == 0)
            {
                document.getElementById('items').innerHTML = "Нет данных";
                $('#itemsContainer').css("height", 2 * 36 + 'px');
                document.getElementById("updateItems").disabled = true;
            } else
            {
                createItemsTable(data);
            }
        }
    });
}
////get Stores and Categories from server
function getStoresCategories(dateMonth, abc) {
    $.ajax({
        url: getPath() + 'Eglitec/NextBestPricesServlet',
        type: 'POST',
        dataType: 'json',
        data: {
            dateMonth: dateMonth,
            abc: abc,
            p: 'sc'},
        success: function (data) {
//            $.each(data, function (key, value) {
            storeJson = JSON.parse(data.chartJson);
            catJson = JSON.parse(data.tableJson);
//            });
            if (storeJson.length == 0)
            {
                document.getElementById('stores').innerHTML = "Нет данных";
                $('#storeContainer').css("height", 2 * 36 + 'px');
            } else
            {
                createStoresTable(storeJson);
            }
            if (catJson.length == 0)
            {
                document.getElementById('categories').innerHTML = "Нет данных";
                $('#catContainer').css("height", 2 * 36 + 'px');
            } else
            {
                createCategoriesTable(catJson);
            }
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
        if (!value || !isNaN(value)) {
            cellProperties.className = "htRight";
        }
    }
    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
    handsontable = new Handsontable(container, {
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
            selection = this.getData(row, 1, row, 1);
            selectedStoreId = selection[0].toString();
            console.log(selectedStoreId);

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
    setContainerHeight(jsonObject.length, '#storeContainer');
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
    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.color = '#000000';
        if (!value || value === 0) {
            td.style.background = '#DCDCDC';
        }
        if (!value || !isNaN(value)) {
            cellProperties.className = "htRight";
        }
    }
    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
    handsontable = new Handsontable(container, {
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
            selection = this.getData(row, 1, row, 1);
            selectedCatId = selection[0].toString();
            console.log(selectedCatId);
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
    setContainerHeight(jsonObject.length, '#catContainer');

    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}

function createItemsTable(jsonObject) {
    container = document.getElementById('items');
    hot_data = [];
    colHeaders = [];
    n = 1;
    jsonObject.forEach(function (value) {
        hot_data.push({n: n,
            idItem: value.idItem,
            descr: value.descr,
            ped: value.ped,
            priceCurr: value.priceCurr,
            priceNext: value.priceNext,
            salesNext: value.salesNext,
            gprofitNext: value.gprofitNext,
            priceOptim: value.priceOptim,
            salesOptim: value.salesOptim,
            gprofitOptim: value.gprofitOptim
        });
        n++;
    });
    colHeaders = [
        'N',
        'Код',
        'Наименование',
        'ped',
        'priceCurr',
        'priceNext',
        'salesNext',
        'gprofitNext',
        'priceOptim',
        'salesOptim',
        'gprofitOptim'
    ];
    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.color = '#000000';
        if (!value || value === 0) {
            td.style.background = '#DCDCDC';
        }
        if (!value || !isNaN(value)) {
            cellProperties.className = "htRight";
        }
    }
    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
    handsontable = new Handsontable(container, {
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
            console.log("Handsontable Items initialized!");
        },
        afterChange: function (change, source) {

//            console.log(change);
//            console.log(source);
            if (source === 'loadData') {
                return;
            }
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
    setContainerHeight(jsonObject.length, '#itemsContainer');

    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}
function setContainerHeight(rowsCount, containerId) {

    if (rowsCount < 14) {

        $(containerId).css("height", (rowsCount+3) * 30 + 'px');
    }
}

