<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div style="width: 100%;height: 100%;padding: 24px" >
        <!--<el-row >-->
            <!--<el-col :span="2">-->
                <!--<div style="margin: 10px;">-->
                    <!--<span style="font-weight: 600;color:#5D5D5D;font-size: 15px">校车列表</span >-->
                <!--</div>-->
            <!--</el-col >-->
            <!--<el-col :span="2" :offset="18" >-->
                <!--<el-button-->
		                <!--icon="el-icon-download"-->
		                <!--size="normal"-->
		                <!--type="primary"-->
		                <!--style="text-align: right;color: white;"-->
		                <!--@click="onImport" >导入-->
                <!--</el-button >-->
            <!--</el-col >-->
            <!--<el-col :span="1" style="margin-left: 20px">-->
                <!--<el-button-->
		                <!--icon="el-icon-upload2"-->
		                <!--size="normal"-->
		                <!--type="primary"-->
		                <!--style="text-align: right"-->
		                <!--@click="onExport" >导出-->
                <!--</el-button >-->
            <!--</el-col >-->
        <!--</el-row >-->
        <el-row class="well" style="background-color: white;margin-top: 20px;">
            <el-col :span="3" style="text-align: center;margin-top: 10px">
                <div>
                    <el-button
                            icon="el-icon-plus"
                            size="normal"
                            type="primary"
                            @click="onAdd" >校车
                    </el-button >
                </div >
                <div style="margin-top: 20px">
                    <el-menu
                            style="background-color: transparent;min-height: 480px;text-align: center;border-right: transparent"
                            :default-active="regionData.selectId" @select="handleSelect" >
                        <el-menu-item v-for="item in regionData.subList" :index="item.id"
                                      style="text-align: center;font-size: 15px; font-weight: bold" >
                            {{item.name}}
                        </el-menu-item >
                    </el-menu >
                </div >
            </el-col>
            <el-col :span="21">
                <div style="text-align: left" >
                    <el-row style="margin-top: 10px;margin-bottom: 20px">
                        <el-col :span="6" :offset="16" >
                            <el-input v-model="queryKey"
                                      placeholder="输入校车或busmom查询" clearable
                                      auto-complete="off" ></el-input >
                        </el-col >
                        <el-col :span="1" style="margin-left: 10px" >
                            <el-button
                                    type="primary"
                                    icon="el-icon-search"
                                    @click="search" >搜索
                            </el-button >
                        </el-col >
                    </el-row >
                </div >
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        @selection-change="handleSelectionChange"

                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%;" >
                    <el-table-column
                            width="75"
                            align="center"
                            type="selection" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="number"
                            label="校车" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="plateNumber"
                            label="车牌" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="busRangeName"
                            label="上学/放学区间" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.busLineName}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="busDriverName"
                            label="司机" >
                    </el-table-column >
                    <el-table-column label="BusMom"
                                     align="center"
                                     prop="busMomName" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.busMomName}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            label="操作" >
                        <template scope="scope" >
                            <el-button
                                    size="mini"
                                    type="primary"
                                    icon="el-icon-edit"
                                    @click="onUpdate(scope.row)" >
                            </el-button >
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="onDelete(scope.row)" >
                            </el-button >
                        </template >
                    </el-table-column >
                </el-table >
                <div class="block" style="text-align: center; margin-top: 20px" >
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="totalRecords" >
                    </el-pagination >
                </div >
            </el-col>
        </el-row >
        <el-dialog :visible.sync="addDialogVisible" width="50%" title="基本信息">
            <el-form :model="form" style="margin-left: 50px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所属校区：">
                            <el-select v-model="form.schoolPartition" clearable>
                                <el-option
                                        v-for="item in regionList"
                                        v-bind:value="item.name"
                                        v-bind:label="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="height: 1px;width: 95%;background-color: whitesmoke;margin-top: 10px;margin-bottom: 10px"></div>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="校车编号：">
                            <el-input v-model="form.number" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="车牌信息：">
                            <el-input v-model="form.plateNumber" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="校车供应商：">
                            <el-input v-model="form.busSupplier" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="height: 1px;width: 95%;background-color: whitesmoke;margin-top: 10px;margin-bottom: 10px"></div>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="校车司机：">
                            <el-select v-model="form.busDriver" clearable filterable>
                                <el-option
                                        v-for="item in driverList"
                                        v-bind:value="item.id"
                                        v-bind:label="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="Bus妈妈：">
                            <el-select v-model="form.busMom" clearable filterable>
                                <el-option
                                        v-for="item in busMomList"
                                        v-bind:value="item.id"
                                        v-bind:label="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--<el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"-->
                      <!--:title="errorMsg"-->
                      <!--type="error"-->
                      <!--:closable="false"-->
                      <!--show-icon>-->
            <!--</el-alert>-->
            <el-row style="margin-bottom: 20px;margin-right: 20px">
                <el-col :span="4" :offset="17">
                    <el-button @click="addDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                </el-col>
                <el-col :span="2" style="margin-left: 10px">
                    <el-button type="primary" @click="onConfirmAdd" icon="el-icon-check">提交</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog :visible.sync="modifyDialogVisible" width="65%">
            <el-row>
                <el-col :span="4">
                    <el-menu :default-active="activeIndex" style="min-height: 400px" @select="handleBusSelect">
                        <el-menu-item index="1">
                            <i class="el-icon-document"></i>
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">区间信息</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-service"></i>
                            <span slot="title">学生列表</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>

                <el-col :span="19" :offset="1">
                    <div v-show="activeIndex == '1'">
                        <h4>基本信息</h4>
                        <el-form :model="modifyForm">
                            <el-row style="margin-top: 20px">
                                <el-col :span="7">
                                    <el-form-item label="所属校区：">
                                        <el-select v-model="modifyForm.schoolPartition" clearable>
                                            <el-option
                                                    v-for="item in regionList"
                                                    v-bind:value="item.name"
                                                    v-bind:label="item.name">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div style="height: 1px;width: 95%;background-color: whitesmoke;margin-top: 10px;margin-bottom: 10px"></div>
                            <el-row>
                                <el-col :span="7">
                                    <el-form-item label="校车编号：">
                                        <el-input v-model="modifyForm.number" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="车牌信息：">
                                        <el-input v-model="modifyForm.plateNumber" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div style="height: 1px;width: 95%;background-color: whitesmoke;margin-top: 10px;margin-bottom: 10px"></div>
                            <el-row>
                                <el-col :span="7">
                                    <el-form-item label="校车司机：">
                                        <el-select v-model="modifyForm.busDriver" clearable filterable>
                                            <el-option
                                                    v-for="item in driverList"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.name">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="Bus妈妈：">
                                        <el-select v-model="modifyForm.busMom" clearable filterable>
                                            <el-option
                                                    v-for="item in busMomList"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.name">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <!--<el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"-->
                                  <!--:title="errorMsg"-->
                                  <!--type="error"-->
                                  <!--:closable="false"-->
                                  <!--show-icon>-->
                        <!--</el-alert>-->
                        <el-row style="margin-bottom: 20px;margin-right: 40px">
                            <el-col :span="2" :offset="18">
                                <el-button @click="modifyDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                            </el-col>
                            <el-col :span="2" :offset="2">
                                <el-button type="primary" @click="onConfirmEdit" icon="el-icon-check">保 存</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-show="activeIndex == '2'">
                        <el-tabs type="border-card">
                            <el-tab-pane label="上学站点">
                                <el-table
                                    :data="morningLineStations"
                                    border
                                    highlight-current-row
                                    empty-text="暂无数据..."
                                    style="width: 100%;" >
                                    <el-table-column
                                            width="75"
                                            align="center"
                                            label="序号" >
                                        <template scope="scope">
                                            {{scope.$index+1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            prop="station"
                                            sortable
                                            label="站点名">

                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="放学站点">
                                <el-table
                                        :data="afternoonLineStations"
                                        border
                                        highlight-current-row
                                        empty-text="暂无数据..."
                                        style="width: 100%;" >
                                    <el-table-column
                                            width="75"
                                            align="center"
                                            label="序号" >
                                        <template scope="scope">
                                            {{scope.$index+1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            prop="station"
                                            sortable
                                            label="站点名">

                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div v-show="activeIndex == '3'">
                        <el-table
                                :data="students"
                                border
                                highlight-current-row
                                empty-text="暂无数据..."
                                style="width: 100%;"
                                max-height="600" >
                            <!--<el-table-column-->
                            <!--width="75"-->
                            <!--align="center"-->
                            <!--label="序号" >-->
                            <!--<template scope="scope">-->
                            <!--{{scope.$index+1}}-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    align="center"
                                    prop="studentNumber"
                                    width="150"
                                    sortable
                                    label="学号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    width="100"
                                    label="姓名">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="banjiName"
                                    width="80"
                                    label="班级">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="busNumber"
                                    width="60"
                                    label="校车">

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="boardStationMorningName"
                                    label="站点">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteConfirmDialog"
                   append-to-body width="30%" >
            <span >确认删除校车【{{selectedItem.number}}】吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button class="speacial-button" @click="deleteConfirmDialog = false"
                         icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template >

<script >
    var _this;
    import request from '../../api/request'

    export default {
	    name: "BusManage",
	    components: {},
	    data() {
		    _this = this;
		    return {
			    queryKey: '',
			    pageSize: EveryPageNum,//每一页的num
			    currentPage: 1,
			    startRow: 0,
			    totalRecords: 0,
			    loadingUI: false,
			    tableData: [],
			    multipleSelection: [],
                regionList:RegionList,
			    regionData: {
				    selectId: "0",
				    selectName: '浦西校区',
				    subList: RegionList,
			    },
                form: {
			        id:"",
                    schoolPartition:"",
                    number:"",
                    plateName:"",
                    busSupplier:"",
                    busMom:"",
                    busDriver:""
                },
                modifyForm: {
                },
                driverList:[],
                busMomList:[],
                activeIndex:'1',
                addDialogVisible: false,
			    deleteConfirmDialog: false,
                modifyDialogVisible: false,
			    selectedItem: {},
                morningLineStations:[],
                afternoonLineStations:[],
                students:[]
		    }
	    },
	    methods: {
            handleBusSelect(val) {
                _this.activeIndex = val;
                if(val == '2') {
                    _this.fetchBusStations();
                } else if(val === '3') {
                    _this.fetchStudentsByBusNumber();
                }
            },
		    handleSelectionChange(val) {
			    _this.multipleSelection = val;
		    },
		    handleCurrentChange(val) {
			    _this.currentPage = val;
			    _this.search();
		    },
		    onExport() {

		    },
		    onImport() {

		    },
		    onAdd() {
                this.addDialogVisible = true;

		    },
            onConfirmAdd() {
                let params = new URLSearchParams();
                params.append("busBaseInfo",JSON.stringify(_this.form));
                request({
                    url: '/bus/base/info/add',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        showMessage(_this,"新增校车基本信息成功！", 1);
                        _this.addDialogVisible = false;
                        _this.search();
                    } else {
                        showMessage(_this,"新增校车基本信息失败！");
                    }
                }).catch(error => {
                    console.log(error);
                })

            },
		    // onDeleteMore() {
			 //    // _this.multipleSelection
			 //    if (!_this.multipleSelection || _this.multipleSelection.length == 0) {
				//     showMessage(_this, "请选择要删除的数据！");
				//     return;
			 //    }
		    // },
		    onUpdate(row) {
			    _this.modifyForm = copyObjectByJSON(row);
			    _this.modifyDialogVisible = true;
                _this.activeIndex = '1'
		    },
            onConfirmEdit() {
                let params = new URLSearchParams();
                params.append("busBaseInfo",JSON.stringify(_this.modifyForm));
                request({
                    url: '/bus/base/info/update',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        showMessage(_this,"更新校车基本信息成功！", 1);
                        _this.search();
                    } else {
                        showMessage(_this,"更新校车基本信息失败！");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
		    onDelete(row) {
			    _this.selectedItem = row;
			    _this.deleteConfirmDialog = true;
		    },
		    onConfirmDelete() {
                let deleteItem = copyObjectByJSON(_this.selectedItem);
                deleteItem.valid = 0;
			    let params = new URLSearchParams();
			    params.append('busBaseInfo', JSON.stringify(deleteItem));
			    request({
				    url: `/bus/base/info/delete`,
				    method: 'post',
				    data: params
			    }).then(res => {
                    if (res.data.code == 200) {
                        showMessage(_this, "删除成功！",1);
                        let index = _this.tableData.indexOf(_this.selectedItem);
                        _this.tableData.splice(index, 1);
                        _this.selectedItem = {}
                    }
                    else {
                        //showMessage(_this,"获取数据失败！");
                    }
                    _this.deleteConfirmDialog = false;
			    }).catch(error => {
				    showMessage(_this, "删除失败！")
			    })
		    },
		    search() {
			    _this.loadingUI = true;
			    let params = new URLSearchParams();
			    let condition = {
				    "keyWord": _this.queryKey,
				    page: _this.currentPage,
				    size: _this.pageSize,
				    schoolPartition: _this.regionData.selectName,
                    busDriverAccount:_this.queryKey
			    }
			    if (condition) {
				    let keys = Object.keys(condition);
				    for (let key of keys) {
					    params.append(key, condition[key]);
				    }
			    }
			    request({
				    url: `/bus/base/info/getBusBaseInfo`,
				    method: 'post',
				    data: params
			    }).then(res => {
				    if (res.data.code == 200) {
					    _this.tableData = res.data.data.list;
					    _this.totalRecords = res.data.data.total;
					    _this.startRow = res.data.data.startRow;
				    }
				    else {
					    //showMessage(_this,"获取数据失败！");
				    }
				    _this.multipleSelection = [];
				    _this.selectedItem = {};
				    _this.loadingUI = false;

			    }).catch(error => {
				    showMessage(_this, error)
				    _this.loadingUI = false;
			    })
		    },
            fetchBusDriver() {
                let params = new URLSearchParams();
                params.append("roleId",5);
                request({
                    url: '/user/selectUsers',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.driverList = res.data.data.list;
                    } else {
                        showMessage(_this,"获取校车司机数据失败！");
                    }
                }).catch(error => {
                    console.log(error)

                })
            },
            fetchBusMom() {
                let params = new URLSearchParams();
                params.append("roleId",3);
                request({
                    url: '/user/selectUsers',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.busMomList = res.data.data.list;
                    } else {
                        showMessage(_this,"获取Bus妈妈数据失败！");
                    }
                }).catch(error => {
                    console.log(error)

                })
            },
            fetchBusStations() {
                _this.morningLineStations = [];
                _this.afternoonLineStations = [];
                let params = new URLSearchParams();
                params.append("busNumber",_this.modifyForm.number);
                request({
                    url: '/bus/line/getBusLineByBusNumber',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        let lineLists = res.data.data.list;
                        for (let i = 0; i < lineLists.length; i++) {
                            if(lineLists[i].stations != "") {
                                if(lineLists[i].mode === "上学") {
                                    let stations = lineLists[i].stations.split(",");
                                    for (let j = 0; j < stations.length; j++) {
                                        _this.morningLineStations.push({"station":stations[j]});

                                    }
                                }
                                if(lineLists[i].mode === "放学") {
                                    let stations = lineLists[i].stations.split(",");
                                    for (let j = 0; j < stations.length; j++) {
                                        _this.afternoonLineStations.push({"station":stations[j]});
                                    }
                                }
                            }
                        }
                    } else {
                        showMessage(_this,"获取线路站点数据失败！");
                    }
                }).catch(error => {
                    console.log(error)

                })
            },
            fetchStudentsByBusNumber() {
                let params = new URLSearchParams();
                params.append("busNumber",_this.modifyForm.number);
                request({
                    url: '/student/getPlannedStudents',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.students = res.data.data.list;
                    } else {
                        showMessage(_this,"获取学生数据失败！");
                    }
                }).catch(error => {
                    console.log(error)

                })
            },

		    //左侧区域
		    handleSelect(key) {
			    if (_this.regionData.selectId == key) {
				    return;
			    }
			    _this.regionData.selectId = key;
			    for (let i = 0; i < _this.regionData.subList.length; i++) {
				    if (_this.regionData.subList[i].id == key) {
					    _this.regionData.selectName = _this.regionData.subList[i].name
					    break;
				    }
			    }
			    _this.search();//refresh
		    },
	    },
	    computed: {},

	    filters: {},

	    created: function () {


	    },
	    mounted: function () {
		    _this.search();
		    _this.fetchBusMom();
		    _this.fetchBusDriver();
	    }
    }
</script >
<style >
    .el-button {
	    color: #ffffff;
    }

    .speacial-button {
	    color: #bfcbd9;
    }

    /*tr {*/
    /*border: #bfcbd9 1px solid;*/
    /*text-align: center*/
    /*}*/

    td {
	    border: #bfcbd9 1px solid;
	    text-align: center
    }
</style >
