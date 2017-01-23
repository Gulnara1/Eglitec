
function createHandsontable(hot_data, container, colHeaders) {
// Define element

    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);

        td.style.color = '#000000';

//        if (value > 1500) {
//            td.style.background = '#E9967A';
//        }

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
}
//create Stores handsontable

function createStoresTable(hot_stores_data) {

    var container = document.getElementById('hot_stores_table');


    var handsontable = new Handsontable(container, {
        data: hot_stores_data,
        colHeaders: true,
        stretchH: 'all'
    });

    console.log(handsontable);
    return handsontable;
}

//export csv
function hrlatorCSV(header, data) {

    // This is to avoid accidentally splitting the actual contents
    tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"',
            csv = '"' + data.map(function (rval, index) {
                return rval.map(function (cval, jndex) {
                    // escape double quotes
                    var out = "";
                    if (!!cval) {
                        out = cval.toString();
                    }
                    return out;
                }).join(tmpColDelim);
            }).join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"';

    // Data URI
    var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    var link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "Магазины_оп.csv");
    link.click();
}

