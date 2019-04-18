<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">

        <el-row style="margin-top: 20px;background: white;min-height: 800px" class="well">
            <el-col :span="3" class="well" style="background: white;min-height: 750px;overflow-y: auto">
                <div style="text-align: center">
                    <el-tree :data="classArrays"
                             :props="defaultProps"
                             highlight-current
                             style="margin-top: 20px"
                             @node-click="handleNodeClick"
                             >
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="20" style="background: white;margin-left: 30px;text-align: center">
                <el-row>
                    <el-col :span="3">
                        <el-date-picker
                                v-model="selectData"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                v-on:change="changeDate"
                                :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="7" :offset="12">
                        <el-input v-model="queryKey" placeholder="根据学号、姓名、站点、校车编号模糊查询" clearable></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" icon="el-icon-search" @click="fetchStudents">搜索</el-button>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%; margin-top: 10px">
                    <el-table-column
                            width="75"
                            label="序号"
                            align="center">
                        <template scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="studentNumber"
                            sortable
                            label="学号">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--align="center"-->
                    <!--prop="headImg"-->
                    <!--width="100"-->
                    <!--label="头像">-->
                    <!--<template scope="scope">-->
                    <!--<img style=" height: 50px;width:50px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;-->
                    <!--overflow: hidden;" :src="getPhoto(scope.row.headImg)"/>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column label="姓名"
                                     align="center"
                                     sortable
                                     prop="name">
                        <template scope="scope">
                            <div>
                                {{scope.row.name}}
                            </div>
                        </template>
                    </el-table-column>
                    <!--<el-table-column
                            align="center"
                            prop="banjiName"
                            label="头像">
                        <template scope="scope">
                            <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
                        </template>
                    </el-table-column>-->
                    <el-table-column
                            align="center"
                            prop="banjiName"
                            label="班级">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="busNumber"
                            label="校车">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="150"
                            label="上学">
                        <template scope="scope">

                            <el-tag type="success" v-if="scope.row.morningAttendance">上车</el-tag>
                            <el-tag type="warning" v-else>缺乘</el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="150"
                            label="放学">
                        <template scope="scope">
                            <el-tag type="success" v-if="scope.row.afterAttendance">上车</el-tag>
                            <el-tag type="warning" v-else>缺乘</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="150"
                            label="晚班">
                        <template scope="scope">
                            <el-tag type="success" v-if="scope.row.nightAttendance">上车</el-tag>
                            <el-tag type="warning" v-else>缺乘</el-tag>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    var _this;
    import request from '../../api/request'
    import {Dialog} from 'element-ui'

    var image = require("../../assets/img/ldh.png");

    export default {
        name: "StudentMange",
        components: {},
        data() {
            _this = this;
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
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
                },
                userInfo:'',
                tableData: [],
                totalRecords: 0,
                currentGrade: "",
                queryKey: "",
                classArrays: [],
                loadingUI: false,
                allClasses: [],
                busList: [],
                defaultProps: {
                    children: 'classes',
                    label: 'label'
                },
                activeIndex: "1",
                busStations: [],
                allBusStations: [],
                allBusLine: [],
                selectData: new Date().format("yyyy-MM-dd")
            }
        },
        methods: {


            getClasses() {
                let params = new URLSearchParams();
                _this.userInfo = JSON.parse(sessionStorage.getItem("user"));
                var url = '';
                if (_this.userInfo.roleId == 4) {
                    params.append("chargeTeacher", _this.userInfo.id);
                    url = 'banji/list/info';
                } else {
                    url = 'banji/list';
                }
                request({
                    url: url,
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.classArrays = [];
                        _this.allClasses = res.data.data.list;
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            if (_this.classArrays.length == 0) {
                                let data = {
                                    grade_id: res.data.data.list[i].grade,
                                    label: res.data.data.list[i].grade,
                                    classes: []
                                }
                                data.classes.push({
                                    id: res.data.data.list[i].id,
                                    label: res.data.data.list[i].className
                                })
                                _this.classArrays.push(data);
                            } else {
                                let gradeFound = false;
                                for (let j = 0; j < _this.classArrays.length; j++) {
                                    if (_this.classArrays[j].grade_id == res.data.data.list[i].grade) {
                                        _this.classArrays[j].classes.push({
                                            id: res.data.data.list[i].id,
                                            label: res.data.data.list[i].className
                                        })
                                        gradeFound = true;
                                    }
                                }
                                if (!gradeFound) {
                                    let data = {
                                        grade_id: res.data.data.list[i].grade,
                                        label: res.data.data.list[i].grade,
                                        classes: []
                                    }
                                    data.classes.push({
                                        id: res.data.data.list[i].id,
                                        label: res.data.data.list[i].className
                                    })
                                    _this.classArrays.push(data);
                                }
                            }

                        }
                    } else {
                        showMessage(_this, "获取数据失败！");
                    }
                    _this.multipleSelection = [];

                }).catch(error => {
                    console.log(error)
                })
            },
            getBusList() {
                let params = new URLSearchParams();
                request({
                    url: '/bus/base/info/list',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.busList = res.data.data.list;
                    } else {
                        showMessage(_this, "获取数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            changeDate(){
              if (_this.currentGrade.label!=null){
                  _this.fetchStudents();
              }
            },
            handleNodeClick(data) {
                _this.currentGrade = data;
                if (_this.userInfo.roleId == 4) {
                    if (_this.currentGrade.label.indexOf('年级') == -1) {
                        _this.fetchStudents();
                    }
                }else {
                    if (_this.currentGrade.label!=null) {
                        _this.fetchStudents();
                    }
                }
            },
            getPhoto(img) {
                if (img == null || img == '') {
                    return require("../../assets/img/avator.png")
                }
                return encodeURI(STUDENT_IMG_BASE + img);
            },
            modifyPhoto(img) {
                if (_this.photoData !== "") {
                    return _this.photoData;
                } else {
                    return encodeURI(STUDENT_IMG_BASE + img);
                }
            },
            fetchStudents() {
                // if(!isUndefined(_this.currentGrade.id)) {
                /*let params = new URLSearchParams();
                if(isUndefined(_this.currentGrade.label)) {
                    params.append("gradeName","");
                    params.append("className","");
                } else {
                    if(_this.currentGrade.label.indexOf("年级") != -1) {
                        params.append("gradeName",_this.currentGrade.label);
                    } else {
                        params.append("className",_this.currentGrade.label);
                    }
                }
                params.append("page", _this.currentPage);
                params.append("size", _this.pageSize);
                params.append("queryKey", _this.queryKey);
                request({
                    url: '/student/getStudents',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.totalRecords = res.data.data.total;
                        _this.tableData = res.data.data.list;
                        _this.startRow = res.data.data.startRow;
                    } else {
                        showMessage(_this,"获取数据失败！");
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })*/
                //按时间戳查询
                var da = _this.selectData.split(" ")
                var startTime = da[0] + " 00:00:00";
                var queryStartTime = new Date(startTime);
                var finishTime = da[0] + " 23:59:59";
                var queryFinishTime = new Date(finishTime);
                let params = new URLSearchParams();
                if (_this.currentGrade == '' || _this.currentGrade.label == null) {

                } else if (_this.currentGrade.label.indexOf("年级") != -1) {
                    params.append("gradeName", _this.currentGrade.label);
                } else {
                    params.append("className", _this.currentGrade.label);
                }
                params.append("queryKey", _this.queryKey);
                params.append("queryStartTime", queryStartTime.getTime() / 1000);
                params.append("queryFinishTime", queryFinishTime.getTime() / 1000);
                request({
                    url: '/transport/record/selectAbsenceClassStudentInfo',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        //_this.totalRecords = res.data.data.total;
                        _this.tableData = res.data.data;
                        //_this.startRow = res.data.data.startRow;
                    } else {
                        showMessage(_this, "获取数据失败！");
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
                // }
            },
            fetchBusLine(busNumber) {
                let params = new URLSearchParams();
                params.append("busNumber", busNumber);
                request({
                    url: '/bus/line/getBusLineByBusNumber',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allBusLine = res.data.data.list;
                        if (res.data.data.list.length > 0) {
                            _this.busStations = [];
                            let tmpList = res.data.data.list[0].stations.split(",");
                            _this.busStations = _this.allBusStations.filter(function (item) {
                                return tmpList.indexOf(item.stationName) !== -1;
                            });
                        }
                    } else {
                        showMessage(_this, "获取线路数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            fetchStations() {
                let params = new URLSearchParams();
                request({
                    url: '/bus/stations/search',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allBusStations = res.data.data.list;
                    } else {
                        showMessage(_this, "获取站点数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            filterBusLineByBus(mode) {
                let result = "";
                for (let i = 0; i < _this.allBusLine.length; i++) {
                    if (mode === _this.allBusLine[i].mode) {
                        result = _this.allBusLine[i].id;
                        break;
                    }
                }
                return result;
            }
        },
        computed: {},

        filters: {},

        created: function () {
            /*var da= _this.selectData.split(" ")
            var startTime= da[0]+" 00:00:00";
            var queryStartTime=new Date(startTime);
            var finishTime=da[0]+" 23:59:59";
            var queryFinishTime=new Date(finishTime);
            let params = new URLSearchParams();
            params.append("page", _this.currentPage);
            params.append("size", _this.pageSize);
            params.append("queryKey", _this.queryKey);
            params.append("queryStartTime",queryStartTime.getTime()/1000);
            params.append("queryFinishTime",queryFinishTime.getTime()/1000);

            request({
                url: '/transport/record/selectAbsenceClassStudentInfo',
                method: 'post',
                data: params
            }).then(res => {
                alert(JSON.stringify(res.data.data));
                if (res.data.code == 200) {
                    _this.totalRecords = res.data.data.total;
                    _this.tableData = res.data.data.list;
                    _this.startRow = res.data.data.startRow;
                } else {
                    showMessage(_this,"获取数据失败！");
                }
                _this.loadingUI = false;

            }).catch(error => {
                console.log(error)
                _this.loadingUI = false;

            })*/
        },
        mounted: function () {
            _this.getClasses();
            _this.getBusList();
            _this.fetchStations();

        }
    }
</script>
<style>
    input[type=file] {
        display: none;
    }

</style>
