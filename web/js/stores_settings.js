/* global Handsontable */

$(function () {

    getStores();
});
///get Stores from db
function getStores() {

    $.ajax({
        url: getPath() + 'Eglitec/StoresSettings',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            createTable(data);
        }
    });
}
function createTable(jsonObject) {
    container = document.getElementById('stores');
    hot_data = [];
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
        }else
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

    var isCheckedAuto = 0;
    var isCheckedRounding = 0;
    handsontable = new Handsontable(container, {
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
                renderer: function (instance, td) {
                    Handsontable.renderers.TextRenderer.apply(this, arguments);

                    if (isCheckedAuto) {
                        td.style.backgroundColor = '#FF0000';
                    } else {
                        td.style.backgroundColor = '';
                    }
                }
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
        afterChange: function (row, col, row1, col1, source) {

            if (source === 'loadData') {
                return; //don't save this change
                console.log("loadData");
            }
//            updateStore(0, 0, 0.3, 2, 57001);
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
                    txt += isCheckedAuto ? 'checked="checked">' : '>';
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
        },
        cells: function (row, col, prop) {
            var cellProperties = {};

            if (col <= 1)
            {
                cellProperties.className = "htCenter htMiddle";
            }
            return cellProperties;
        }
    });
    if ($('#isCheckedAuto').attr('checked')) {
        //isCheckedAuto = true;
        console.log("Gulya");
    } else {
        
    }
}
;

function updateStore(isPriceAuto, isPriceRounding, priceChangeStep, priceOptimGoal, id) {
    $.ajax({
        url: getPath() + 'Eglitec/StoresSettings',
        type: 'POST',
        dataType: 'json',
        data: {
            isPriceAuto: isPriceAuto,
            isPriceRounding: isPriceRounding,
            priceChangeStep: priceChangeStep,
            priceOptimGoal: priceOptimGoal,
            id: id},
        success: function (data) {
            console.log(data);
            createTable(data);
        }
    });
}
