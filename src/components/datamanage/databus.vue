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
					        早班统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="morning" status="text">
                            <span style="font-size: 30px;color: #409EFF">{{planedStudents - morningAbsentList.length}}</span>
                        </el-progress>
                    </div>
                    <div style="text-align: center;margin-top: 30px">
                         <span class="span-normal" style="font-weight: bold;color: lightgray">
                            早班乘坐统计
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
					        午班统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="afternoon" color="#50D166" status="text">
                            <span style="font-size: 30px;color: #50D166;">{{planedStudents - afternoonAbsentList.length}}</span>
                        </el-progress>
                    </div>
                    <div style="text-align: center;margin-top: 30px">
                         <span class="span-normal" style="font-weight: bold">
                            午班乘坐统计
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
            <el-col :span="3" class="well" style="background: white;min-height: 360px;overflow-y: auto">
                <div style="width: 100%;height:72px; text-align: center;padding-top: 20px">
                    <span style="font-size:18px;font-weight:bolder;color:rgba(153,153,153,1)">缺乘名单</span>
                </div>
                <div style="width: 100%;height: 2px;background-color: whitesmoke"></div>
                <div style="width: 100%;">
                    <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            accordion
                            style="text-align: center"
                            @node-click="handleNodeClick"
                            highlight-current>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="21">
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
                            -->
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="studentNumber"
                                sortable
                                label="学号">
                        </el-table-column>
                        <!--   <el-table-column
                                   align="center"
                                   prop="headImg"
                                   label="头像">
                               <template scope="scope">
                                   <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                       overflow: hidden;" :src="scope.row.photo"/>
                               </template>
                           </el-table-column>-->
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
                morning:100,
                afternoon:100
            }
        },
        watch: {},
        methods: {
            handleNodeClick(data) {
                var absentList = new Array();
                var index = 0;
                switch (data.label) {
                    case "上学":
                        for (var i = 0; i < _this.morningAbsentList.length; i++) {
                            if (_this.morningAbsentList[i].busNumber == data.id) {
                                absentList[index] = _this.morningAbsentList[i];
                                index++;
                            }
                        }
                        break;
                    case "放学":
                        for (var i = 0; i < _this.afternoonAbsentList.length; i++) {
                            if (_this.afternoonAbsentList[i].busNumber == data.id) {
                                absentList[index] = _this.afternoonAbsentList[i];
                                index++;
                            }
                        }
                        break;
                    default :
                        for (var i = 0; i < _this.morningAbsentList.length; i++) {
                            if (_this.morningAbsentList[i].busNumber == data.id) {
                                absentList[index] = _this.morningAbsentList[i];
                                index++;
                            }
                        }
                        for (var i = 0; i < _this.afternoonAbsentList.length; i++) {
                            if (_this.afternoonAbsentList[i].busNumber == data.id) {
                                absentList[index] = _this.afternoonAbsentList[i];
                                index++;
                            }
                        }
                        break;
                }
                console.log(index);
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
            getPlanedStudents() {
                let params = new URLSearchParams();
                request({
                    url: '/student/totalPlatformNumber',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.planedStudents = res.data.data;
                    } else {
                        showMessage(_this, "获取计划乘坐人数失败！");
                    }

                }).catch(error => {
                    console.log(error)

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
                        if (_this.morningAbsentList.length>0) {
                            var num = (_this.morningAbsentList.length / _this.planedStudents)
                            var morningNum = (1 - num) * 100;
                            _this.morning = morningNum
                        }else{
                            _this.morning=100
                        }
                    } else {
                        showMessage(_this, "获取早班缺乘人数失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)
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
                          if (_this.afternoonAbsentList.length>0){
                              var num = (_this.afternoonAbsentList.length / _this.planedStudents)
                              var morningNum = (1 - num) * 100;
                              _this.afternoon = morningNum
                          } else {
                              _this.afternoon=100
                          }

                    } else {
                        showMessage(_this, "获取午班缺乘人数失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)
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
                        showMessage(_this, "获取晚班乘人数失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)
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
                            children.label = "早班";
                            childrenList[0] = children;
                            var children1 = new Object();
                            children1.id = Number(busList[i].number);
                            children1.label = "午班";
                            childrenList[1] = children1;

                            tree.children = childrenList;
                            treeList[i] = tree;
                        }
                        _this.treeData = treeList;
                    } else {
                        showMessage(_this, "获取获取车辆信息失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)
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
            _this.getMorningAbsentStudents();
            _this.getAfternoonAbsentStudents();
            _this.getNightStudents();
            _this.getBusInfo();
        }
    }
</script>
<style>
    /*tr {*/
    /*border: #bfcbd9 1px solid;*/
    /*text-align: center*/
    /*}*/
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
