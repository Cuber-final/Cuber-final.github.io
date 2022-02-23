var chartDom = document.getElementById('main_1');
var myChart_1 = echarts.init(chartDom);
var option_1;

option_1 = {
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

option_1 && myChart_1.setOption(option_1);