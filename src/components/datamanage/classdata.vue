<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">
        <el-row style="margin-top: 20px;background: white;min-height: 800px" class="well">
            <el-col :span="3" class="well" style="background: white;min-height: 750px;overflow-y: auto">
                <div style="text-align: center">
                    <el-tree :data="classArrays"
                             :props="defaultProps"
                             highlight-current
                             style="margin-top: 20px"
                             @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="20" style="background: white;margin-left: 30px;text-align: center">
                <el-row>
                    <el-col :span="3">
                        <el-date-picker
                                v-model="selectData"
                                type="date"
                                placeholder="选择日期">
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
                            {{scope.$index+startRow}}
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
                    <el-table-column
                            align="center"
                            label="操作"
                            width="150">
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    icon="el-icon-edit"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">
                            </el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        style="margin-top: 20px"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalRecords">
                </el-pagination>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    var _this;
    import request from '../../api/request'
    var image = require("../../assets/img/ldh.png");

    export default {
        name: "StudentMange",
        components: {},
        data() {
            _this = this;
            return {	    //分页
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 1,
                tableData: [],
                totalRecords:0,
                currentGrade:"",
                queryKey: "",
                classArrays: [],
                loadingUI:false,
                allClasses: [
                ],
                busList: [],
                defaultProps: {
                    children: 'classes',
                    label: 'label'
                },
                activeIndex: "1",
                busStations:[],
                allBusStations:[],
                allBusLine:[],
                selectData: new Date()
            }
        },
        methods: {

            handleSizeChange(val) {

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.fetchStudents();
            },
            getClasses() {
                let params = new URLSearchParams();
                request({
                    url: 'banji/list',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.classArrays = [];
                        _this.allClasses = res.data.data.list;
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            if(_this.classArrays.length == 0 ) {
                                let data = {
                                    grade_id:res.data.data.list[i].grade,
                                    label: res.data.data.list[i].grade,
                                    classes: []
                                }
                                data.classes.push({
                                    id:res.data.data.list[i].id,
                                    label:res.data.data.list[i].className
                                })
                                _this.classArrays.push(data);
                            } else {
                                let gradeFound = false;
                                for (let j = 0; j < _this.classArrays.length; j++) {
                                    if(_this.classArrays[j].grade_id == res.data.data.list[i].grade) {
                                        _this.classArrays[j].classes.push({
                                            id:res.data.data.list[i].id,
                                            label:res.data.data.list[i].className
                                        })
                                        gradeFound = true;
                                    }
                                }
                                if(!gradeFound) {
                                    let data = {
                                        grade_id:res.data.data.list[i].grade,
                                        label: res.data.data.list[i].grade,
                                        classes: []
                                    }
                                    data.classes.push({
                                        id:res.data.data.list[i].id,
                                        label:res.data.data.list[i].className
                                    })
                                    _this.classArrays.push(data);
                                }
                            }

                        }
                    } else {
                        showMessage(_this,"获取数据失败！");
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
                        showMessage(_this,"获取数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            handleNodeClick(data) {
                _this.currentGrade = data;
                _this.currentPage = 1;
                _this.startRow = 1;
                _this.fetchStudents();
            },
            getPhoto(img) {
                if(img == null || img == '') {
                    return require("../../assets/img/avator.png")
                }
                return encodeURI(STUDENT_IMG_BASE + img);
            },
            modifyPhoto(img) {
                if(_this.photoData !== "") {
                    return _this.photoData;
                } else {
                    return encodeURI(STUDENT_IMG_BASE + img);
                }
            },
            fetchStudents() {
                // if(!isUndefined(_this.currentGrade.id)) {
                let params = new URLSearchParams();
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

                })
                // }
            },
            fetchBusLine(busNumber) {
                let params = new URLSearchParams();
                params.append("busNumber",busNumber);
                request({
                    url: '/bus/line/getBusLineByBusNumber',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allBusLine = res.data.data.list;
                        if(res.data.data.list.length > 0) {
                            _this.busStations = [];
                            let tmpList = res.data.data.list[0].stations.split(",");
                            _this.busStations = _this.allBusStations.filter(function (item) {
                                return tmpList.indexOf(item.stationName) !== -1;
                            });
                        }
                    } else {
                        showMessage(_this,"获取线路数据失败！");
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
                        showMessage(_this,"获取站点数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            filterBusLineByBus(mode) {
                let result = "";
                for (let i = 0; i < _this.allBusLine.length; i++) {
                    if(mode === _this.allBusLine[i].mode) {
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


        },
        mounted: function () {
            _this.getClasses();
            _this.getBusList();
            _this.fetchStations();
            _this.fetchStudents();
        }
    }
</script>
<style>
    input[type=file] {
        display: none;
    }

</style>
