<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px" >
        <!--<el-row >-->
            <!--<el-col :span="2">-->
                <!--<div style="margin: 10px;">-->
                    <!--<span style="font-weight: 600;color:#5D5D5D;font-size: 15px">站点列表</span >-->
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
            <el-row>
                <el-col :span="2" style="text-align: center;margin-top: 10px">
                    <div>
                        <el-button
                                icon="el-icon-plus"
                                size="normal"
                                type="primary"
                                @click="onAdd" >站点
                        </el-button >
                    </div >
                </el-col>
                <!--<el-col :span="1" style="text-align: center;margin-top: 10px">-->
                    <!--<el-button-->
                            <!--icon="el-icon-delete"-->
                            <!--type="danger"-->
                            <!--@click="onDeleteMore">-->
                    <!--</el-button >-->
                <!--</el-col >-->
                <el-col :span="22">
                    <div style="text-align: left" >
                        <el-row style="margin-top: 10px;margin-bottom: 20px">
                            <el-col :span="4" :offset="18" >
                                <el-input v-model="queryKey"
                                          placeholder="输入站点查询" clearable
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
                    style="width: 100%;" >
                <el-table-column
                        width="75"
                        align="center"
                        label="序号">
                    <template scope="scope">
                        {{scope.$index+startRow}}
                    </template>
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="stationName"
                        sortable
                        label="站点" >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="gpsInfo"
                        sortable
                        width="250"
                        label="GPS" >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="fareRate"
                        width="200"
                        label="费用" >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="remark"
                        width="200"
                        label="Remark" >
                </el-table-column >

                <el-table-column
                        align="center"
                        width="200"
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
        </el-row >
        <el-dialog title="增加站点" :visible.sync="addDialogVisible"
                   append-to-body width="40%" >
            <el-form :model="form" style="margin-left: 20px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="站点名：" :label-width="formLabelWidth">
                            <el-input v-model="form.stationName" clearable></el-input>
                        </el-form-item>
                    </el-col >
                    <el-col :span="10" :offset="1">
                        <el-form-item label="GPS：" :label-width="formLabelWidth">
                            <el-input v-model="form.gpsInfo" clearable></el-input>
                        </el-form-item>
                    </el-col >
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="费用：" :label-width="formLabelWidth">
                            <el-input v-model="form.fareRate" clearable></el-input>
                        </el-form-item>
                    </el-col >
                    <el-col :span="10" :offset="1">
                        <el-form-item label="Remark：" :label-width="formLabelWidth">
                            <el-input v-model="form.remark" clearable></el-input>
                        </el-form-item>
                    </el-col >
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer" >
              <el-button class="speacial-button" @click="addDialogVisible = false"
                         icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmAdd" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
        <el-dialog title="编辑站点" :visible.sync="modifyDialogVisible"
                   append-to-body width="40%" >
            <el-form :model="modifyForm" style="margin-left: 20px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="站点名：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.stationName" clearable></el-input>
                        </el-form-item>
                    </el-col >
                    <el-col :span="10" :offset="1">
                        <el-form-item label="GPS：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.gpsInfo" clearable></el-input>
                        </el-form-item>
                    </el-col >
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="费用：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.fareRate" clearable></el-input>
                        </el-form-item>
                    </el-col >
                    <el-col :span="10" :offset="1">
                        <el-form-item label="Remark：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.remark" clearable></el-input>
                        </el-form-item>
                    </el-col >
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer" >
              <el-button class="speacial-button" @click="modifyDialogVisible = false"
                         icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onUpdateConfirm" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
        <el-dialog title="提示" :visible.sync="deleteConfirmDialog"
                   append-to-body width="30%" >
            <span >确认删除站点【{{deleteItem.stationName}}】吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button class="speacial-button" @click="deleteConfirmDialog = false"
                         icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onDeleteConfirm" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template>

<script>
    var _this;
    import request from '../../api/request'
    export default {
        name: "SiteLib",
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
                multipleSelection: [],
                regionData: {
                    selectId: "0",
                    selectName: '',
                    subList: RegionList,
                },
                deleteConfirmDialog: false,
                addDialogVisible: false,
                modifyDialogVisible: false,
                selectedItem: {},
                formLabelWidth: '100px',
                form: {
                    stationName:"",
                    gpsInfo:"",
                    fareRate:"",
                    remark:""
                },
                modifyForm: {

                },
                deleteItem:{}
            }
        },
        methods: {
            onUpdate(item) {
                this.modifyDialogVisible = true;
                this.modifyForm = item;
            },
            onUpdateConfirm() {
                let tmp = copyObjectByJSON(this.modifyForm);
                let params = new URLSearchParams();
                params.append("busStation", JSON.stringify(tmp));
                request({
                    url: 'bus/stations/update',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.modifyDialogVisible = false;
                        showMessage(_this,"编辑站点成功！",1);
                        _this.search();
                    }
                    else {
                        showMessage(_this,"编辑站点失败！");
                    }

                }).catch(error => {
                    showMessage(_this, error)
                })

            },

            onDelete(item) {
                _this.deleteItem = item;
                _this.deleteConfirmDialog = true;
            },
            onDeleteConfirm() {
                let tmp = copyObjectByJSON(this.deleteItem);
                tmp.valid = 0;
                let params = new URLSearchParams();
                params.append("busStation", JSON.stringify(tmp));
                request({
                    url: 'bus/stations/update',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.deleteConfirmDialog = false;
                        showMessage(_this,"删除站点成功！",1);
                        _this.search();
                    }
                    else {
                        showMessage(_this,"删除站点失败！");
                    }

                }).catch(error => {
                    showMessage(_this, error)
                })
            },
            onAdd() {
                this.addDialogVisible = true;

            },
            onConfirmAdd() {
                if(this.form.stationName == null || this.form.stationName ===  "") {
                    showMessage(_this,"站点名不能为空！");
                } else {
                    let station = copyObjectByJSON(this.form);
                    let params = new URLSearchParams();
                    params.append("busStation", JSON.stringify(station));
                    request({
                        url: 'bus/stations/add',
                        method: 'post',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.addDialogVisible = false;
                            showMessage(_this,"增加站点成功！",1);
                            _this.search();
                        }
                        else {
                            showMessage(_this,"增加站点失败！");
                        }

                    }).catch(error => {
                        showMessage(_this, error)
                    })
                }
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
                    queryKey:_this.queryKey
                }
                let params = new URLSearchParams();
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: '/bus/stations/search',
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
                    _this.loadingUI = false;
                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })

            },

        },
        computed: {

        },

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
