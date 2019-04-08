<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">
        <el-form :model="condition" label-position="right">
            <el-row>
                <el-col :span="4">
                    <el-input :span="3" v-model="condition.studentName"
                              placeholder="请输入要查找的学生姓名" clearable
                              auto-complete="off"></el-input>
                </el-col>
                <el-col :span="2" style="margin-left: 20px">
                    <el-button
                            icon="el-icon-search"
                            size="normal"
                            type="primary"
                            @click="search">查询
                    </el-button>
                </el-col>

            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="4">
                    <el-form-item label="">
                        <el-select v-model="condition.busNumber" clearable filterable placeholder="请选择校车">
                            <el-option
                                    v-for="item in busList"
                                    :value="item.number"
                                    :label="item.number"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="margin-left: 20px">
                    <el-form-item label="">
                        <el-select v-model="condition.busStation" clearable filterable placeholder="请选择站点">
                            <el-option
                                    v-for="item in busStationList"
                                    :value="item.stationName"
                                    :label="item.stationName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="margin-left: 20px">
                    <el-form-item label="">
                        <el-select v-model="condition.gradeName" clearable filterable placeholder="请选择年级">
                            <el-option
                                    v-for="item in gradeList"
                                    :value="item"
                                    :label="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="margin-left: 20px">
                    <el-form-item label="">
                        <el-select v-model="condition.className" clearable filterable placeholder="请选择班级">
                            <el-option
                                    v-for="item in classList"
                                    :value="item"
                                    :label="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
               <!-- <el-col :span="4" style="margin-left: 20px" v-else>
                    <el-form-item label="">
                        <el-select v-model="condition.className" clearable filterable placeholder="请选择班级">
                            <el-option
                                    v-for="item in classList"
                                    :value="item.className"
                                    :label="item.className">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>-->
                <el-col :span="4" style="margin-left: 20px">
                    <el-date-picker
                            v-model="condition.selectDate"
                            type="daterange"
                            align="left"
                            unlink-panels
                            range-separator="—"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
            </el-row>
        </el-form>
        <div class="well" style="border-radius: 5px;background-color: white;border-color: whitesmoke">
            <div style="color: #909399;font-weight: bold;margin-bottom: 20px">为您查询到<span
                    style="font-size: 16px;font-weight: bold;color:#1875F0">&nbsp;{{totalRecords}}&nbsp;</span>条符合条件的记录
            </div>
            <el-row>
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        :default-sort="{prop: 'boardTime', order: 'descending'}"
                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%; ">
                    <el-table-column
                            width="75"
                            align="center"
                            type="selection">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="boardTime"
                            sortable
                            label="时间">
                        <template scope="scope">
                            <div>
                                {{scope.row.boardTime}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="busNumber"
                            label="校车">

                        <template scope="scope">
                            <div>
                                {{scope.row.busNumber}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="站点"
                                     align="center"
                                     sortable
                                     prop="stationName">
                        <template scope="scope">
                            <div>
                                {{scope.row.boardStationNameAfternoon}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="studentBanji"
                            sortable
                            label="班级">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="studentName"
                            sortable
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="mode"
                            sortable
                            label="状态">
                        <template scope="scope">
                            <div>
                                {{scope.row.mode}}
                            </div>
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
            </el-row>
        </div>
    </div>
</template>

<script>
    var _this;
    import {getServerBusList, getServerBusStationList} from '../../api/commonRequest'
    import request from '../../api/request'

    export default {
        name: "RecordQuery",
        components: {},
        data() {
            _this = this;
            return {
                condition: {
                    selectDate: '',
                    busNumber: '',
                    busStation: '',
                    gradeName: '',
                    className: '',
                    studentName: '',
                },
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
                tableData: [],
                multipleSelection: [],
                loadingUI: false,
                pickerOptions: DateRangeOptions,

                busList: [],
                busStationList: [],
                gradeList: [],
                classList: [],


            }
        },
        methods: {
            judgeNull(){
                if (_this.condition.busNumber == null ) {
                    _this.condition.busNumber = "";
                }
                if (_this.condition.busStation == null) {
                    _this.condition.busStation = "";
                }
                if (_this.condition.gradeName == null) {
                    _this.condition.gradeName = "";
                }
                if (_this.condition.className == null) {
                    _this.condition.className= "";
                }
                if (_this.condition.studentName == null) {
                    _this.condition.studentName= "";
                }
            },
            search() {
                _this.loadingUI = true;
                _this.judgeNull();
                let condition = {
                    studentName:_this.condition.studentName,
                    busNumber: _this.condition.busNumber,
                    busStationName: _this.condition.busStation,
                    grade: _this.condition.gradeName,
                    className: _this.condition.className,
                    page: _this.currentPage,
                    size: _this.pageSize,
                }
                if (_this.condition.selectDate != null && _this.condition.selectDate.length > 0) {

                    var queryStartTime = _this.condition.selectDate[0].format("yyyy-MM-dd");
                   var queryFinishTime = _this.condition.selectDate[1].format("yyyy-MM-dd");
                    condition.queryStartTime=queryStartTime+" 00:00:00";
                    condition.queryFinishTime=queryFinishTime+" 23:59:59"
                }
                let params = new URLSearchParams();
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }

                request({
                    url: `${HOST}transport/record/selectTransportRecord`,
                    method: 'post',
                    data: params
                }).then(res => {
                   /* if (_this.tableData!=null&&_this.tableData!=""){
                        _this.tableData=[];
                    }*/
                    if (res.data.code == 200) {
                        _this.tableData = res.data.data.list;
                        _this.totalRecords = res.data.data.total;
                        _this.startRow = res.data.data.startRow;
                    } else {
                        //showMessage(_this,"获取数据失败！");
                    }
                    _this.multipleSelection = [];
                    _this.loadingUI = false;


                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                _this.tableData = []
                this.search();
            },
            getClassName(){
              let condition={
                  grade:_this.condition.gradeName
              }
              let params=new URLSearchParams();
              if (condition){
                  let keys=Object.keys(condition);
                  for (let key of keys){
                      params.append(key,condition[key])
                  }
              }
              request({
                  url: `${HOST}banji/getClassName`,
                  method: 'post',
                  data: params
              }).then(res=>{
                  if (res.data.code==200){
                     _this.classList=res.data.data
                  }
              }).catch(error=>{
                  showMessage(_this,'获取班级信息失败',0)
              })


            },
            getBusList() {
                getServerBusList({}).then(res => {
                    if (res.data.code == 200) {
                        _this.busList = res.data.data.list;
                    } else {
                        //showMessage(_this,"获取数据失败！");
                    }

                }).catch((error => {
                    //showMessage(_this,error);
                }))
            },
            getBanjiList() {

                request({
                    url: `${HOST}banji/list`,
                    method: 'post',
                    data: ''
                }).then(res => {
                    if (res.data.code == 200) {
                        let gradeAndClass = res.data.data.list;
                        let grades = [];
                        let banji = []
                        for (var i = 0; i < gradeAndClass.length; i++) {
                            grades[i] = gradeAndClass[i].grade;
                            banji[i] = gradeAndClass[i].className
                        }
                        for (var k = 0; k < grades.length; k++) {
                            if (_this.gradeList.indexOf(grades[k]) == -1) {
                                _this.gradeList.push(grades[k])
                            }
                        }
                        ;
                        for (var j = 0; j < banji.length; j++) {
                            if (_this.classList.indexOf(banji[j]) == -1) {
                                _this.classList.push(banji[j])
                            }
                        }


                    } else {
                        showMessage(_this, "获取数据失败")
                    }
                    _this.loadingUI = false;
                }).catch((error => {
                    showMessage(_this, error)
                    _this.loadingUI = false;
                }))
            },
            getBusStationList() {
                getServerBusStationList({}).then(res => {
                    if (res.data.code == 200) {
                        _this.busStationList = res.data.data.list;
                    } else {
                        showMessage(_this, "获取站点数据失败！");
                    }
                }).catch((error => {
                    showMessage(_this, error);
                }))
            }
        },
        computed: {},

        filters: {},

        created: function () {
            _this.getBusList();
            _this.getBusStationList();
            _this.getBanjiList();
            console.log(JSON.stringify(_this.gradeList))

        },
        mounted: function () {
            _this.search();

        },
        /*watch: {
            'condition.gradeName': {
                handler: function () {
                    if (_this.condition.gradeName!=""&&_this.condition.gradeName!=null){
                        _this.getClassName();
                    } else{
                        _this.classList=[]
                        _this.getBanjiList();
                    }

                }

            }
        }*/
    }
</script>
<style>
    .el-select {
        width: 100%;
    }

    .el-button {
        color: white;
    }

    .speacial-button {
        color: #bfcbd9;
    }
</style>
