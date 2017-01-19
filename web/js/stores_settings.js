$(function() {

    var handsontable;
    var container = document.getElementById('hot_stores_table');    

    $.ajax({

        url: getPath()+'EglitecWeb/DownloadWindow',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var n = 1;
            var handsontable = new Handsontable(container, {
                data: data,
                colHeaders: true,
                stretchH: 'all'
            });
            $.each(data, function (key, value) {
                hot_stores_data.push({n: n,
                    oid: value.oid,
                    code: value.code,
                    descr: value.name,
                    address: value.address,
                    pricecatery: value.pricecatery,
                    sp18112: value.sp18112,
                    sp19820: value.sp19820,
                    tradefloorstock: value.tradefloorstock,
                    sp22948: value.sp22948,
                    sp24403: value.sp24403});
               n++;
            });
            
            
        }
    });
});
