//Server root address
var IP = "http://127.0.0.1:8080/";
//var HOST = "http://47.101.141.182/shzx_api/";
var HOST = "http://211.144.105.121/shzx_api/";
var DOWNLOADPATH = IP + "/oll/";
var SOCKECT_ADDR = "ws://127.0.0.1:9998";//CRHService IP address(Windows service)
var SYSTEMNAME = "上海中学校车管理系统";
const STUDENT_IMG_BASE = "http://127.0.0.1/shzxBusImages/studentImg/";
const PHOTO_SIZE_LIMIT = 1024 * 1024 * 2;//2M

var EveryPageNum = 10;

const DateRangeOptions = {
    shortcuts: [{
        text: '最近一周',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]
}
const DateOptions = {
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            picker.$emit('pick', new Date());
        }
    }, {
        text: '昨天',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
        }
    }, {
        text: '一周前',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
        }
    }]
}

const RegionList = [
    {
        id: "0",
        name: '浦东',
    },
    {
        id: "1",
        name: '浦西',
    }
]

