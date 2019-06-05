<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <el-col class="well well-lg" style="background-color: white;">
            <el-row>
                <el-col>
                    <el-form :model="filters" label-position="right" label-width="60px">
                        <el-col :span="4">
                            <el-form-item label="账号:">
                                <el-input v-model="filters.account"
                                          placeholder="账号"
                                          auto-complete="off"
                                          clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="姓名:">
                                <el-input v-model="filters.name"
                                          placeholder="姓名"
                                          auto-complete="off"
                                          clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="角色:">
                                <el-select v-model="filters.roleId" clearable>
                                    <el-option
                                            v-for="item in allRoles"
                                            v-bind:value="item.id"
                                            v-bind:label="item.roleName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form>
                    <el-col :span="3" style="margin-left: 25px">
                        <el-button
                                icon="el-icon-search"
                                size="normal"
                                type="primary"
                                @click="search">搜索
                        </el-button>
                    </el-col>

                    <el-button style="float: right;"
                               icon="el-icon-plus"
                               size="normal"
                               type="primary"
                               @click="handleAdd">用户
                    </el-button>


                    <el-table
                            v-loading="loadingUI"
                            element-loading-text="获取数据中..."
                            :data="tableData"
                            border
                            style="width: 100%;">
                        <el-table-column
                                width="75"
                                align="center"
                                label="序号">
                            <template scope="scope">
                                {{scope.$index+startRow}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="account"
                                label="账号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="姓名">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="roleId"
                                label="角色">
                            <template scope="scope">
                                {{filterRoleName(scope.row.roleId)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="valid"
                                label="在职情况">
                            <template scope="scope">
                                {{scope.row.valid == 1 ? "在职" : "离职"}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作"
                                width="200">
                            <template scope="scope">
                                <el-button
                                        size="small"
                                        icon="el-icon-edit"
                                        type="primary"
                                        @click="handleEdit(scope.$index, scope.row)">编辑
                                </el-button>
                                <el-button
                                        size="small"
                                        type="danger"
                                        icon="el-icon-delete"
                                        :disabled="scope.row.account=='admin'"
                                        @click="handleDelete(scope.$index, scope.row)">删除
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
                                :total="totalRecords">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-dialog title="增加用户" :visible.sync="addDialogVisible" width="60%">
            <el-row class="addHeadImage">
                <el-col :span="2" :offset="1">
                    <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden; margin-top: 10px" :src="modifyPhoto(form.headImage)"
                         v-show="form.headImage != '' || photoData != null"/>
                </el-col>
                <el-col :span="6">
                    <el-upload
                            action=""
                            :limit="1"
                            :multiple="false"
                            :file-list="fileList"
                            :show-file-list="true"
                            accept=".png,.jpg"
                            :on-change="handlePhotoChange"
                            :on-remove="handleRemove"
                            :on-exceed="handleExceed"
                            :auto-upload="false"
                            style="margin-top: 25px;margin-left: 20px">
                        <el-button size="mini" type="primary" plain>上传</el-button>
                        <div slot="tip" class="el-upload__tip">仅限于PNG/JPG文件，且不超过2M</div>
                    </el-upload>
                </el-col>
            </el-row>
            <el-form :model="form" style="margin-top: 10px">

                <el-col :span="8">
                    <el-form-item label="账号：" :label-width="formLabelWidth">
                        <el-input v-model="form.account" @change="onChange"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="姓名：" :label-width="formLabelWidth">
                        <el-input v-model="form.name" @change="onChange"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="密码：" :label-width="formLabelWidth">
                        <el-input v-model="form.password" @change="onChange"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机：" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" @change="onChange"></el-input>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="12">-->
                <!--<el-form-item label="确认密码：" :label-width="formLabelWidth">-->
                <!--<el-input v-model="form.confirmpwd" @change="onChange"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :span="8">
                    <el-form-item label="角色：" :label-width="formLabelWidth">
                        <el-select v-model="form.roleId" @change="onChange">
                            <el-option
                                    v-for="item in allRoles"
                                    v-bind:value="item.id"
                                    v-bind:label="item.roleName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="在职情况：" :label-width="formLabelWidth">
                        <el-select v-model="form.valid" @change="onChange">
                            <el-option
                                    v-for="item in valid"
                                    v-bind:value="item.valid"
                                    v-bind:label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="学校账号：" :label-width="formLabelWidth">
                        <el-input v-model="form.schoolStaffCode" @change="onChange"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon>
            </el-alert>
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px">
                <el-button @click="handleExit" icon="el-icon-close" type="danger">取 消</el-button>
                <el-button type="primary" @click="onAdd" icon="el-icon-check">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="modifyDialogVisible" width="60%">
            <el-row>
                <el-col :span="2" :offset="1">
                    <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden; margin-top: 10px" :src="modifyPhoto(modifyForm.headImage)"/>
                </el-col>
                <el-col :span="6">
                    <el-upload
                            action=""
                            :limit="1"
                            :multiple="false"
                            :file-list="fileList"
                            :show-file-list="true"
                            accept=".png,.jpg"
                            :on-change="handlePhotoChange"
                            :on-remove="handleRemove"
                            :on-exceed="handleExceed"
                            :auto-upload="false"
                            style="margin-top: 25px;margin-left: 20px">
                        <el-button size="mini" type="primary" plain>更换</el-button>
                        <div slot="tip" class="el-upload__tip">仅限于PNG/JPG文件，且不超过2M</div>
                    </el-upload>
                </el-col>
            </el-row>
            <el-form :model="modifyForm">
                <el-row style="margin-top: 10px">
                    <el-col :span="8">
                        <el-form-item label="账号：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.account" @change="onChange"
                                      :disabled="modifyForm.account == 'admin'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.name" @change="onChange"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="密码：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.password" @change="onChange"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机：" :label-width="formLabelWidth">
                            <el-input v-model="modifyForm.phone" @change="onChange"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="角色：" :label-width="formLabelWidth">
                            <el-select v-model="modifyForm.roleId" @change="onChange">
                                <el-option
                                        v-for="item in allRoles"
                                        v-bind:value="item.id"
                                        v-bind:label="item.roleName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="在职情况：" :label-width="formLabelWidth">
                            <el-select v-model="modifyForm.valid" @change="onChange">
                                <el-option
                                        v-for="item in valid"
                                        v-bind:value="item.valid"
                                        v-bind:label="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-alert v-if="isError" style="margin-top: 20px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon>
            </el-alert>
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px;margin-top: 20px">
                <el-button @click="onClose" icon="el-icon-close" type="danger">取 消</el-button>
                <el-button type="primary" @click="onEidt" icon="el-icon-check">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="deleteConfirmVisible" width="30%">
            <span>确认要删除账号为[ <b>{{selectedItem.account}}</b> ]的用户吗？</span>
            <span slot="footer" class="dialog-footer">
	    <el-button @click="deleteConfirmVisible = false" icon="el-icon-close">取 消</el-button>
	    <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check">确 定</el-button>
	  </span>
        </el-dialog>
    </div>
</template>

<script>
    var _this;
    import request from '../../api/request'

    export default {
        name: "part_manage",
        components: {},
        data() {
            _this = this;
            return {
                isError: false,
                errorMsg: '',
                totalRecords: 0,
                selectedItem: {},
                deleteConfirmVisible: false,
                tableData: [],
                //分页
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 1,
                fileList: [],
                //增加对话框
                addDialogVisible: false,
                form: {
                    account: "",
                    headImage: "",
                    name: "",
                    password: "",
                    phone: "",
                    roleId: "",
                    schoolStaffCode: "",
                    valid: 1,
                },
                formLabelWidth: '100px',

                //增加对话框
                modifyDialogVisible: false,
                modifyForm: {
                    id: '',
                    account: "",
                    headImage: "",
                    name: "",
                    password: null,
                    roleId: "",
                    valid: "",

                },
                photoData: "",
                filters: {
                    name: "",
                    account: "",
                    roleId: "",
                    valid: "",
                },
                allRoles: [],
                valid: [{"valid": 1, "name": "在职"}, {"valid": 0, "name": "离职"}],
                loadingUI: false,
            }
        },
        methods: {
            onChange: function () {
                if (_this.addDialogVisible) {
                    _this.isError = _this.validateForm(_this.form, false);
                } else {
                    _this.isError = _this.validateForm(_this.modifyForm, true);
                }
                if (_this.form.roleId == 3 || _this.form.roleId == 5) {
                    $(".addHeadImage").attr("style", " display: block")
                } else {
                    $(".addHeadImage").attr("style", " display: none")
                }
            },
            modifyPhoto(img) {
                if (_this.photoData !== "") {
                    return _this.photoData;
                } else {
                    return USER_IMG_BASE + img;
                }
            },
            handleRemove(file, fileList) {
                _this.fileList = [];
                _this.photoData = "";
            },
            handleExceed(file, fileList) {
                showMessage(_this, "请先删除已选择文件!");
            },
            handlePhotoChange(file, fileList) {
                var reader = new FileReader();
                if (file.size > PHOTO_SIZE_LIMIT) {
                    showMessage(_this, "文件大小超过2M");
                } else {
                    reader.readAsDataURL(file.raw);
                    reader.onload = function (e) {
                        // 这个就是base64编码了
                        _this.photoData = this.result;
                    }
                }
            },
            handleSizeChange(val) {},
            handleCurrentChange(val) {
                this.currentPage = val;
                this.onSelectUsers();
            },
            search() {
                _this.onSelectUsers();
            },
            onSelectUsers() {
                _this.tableData = new Array();
                _this.filters.page = _this.currentPage;
                _this.filters.size = _this.pageSize;
                $.ajax({
                    url: HOST + "/user/selectUsers",
                    type: 'POST',
                    dataType: 'json',
                    data: _this.filters,
                    success: function (data) {
                        if (data.code == 200) {
                            _this.totalRecords = data.data.total;
                            _this.tableData = data.data.list;
                            _this.startRow = data.data.startRow;
                        }
                    },
                    error: function (data) {
                        showMessage(_this, '服务器访问出错', 0);
                    }
                })
            },
            handleAdd() {
                this.isError = false;
                this.errorMsg = '';
                this.addDialogVisible = true;
            },
            handleEdit(index, item) {
                _this.photoData = ""
                this.isError = false;
                this.errorMsg = '';
                this.selectedItem = item;
                this.modifyForm.id = item.id;
                this.modifyForm.account = item.account;
                this.modifyForm.name = item.name;
                this.modifyForm.roleId = item.roleId;
                this.modifyForm.headImage = item.headImage;
                this.modifyForm.phone = item.phone
                this.modifyForm.password = item.password;
                this.modifyForm.valid = item.valid;
                this.isError = this.validateForm(this.modifyForm, true);
                this.modifyDialogVisible = true;
            },
            handleDelete(index, item) {
                this.selectedItem = copyObject(item);
                if (this.selectedItem) {
                    _this.deleteConfirmVisible = true;
                }
            },
            onConfirmDelete: function () {
                _this.deleteConfirmVisible = false;
                $.ajax({
                    url: HOST + "user/delete",
                    type: 'POST',
                    dataType: 'json',
                    data: {"user": JSON.stringify(this.selectedItem)},
                    success: function (data) {
                        if (data.code == 200) {
                            showMessage(_this, '删除成功', 1);
                            _this.onSelectUsers();
                        } else {
                            showMessage(_this, '删除失败', 0);
                        }
                    },
                    error: function (data) {
                        showMessage(_this, '服务器访问出错', 0);
                    }
                })
            },
            validateForm(formObj, isEdit) {
                var iserror = false;

                if (!iserror && isStringEmpty(formObj.account)) {
                    iserror = true;
                    this.errorMsg = '账号不能为空';
                }
                if (!iserror && isStringEmpty(formObj.name)) {
                    iserror = true;
                    this.errorMsg = '姓名不能为空';
                }
                if (!iserror && isStringEmpty(formObj.phone)) {
                    iserror = true;
                    this.errorMsg = '手机不能为空';

                } else if (!(/^1[34578]\d{9}$/.test(formObj.phone))) {
                    iserror = true;
                    this.errorMsg = '请输入正确的手机号';
                }

                if (!iserror && formObj.roleId == "") {
                    iserror = true;
                    this.errorMsg = '请选择角色';
                }

                //group检查不是必选项
                if (!iserror) {
                    this.errorMsg = ""
                }

                return iserror;
            },

            onAdd() {
                this.isError = _this.validateForm(this.form, false);
                let params = new URLSearchParams();
                if (!this.isError) {
                    params.append("user", JSON.stringify(_this.form))
                    params.append("photoData", _this.photoData)
                    request({
                        url: '/user/add',
                        method: 'post',
                        dataType: 'json',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            showMessage(_this, '添加成功', 1)
                            _this.form = {}
                            _this.addDialogVisible = false;
                            _this.onSelectUsers();
                        } else {
                            _this.isError = true;
                            _this.errorMsg = data.message;
                        }
                    }).catch(error => {
                        _this.errorMsg = '服务器访问出错！';
                    })
                }

            },
            handleExit() {
                _this.form = {}
                _this.addDialogVisible = false;
                $(".addHeadImage").attr("style", "display:none")

            },
            onClose() {
                _this.modifyForm.password = ''
                _this.modifyDialogVisible = false
            },
            onEidt() {
                this.isError = this.validateForm(this.modifyForm, true);
                let params = new URLSearchParams();
                if (!_this.isError) {
                    /*  $.ajax({
                          url:'/user/update',
                          type: 'POST',
                          dataType: 'json',
                          data: {
                              "user": JSON.stringify(_this.modifyForm),
                              "photoData":_this.photoData
                          },
                          success: function (data) {
                              if (data.code == 200) {
                                  _this.modifyDialogVisible = false;
                                  _this.onSelectUsers();
                                  showMessage(_this, '修改成功', 1);
                              } else {
                                  _this.errorMsg = data.message;
                                  _this.isError = true;
                              }
                          },
                          error: function (data) {
                              _this.errorMsg = '服务器访问出错！';
                              _this.isError = true;
                          }
                      })*/
                    // 此处修改：url:HOST+'user/update'=>'/user/update'。避免HOST为本地或服务器时都不报错
                    params.append("user", JSON.stringify(_this.modifyForm))
                    params.append("photoData", _this.photoData)
                    request({
                        url: '/user/update',
                        method: 'post',
                        dataType: 'json',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.modifyDialogVisible = false;
                            _this.onSelectUsers();
                            showMessage(_this, '修改成功', 1);
                        } else {
                            _this.errorMsg = data.message;
                            _this.isError = true;
                        }
                    }).catch(error => {
                        _this.errorMsg = '服务器访问出错！';
                        _this.isError = true;
                    })

                }
            },

            initAllRoles() {
                let params = new URLSearchParams();
                request({
                    url: "/role/list",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allRoles = res.data.data.list;
                    } else {
                        showMessage(_this, "获取数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;
                })
            },
            filterRoleName(id) {
                let roleName = "";
                for (let i = 0; i < _this.allRoles.length; i++) {
                    if (_this.allRoles[i].id == id) {
                        roleName = _this.allRoles[i].roleName;
                        break;
                    }
                }
                return roleName;
            }

        },
        computed: {},
        filters: {},
        created: function () {
            this.userinfo = JSON.parse(sessionStorage.getItem('user'));
            if (isNull(this.userinfo)) {
                this.$router.push({path: '/login'});
                return;
            }
            this.initAllRoles();
        },
        mounted: function () {
            this.onSelectUsers();
        },
         watch:{
                  addDialogVisible:{
                      handler: function () {
                          $(".addHeadImage").attr("style","display:none")
                          if (_this.photoData!=""||_this.photoData!=null||_this.fileList!=""||_this.fileList!=null){
                              _this.handleRemove()
                          }
                          _this.form = {}
                      }

                  }
              }
    }

</script>
<style>
    input[type=file] {
        display: none;
    }

    .addHeadImage {
        display: none;

    }
</style>
