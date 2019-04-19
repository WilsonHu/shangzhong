<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width:100%;height: 100%; padding: 24px">
        <el-col class="well well-lg" style="background-color: white;">
            <div align="right" style="margin-bottom: 20px">
                <el-button
                        icon="el-icon-plus"
                        size="normal"
                        type="primary"
                        @click="handleAdd">角色
                </el-button>
            </div>

            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        width="75"
                        align="center"
                        prop="id"
                        label="序号">
                    <template scope="scope">
                        {{scope.$index+startRow}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="roleName"
                        label="角色名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="roleDes"
                        label="角色描述">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="200">
                    <template scope="scope">
                        <el-button
                                size="small"
                                type="primary"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="small"
                                icon="el-icon-delete"
                                type="danger"
                                :disabled="scope.row.roleName=='超级管理员'"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
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
                        :total="totalPage">
                </el-pagination>
            </div>
        </el-col>
        <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="70%">
            <el-form :model="form">
                <el-col :span="24">
                    <el-form-item label="角色名称：" :label-width="formLabelWidth" style="width: 35%">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="角色描述：" :label-width="formLabelWidth" style="width: 60%">
                        <el-input type="textarea" v-model="form.roleDes" :rows="3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="text-align: left;margin-left: 20px;margin-bottom:10px; font-weight: bold">
                    权限分配:
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <el-row style="background-color: #F9FAFC; border-radius: 5px;">
                            <el-col :span="3"  :offset="1">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="dataAllChecked"
                                                     @change="handleDataCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">数据管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in dataRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedDataChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="busAllChecked"
                                                     @change="handleBusCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">校车管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in busRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedBusChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="studentAllChecked"
                                                     @change="handleStudentCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">学生管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in studentRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedStudentChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="systemAllChecked"
                                                     @change="handleSystemCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">系统管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in systemRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedSystemChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      show-icon>
            </el-alert>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                <el-button type="primary" @click="addRole" icon="el-icon-check">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑角色" :visible.sync="modifyDialogVisible" width="70%">
            <el-form :model="modifyForm">
                <el-col :span="24">
                    <el-form-item label="角色名称：" :label-width="formLabelWidth" style="width: 35%">
                        <el-input v-model="modifyForm.roleName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="角色描述：" :label-width="formLabelWidth" style="width: 60%">
                        <el-input type="textarea" v-model="modifyForm.roleDes" :rows="3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="text-align: left;margin-left: 20px;margin-bottom:10px; font-weight: bold">
                    权限分配:
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <el-row style="background-color: #F9FAFC; border-radius: 5px;">
                            <el-col :span="3" :offset="1">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="dataAllChecked"
                                                     @change="handleDataCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">数据管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in dataRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedDataChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="busAllChecked"
                                                     @change="handleBusCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">校车管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in busRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedBusChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="studentAllChecked"
                                                     @change="handleStudentCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">学生管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in studentRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedStudentChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div style="margin-top: 20px">
                                    <div>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="systemAllChecked"
                                                     @change="handleSystemCheckAllChange"></el-checkbox>
                                        <div style="font-weight: bold;  margin-bottom: 20px; display: inline">系统管理</div>
                                    </div>
                                    <ul>
                                        <li v-for=" item in systemRoleList" style="list-style: none;">
                                            <el-checkbox style="font-weight: normal"
                                                         v-model="item.checked"
                                                         @change="handleCheckedSystemChange">{{item.name}}
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      show-icon>
            </el-alert>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                <el-button type="primary" @click="modifyRole" icon="el-icon-check">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteConfirmVisible" width="30%">
            <span>确认要删除[ <b>{{selectedItem.roleName}}</b> ]的角色吗？</span>
            <span slot="footer" class="dialog-footer">
		    <el-button type="danger" @click="deleteConfirmVisible = false" icon="el-icon-close">取 消</el-button>
		    <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check">确 定</el-button>
		  </span>
        </el-dialog>
    </div>
</template>

<script>
    import routes from '../../config/routes'
    import request from '../../api/request'
    let _this;
    export default {
        name: "role_manage",
        components: {},
        data () {
            _this = this;
            return {
                tableData: [],

                isError: false,
                errorMsg: '',
                //分页
                totalPage: 1,
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 1,

                //增加对话框
                addDialogVisible: false,
                form: {
                    roleName: "",
                    roleDes: "",
                    valid: "1",
                    roleScope: ""
                },
                goAddNotOK: true,
                formLabelWidth: '100px',

                //编辑对话框
                modifyDialogVisible: false,
                modifyForm: {
                    id: "",
                    roleName: "",
                    roleDes: "",
                    valid: "",
                    roleScope: ""
                },
                selectedItem: {},
                deleteConfirmVisible: false,

                //存放权限列表
                dataRoleList: [],
                busRoleList: [],
                studentRoleList: [],
                systemRoleList: [],
                dataAllChecked: false,//全选的checkbox是否checked
                busAllChecked: false,
                studentAllChecked: false,
                systemAllChecked: false
            }
        },
        methods: {
            //获取所有role
            fetchRoles(){
                let params = new URLSearchParams();
                let condition = {
                    page: _this.currentPage,
                    size: _this.pageSize,
                }
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: "/role/list",
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

            handleCurrentChange(val) {
                this.currentPage = val;
                _this.fetchRoles();
            },
            handleAdd() {
                this.resetStatus()
                this.addDialogVisible = true;
            },

            addRole() {
                this.form.roleScope = this.prepareRoleScopeJson();
                let params = new URLSearchParams();
                let condition = {
                    role: JSON.stringify(_this.form)
                };
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: "/role/add",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.addDialogVisible = false;
                        _this.fetchRoles();
                        showMessage(_this, '添加角色成功', 1);
                    } else {
                        _this.isError = true;
                        this.errorMsg = res.data.message;
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })

            },

            handleEdit(item) {
                this.resetStatus();
                this.modifyForm.id = item.id;
                this.modifyForm.roleName = item.roleName;
                this.modifyForm.roleDes = item.roleDes;
                this.modifyForm.valid = item.valid;
                //解析scope
                this.prepareScopeJsonToObject(item.roleScope);
                _this.modifyDialogVisible = true;
            },

            modifyRole() {
                this.modifyForm.roleScope = this.prepareRoleScopeJson();
                let params = new URLSearchParams();
                let condition = {
                    role: JSON.stringify(_this.modifyForm)
                };
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: "/role/update",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.modifyDialogVisible = false;
                        _this.fetchRoles();
                        showMessage(_this, '修改角色成功', 1);
                    } else {
                        _this.isError = true;
                        this.errorMsg = res.data.message;
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },
            resetStatus() {
                this.isError = false;
                this.errorMsg = false;

                let i;
                for (i = 0; i < _this.dataRoleList.length; i++) {
                    _this.dataRoleList[i].checked = false;
                }
                for (i = 0; i < _this.busRoleList.length; i++) {
                    _this.busRoleList[i].checked = false;
                }
                for (i = 0; i < _this.studentRoleList.length; i++) {
                    _this.studentRoleList[i].checked = false;
                }
                for (i = 0; i < _this.systemRoleList.length; i++) {
                    _this.systemRoleList[i].checked = false;
                }

                this.dataAllChecked = false;//全选的checkbox是否checked
                this.busAllChecked = false;//全选的checkbox是否checked
                this.studentAllChecked = false;//全选的checkbox是否checked
                this.systemAllChecked = false
            },

            handleDelete(item) {
                _this.selectedItem = copyObject(item);
                _this.deleteConfirmVisible = true;
            },
            onConfirmDelete()
            {
                this.deleteData(_this.selectedItem);
                _this.deleteConfirmVisible = false;
            },

            deleteData(item) {
                let params = new URLSearchParams();
                let condition = {
                    id: item.id
                };
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: "/role/delete",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.modifyDialogVisible = false;
                        _this.fetchRoles();
                        showMessage(_this, '删除角色成功', 1);
                    } else {
                        _this.isError = true;
                        this.errorMsg = res.data.message;
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error);
                    _this.loadingUI = false;

                })
            },

            handleCheckedDataChange() {
                if (this.dataCheckedNum === this.dataRoleList.length) {
                    this.dataAllChecked = true;
                } else {
                    this.dataAllChecked = false;
                }
            },

            handleDataCheckAllChange(){
                if (this.dataAllChecked) {
                    for (let i = 0; i < _this.dataRoleList.length; i++) {
                        _this.dataRoleList[i].checked = true;
                    }
                } else {
                    for (let i = 0; i < _this.dataRoleList.length; i++) {
                        this.dataRoleList[i].checked = false;
                    }
                }
            },

            handleBusCheckAllChange(){
                if (this.busAllChecked) {
                    for (let i = 0; i < this.busRoleList.length; i++) {
                        this.busRoleList[i].checked = true;
                    }
                } else {
                    for (let i = 0; i < this.busRoleList.length; i++) {
                        this.busRoleList[i].checked = false;
                    }
                }
            },
            handleCheckedBusChange() {
                if (this.busCheckedNum === this.busRoleList.length) {
                    this.busAllChecked = true;
                } else {
                    this.busAllChecked = false;
                }
            },

            handleStudentCheckAllChange(){
                if (this.studentAllChecked) {
                    for (let i = 0; i < this.studentRoleList.length; i++) {
                        this.studentRoleList[i].checked = true;
                    }
                } else {
                    for (let i = 0; i < this.studentRoleList.length; i++) {
                        this.studentRoleList[i].checked = false;
                    }
                }
            },
            handleCheckedStudentChange() {
                if (this.studentCheckedNum === this.studentRoleList.length) {
                    this.studentAllChecked = true;
                } else {
                    this.studentAllChecked = false;
                }
            },


            handleSystemCheckAllChange() {
                if (this.systemAllChecked) {
                    for (let i = 0; i < this.systemRoleList.length; i++) {
                        this.systemRoleList[i].checked = true;
                    }
                } else {
                    for (let i = 0; i < this.systemRoleList.length; i++) {
                        this.systemRoleList[i].checked = false;
                    }
                }
            },
            handleCheckedSystemChange() {
                if (this.systemCheckedNum === this.systemRoleList.length) {
                    this.systemAllChecked = true;
                } else {
                    this.systemAllChecked = false;
                }
            },
            prepareRoleScopeJson() {
                let result = "";
                let dataArr = [];
                let busArr = [];
                let studentArr = [];
                let systemArr = [];
                for (let i = 0; i < this.dataRoleList.length; i++) {
                    if (this.dataRoleList[i].checked) {
                        dataArr.push(this.dataRoleList[i].path)
                    }
                }
                for (let i = 0; i < this.busRoleList.length; i++) {
                    if (this.busRoleList[i].checked) {
                        busArr.push(this.busRoleList[i].path)
                    }
                }
                for (let i = 0; i < this.studentRoleList.length; i++) {
                    if (this.studentRoleList[i].checked) {
                        studentArr.push(this.studentRoleList[i].path)
                    }
                }
                for (let i = 0; i < this.systemRoleList.length; i++) {
                    if (this.systemRoleList[i].checked) {
                        systemArr.push(this.systemRoleList[i].path)
                    }
                }
                result = JSON.stringify({
                    "datamanage": _this.dataAllChecked || dataArr.length > 0 ? dataArr : null,
                    "schoolbus": _this.busAllChecked || busArr.length > 0 ? busArr : null,
                    "student": _this.studentAllChecked || studentArr.length > 0? studentArr : null,
                    "system": _this.systemAllChecked || systemArr.length > 0 ? systemArr : null
                })
                return result
            },

            prepareScopeJsonToObject(scopeStr) {
                if (scopeStr == null || scopeStr == "") return;
                let all;
                try {
                    all = JSON.parse(scopeStr);
                } catch (e) {
                    return;
                }
                let count = 0;
                if (all.datamanage != null) {
                    for (let i = 0; i < this.dataRoleList.length; i++) {
                        for (let j = 0; j < all.datamanage.length; j++) {
                            if (this.dataRoleList[i].path == all.datamanage[j]) {
                                this.dataRoleList[i].checked = true;
                                count++
                            }
                        }
                    }
                    if (count == this.dataRoleList.length) {
                        this.dataAllChecked = true
                    }
                }

                count = 0;
                if (all.schoolbus != null) {
                    for (let i = 0; i < this.busRoleList.length; i++) {
                        for (let j = 0; j < all.schoolbus.length; j++) {
                            if (this.busRoleList[i].path == all.schoolbus[j]) {
                                this.busRoleList[i].checked = true;
                                count++
                            }
                        }
                    }
                    if (count == this.busRoleList.length) {
                        this.busAllChecked = true
                    }
                }

                count = 0;
                if (all.student != null) {
                    for (let i = 0; i < this.studentRoleList.length; i++) {
                        for (let j = 0; j < all.student.length; j++) {
                            if (this.studentRoleList[i].path == all.student[j]) {
                                this.studentRoleList[i].checked = true;
                                count++
                            }
                        }
                    }
                    if (count == this.studentRoleList.length) {
                        this.studentAllChecked = true
                    }
                }

                count = 0;
                if (all.system != null) {
                    for (let i = 0; i < this.systemRoleList.length; i++) {
                        for (let j = 0; j < all.system.length; j++) {
                            if (this.systemRoleList[i].path == all.system[j]) {
                                this.systemRoleList[i].checked = true;
                                count++
                            }
                        }
                    }
                    if (count == this.systemRoleList.length) {
                        this.systemAllChecked = true
                    }
                }
            }
        },
        computed: {

            dataCheckedNum() {
                let num = 0;
                for (let i = 0; i < this.dataRoleList.length; i++) {
                    if (this.dataRoleList[i].checked) {
                        num = num + 1
                    }
                }
                return num
            },
            busCheckedNum() {
                let num = 0;
                for (let i = 0; i < this.busRoleList.length; i++) {
                    if (this.busRoleList[i].checked) {
                        num = num + 1
                    }
                }
                return num
            },
            studentCheckedNum() {
                let num = 0;
                for (let i = 0; i < this.studentRoleList.length; i++) {
                    if (this.studentRoleList[i].checked) {
                        num = num + 1
                    }
                }
                return num
            },
            systemCheckedNum() {
                let num = 0;
                for (let i = 0; i < this.systemRoleList.length; i++) {
                    if (this.systemRoleList[i].checked) {
                        num = num + 1
                    }
                }
                return num
            }
        },

        filters: {},

        created: function () {
            //读取路由信息
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].path == "/home") {
                    for (let j = 0; j < routes[i].children.length; j++) {
                        if (routes[i].children[j].children != null) {
                            switch (routes[i].children[j].path) {
                                case "/home/datamanage":
                                    for (let k = 0; k < routes[i].children[j].children.length; k++) {
                                        _this.dataRoleList.push({
                                            "path": routes[i].children[j].children[k].path,
                                            "name": routes[i].children[j].children[k].meta,
                                            "checked": 0
                                        })
                                    }
                                    break;
                                case "/home/schoolbus":
                                    for (let k = 0; k < routes[i].children[j].children.length; k++) {
                                        _this.busRoleList.push({
                                            "path": routes[i].children[j].children[k].path,
                                            "name": routes[i].children[j].children[k].meta,
                                            "checked": 0
                                        })
                                    }
                                    break;
                                case "/home/student":
                                    for (let k = 0; k < routes[i].children[j].children.length; k++) {
                                        _this.studentRoleList.push({
                                            "path": routes[i].children[j].children[k].path,
                                            "name": routes[i].children[j].children[k].meta,
                                            "checked": 0
                                        })
                                    }
                                    break;
                                case "/home/system":
                                    for (let k = 0; k < routes[i].children[j].children.length; k++) {
                                        _this.systemRoleList.push({
                                            "path": routes[i].children[j].children[k].path,
                                            "name": routes[i].children[j].children[k].meta,
                                            "checked": 0
                                        })//checked状态用于存储是否被选中的状态
                                    }
                                    break;
                            }
                        }
                    }
                }
            }

        },
        mounted: function () {
            _this.fetchRoles();
        }
    }
</script>
<style>

</style>
