var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
    //params: ['#61a0a8', '#61a0a8', '#61a0a8', '#61a0a8', '#61a0a8', '#61a0a8'],
    xAxis: {
        type: 'category',
        data: []
    },
    title: {
        subtext: '动态响应比图'
    },
    yAxis: {
        type: 'value',
        //data = '响应比'
        name: '响应比'
    },
    series: [{
        data: [],
        //colorList: [],
        type: 'bar',
        showBackground: true,

        label: {
            show: true
        },

        backgroundStyle: {
            color: 'rgba(80, 180, 180, 0.2)'
        },
        itemStyle: {
            normal: {

                color: function(params) {

                    if (parr.key_statue[params.dataIndex] == 1) {
                        return 'red';
                    } else if (parr.key_statue[params.dataIndex] == 2) {
                        return 'balck';
                    } else if (parr.key_statue[params.dataIndex] == 0) {
                        //console.log(params.dataIndex + ' ' + parr.key_statue[params.dataIndex]);
                        return 'green';
                    }

                }
            }
        }

    }]
};


//change();

option && myChart.setOption(option);