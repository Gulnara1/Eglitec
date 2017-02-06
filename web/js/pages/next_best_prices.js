
var selectedStoreId = 0;
var selectedCatId = 0;
var dateMonth;
$(function () {
//item div not visible while store and  category are not checked
    $('#itemsDiv').hide();
//
//select dateMonth (seven month)
    date = new Date();
    month = date.getMonth() + 2;
    year = date.getFullYear();
    function checkMonth() {
        if (month < 10)
            month = "0" + month;
    }
    for (var i = 1; i < 9; i++) {
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
        // $('#itemsDiv').hide();
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

    if (selectedStoreId == 0 || selectedCatId == 0) {
        document.getElementById('items').innerHTML = "Выберите магазин и категорию";
        setContainerHeight(0, '#itemsContainer');
    } else {
        $.ajax({
            url: getPath() + 'eglitec/NextBestPricesServlet',
            type: 'POST',
            dataType: 'json',
            data: {
                dateMonth: dateMonth,
                storeId: selectedStoreId,
                catId: selectedCatId,
                p: 'i'},
            success: function (data) {

                //
                if (data.length == 0)
                {
                    document.getElementById('items').innerHTML = "Нет данных";
                    setContainerHeight(0, '#itemsContainer');
                } else
                {
                    setContainerHeight(data.length, '#itemsContainer');
                    createItemsTable(data);
                }
                selectedCatId = 0;
                selectedStoreId = 0;
            }
        });
    }
    $('#itemsDiv').show();

}
////get Stores and Categories from server
function getStoresCategories(dateMonth, abc) {
    $.ajax({
        url: getPath() + 'eglitec/NextBestPricesServlet',
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
                setContainerHeight(0, '#storeContainer');
            } else
            {
                createStoresTable(storeJson);
                setContainerHeight(storeJson.length, '#storeContainer');
            }
            if (catJson.length == 0)
            {
                document.getElementById('categories').innerHTML = "Нет данных";
                setContainerHeight(0, '#catContainer');
            } else
            {
                createCategoriesTable(catJson);
                setContainerHeight(catJson.length, '#catContainer');
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
    handsontable = new Handsontable(container, {
        data: hot_data,
        stretchH: 'all',
        columnSorting: true,
        manualColumnResize: true,
        sortIndicator: true,
        readOnly: true,
        currentRowClassName: 'currentRow',
        outsideClickDeselects: false,
        columns: [
            {
                data: 'n',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'idStore',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'descr',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'abc',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'salesOptim',
                type: 'numeric',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
                format: '0,0[.]00 ',
                language: 'ru-RU'
            },
            {
                data: 'gprofitOptim',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
            },
            {
                data: 'salesNext',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
            },
            {
                data: 'gprofitNext',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
            }
        ],
        afterSelection: function (row, col, row1, col1) {
            selection = this.getData(row, 1, row, 1);
            selectedStoreId = selection[0].toString();
        },
        colHeaders,
        cells: function (row, col, prop) {
            var cellProperties = {};

            if (row === 0 || this.instance.getData()[row][col] === 'readOnly') {

                cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
            }
            if (col <= 1)
            {
                cellProperties.className = "htCenter htMiddle";
            }
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
        columns: [
            {
                data: 'n',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'idCat',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'descr',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'salesOptim',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'gprofitOptim',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'salesNext',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'gprofitNext',
                type: 'numeric',
                format: '0,0[.]00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            }
        ],
        afterSelection: function (row, col, row1, col1) {
            selection = this.getData(row, 1, row, 1);
            selectedCatId = selection[0].toString();
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
            return cellProperties;
        }
    });

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
        columns: [
            {
                data: 'n',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'idItem',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'descr',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'ped',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'priceCurr',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'priceNext',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'salesNext',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'gprofitNext',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'priceOptim',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'salesOptim',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            },
            {
                data: 'gprofitOptim',
                type: 'numeric',
                format: '0,0.00 ',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                },
//                language: 'de'
            }
        ],
        afterInit: function () {
            console.log("Handsontable Items initialized!");
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
            return cellProperties;
        }
    });

    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}
function setContainerHeight(rowsCount, containerId) {

    if (rowsCount < 15) {

        $(containerId).css("height", (rowsCount + 1.4) * 30 + 'px');
    } else if (rowsCount > 15)
    {
        $(containerId).css("height", 480 + 'px');
    }
}

