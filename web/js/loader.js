
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10)
    month = "0" + month;
if (day < 10)
    day = "0" + day;
var today = year + "-" + month + "-" + day;

$.ajax({

    url: getPath()+'EglitecWeb/DownloadWindow',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
//        curYear = (new Date()).getFullYear();
        minYear = 20100101;
        $.each(data, function (key, value) {
            $('#orgList').append('<option value="' + value.id + '" name="' + value.name + '"+>' + value.name + '</option>');
            minYear = value.timeId;
        });
        $('#curDate').prop('min', minYear);
        $('#curDate').val(today);
    }
});
$(function () {

    $('#month').append('<option value="' + 01 + '"+>' + "Январь" + '</option>');
    $('#month').append('<option value="' + 02 + '"+>' + 'Февраль' + '</option>');
    $('#month').append('<option value="' + 03 + '"+>' + 'Март' + '</option>');
    $('#month').append('<option value="' + 04 + '"+>' + 'Апрель' + '</option>');
    $('#month').append('<option value="' + 05 + '"+>' + 'Май' + '</option>');
    $('#month').append('<option value="' + 06 + '"+>' + 'Июнь' + '</option>');
    $('#month').append('<option value="' + 07 + '"+>' + 'Июль' + '</option>');
    $('#month').append('<option value="' + 08 + '"+>' + 'Август' + '</option>');
    $('#month').append('<option value="' + 09 + '"+>' + 'Сентябрь' + '</option>');
    $('#month').append('<option value="' + 10 + '"+>' + 'Октябрь' + '</option>');
    $('#month').append('<option value="' + 11 + '"+>' + 'Ноябрь' + '</option>');
    $('#month').append('<option value="' + 12 + '"+>' + 'Декабрь' + '</option>');
    $('#month').append('<option value="' + 00 + '"+>' + 'Все месяцы' + '</option>');
});


