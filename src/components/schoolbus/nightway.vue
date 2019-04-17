<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px" >
        <!--<el-row >-->
        <!--<el-col :span="2">-->
        <!--<div style="margin: 10px;">-->
        <!--<span style="font-weight: 600;color:#5D5D5D;font-size: 15px">线路列表</span >-->
        <!--</div>-->
        <!--</el-col >-->
        <!--</el-row >-->
        <el-row class="well" style="background-color: white;margin-top: 20px;">
            <el-row>
                <el-col :span="2" style="text-align: center;margin-top: 10px">
                    <div>
                        <el-button

                                icon="el-icon-plus"
                                size="normal"
                                type="primary"
                                @click="onAdd" >线路
                        </el-button >
                    </div>
                </el-col>
                <!--<el-col :span="1" style="text-align: center;margin-top: 10px">-->
                <!--<el-button-->
                <!--icon="el-icon-delete"-->
                <!--type="danger"-->
                <!--@click="onDeleteMore">-->
                <!--</el-button >-->
                <!--</el-col >-->
                <!--<el-col :span="22">-->
                    <!--<div style="text-align: left" >-->
                        <!--<el-row style="margin-top: 10px;margin-bottom: 20px">-->
                            <!--<el-col :span="4" :offset="18" >-->
                                <!--<el-input v-model="queryKey"-->
                                          <!--placeholder="输入关键字查询" clearable-->
                                          <!--auto-complete="off" ></el-input >-->
                            <!--</el-col >-->
                            <!--<el-col :span="1" style="margin-left: 10px" >-->
                                <!--<el-button-->
                                        <!--type="primary"-->
                                        <!--icon="el-icon-search"-->
                                        <!--@click="search" >搜索-->
                                <!--</el-button >-->
                            <!--</el-col >-->
                        <!--</el-row >-->
                    <!--</div >-->
                <!--</el-col>-->
            </el-row>
            <el-table
                    v-loading="loadingUI"
                    element-loading-text="获取数据中..."
                    :data="tableData"
                    border
                    highlight-current-row
                    empty-text="暂无数据..."
                    show-overflow-tooltip="true"
                    style="width: 100%;margin-top: 10px" >
                <el-table-column
                        width="75"
                        align="center"
                        label="序号" >
                    <template scope="scope">
                        {{scope.$index+startRow}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        sortable
                        label="线路名称" >
                </el-table-column >
                <!--<el-table-column-->
                        <!--width="100"-->
                        <!--align="center"-->
                        <!--prop="busBaseInfo"-->
                        <!--label="校车" >-->
                    <!--<template scope="scope">-->
                        <!--{{filterBusName(scope.row.busBaseInfo)}}-->
                    <!--</template>-->
                <!--</el-table-column >-->
                <!--<el-table-column-->
                        <!--width="100"-->
                        <!--align="center"-->
                        <!--prop="mode"-->
                        <!--label="早午班" >-->
                <!--</el-table-column >-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="stations"-->
                        <!--label="站点" >-->
                <!--</el-table-column >-->
                <el-table-column
                        align="center"
                        width="200"
                        label="操作" >
                    <template scope="scope" >
                        <el-tooltip placement="top" content="修改" >
                            <el-button
                                    size="mini"
                                    type="primary"
                                    icon="el-icon-edit"
                                    @click="onEdit(scope.row)" >
                            </el-button >
                        </el-tooltip >
                        <el-tooltip placement="top" content="删除" >
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="onDelete(scope.row)" >
                            </el-button >
                        </el-tooltip >
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
        </el-row >
        <el-dialog title="添加线路" :visible.sync="addConfirmDialog"
                   append-to-body width="35%" >
            <el-form :model="form">
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="线路名：" :label-width="formLabelWidth">
                            <el-input v-model="form.name" clearable></el-input>
                        </el-form-item>
                    </el-col >
                    <!--<el-col :span="8" >-->
                        <!--<el-form-item label="早/午班："  :label-width="formLabelWidth">-->
                            <!--<el-select v-model="form.mode">-->
                                <!--<el-option-->
                                        <!--v-for="item in modeList"-->
                                        <!--v-bind:value="item"-->
                                        <!--v-bind:label="item" >-->
                                <!--</el-option >-->
                            <!--</el-select >-->
                        <!--</el-form-item >-->
                    <!--</el-col >-->
                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="8" >-->
                        <!--<el-form-item label="校车："  :label-width="formLabelWidth">-->
                            <!--<el-select v-model="form.busBaseInfo" filterable>-->
                                <!--<el-option-->
                                        <!--v-for="item in busList"-->
                                        <!--v-bind:value="item.id"-->
                                        <!--v-bind:label="item.number" >-->
                                    <!--<span style="float: left">{{ item.number }}</span>-->
                                    <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.plateNumber }}</span>-->
                                <!--</el-option >-->
                            <!--</el-select >-->
                        <!--</el-form-item >-->
                    <!--</el-col >-->
                <!--</el-row>-->
                <!--<el-row>-->
                    <!--<el-col :span="2" :offset="20">-->
                        <!--<el-button-->
                                <!--type="primary"-->
                                <!--class="el-icon-plus"-->
                                <!--@click="handleAddStation">增加站点-->
                        <!--</el-button>-->
                    <!--</el-col>-->
                    <!--<el-col :span="24" style="margin-top: 20px">-->
                        <!--<el-col :span="23">-->
                            <!--<el-table-->
                                    <!--border-->
                                    <!--:data="form.stations"-->
                                    <!--style="margin-left: 30px;margin-bottom: 30px;text-align: center">-->
                                <!--<el-table-column-->
                                        <!--align="center"-->
                                        <!--label="站点名">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-select v-model="scope.row.name" filterable laceholder="请选择"style="width: 95%">-->
                                            <!--<el-option-->
                                                    <!--v-for="item in stationList"-->
                                                    <!--:key="item.id"-->
                                                    <!--:label="item.stationName"-->
                                                    <!--:value="item.stationName">-->
                                            <!--</el-option>-->
                                        <!--</el-select>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column label="操作" width="150" align="center">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-button-->
                                                <!--size="mini"-->
                                                <!--type="danger"-->
                                                <!--icon="el-icon-delete"-->
                                                <!--@click="handleDeleteStation(scope.$index)">删除</el-button>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                        <!--</el-col>-->
                    <!--</el-col>-->
                <!--</el-row>-->

            </el-form>
            <span slot="footer" class="dialog-footer" >
              <el-button @click="addConfirmDialog = false"
                         type="info" icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmAdd" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
        <el-dialog title="编辑线路" :visible.sync="editConfirmDialog"
                   append-to-body width="60%" >
            <el-form :model="editForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="线路名：" :label-width="formLabelWidth">
                            <el-input v-model="editForm.name" clearable></el-input>
                        </el-form-item>
                    </el-col >
                    <!--<el-col :span="8" >-->
                        <!--<el-form-item label="早/午班："  :label-width="formLabelWidth">-->
                            <!--<el-select v-model="editForm.mode">-->
                                <!--<el-option-->
                                        <!--v-for="item in modeList"-->
                                        <!--v-bind:value="item"-->
                                        <!--v-bind:label="item" >-->
                                <!--</el-option >-->
                            <!--</el-select >-->
                        <!--</el-form-item >-->
                    <!--</el-col >-->
                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="8" >-->
                        <!--<el-form-item label="校车："  :label-width="formLabelWidth">-->
                            <!--<el-select v-model="editForm.busBaseInfo" filterable>-->
                                <!--<el-option-->
                                        <!--v-for="item in busList"-->
                                        <!--v-bind:value="item.id"-->
                                        <!--v-bind:label="item.number" >-->
                                    <!--<span style="float: left">{{ item.number }}</span>-->
                                    <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.plateNumber }}</span>-->
                                <!--</el-option >-->
                            <!--</el-select >-->
                        <!--</el-form-item >-->
                    <!--</el-col >-->
                <!--</el-row>-->
                <!--<el-row>-->
                    <!--<el-col :span="2" :offset="20">-->
                        <!--<el-button-->
                                <!--type="primary"-->
                                <!--class="el-icon-plus"-->
                                <!--@click="handleEditAddStation">增加站点-->
                        <!--</el-button>-->
                    <!--</el-col>-->
                    <!--<el-col :span="24" style="margin-top: 20px">-->
                        <!--<el-col :span="23">-->
                            <!--<el-table-->
                                    <!--border-->
                                    <!--:data="editForm.stations"-->
                                    <!--style="margin-left: 30px;margin-bottom: 30px;text-align: center">-->
                                <!--<el-table-column-->
                                        <!--align="center"-->
                                        <!--label="站点名">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-select v-model="scope.row.name" filterable laceholder="请选择"style="width: 95%">-->
                                            <!--<el-option-->
                                                    <!--v-for="item in stationList"-->
                                                    <!--:key="item.id"-->
                                                    <!--:label="item.stationName"-->
                                                    <!--:value="item.stationName">-->
                                            <!--</el-option>-->
                                        <!--</el-select>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column label="操作" width="150" align="center">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-button-->
                                                <!--size="mini"-->
                                                <!--type="danger"-->
                                                <!--icon="el-icon-delete"-->
                                                <!--@click="handleEditDeleteStation(scope.$index)">删除</el-button>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                        <!--</el-col>-->
                    <!--</el-col>-->
                <!--</el-row>-->

            </el-form>
            <span slot="footer" class="dialog-footer" >
              <el-button @click="editConfirmDialog = false"
                         type="info" icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmEdit" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >

        <el-dialog title="提示" :visible.sync="deleteConfirmDialog"
                   append-to-body width="30%" >
            <span >确认要删除[{{currentDeleteLine.name}}]吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button type="info" @click="deleteConfirmDialog = false"
                         icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template>

<script>
    var _this;
    import request from '../../api/request'
    export default {
        name: "LineManage",
        components: {},
        data () {
            _this = this;
            return {
                queryKey: '',
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
                loadingUI: false,
                tableData: [],
                form: {
                    name:"",
                    mode:"晚班",
                    valid:1
                },
                editForm: {
                    id:"",
                    name:"",
                    mode:"晚班",
                    valid:1
                },
                deleteConfirmDialog: false,
                selectedItem: {},
                // busList:[],
                addConfirmDialog: false,
                formLabelWidth: '100px',
                // modeList:["上学","放学"],
                // stationList:[],
                currentDeleteLine:{
                    id:"",
                    name:"",
                    valid:0
                },
                editConfirmDialog: false,
            }
        },
        methods: {
            onEdit(data) {
                _this.editConfirmDialog = true;
                _this.editForm.id = data.id;
                _this.editForm.name = data.name;
                _this.editForm.mode = data.mode;
                // _this.editForm.busBaseInfo = data.busBaseInfo;
                // _this.editForm.valid = data.valid;
                // let stations = data.stations.split(",");
                // _this.editForm.stations = [];
                // for (let i = 0; i < stations.length; i++) {
                //     _this.editForm.stations.push({"name":stations[i]});
                // }
            },
            // handleEditAddStation() {
            //     _this.editForm.stations.push({"name":""});
            // },
            // handleEditDeleteStation(index) {
            //     _this.editForm.stations.splice(index,1);
            // },
            onConfirmEdit() {
                if(this.editForm.name == null || this.editForm.name ===  "") {
                    showMessage(_this,"线路名不能为空！");
                } else {
                    let busLine = copyObjectByJSON(this.editForm);
                    // let stations = "";
                    // for (let i = 0; i <busLine.stations.length ; i++) {
                    //     stations += busLine.stations[i].name;
                    //     if(i < busLine.stations.length -1) {
                    //         stations += ","
                    //     }
                    // }
                    // busLine.stations = stations;
                    let params = new URLSearchParams();
                    params.append("busLine", JSON.stringify(busLine));
                    request({
                        url: 'bus/line/update',
                        method: 'post',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.editConfirmDialog = false;
                            showMessage(_this,"编辑线路成功！",1);
                            _this.search();
                        }
                        else {
                            showMessage(_this,"编辑线路失败！");
                        }

                    }).catch(error => {
                        showMessage(_this, error)
                    })

                }
            },
            // handleDeleteStation(index) {
            //     _this.form.stations.splice(index,1);
            // },
            //
            // handleAddStation() {
            //     _this.form.stations.push({"name":""});
            // },
            onAdd() {
                _this.addConfirmDialog = true;
            },
            onConfirmAdd() {
                if(this.form.name == null || this.form.name ===  "") {
                    showMessage(_this,"线路名不能为空！");
                } else {
                    let busLine = copyObjectByJSON(this.form);
                    // let stations = "";
                    // for (let i = 0; i <busLine.stations.length ; i++) {
                    //     stations += busLine.stations[i].name;
                    //     if(i < busLine.stations.length -1) {
                    //         stations += ","
                    //     }
                    // }
                    // busLine.stations = stations;
                    let params = new URLSearchParams();
                    params.append("busLine", JSON.stringify(busLine));
                    request({
                        url: 'bus/line/add',
                        method: 'post',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.addConfirmDialog = false;
                            showMessage(_this,"增加线路成功！",1);
                            _this.search();
                        }
                        else {
                            showMessage(_this,"增加线路失败！");
                        }

                    }).catch(error => {
                        showMessage(_this, error)
                    })
                }
            },
            onDelete(data) {
                _this.currentDeleteLine.id = data.id;
                _this.currentDeleteLine.name = data.name;
                _this.deleteConfirmDialog = true;
            },
            onConfirmDelete() {
                let params = new URLSearchParams();
                params.append("busLine", JSON.stringify(_this.currentDeleteLine));
                request({
                    url: 'bus/line/update',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.deleteConfirmDialog = false;
                        showMessage(_this,"删除线路成功！",1);
                        _this.search();
                    }
                    else {
                        showMessage(_this,"删除线路失败！");
                    }

                }).catch(error => {
                    showMessage(_this, error)
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.search();
            },
            search() {
                _this.loadingUI = true;
                let condition = {
                    page: _this.currentPage,
                    size: _this.pageSize,
                    busMode:"晚班"
                };
                let params = new URLSearchParams();
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: '/bus/line/getBusLinesByMode',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.tableData = res.data.data.list;
                        _this.totalRecords = res.data.data.total;
                        _this.startRow = res.data.data.startRow;
                    }
                    else {
                        showMessage(_this,"获取数据失败！");
                    }
                    // _this.multipleSelection = [];
                    _this.loadingUI = false;


                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },
            // fetchBus() {
            //     let params = new URLSearchParams();
            //     request({
            //         url: 'bus/base/info/getBusBaseInfo',
            //         method: 'post',
            //         data: params
            //     }).then(res => {
            //         if (res.data.code == 200) {
            //             _this.busList = res.data.data.list;
            //         }
            //         else {
            //             showMessage(_this,"获取校车数据失败！");
            //         }
            //
            //     }).catch(error => {
            //         showMessage(_this, error)
            //     })
            // },
            // fetchStations() {
            //     let params = new URLSearchParams();
            //     request({
            //         url: '/bus/stations/search',
            //         method: 'post',
            //         data: params
            //     }).then(res => {
            //         if (res.data.code == 200) {
            //             _this.stationList = res.data.data.list;
            //         }
            //         else {
            //             showMessage(_this,"获取站点列表失败！");
            //         }
            //     }).catch(error => {
            //         console.log(error)
            //     })
            // },
            // filterBusName(id) {
            //     let name = "";
            //     for (let i = 0; i < _this.busList.length; i++) {
            //         if(_this.busList[i].id === id) {
            //             name = _this.busList[i].number;
            //             break;
            //         }
            //     }
            //     return name;
            // }
        },
        computed: {

        },

        filters: {},

        created: function () {


        },
        mounted: function () {
            _this.search();
            // _this.fetchBus();
            // _this.fetchStations();
        }
    }
</script>
<style>

</style>
