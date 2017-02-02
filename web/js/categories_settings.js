/* global Handsontable */
var updatingData = [];

$(function () {

   // getStores();

});
///get Stores from db
function getCategories() {

    $.ajax({
        url: getPath() + 'eglitec/StoresSettings',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            createTable(data);
        }
    });
}
