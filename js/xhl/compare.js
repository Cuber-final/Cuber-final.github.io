var parr = {
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array()
}
var fcfs = {
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array(),
    key_ztime: Array(),
    key_dqztime: Array(),
    key_statue: Array()
}

var sjf = {
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array(),
    key_ztime: Array(),
    key_dqztime: Array(),
    key_statue: Array()
}

var srt = {
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array(),
    key_rtime: Array(),
    key_statue: Array(), //0表示等待状态，1表示正在运行,2表示已完成
    key_ztime: Array(),
    key_dqztime: Array(),
}

var hrrn_n = { //非抢占式HRRN
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array(),
    key_rio: Array(),
    key_statue: Array(), //0表示等待状态，1表示正在运行,2表示已完成
    key_ztime: Array(),
    key_dqztime: Array()
}

var hrrn_p = { //抢占式HRRN
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array(),
    key_rtime: Array(),
    key_rio: Array(),
    key_statue: Array(), //0表示等待状态，1表示正在运行,2表示已完成
    key_ztime: Array(),
    key_dqztime: Array(),
    key_waittime: Array()
}

var RR = {
    key_n: Array(),
    key_ntime: Array(),
    key_stime: Array(),
    key_rtime: Array(),
    key_statue: Array(), //0表示等待状态，1表示正在运行,2表示已完成
    key_ztime: Array(),
    key_dqztime: Array(),
}

var queue = function() {
    this.items = [];
    this.enqueue = function(item) {
        this.items.push(item);
    }
    this.dequeue = function() {
        if (this.items.length == 0)
            return null;
        return this.items.shift();
    }
    this.clear = function() {
        this.items = [];
    }
    this.count = function() {
        return this.items.length;
    }
    this.front = function() {
        if (this.items.length > 0)
            return this.items[0];
        else return null;
    }
}


var aa = [];
var bb = [];
var aaa = [];
var bbb = [];
var aaaa = [];
//creatProgress(); //创建进程并显示到table
function creatProgress() {
    aa.length = 0;
    bb.length = 0;
    var max = 40,
        min = 20;
    var size = Math.floor(Math.random() * (+max - +min)) + +min;
    aa.length = size;
    bb.length = size;
    aaa.length = size;
    bbb.length = size;
    aaaa.length = size;
    parr.key_ntime.length = size;
    parr.key_stime.length = size;
    parr.key_n.length = size;
    for (var i = 0; i < size; i++) {
        aa[i] = 0;
        bb[i] = 0;
        aaa[i] = 0;
        bbb[i] = 0;
        aaaa[i] = 0;
        parr.key_n[i] = i;
        parr.key_ntime[i] = Math.floor(Math.random() * (+25 - +1)) + +1;
        parr.key_stime[i] = Math.floor(Math.random() * (+30 - +0)) + +0;
    }
    var tbody = document.querySelector('tbody');
    for (var i = 0; i < size; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (var j = 0; j < 3; j++) {
            var td = document.createElement('td');
            if (j == 0)
                td.innerHTML = 'P' + parr.key_n[i];
            else if (j == 1)
                td.innerHTML = parr.key_ntime[i];
            else if (j == 2)
                td.innerHTML = parr.key_stime[i];

            tr.appendChild(td);
        }
    }
}


//开始按钮事件
var btn_start = document.getElementById('btn_time_compare');
btn_start.onclick = function() { //开始启动计时
    document.getElementById("btn_time_compare").setAttribute("disabled", true); //设置不可点击
    //document.getElementById("pause_compare").removeAttribute("disabled");
    // //开始前先清除表格中的所有条数据
    // var h = document.getElementById('body');
    // var child = h.childNodes;
    // for (var i = child.length - 1; i >= 0; i--)
    //     h.removeChild(child[i]); //删除节点
    start();
}

function start() {
    if (time_piece == 0) {
        alert('ERROR:未输入时间片大小！！！');
    } else if (parr.key_n.length == 0) {
        alert('ERROR:没有进程数据！！！');
    } else {
        FCFS();
        SJF();
        SRT();
        alert('运行成功！');
    }

}

function FCFS() {
    fcfs.key_dqztime.length = parr.key_ntime.length;
    fcfs.key_n.length = parr.key_ntime.length;
    fcfs.key_ntime.length = parr.key_ntime.length;
    fcfs.key_stime.length = parr.key_ntime.length;
    fcfs.key_ztime.length = parr.key_ntime.length;
    fcfs.key_statue.length = parr.key_ntime.length;
    for (var i = 0; i < parr.key_n.length; i++) {
        fcfs.key_n[i] = parr.key_n[i];
        fcfs.key_ntime[i] = parr.key_ntime[i];
        fcfs.key_stime[i] = parr.key_stime[i];
        fcfs.key_ztime[i] = -1;
        fcfs.key_dqztime[i] = -1;
        fcfs.key_statue[i] = 0;
    }

    var time = 0;
    var total_ztime = 0,
        total_dqztime = 0;
    for (var i = 0; i < parr.key_n.length; i++) {
        var min = 100,
            n = -1;
        for (var j = 0; j < parr.key_n.length; j++) {
            if (fcfs.key_statue[j] == 0) {
                if (fcfs.key_stime[j] < min) {
                    min = fcfs.key_stime[j];
                    n = j;
                } else if (fcfs.key_stime[j] == min) {
                    if (fcfs.key_ntime[j] < fcfs.key_ntime[n]) {
                        min = fcfs.key_stime[j];
                        n = j;
                    }
                }
            }
        }
        if (time < fcfs.key_stime[n])
            time = fcfs.key_stime[n];
        //console.log(n);
        //运行进程n
        fcfs.key_ztime[n] = time + fcfs.key_ntime[n] - fcfs.key_stime[n];
        fcfs.key_dqztime[n] = (fcfs.key_ztime[n] / fcfs.key_ntime[n]).toFixed(2);
        time += fcfs.key_ntime[n];
        fcfs.key_statue[n] = 1;
        total_ztime += fcfs.key_ztime[n];
        var c = fcfs.key_dqztime[n];
        c = parseFloat(c);
        total_dqztime += c;
    }
    var fcfst = document.getElementById('fcfst');
    fcfst.innerHTML = '完成时间：' + time;
    var fcfsz = document.getElementById('fcfsz');
    fcfsz.innerHTML = '平均周转时间：' + total_ztime / parr.key_n.length;
    var fcfsdqz = document.getElementById('fcfsdqz');
    fcfsdqz.innerHTML = '平均带权周转时间：' + total_dqztime / parr.key_n.length;

    zt[ant] = total_ztime / parr.key_n.length;
    dqzt[ant] = total_dqztime / parr.key_n.length;
    ant++;
}

function SJF() {
    sjf.key_dqztime.length = parr.key_ntime.length;
    sjf.key_n.length = parr.key_ntime.length;
    sjf.key_ntime.length = parr.key_ntime.length;
    sjf.key_stime.length = parr.key_ntime.length;
    sjf.key_ztime.length = parr.key_ntime.length;
    sjf.key_statue.length = parr.key_ntime.length;
    for (var i = 0; i < parr.key_n.length; i++) {
        sjf.key_n[i] = parr.key_n[i];
        sjf.key_ntime[i] = parr.key_ntime[i];
        sjf.key_stime[i] = parr.key_stime[i];
        sjf.key_ztime[i] = -1;
        sjf.key_dqztime[i] = -1;
        sjf.key_statue[i] = 0;
    }

    var time = 0;
    var total_ztime = 0,
        total_dqztime = 0;
    var all = 0;
    for (time = 0; time < 10000;) {
        var min = 100,
            n = -1;

        for (var i = 0; i < parr.key_n.length; i++) {
            if (sjf.key_stime[i] <= time && sjf.key_statue[i] == 0) {
                if (sjf.key_ntime[i] < min) {
                    min = sjf.key_ntime[i];
                    n = i;
                } else if (sjf.key_ntime[i] == min) {
                    if (sjf.key_stime[i] < sjf.key_stime[n]) {
                        n = i;
                    }
                }
            }
        }
        if (n >= 0) {
            all++;
            sjf.key_ztime[n] = time + sjf.key_ntime[n] - sjf.key_stime[n];
            sjf.key_dqztime[n] = (sjf.key_ztime[n] / sjf.key_ntime[n]).toFixed(2);
            sjf.key_statue[n] = 1;
            time += sjf.key_ntime[n];
            total_ztime += sjf.key_ztime[n];
            var c = sjf.key_dqztime[n];
            c = parseFloat(c);
            total_dqztime += c;
        } else time++;

        if (all == parr.key_n.length)
            break;
    }
    var SJFt = document.getElementById('SJFt');
    SJFt.innerHTML = '完成时间：' + time;
    var SJFz = document.getElementById('SJFz');
    SJFz.innerHTML = '平均周转时间：' + total_ztime / parr.key_n.length;
    var SJFdqz = document.getElementById('SJFdqz');
    SJFdqz.innerHTML = '平均带权周转时间：' + total_dqztime / parr.key_n.length;

    zt[ant] = total_ztime / parr.key_n.length;
    dqzt[ant] = total_dqztime / parr.key_n.length;
    ant++;
}
var srttime = 0;
var total_ztime = 0,
    total_dqztime = 0;

function SRT() {
    srt.key_dqztime.length = parr.key_ntime.length;
    srt.key_n.length = parr.key_ntime.length;
    srt.key_ntime.length = parr.key_ntime.length;
    srt.key_stime.length = parr.key_ntime.length;
    srt.key_ztime.length = parr.key_ntime.length;
    srt.key_statue.length = parr.key_ntime.length;
    srt.key_rtime.length = parr.key_ntime.length;
    for (var i = 0; i < parr.key_n.length; i++) {
        srt.key_n[i] = parr.key_n[i];
        srt.key_ntime[i] = parr.key_ntime[i];
        srt.key_stime[i] = parr.key_stime[i];
        srt.key_ztime[i] = -1;
        srt.key_dqztime[i] = -1;
        srt.key_statue[i] = 0;
        srt.key_rtime[i] = srt.key_ntime[i];
    }
    startt();

}

function HRRN_N() {
    hrrn_n.key_dqztime.length = parr.key_ntime.length;
    hrrn_n.key_n.length = parr.key_ntime.length;
    hrrn_n.key_ntime.length = parr.key_ntime.length;
    hrrn_n.key_ztime.length = parr.key_ntime.length;
    hrrn_n.key_statue.length = parr.key_ntime.length;
    hrrn_n.key_rio.length = parr.key_ntime.length;
    for (var i = 0; i < parr.key_n.length; i++) {
        hrrn_n.key_n[i] = parr.key_n[i];
        hrrn_n.key_ntime[i] = parr.key_ntime[i];
        hrrn_n.key_stime[i] = parr.key_stime[i];
        hrrn_n.key_ztime[i] = -1;
        hrrn_n.key_dqztime[i] = -1;
        hrrn_n.key_statue[i] = 0;
        hrrn_n.key_rio[i] = 0;
    }
    start_hrrn_n();
}

function HRRN_P() {
    hrrn_p.key_dqztime.length = parr.key_ntime.length;
    hrrn_p.key_n.length = parr.key_ntime.length;
    hrrn_p.key_ntime.length = parr.key_ntime.length;
    hrrn_p.key_ztime.length = parr.key_ntime.length;
    hrrn_p.key_statue.length = parr.key_ntime.length;
    hrrn_p.key_rio.length = parr.key_ntime.length;
    hrrn_p.key_waittime.length = parr.key_n.length;
    hrrn_p.key_rtime, length = parr.key_n.length;
    for (var i = 0; i < parr.key_n.length; i++) {
        hrrn_p.key_n[i] = parr.key_n[i];
        hrrn_p.key_ntime[i] = parr.key_ntime[i];
        hrrn_p.key_stime[i] = parr.key_stime[i];
        hrrn_p.key_ztime[i] = -1;
        hrrn_p.key_dqztime[i] = -1;
        hrrn_p.key_statue[i] = 0;
        hrrn_p.key_rio[i] = 0;
        hrrn_p.key_rtime[i] = hrrn_p.key_ntime[i];
        hrrn_p.key_waittime[i] = 0;
    }
    start_hrrn_p();
}

var time_piece = 0;

function RRr() {
    RR.key_dqztime.length = parr.key_ntime.length;
    RR.key_n.length = parr.key_ntime.length;
    RR.key_ntime.length = parr.key_ntime.length;
    RR.key_stime.length = parr.key_ntime.length;
    RR.key_ztime.length = parr.key_ntime.length;
    RR.key_statue.length = parr.key_ntime.length;
    RR.key_rtime.length = parr.key_ntime.length;
    for (var i = 0; i < parr.key_n.length; i++) {
        RR.key_n[i] = parr.key_n[i];
        RR.key_ntime[i] = parr.key_ntime[i];
        RR.key_stime[i] = parr.key_stime[i];
        RR.key_ztime[i] = -1;
        RR.key_dqztime[i] = -1;
        RR.key_statue[i] = 0;
        RR.key_rtime[i] = srt.key_ntime[i];
    }
    if (time_piece == 0) {
        alert('请输入时间片大小！');
    } else
        start_RR();
}

var zt = [];
var dqzt = [];
zt.length = 6;
dqzt.length = 6;
var ant = 0;

var numb_RR;
var p_queue = new queue();
var run = false;

var time_RR = 0;
var total_ztime_RR = 0,
    total_dqztime_RR = 0;

function start_RR() {
    var second = 0;
    if (second == 0) {
        celect_RR(second);
        updata_RR(second);
        if (p_queue.count() > 0) {
            progress_start_RR(p_queue.front(), second);
            numb_RR = p_queue.front();
            p_queue.dequeue();
        }
        updata_RR(second);
    }

    function timer() {
        second++;
        celect_RR(second);
        updata_RR(second);
        if (run == true) {
            cD--;
            if (RR.key_rtime[numb_RR] != 0) {
                if (cD == 0) {
                    progress_stop_RR(numb_RR, time_piece);
                    p_queue.enqueue(numb_RR);
                    //下一进程进CPU运行
                    progress_start_RR(p_queue.front(), second);
                    numb_RR = p_queue.front();
                    p_queue.dequeue();
                }
            } else if (RR.key_rtime[numb_RR] == 0) {
                progress_finish_RR(numb_RR, second, time_piece - cD);
                if (p_queue.count() > 0) {
                    progress_start_RR(p_queue.front(), second);
                    numb_RR = p_queue.front();
                    p_queue.dequeue();
                }
            }
        } else {
            if (p_queue.count() > 0) {
                progress_start_RR(p_queue.front(), second);
                numb_RR = p_queue.front();
                p_queue.dequeue();
            }
        }
        updata_RR(second);
    }
    int = setInterval(timer, 1);
}


function celect_RR(second) {
    for (var i = 0; i < RR.key_n.length; i++) {
        //如果此时进程进入等待状态则进队列
        if (RR.key_stime[i] == second) {
            p_queue.enqueue(i);
            //console.log('进程' + i + '进队');
        }
    }
}
var cD = 0; //时间片倒计时


function progress_start_RR(num, start_time) { //某个进程开始运行
    run = true;
    RR.key_statue[num] = 1;
    cD = time_piece;
}

function progress_stop_RR(num, second) {
    run = false;
    RR.key_statue[num] = 0;
}

function progress_finish_RR(num, second, echart) { //进程结束改变statue
    run = false;
    RR.key_statue[num] = 2;
    //计算周转时间
    RR.key_ztime[num] = second - RR.key_stime[num];
    RR.key_dqztime[num] = (RR.key_ztime[num] / RR.key_ntime[num]).toFixed(2);
}


//动态更新表格数据，进程信息
function updata_RR(second) {
    var finish_num = 0;
    for (var i = 0; i < parr.key_n.length; i++) {
        console.log('p' + i + '的剩余时间' + RR.key_rtime[i]);
        if (RR.key_statue[i] > 0) {
            if (RR.key_statue[i] == 1) {
                if (!aaaa[i]) {
                    RR.key_rtime[i]--;
                    aaaa[i] = 1;
                } else aaaa[i] = 0;
            } else if (RR.key_statue[i] == 2) {
                finish_num++;
                console.log(finish_num);
                if (finish_num == parr.key_n.length) {
                    time_RR = second;
                    clearInterval(int); //完成后结束所有进程
                    for (var j = 0; j < parr.key_n.length; j++) {
                        total_ztime_RR += RR.key_ztime[j];
                        var c = RR.key_dqztime[j];
                        c = parseFloat(c);
                        total_dqztime_RR += c;
                    }
                    var RRt = document.getElementById('RRt');
                    RRt.innerHTML = '完成时间：' + time_RR;
                    var RRz = document.getElementById('RRz');
                    RRz.innerHTML = '平均周转时间：' + total_ztime_RR / parr.key_n.length;
                    var RRdqz = document.getElementById('RRdqz');
                    RRdqz.innerHTML = '平均带权周转时间：' + total_dqztime_RR / parr.key_n.length;

                    zt[ant] = total_ztime_RR / parr.key_n.length;
                    dqzt[ant] = total_dqztime_RR / parr.key_n.length;
                    ant++;

                    //改变折线图数据，可视化显示
                    change_bar_all();
                }
            }
        }

    }
}

function change_bar_all() {
    option_4.series[0].data.length = ant;
    for (var i = 0; i < ant; i++) {
        option_4.series[0].data[i] = zt[i];
    }
    for (var i = 0; i < ant; i++) {
        option_4.series[1].data[i] = dqzt[i];
    }
    option_4 && myChart_4.setOption(option_4, true);
}

//抢占式HRRN调用的函数如下
var numb_hrrn_p, fin_time_hrrn_p;
var run_time_hrrn_p = [];
var hrrn_p_time = 0;
var total_ztime_hrrn_p = 0,
    total_dqztime_hrrn_p = 0;

function start_hrrn_p() {
    var second = 0;
    if (second == 0) {
        //creatProgress();
        updata_hrrn_p(second);
        //updata(second);
        numb_hrrn_p = celect_hrrn_p(0);
        //fin_time = -1;
        if (numb_hrrn_p >= 0) {
            progress_start_hrrn_p(numb_hrrn_p, 0);
            run_time_hrrn_p[numb_hrrn_p] = second;
        }
        updata_hrrn_p(second);

    }



    function timer() {
        second++;
        //更新响应比
        updata_hrrn_p(second);
        var nn = celect_hrrn_p(second);
        if (numb_hrrn_p >= 0) {
            if (hrrn_p.key_rtime[numb_hrrn_p] == 0) {
                progress_finish_hrrn_p(numb_hrrn_p, second);
                numb_hrrn_p = nn;
                progress_start_hrrn_p(numb_hrrn_p, second);
                run_time_hrrn_p[numb_hrrn_p] = second;
            } else if (hrrn_p.key_rio[nn] > hrrn_p.key_rio[numb_hrrn_p]) {
                progress_stop_hrrn_p(numb_hrrn_p, second);
                //console.log(nn + ' ' + numb);
                numb_hrrn_p = nn;
                progress_start_hrrn_p(numb_hrrn_p, second);
                run_time_hrrn_p[numb_hrrn_p] = second;
                //console.log(numb + ' ' + parr.key_statue[numb]);

            }

        } else {
            numb_hrrn_p = nn;
            progress_start_hrrn_p(numb_hrrn_p, second);
            run_time_hrrn_p[numb_hrrn_p] = second;
        }
        updata_hrrn_p(second);
        /* if (second >= fin_time) {
            if (second == fin_time)
                progress_finish(numb, second);
            var numbe = celect(second);
            numb = numbe;
            if (numbe != -1) {
                fin_time = progress_start(numbe, second);
            }
        } */
    }
    int = setInterval(timer, 1);
}




function progress_start_hrrn_p(num, start_time) { //某个进程开始运行
    hrrn_p.key_statue[num] = 1;
}

function progress_stop_hrrn_p(num, second) {
    hrrn_p.key_statue[num] = 0;
}

function progress_finish_hrrn_p(num, second) { //进程结束改变statue
    hrrn_p.key_statue[num] = 2;
    //计算周转时间
    hrrn_p.key_ztime[num] = second - hrrn_p.key_stime[num];
    hrrn_p.key_dqztime[num] = (hrrn_p.key_ztime[num] / hrrn_p.key_ntime[num]).toFixed(2);
    console.log(hrrn_p.key_ztime[num]);
}

//一个进程结束时挑选响应比最高的进程为其分配CPU,返回进程的序号
function celect_hrrn_p(second) {
    var minn = 0,
        num = -1;
    for (var i = 0; i < parr.key_n.length; i++) {
        if (hrrn_p.key_rio[i] > minn && hrrn_p.key_statue[i] == 0 && hrrn_p.key_stime[i] <= second) {
            num = i;
            minn = hrrn_p.key_rio[i];
        }
    }
    return num;
}

//动态更新表格数据，进程信息
function updata_hrrn_p(second) {
    var finish_num = 0;
    for (var i = 0; i < parr.key_n.length; i++) {
        //等待时间++
        if (!bbb[i]) {
            if (second > hrrn_p.key_stime[i] && hrrn_p.key_statue[i] == 0)
                hrrn_p.key_waittime[i]++;
            bbb[i] = 1;
        } else bbb[i] = 0;

        if (hrrn_p.key_stime[i] <= second && hrrn_p.key_statue[i] == 0) {
            hrrn_p.key_rio[i] = (hrrn_p.key_ntime[i] + hrrn_p.key_waittime[i]) / hrrn_p.key_ntime[i];
            hrrn_p.key_rio[i] = hrrn_p.key_rio[i].toFixed(2); //保留两位小数
        } else if (hrrn_p.key_statue[i] > 0) {
            if (hrrn_p.key_statue[i] == 1) {
                if (!aaa[i]) {
                    hrrn_p.key_rtime[i]--;
                    aaa[i] = 1;
                } else aaa[i] = 0;

            } else if (hrrn_p.key_statue[i] == 2) {
                finish_num++;
                if (finish_num == parr.key_n.length) {
                    hrrn_p_time = second;
                    clearInterval(int); //完成后结束所有进程
                    for (var j = 0; j < parr.key_n.length; j++) {
                        total_ztime_hrrn_p += hrrn_p.key_ztime[j];
                        var c = hrrn_p.key_dqztime[j];
                        c = parseFloat(c);
                        total_dqztime_hrrn_p += c;
                    }
                    var HRRNPt = document.getElementById('HRRNPt');
                    HRRNPt.innerHTML = '完成时间：' + hrrn_p_time;
                    var HRRNPz = document.getElementById('HRRNPz');
                    HRRNPz.innerHTML = '平均周转时间：' + total_ztime_hrrn_p / parr.key_n.length;
                    var HRRNPdqz = document.getElementById('HRRNPdqz');
                    HRRNPdqz.innerHTML = '平均带权周转时间：' + total_dqztime_hrrn_p / parr.key_n.length;
                    zt[ant] = total_ztime_hrrn_p / parr.key_n.length;
                    dqzt[ant] = total_dqztime_hrrn_p / parr.key_n.length;
                    ant++;
                    RRr();
                }
            }
        }

    }
}


//HRRN非抢占式调用的函数如下
var numb_hrrn_n, fin_time_hrrn_n;
var hrrn_n_time = 0;
var total_ztime_hrrn = 0,
    total_dqztime_hrrn = 0;

function start_hrrn_n() {
    var second = 0;

    if (second == 0) {
        //creatProgress();
        updata_hrrn_n(second);
        numb_hrrn_n = celect_hrrn_n(0);
        fin_time_hrrn_n = -1;
        if (numb_hrrn_n >= 0) {
            fin_time_hrrn_n = progress_start_hrrn_n(numb_hrrn_n, 0);
        }
        updata_hrrn_n(second);
    }

    function timer() {
        second++;
        //更新响应比
        updata_hrrn_n(second);
        if (second >= fin_time_hrrn_n) {
            if (second == fin_time_hrrn_n)
                progress_finish_hrrn_n(numb_hrrn_n, second);
            var numbe = celect_hrrn_n(second);
            numb_hrrn_n = numbe;
            if (numbe != -1) {
                fin_time_hrrn_n = progress_start_hrrn_n(numbe, second);
            }
        }
        //updata_hrrn_n(second);
    }
    int = setInterval(timer, 1);
}

function progress_start_hrrn_n(num, start_time) { //某个进程开始运行
    hrrn_n.key_statue[num] = 1;
    var ik = start_time + hrrn_n.key_ntime[num];
    return ik;
}

/* var barr = [];
var i = 0; */

function progress_finish_hrrn_n(num, second) { //进程结束改变statue
    hrrn_n.key_statue[num] = 2;
    //计算周转时间
    hrrn_n.key_ztime[num] = second - hrrn_n.key_stime[num];
    hrrn_n.key_dqztime[num] = (hrrn_n.key_ztime[num] / hrrn_n.key_ntime[num]).toFixed(2);
}

//一个进程结束时挑选响应比最高的进程为其分配CPU,返回进程的序号
function celect_hrrn_n(second) {
    var minn = 0,
        num = -1;
    for (var i = 0; i < parr.key_n.length; i++) {
        if (hrrn_n.key_rio[i] > minn && hrrn_n.key_statue[i] == 0 && hrrn_n.key_stime[i] <= second) {
            num = i;
            minn = hrrn_n.key_rio[i];
        }
    }
    return num;
}

//动态更新表格数据，进程信息
function updata_hrrn_n(second) {
    var finish_num = 0;
    for (var i = 0; i < parr.key_n.length; i++) {
        if (hrrn_n.key_stime[i] <= second && hrrn_n.key_statue[i] == 0) {
            hrrn_n.key_rio[i] = (hrrn_n.key_ntime[i] - hrrn_n.key_stime[i] + second) / hrrn_n.key_ntime[i];
            hrrn_n.key_rio[i] = hrrn_n.key_rio[i].toFixed(2); //保留两位小数
        } else if (hrrn_n.key_statue[i] > 0) {
            if (hrrn_n.key_statue[i] == 2) {
                finish_num++;
                if (finish_num == parr.key_n.length) {
                    hrrn_n_time = second - 1;
                    clearInterval(int); //完成后结束所以进程
                    for (var j = 0; j < parr.key_n.length; j++) {
                        total_ztime_hrrn += hrrn_n.key_ztime[j];
                        var c = hrrn_n.key_dqztime[j];
                        c = parseFloat(c);
                        total_dqztime_hrrn += c;
                    }
                    var HRRNt = document.getElementById('HRRNt');
                    HRRNt.innerHTML = '完成时间：' + hrrn_n_time;
                    var HRRNz = document.getElementById('HRRNz');
                    HRRNz.innerHTML = '平均周转时间：' + total_ztime_hrrn / parr.key_n.length;
                    var HRRNdqz = document.getElementById('HRRNdqz');
                    HRRNdqz.innerHTML = '平均带权周转时间：' + total_dqztime_hrrn / parr.key_n.length;
                    zt[ant] = total_ztime_hrrn / parr.key_n.length;
                    dqzt[ant] = total_dqztime_hrrn / parr.key_n.length;
                    ant++;
                    HRRN_P();
                }
            }
        }
    }
}


//SRT算法调用的函数如下
var numb, fin_time;
var run_time = [];

function startt() {
    var second = 0;
    if (second == 0) {
        //creatProgress();
        updata(second);
        //updata(second);
        numb = celect(0);
        //fin_time = -1;
        if (numb >= 0) {
            progress_start(numb, 0);
            run_time[numb] = second;
        }
        updata(second);

    }

    function timer() {
        second++;
        //更新响应比
        updata(second);
        var nn = celect(second);
        if (numb >= 0) {
            if (srt.key_rtime[numb] == 0) {
                progress_finish(numb, second);
                numb = nn;
                progress_start(numb, second);
                run_time[numb] = second;
            } else if (srt.key_rtime[nn] < srt.key_rtime[numb]) {
                progress_stop(numb, second);
                //console.log(nn + ' ' + numb);
                numb = nn;
                progress_start(numb, second);
                run_time[numb] = second;
                //console.log(numb + ' ' + parr.key_statue[numb]);
            }
        } else {
            numb = nn;
            if (numb >= 0) {
                progress_start(numb, second);
                run_time[numb] = second;
            }
        }
        updata(second);
    }
    int = setInterval(timer, 1);
}

function progress_start(num, start_time) { //某个进程开始运行
    srt.key_statue[num] = 1;
}

function progress_stop(num, second) {
    srt.key_statue[num] = 0;
}

function progress_finish(num, second) { //进程结束改变statue
    srt.key_statue[num] = 2;
    srt.key_ztime[num] = second - srt.key_stime[num];
    srt.key_dqztime[num] = (srt.key_ztime[num] / srt.key_ntime[num]).toFixed(2);
}
//一个进程结束时挑选响应比最高的进程为其分配CPU,返回进程的序号
function celect(second) {
    var minn = 100,
        num = -1;
    for (var i = 0; i < parr.key_n.length; i++) {
        if (srt.key_statue[i] == 0 && srt.key_stime[i] <= second) {
            if (srt.key_rtime[i] < minn) {
                minn = srt.key_rtime[i];
                num = i;
            } else if (srt.key_rtime[i] == minn) {
                if (srt.key_stime[i] < srt.key_stime[num]) {
                    num = i;
                }
            }
        }
    }
    return num;
}


//动态更新表格数据，进程信息
function updata(second) {
    var finish_num = 0;
    for (var i = 0; i < parr.key_n.length; i++) {
        if (srt.key_statue[i] > 0) {
            if (srt.key_statue[i] == 1) {
                if (!aa[i]) {
                    srt.key_rtime[i]--;
                    aa[i] = 1;
                } else aa[i] = 0;
            } else if (srt.key_statue[i] == 2) {
                finish_num++;
                if (finish_num == parr.key_n.length) {
                    srttime = second;
                    clearInterval(int); //完成后结束所有进程
                    for (var j = 0; j < parr.key_n.length; j++) {
                        total_ztime += srt.key_ztime[j];
                        var c = sjf.key_dqztime[j];
                        c = parseFloat(c);
                        total_dqztime += c;
                    }
                    var SRTt = document.getElementById('SRTt');
                    SRTt.innerHTML = '完成时间：' + srttime;
                    var SRTz = document.getElementById('SRTz');
                    SRTz.innerHTML = '平均周转时间：' + total_ztime / parr.key_n.length;
                    var SRTdqz = document.getElementById('SRTdqz');
                    SRTdqz.innerHTML = '平均带权周转时间：' + total_dqztime / parr.key_n.length;

                    zt[ant] = total_ztime / parr.key_n.length;
                    dqzt[ant] = total_dqztime / parr.key_n.length;
                    ant++;
                    HRRN_N();
                }
            }
        }
    }
}



//随机生成进程事件
var btn_random = document.getElementById('random_compare');
btn_random.onclick = function() { //开始启动计时

    //开始前先清除表格中的所有条数据
    var h = document.getElementById('body_compare');
    var child = h.childNodes;
    for (var i = child.length - 1; i >= 0; i--)
        h.removeChild(child[i]); //删除节点
    document.getElementById("random_compare").setAttribute("disabled", true); //设置不可点击
    document.getElementById("btn_time_compare").removeAttribute("disabled"); //去掉不可点击
    creatProgress();
}

function insert(st, nt) {
    var lon = parr.key_n.length;
    parr.key_ntime.length++;
    parr.key_stime.length++;
    parr.key_n.length++;
    aa.length++;
    bb.length++;

    parr.key_ntime[lon] = nt;
    parr.key_stime[lon] = st;
    parr.key_n[lon] = lon;

    aa[lon] = 0;
    bb[lon] = 0;

    var tbody = document.querySelector('tbody');

    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (var j = 0; j < 3; j++) {
        var td = document.createElement('td');
        if (j == 0)
            td.innerHTML = 'P' + parr.key_n[lon];
        else if (j == 1)
            td.innerHTML = parr.key_ntime[lon];
        else if (j == 2)
            td.innerHTML = parr.key_stime[lon];

        tr.appendChild(td);
    }
}

$(document).ready(function() {
    document.getElementById("inputt_compare").onclick = function() {
        $('#loginModalId_compare').modal('show');
    }
    document.getElementById("loginModalYesId_compare").onclick = function() {
        $('#loginModalId_compare').modal('hide');
        //alert("登录功能未实现！");

        var st = document.getElementById("p_stime_compare").value;
        var nt = document.getElementById("p_ntime_compare").value;
        st = parseInt(st);
        nt = parseInt(nt);
        insert(st, nt);
        document.getElementById("btn_time_compare").removeAttribute("disabled"); //去掉不可点击
    }
});

$(document).ready(function() {
    document.getElementById("tsize_compare").onclick = function() {
        $('#loginModalId_compare_1').modal('show');
    }
    document.getElementById("loginModalYesId_compare_1").onclick = function() {
        $('#loginModalId_compare_1').modal('hide');
        //alert("登录功能未实现！");
        var stt = document.getElementById("p_stime_compare_1").value;
        st = parseInt(stt);
        //time_size(stt);
        time_piece = st;
        document.getElementById("btn_time_compare").removeAttribute("disabled"); //去掉不可点击
        document.getElementById("tsize_compare").setAttribute("disabled", true); //设置不可点击
    }
});