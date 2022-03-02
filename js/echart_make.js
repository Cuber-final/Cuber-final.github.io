//echarts-make.js
/*
var dom = document.getElementById("container")
var myChart = echarts.init(dom)
var app = {}
*/
//获取今年年份
var thisYear = new Date().getFullYear()
var option

//计算是今年的第几天
function parseDate(year, month, day) {
    var feb = 0
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        feb = 29
    } else {
        feb = 28
    }
    var sum = day
    var months = [0, 31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30]

    for (var i = 1; i <= month; i++) {
        sum += months[i - 1]
    }
    //console.log(sum)
    return sum
}

//解决如何填入年份作为数据以及该日提交文章数
function getVirtualData(year) {
    year = year;
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate(+year + 1 + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var dateMap = [];
    for (var time = date; time < end; time += dayTime) {
        dateMap.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            0
        ]);
    }
    //对日历图进行更新
    var dates = document.getElementsByClassName("date-map");
    for (var i = 0; i < dates.length; i++) { //循环获取每个input表单元素值
        var text = dates[i].innerText //通过innerText或者innerHTML获取元素的文本值
        var year = Number(text.slice(0, 4))
        var month = Number(text.slice(5, 7))
        var day = Number(text.slice(8, 10))
        //console.log(year, month, day)
        if (year == thisYear) {
            var date = parseDate(year, month, day)
            dateMap[date - 1][1] += 1
        }
    }
    return dateMap
};

/*----------博客数据分析页-----------*/
function getParentCates() {
    var pArray = []
    //建立数组
    var cates = document.getElementsByClassName("category")
    for (var i = 0; i < cates.length; i++) {
        // 获取父类名
        var cateName = cates[i].getElementsByTagName("span")[0].innerText
        // 获取父类文章数
        var catCount = cates[i].getElementsByTagName("span")[1].innerText
        var item = JSON.parse(JSON.stringify({ "name": cateName, "value": Number(catCount) }))
        pArray.push(item)
    }
    return pArray
}

function getSubCates() {
    var sArray = []
    var subCates = document.getElementsByClassName("category-sub")
    for (var j = 0; j < subCates.length; j++) {
        var subCateName = subCates[j].getElementsByTagName("span")[0].innerText
        var subCateCount = subCates[j].getElementsByTagName("span")[1].innerText
        var item = JSON.parse(JSON.stringify({ "name": subCateName, "value": Number(subCateCount) }))
        sArray.push(item)
    }
    return sArray
}