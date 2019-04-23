<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">
        <!--<el-row>-->
        <!--<el-col :span="2">-->
        <!--<div style="margin: 10px;">-->
        <!--<span style="font-weight: 600;color:#5D5D5D;font-size: 15px">变更列表</span >-->
        <!--</div>-->
        <!--</el-col >-->
        <!--</el-row>-->
        <el-row style="margin-top: 20px;background: white" class="well">
            <el-col :span="23" style="background: white;margin-left: 30px;text-align: center">
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%; margin-top: 10px">
                    <!--<el-table-column
                            width="75"
                            align="center"
                            type="selection">
                    </el-table-column>-->
                    <el-table-column
                            align="center"
                            sortable
                            label="变更日期">
                        <template scope="scope">
                            <div>
                                {{scope.row.changeDate}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="100"
                            prop="stuName"
                            label="学生姓名">
                    </el-table-column>
                    <el-table-column
                            label="原校车"
                            align="center"
                            prop="oldBusNumber">

                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="newBusNumber"
                            label="新校车">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="200"
                            prop="stationName"
                            label="站点">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="changeContent"
                            label="变更内容">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="是否确认"
                            width="150">
                        <template scope="scope">
                            <el-tag type="success"
                                    @click="updateStatus(scope.row.id,1)" v-if="scope.row.confirmStatus=='0'">YES
                            </el-tag>
                            <el-tag type="danger" @click="handleCancel(scope.$index,2)"
                                    v-if="scope.row.confirmStatus=='0'">NO
                            </el-tag>
                            <el-tag type="success" v-if="scope.row.confirmStatus=='1'">已修改</el-tag>
                            <el-tag type="danger" v-if="scope.row.confirmStatus=='2'">已取消修改</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="text-align: center; margin-top: 20px">
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="totalRecords">
                    </el-pagination>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    var _this;
    import {getServerBusList, getServerBusStationList} from '../../api/commonRequest'
    import request from '../../api/request'

    export default {
        name: "ChangeMange",
        components: {},
        data() {
            _this = this;
            return {
                loadingUI: false,
                tableData: [],
                pageSize: EveryPageNum,
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
                studentName: [],
                busLine: [],
                busNumber: [],
                allBusLine: [],
                busLineTotal: ''


            }
        },
        methods: {
            search() {
                _this.loadingUI = true;
                let params = new URLSearchParams();
                params.append("page", _this.currentPage);
                params.append("size", _this.pageSize);
                request({
                    url: `${HOST}booking/record/getBookingRecord`,
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.tableData = res.data.data.list;
                        _this.totalRecords = res.data.data.total;
                        _this.startRow = res.data.data.startRow;
                    } else {
                        showMessage(_this, "获取变更信息失败")
                    }
                    _this.loadingUI = false
                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;
                })
            },
            handleCurrentChange(val) {
                _this.currentPage=val;
                _this.search();
            },
         /*   updateStu(index, data) {
                let params = new URLSearchParams();
                let student = {
                    id: data.student,
                    boardStationMorning: data.newStation,
                    boardStationAfternoon: data.newStation,
                }
                if (_this.allBusLine != null) {
                    var morning = _this.allBusLine[0].id
                    var afternoon = _this.allBusLine[1].id
                    student.busLineMorning=morning;
                    student.busLineAfternoon=afternoon

                }
                params.append("student", JSON.stringify(student))
                request({
                    url: '/student/update',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.updateStatus(data.id, "1")
                        this.$alert('修改成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.search();
                            }
                        });
                    } else {
                        showMessage(_this, "修改失败")
                    }
                }).catch(error => {
                    showMessage(_this, error)
                })
            },*/
            updateStatus(id, status) {
                let params = new URLSearchParams();
                params.append("id", id);
                params.append("confirmStatus", status)
                request({
                    url: '/booking/record/update',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        if (status=='2'){
                            this.$alert('已取消修改', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.search();
                                }
                            });
                        }else {
                            this.$alert('已确认，修改信息将会在变更日期凌晨时进行修改', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.search();
                                }
                            });
                        }

                    }
                }).catch(error => {
                    showMessage(_this, error)
                })

            },
           /* fetchBusLine(index, data) {
                let params = new URLSearchParams();
                params.append("busNumber", data.newBusNumber);
                request({
                    url: '/bus/line/getBusLineByBusNumber',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allBusLine = res.data.data.list;
                        _this.busLineTotal = res.data.data.total
                    } else {
                        showMessage(_this, "获取线路数据失败！");
                    }
                }).catch(error => {
                    showMessage(_this, error)
                })
            },*/
            handleCancel(index, data) {
                _this.updateStatus(data.id, "2")
            }
        },
        computed: {},

        filters: {},

        created: function () {


        },
        mounted: function () {
            _this.search();
        }
    }
</script>
<style>

</style>
