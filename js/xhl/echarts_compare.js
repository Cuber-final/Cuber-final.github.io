var chartDom = document.getElementById('main_compare');
var myChart_4 = echarts.init(chartDom);
var option_4;

option_4 = {
    title: {
        text: '算法性能比较'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {},
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['FCFS', 'SJF', 'SRT', '非抢占HRRN', '抢占HRRN', '时间片轮转']
    },
    yAxis: {
        type: 'value',
        // axisLabel: {
        //     formatter: '{value} °C'
        // }
    },
    series: [{
            name: '平均周转时间',
            type: 'line',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
        },
        {
            name: '平均带权周转时间',
            type: 'line',
            data: [],
            markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
                data: [
                    { type: 'average', name: 'Avg' },
                    [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        },
                        {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: 'Max'
                            },
                            type: 'max',
                            name: '最高点'
                        }
                    ]
                ]
            }
        }
    ]
};

option_4 && myChart_4.setOption(option_4);