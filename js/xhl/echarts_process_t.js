var chartDom = document.getElementById('main_3');
var myChart_3 = echarts.init(chartDom);
var option_3;

option_3 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        name: 's'
    },
    yAxis: {
        type: 'category',
        data: ['CPU'],
        name: 'CPU分配图'
    },
    series: [

    ]
};

option_3 && myChart_3.setOption(option_3);