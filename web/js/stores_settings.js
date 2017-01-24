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

            console.log(data);
            createTable(data);
        }
    });
}
function createTable(jsonObject) {
    container = document.getElementById('stores');
    hot_data = [];
    colHeaders = [];
    n = 1;
    jsonObject.forEach(function (value) {
        hot_data.push({n: n,
            id: value.id,
            desc: value.desc,
            floorSpace: value.floorSpace,
            abc: value.abc,
            isPriceAuto: value.isPriceAuto,
            isPriceRounding: value.isPriceRounding,
            priceChangeStep: value.priceChangeStep,
            priceOptimGoal: value.priceOptimGoal
        });
        n++;
    });
    col_headers = [
        'N',
        'Код',
        'Адрес',
        'Торговая пл.',
        'ABC',
        'Авто расчет',
        'Округлять',
        'Шаг изменения цены',
        'Цель оптимизации'
    ];
    createHandsontable(hot_data, container, col_headers);

    $("#export_csv").on('click', function () {
        hrlatorCSV(colHeaders, hot_data);//handsontable.js
    });
}
