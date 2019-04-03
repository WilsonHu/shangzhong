<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px;overflow-y: auto">
        <el-row>
            <el-date-picker
                    v-model="selectData"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
        </el-row>
        <el-row style="margin-top: 10px;text-align: center">
            <el-col :span="8">
                <div  class="well" style="width: 350px;height: 420px; border-radius: 5px;background-color: white;border-color: whitesmoke" >
                    <div style="text-align: left;font-weight: bold">
					     <span class="span-normal">
					        早班统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="morningRidingRate" status="text">
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
								     92.5%
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
                <div  class="well" style="width: 350px;height: 420px; border-radius: 5px;background-color: white;border-color: whitesmoke" >
                    <div style="text-align: left;font-weight: bold">
					     <span class="span-normal">
					        午班统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="88" color="#50D166" status="text">
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
								     1021
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
								     100
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
								     88%
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
                <div  class="well" style="width: 350px;height: 420px; border-radius: 5px;background-color: white;border-color: whitesmoke" >
                    <div style="text-align: left;font-weight: bold">
					     <span class="span-normal">
					        晚班统计
				         </span>
                    </div>
                    <div style="height: 1px;background-color: whitesmoke;margin-top: 16px"></div>
                    <div style="margin-top: 50px;text-align: center">
                        <el-progress type="circle" :percentage="0" status="text">
                            <span style="font-size: 36px;color: #5553CE">60</span>
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
                            default-expand-all
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
                                {{scope.$index+startRow}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="studentNumber"
                                sortable
                                label="学号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="headImg"
                                label="头像">
                            <template scope="scope">
                                <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden;" :src="scope.row.photo"/>
                            </template>
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
                    <el-pagination
                            style="margin-top: 20px"
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage3"
                            :page-size="8"
                            layout="prev, pager, next, jumper"
                            :total="88">
                    </el-pagination>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    var _this;
    import  request from '../../api/request'
    export default {
        name: "DataBus",
        components: {},
        data() {
            _this = this;
            return {
                selectData: '',
                loadingUI: false,
                tableData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeData: [
                    {
                        id: 1,
                        label: '001校车',
                        children: [
                            {
                                id: "11",
                                label: '早班',
                            },
                            {
                                id: "12",
                                label: '午班',
                            },
                            {
                                id: "13",
                                label: '晚班',
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '002校车',
                        children: [
                            {
                                id: "21",
                                label: '早班',
                            },
                            {
                                id: "22",
                                label: '午班',
                            },
                            {
                                id: "23",
                                label: '晚班',
                            }]
                    },
                    {
                        id: 3,
                        label: '003校车',
                        children: [
                            {
                                id: "31",
                                label: '早班',
                            },
                            {
                                id: "32",
                                label: '午班',
                            },
                            {
                                id: "33",
                                label: '晚班',
                            }]
                    }
                ],
                planedStudents:0,
                morningAbsentList:[],
                afternoonAbsentList:[],
                afternoonRidingRate:0,
            }
        },
        watch: {
        },
        methods: {
            handleNodeClick(data) {
                //只监听班级的点击
                if(!isUndefined(data.id)) {
                    let params = new URLSearchParams();
                    params.append("className",data.label);
                    request({
                        url: '/student/getStudents',
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
                }
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
                        showMessage(_this,"获取计划乘坐人数失败！");
                    }

                }).catch(error => {
                    console.log(error)

                })
            },
            getMorningAbsentStudents() {
                let params = new URLSearchParams();
                let startDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 0, 0,0,0);
                let endDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 23, 59,59,999);

                params.set("queryStartTime", startDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("queryFinishTime", endDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("busMode", "早班");
                request({
                    url: '/transport/record/selectAbsenceStudentInfo',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.morningAbsentList = res.data.data.list;
                    } else {
                        showMessage(_this,"获取早班缺乘人数失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)
                })
            },
            getAfternoonAbsentStudents() {
                let params = new URLSearchParams();
                let startDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 0, 0,0,0);
                let endDate = new Date(_this.selectData.getFullYear(), _this.selectData.getMonth(), _this.selectData.getDate(), 23, 59,59,999);

                params.set("queryStartTime", startDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("queryFinishTime", endDate.format("yyyy-MM-dd hh:mm:ss"));
                params.set("busMode", "午班");
                request({
                    url: '/transport/record/selectAbsenceStudentInfo',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.afternoonAbsentList = res.data.data.list;
                    } else {
                        showMessage(_this,"获取早班缺乘人数失败！");
                    }
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)

                })
            }
        },
        computed: {
            morningRidingRate: function(){
                alert((_this.morningAbsentList.length *100) / _this.planedStudents)
                return (_this.morningAbsentList.length *100) / _this.planedStudents;
            }
        },

        filters: {},

        created: function () {
            let dt = new Date();
            let oneDayBefore = new Date();
            oneDayBefore.setDate(dt.getDate() -1);
            _this.selectData = oneDayBefore;
            _this.loadingUI = true;
            this.getPlanedStudents();
            this.getMorningAbsentStudents();
            this.getAfternoonAbsentStudents();

        },
        mounted: function () {
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
