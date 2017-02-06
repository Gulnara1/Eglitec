/* global Handsontable */
var updatingData = [];

$(function () {

    getStores();

});
///get Stores from db
function getStores() {

    $.ajax({
        url: getPath() + 'eglitec/StoresSettings',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            createTable(data);
        }
    });
}
function createTable(jsonObject) {
    var container = document.getElementById('stores');
    var hot_data = [];
//    var data = [
//        {n: 1, id: 454, desc: "Mira", floorSpace: 155, abc: 'A', isPriceAuto: 1, isPriceRounding: 1, priceChangeStep: 0.2, priceOptimGoal: 1},
//        {n: 2, id: 464, desc: "Pojar", floorSpace: 300, abc: 'B', isPriceAuto: 0, isPriceRounding: 1, priceChangeStep: 0.3, priceOptimGoal: 2},
//        {n: 3, id: 474, desc: "Bravo", floorSpace: 250, abc: 'C', isPriceAuto: 1, isPriceRounding: 0, priceChangeStep: 0, priceOptimGoal: 2},
//        {n: 4, id: 484, desc: "Kalina", floorSpace: 100, abc: 'B', isPriceAuto: 1, isPriceRounding: 0, priceChangeStep: 0.5, priceOptimGoal: 1},
//        {n: 5, id: 494, desc: "Drujba", floorSpace: 500, abc: 'A', isPriceAuto: 0, isPriceRounding: 1, priceChangeStep: 0.2, priceOptimGoal: 1}
//    ];
    n = 1;
    jsonObject.forEach(function (value) {
        hot_data.push({n: n,
            id: value.id,
            desc: value.desc,
            floorSpace: value.floorSpace,
            abc: value.abc,
            isPriceAuto: isTrue(value.isPriceAuto),
            isPriceRounding: isTrue(value.isPriceRounding),
            priceChangeStep: value.priceChangeStep,
            priceOptimGoal: priceOGValues(value.priceOptimGoal)
        });
        n++;
    });
    function isTrue(value) {
        if (value != 1) {
            return 0;
        } else
        {
            return 1;
        }
    }
    function priceOGValues(value) {
        if (value == 1) {
            return 'Прибыль';
        } else if (value == 2) {
            return 'Оборот';
        }
    }
//    colHeaders = [
//        'N',
//        'Код',
//        'Адрес',
//        'Торговая пл.',
//        'ABC',
//        'Авто расчет',
//        'Округлять',
//        'Шаг изменения цены',
//        'Цель оптимизации'
//    ];

    var handsontable = new Handsontable(container, {
        data: hot_data,
        stretchH: 'all',
        manualColumnResize: true,
        outsideClickDeselects: false,
        columnSorting: true,
        columns: [
            {
                data: 'n',
                readOnly: true,
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'id',
                readOnly: true,
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'desc',
                readOnly: true,
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'floorSpace',
                readOnly: true,
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'abc',
                readOnly: true,
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'isPriceAuto',
                type: 'checkbox',
                checkedTemplate: 1,
                uncheckedTemplate: 0,
                width: 100,
            },
            {
                data: 'isPriceRounding',
                type: 'checkbox',
                checkedTemplate: 1,
                uncheckedTemplate: 0,
                width: 100,
            },
            {
                data: 'priceChangeStep',
                type: 'numeric',
                format: '0.0[0000]',
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                    td.style.color = '#000000';
                    if (!value || value === 0) {
                        td.style.background = '#DCDCDC';
                    }
                    Handsontable.NumericCell.renderer.apply(this, arguments);
                }
            },
            {
                data: 'priceOptimGoal',
                type: 'dropdown',
                trimDropdown: false,
                source: ['Прибыль', 'Оборот']
            }

        ],
        afterSelection: function (row, col, row1, col1) {
            selection = this.getData(row, 1, row, 1);
            selectedStoreId = selection[0].toString();
        },
        afterChange: function (change, source) {
            if (source === 'loadData') {
                return; //don't save this change
            }
            var rowIndex = change[0][0];
            var allDataInRow = this.getData()[rowIndex];
            var id = allDataInRow[1];
            var priceOptimGoal = 0;
            var colIndex = this.propToCol(change[0][1]);

            if (allDataInRow[8] == 'Прибыль') {
                priceOptimGoal = 1;

            } else if ((allDataInRow[8] == 'Оборот')) {

                priceOptimGoal = 2;
            }
            ;

            for (var item in updatingData) {
                dataItem = updatingData[item];

                if (dataItem.id == id) {
                    updatingData.splice(item, 1);
                }

            }
            updatingData.push({id: id,
                isPriceAuto: allDataInRow[5],
                isPriceRounding: allDataInRow[6],
                priceChangeStep: allDataInRow[7],
                priceOptimGoal: priceOptimGoal,
                rowIndex: rowIndex,
                colIndex: colIndex});
//            for (var item in updatingData) {
//                dataItem = updatingData[item];
//                cell = this.getCell(dataItem.rowIndex, dataItem.colIndex);
//                cell.style.background = '#ffd9b3';
//            }

        },
        afterInit: function () {
            console.log("Handsontable initialized!");
        },
        search: {
            callback: searchResultCounter
        },
        colHeaders: function (col) {
            var txt;

            switch (col) {
                case 0:
                    return 'N';
                case 1:
                    return 'Код';
                case 2:
                    return 'Адрес';
                case 3:
                    return 'Торговая пл.';
                case 4:
                    return 'ABC';
                case 5:
                    txt = "<span class='position-left'>Авто расчет</span> <input id='isCheckedAuto' type='checkbox' value='isCheckedAuto' class='hot-checker' ";
//                    txt += isCheckedAuto ? 'checked="checked">' : '>';
                    return txt;
                case 6:
                    txt = "<span class='position-left'>Округлять</span> <input id='isCheckedRounding' type='checkbox' class='hot-checker' ";
//                    txt += isCheckedRounding ? 'checked="checked">' : '>';
                    return txt;
                case 7:
                    return 'Шаг изменения цены';
                case 8:
                    return 'Цель оптимизации';
            }
        }
        ,
        cells: function (row, col, prop) {
            var cellProperties = {};

            if (col <= 1)
            {
                cellProperties.className = "htCenter htMiddle";
            }
            return cellProperties;
        }
    });
    // Define count element
    var resultCount = document.getElementById('result-count');

    // Search result count
    var searchResultCount = 0;

    function searchResultCounter(instance, row, col, value, result) {
        Handsontable.Search.DEFAULT_CALLBACK.apply(this, arguments);

        if (result) {

            searchResultCount++;
        }

    }

    // Define search field
    var hot_search_callback_input = document.getElementById('hot_search_callback_input');

    // Add event
    Handsontable.Dom.addEvent(hot_search_callback_input, 'keyup', function (event) {
        var queryResult;
        searchResultCount = 0;

        handsontable.loadData(hot_data);
        queryResult = handsontable.search.query(this.value);
        searchData = getSearchedRowsData(queryResult);
        
        if(searchResultCount == 0){
            
            handsontable.loadData(hot_data);
        }else{
            handsontable.loadData(searchData);
        }

        resultCount.innerText = searchResultCount.toString();
        handsontable.render();

    });

    function getSearchedRowsData(queryResult) {
        var rowObjects = [];
        var rowIndexes = [];
        for (var i = 0; i < queryResult.length; i++) {
            rowI = queryResult[i].row;
            if (!rowIndexes.includes(rowI)) {
                rowIndexes.push(rowI);
            }
            ;
        };


        for (var i = 0; i < rowIndexes.length; i++) {

            rowData = handsontable.getDataAtRow(rowIndexes[i]);
            rowObjects.push({n: rowData[0],
                id: rowData[1],
                desc: rowData[2],
                floorSpace: rowData[3],
                abc: rowData[4],
                isPriceAuto: rowData[5],
                isPriceRounding: rowData[6],
                priceChangeStep: rowData[7],
                priceOptimGoal: rowData[9]
            });
        }
        ;


        return rowObjects;
    }
    ;
}
;

function save() {

    var jsonUpdatingData = JSON.stringify(updatingData);
    $.ajax({
        url: getPath() + 'eglitec/StoresSettings',
        type: 'POST',
        dataType: 'json',
        data: {jsonData: jsonUpdatingData
        },
        success: function (data) {

            if (data == 1) {
                document.getElementById('saveDiv').innerHTML = "Cохранено!";
            } else {
                document.getElementById('saveDiv').innerHTML = "Ошибка! Элемент " + data + " не сохранен!";
            }
        }
    });
}


