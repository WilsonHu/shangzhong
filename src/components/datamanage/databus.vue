<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px;overflow-y: auto">
        <el-row>
            <el-date-picker
                    v-model="selectData"
                    type="date"
                    @change="selectAbsent"
                    placeholder="选择日期">
            </el-date-picker>
        </el-row>

        <el-row style="margin-top: 10px;text-align: center">
            <el-col :span="8">
                <div class="well"
                     style="width: 350px;height: 420px; border-radius: 5px;background-color: white;border-color: whitesmoke">
                    <div style="text-align: left;font-weight: bold">
					     <span class="span-normal">
					        上学统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="percentageMorning" status="text">
                            <span style="font-size: 30px;color: #409EFF">{{planedStudents - morningAbsentList.length}}</span>
                        </el-progress>
                    </div>
                    <div style="text-align: center;margin-top: 30px">
                         <span class="span-normal" style="font-weight: bold;color: lightgray">
                            上学乘坐统计
                         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 30px"></div>
                    <el-row style="margin-top: 24px">
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     {{planedStudents}}
							     </span>
                                <br>
                                <span class="span-normal">
								     应乘人数
							     </span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     {{morningAbsentList.length}}
							     </span>
                                <br>
                                <span class="span-normal">
								     缺乘人数
							     </span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     {{morning}}%
							     </span>
                                <br>
                                <span class="span-normal">
								     乘车率
							     </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="well"
                     style="width: 350px;height: 420px; border-radius: 5px;background-color: white;border-color: whitesmoke">
                    <div style="text-align: left;font-weight: bold">
					     <span class="span-normal">
					        放学统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="percentageAfternoon" color="#50D166" status="text">
                            <span style="font-size: 30px;color: #50D166;">{{planedStudents - afternoonAbsentList.length}}</span>
                        </el-progress>
                    </div>
                    <div style="text-align: center;margin-top: 30px">
                         <span class="span-normal" style="font-weight: bold">
                            放学乘坐统计
                         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 30px"></div>
                    <el-row style="margin-top: 24px">
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     {{planedStudents}}
							     </span>
                                <br>
                                <span class="span-normal">
								     应乘人数
							     </span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     {{afternoonAbsentList.length}}
							     </span>
                                <br>
                                <span class="span-normal">
								     缺乘人数
							     </span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     {{ afternoon}}%
							     </span>
                                <br>
                                <span class="span-normal">
								     乘车率
							     </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="well"
                     style="width: 350px;height: 420px; border-radius: 5px;background-color: white;border-color: whitesmoke">
                    <div style="text-align: left;font-weight: bold">
					     <span class="span-normal">
					        晚班统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="100" status="text">
                            <span style="font-size: 36px;color: #5553CE">{{night.total}}</span>
                        </el-progress>
                    </div>
                    <div style="text-align: center;margin-top: 30px">
                         <span class="span-normal" style="font-weight: bold">
                            晚班乘坐统计
                         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 30px"></div>
                    <el-row style="margin-top: 24px">
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     /
							     </span>
                                <br>
                                <span class="span-normal">
								     应乘人数
							     </span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     /
							     </span>
                                <br>
                                <span class="span-normal">
								     缺乘人数
							     </span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
							     <span class="span_number">
								     /
							     </span>
                                <br>
                                <span class="span-normal">
								     乘车率
							     </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row style="width: 100%;background-color: white;border-color: whitesmoke" class="well">
            <el-row>
                <el-col>
                    <div>
                        <span style="font-size:18px;font-weight:bolder;color:rgba(153,153,153,1)">缺乘名单</span>
                    </div>
                </el-col>
            <el-col :span="4" style="margin-top: 5px;">
                <el-select v-model="busName" clearable filterable placeholder="请选择校车" @change="handleNodeClick" style="margin-left: 6px">
                    <el-option
                            v-for="item in treeData"
                            :value="item.number"
                            :label="item.number">
                    </el-option>
                </el-select>
            </el-col>
                <el-col :span="4" :offset="1">
                    <el-select v-model="statusName" clearable filterable placeholder="请选择状态" @change="handleStatusClick">
                        <el-option
                                v-for="item in status"
                                :value="item.id"
                                :label="item.label">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-col>
                <div style="vertical-align: text-top;padding: 5px;text-align: center">
                    <el-table
                            v-loading="loadingUI"
                            element-loading-text="获取数据中..."
                            :data="absentList"
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
                                width="200"
                                label="站点">
                            <template scope="scope">
                                <div>
                                    {{scope.row.boardStationAfternoonName}}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    var _this;
    import request from '../../api/request'

    export default {
        name: "DataBus",
        components: {},
        data() {
            _this = this;
            return {
                selectData: new Date(),
                loadingUI: false,
                tableData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeData: [],
                planedStudents: 0,
                morningAbsentList: [],
                afternoonAbsentList: [],
                night: '',
                absentList: [],
                morning: 100,
                percentageMorning: 100,
                percentageAfternoon: 100,
                afternoon: 100,
                busName: '',
                status: [
                    {
                        id: '0',
                        label: '上学',
                    },
                    {
                        id: '1',
                        label: '放学',
                    }
                ],
                statusName: ''
            }
        },
        watch: {},
        methods: {
            handleNodeClick(data) {
                var absentList = new Array();
                _this.statusName="";
                var index = 0;
                if (_this.statusName!=""&&_this.statusName!=null){
                    if (data == 0) {
                        for (var i = 0; i < _this.morningAbsentList.length; i++) {
                            if (_this.morningAbsentList[i].busNumber == _this.busName) {
                                absentList[index] = _this.morningAbsentList[i];
                                index++;
                            }
                        }
                    } else if (data == 1) {
                        for (var i = 0; i < _this.afternoonAbsentList.length; i++) {
                            if (_this.afternoonAbsentList[i].busNumber == _this.busName) {
                                absentList[index] = _this.afternoonAbsentList[i];
                                index++;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < _this.morningAbsentList.length; i++) {
                        if (_this.morningAbsentList[i].busNumber == data) {
                            absentList[index] = _this.morningAbsentList[i];
                            index++;
                        }
                    }
                    for (var i = 0; i < _this.afternoonAbsentList.length; i++) {
                        if (_this.afternoonAbsentList[i].busNumber == data) {
                            absentList[index] = _this.afternoonAbsentList[i];
                            index++;
                        }
                    }
                }
                _this.absentList = absentList;

                /*     //只监听班级的点击
                     if(!isUndefined(data.id)) {
                         let params = new URLSearchParams();
                         params.append("className",data.label);
                         request({
                             url: '/transport/record/selectAbsenceStudentInfo',
                             method: 'post',
                             data: params
                         }).then(res => {
                             if (res.data.code == 200) {
                                 _this.tableData = res.data.data.list;
                             } else {
                                 showMessage(_this,"获取数据失败！");
                             }
                             _this.loadingUI = false;
                         }).catch(error => {
                             console.log(error)
                             _this.loadingUI = false;

                         })
                     }*/
            },

            handleStatusClick(data){
                var absentList = new Array();
                var index = 0;
                if (_this.busName!="" &&_this.busName!=null) {
                    if (data == 0) {
                        for (var i = 0; i < _this.morningAbsentList.length; i++) {
                            if (_this.morningAbsentList[i].busNumber == _this.busName) {
                                absentList[index] = _this.morningAbsentList[i];
                                index++;
                            }
                        }
                        _this.absentList = absentList;
                    } else if (data == 1) {
                        for (var i = 0; i < _this.afternoonAbsentList.length; i++) {
                            if (_this.afternoonAbsentList[i].busNumber == _this.busName) {
                                absentList[index] = _this.afternoonAbsentList[i];
                                index++;
                            }
                        }
                        _this.absentList = absentList;
                    }else{
                        _this.absentList=_this.absentList
                    }

                }else{
                    showMessage(_this,'请选择校车')
                }
            },
            getPlanedStudents() {
                let params = new URLSearchParams();
                request({
                    url: '/student/getStudents',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.planedStudents = res.data.data.total;
                        _this.getMorningAbsentStudents();
                        _this.getAfternoonAbsentStudents();
                        _this.getNightStudents();

                    } else {
                        showMessage(_this, "获取计划乘坐人数失败！", 0);
                    }

                }).catch(error => {
                    showMessage(_this, "获取总人数接口内部错误，请联系管理员", 0)

                })
            },
            getMorningAbsentStudents() {

                let params = new URLSearchParams();
                let startDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 0, 0, 0, 0);
                let endDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 23, 59, 59, 999);

                params.set("queryStartTime", startDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("queryFinishTime", endDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("busMode", "上学");
                request({
                    url: '/transport/record/selectAbsenceStudentInfo',
                    method: 'post',
                    data: params
                }).then(res => {

                    if (res.data.code == 200) {
                        _this.morningAbsentList = res.data.data;
                        if (_this.morningAbsentList.length > 0) {

                            var num = (_this.morningAbsentList.length / _this.planedStudents)
                            var morningNum = (1 - num) * 100;
                            _this.percentageMorning = morningNum;
                            _this.morning = morningNum.toFixed(2)
                        } else {
                            _this.morning = 100
                        }
                    } else {
                        showMessage(_this, "获取上学缺乘人数失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    showMessage(_this, '接口内部错误，请联系管理员', 0)
                })
            },
            getAfternoonAbsentStudents() {

                let params = new URLSearchParams();
                let startDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 0, 0, 0, 0);
                let endDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 23, 59, 59, 999);

                params.set("queryStartTime", startDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("queryFinishTime", endDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("busMode", "放学");
                request({
                    url: '/transport/record/selectAbsenceStudentInfo',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.afternoonAbsentList = res.data.data;
                        if (_this.afternoonAbsentList.length > 0) {
                            var num = (_this.afternoonAbsentList.length / _this.planedStudents)
                            var afternoonNum = (1 - num) * 100;
                            _this.percentageAfternoon = afternoonNum
                            _this.afternoon = afternoonNum.toFixed(2)
                        } else {
                            _this.afternoon = 100
                        }

                    } else {
                        showMessage(_this, "获取放学缺乘人数失败！", 0);
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    showMessage(error)
                })
            },
            getNightStudents() {
                let params = new URLSearchParams();
                let startDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 0, 0, 0, 0);
                let endDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 23, 59, 59, 999);
                params.set("queryStartTime", startDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("queryFinishTime", endDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("recordFlag", "晚班");
                request({
                    url: '/transport/record/selectTransportRecord',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.night = res.data.data;
                    } else {
                        showMessage(_this, "获取晚班乘人数失败！", 0);
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    showMessage(_this, "获取晚班乘人数失败！", 0);
                })
            },
            getBusInfo() {
                request({
                    url: '/bus/base/info/list',
                    method: 'post'
                }).then(res => {
                    var busList = new Array();
                    if (res.data.code == 200) {
                        busList = res.data.data.list;

                        var treeList = new Array();
                        for (var i = 0; i < busList.length; i++) {
                            var tree = new Object();
                            tree.id = Number(busList[i].number);
                            tree.label = busList[i].number + "号校车";

                            var childrenList = new Array();
                            var children = new Object();
                            children.id = Number(busList[i].number);
                            children.label = "上学";
                            childrenList[0] = children;
                            var children1 = new Object();
                            children1.id = Number(busList[i].number);
                            children1.label = "放学";
                            childrenList[1] = children1;

                            tree.children = childrenList;
                            treeList[i] = tree;
                        }
                        _this.treeData = busList;

                    } else {
                        showMessage(_this, "获取获取车辆信息失败！", 0);
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    showMessage(_this, "获取获取车辆信息失败！", 0);
                })

            },
            selectAbsent() {
                this.getMorningAbsentStudents();
                this.getAfternoonAbsentStudents();
                this.getNightStudents();
            }
        },
        /* computed: {
             morningRidingRate: function () {
                 return ((_this.planedStudents - _this.morningAbsentList.length) * 100) / _this.planedStudents;
             },
             afternoonRidingRate: function () {
                 return ((_this.planedStudents - _this.afternoonAbsentList.length) * 100) / _this.planedStudents;
             }
         },*/
        filters: {
            numFilter(value) {
                // 截取当前数据到小数点后两位
                let realVal = parseFloat(value).toFixed(2)
                // num.toFixed(2)获取的是字符串

                return parseFloat(realVal)
            }
        },

        created: function () {

        },
        mounted: function () {
            _this.loadingUI = true;
            _this.getPlanedStudents();
            _this.getBusInfo();


        }
    }
</script>
<style>
    td {
        border: #bfcbd9 1px solid;
        text-align: center
    }

    .span-normal {
        color: #B3B3B3;
        font-size: 13px;
        color: lightgray;
    }

    .span_number {
        color: #666666;
        font-weight: bold;
        font-size: 16px;
    }
</style>
