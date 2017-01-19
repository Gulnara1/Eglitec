/* ------------------------------------------------------------------------------
 *
 *  # Echarts - pies and donuts
 *
 *  Pies and donuts chart configurations
 *
 *  Version: 1.0
 *  Latest update: August 1, 2015
 *
 * ---------------------------------------------------------------------------- */

require.config({
    paths: {
        echarts: 'limitless/assets/js/plugins/visualization/echarts'
    }
});


    $(function () {

    // Set paths
    // ------------------------------



    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/theme/limitless',
            'echarts/chart/pie'
        ],


        // Charts setup
        function (ec, limitless) {

            init_donut(ec,limitless);
        }
    );
});


function  init_donut(ec,limitless){
    // Initialize charts
    // ------------------------------

    var basic_donut = ec.init(document.getElementById('basic_donut'), limitless);




    // Charts setup
    // ------------------------------


    //
    // Basic donut options
    //

    var labelTop = {
        normal: {
            label: {
                show: true,
                position: 'center',
                formatter: '{b}\n',
                textStyle: {
                    baseline: 'top',
                    fontWeight: 300,
                    fontSize: 15
                }
            },
            labelLine: {
                show: false
            }
        }
    };

    // Format bottom label
    var labelFromatter = {
        normal: {
            label: {
                formatter: function (params) {
                    return '\n\n' + (100 - params.value) + '%'
                }
            }
        }
    }

    // Bottom text label
    var labelBottom = {
        normal: {
            color: '#eee',
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    baseline: 'bottom'
                }
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };

    // Set inner and outer radius
    var radius = ['50%', '70%'];


    basic_donut_options = {
        calculable : true,
        // Add series
        series: [
            {
                type: 'pie',
                radius: radius,
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 83, itemStyle: labelBottom},
                    {name: 'customers', value: 17,itemStyle: labelTop}
                ]
            }
        ]
    };




    // Apply options
    // ------------------------------

    basic_donut.setOption(basic_donut_options);



    // Resize charts
    // ------------------------------

    window.onresize = function () {
        setTimeout(function (){
            basic_donut.resize();
        }, 200);
    }

}