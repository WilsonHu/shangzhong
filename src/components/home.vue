<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="background:rgba(250,250,250,1);">
        <el-container>
            <el-aside style="background-color: white;box-shadow:0px 0px 15px 0px rgba(0,0,0,0.15);width: 200px;height: 1080px">
                <div style="cursor: pointer;font-size: 20px; font-weight: bolder; color: black;line-height:90px;"
                     @click="goToHome()">校车管理后台
                </div>
                <div style="height: 1px;background: lightgray"></div>
                <el-menu v-for="root in $router.options.routes"
                         style="background-color: transparent;text-align: left"
                         text-color="#909399"
                         :default-active="filterParentPath($route.path)"
                         active-text-color="#1875F0"
                         @select="handleSelect">
                    <el-menu-item v-for="sub in root.children" v-if="!root.hidden && showMenu(sub.path)" :index="sub.path" style=" height: 120px;line-height: 120px;text-align: center;padding-left: 0px">
                        <template slot="title">
                            <i :class="sub.icon" style="width: 24px;font-size: 24px"></i>
                            <span style="font-weight: bold;font-size: 16px">{{sub.meta}}</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="90px" style="background-color: white;box-shadow:0px 0px 15px 0px rgba(0,0,0,0.15)">
                    <el-row style="margin-top: 10px">
                        <el-col :offset="22" :span="1">
                            <div>
                                <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden;" :src="getPhoto()"/>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <label
                                    style="font-size: 18px;
                                    cursor: pointer;
                                    font-style: italic;font-weight: normal;
                                    padding-left: 10px"
                                    @click="logout">
                                {{userinfo.name}}
                            </label>
                            <i class="el-icon-arrow-down" v-on:click="logout">
                            </i>
                        </el-col>
                    </el-row>
                </el-header>
                <div style="height: 1px;background: lightgray"></div>
                <el-container>
                    <router-view></router-view>
                    <!--<el-menu-item v-for="item in sub.children" :index="item.path"-->
                                  <!--style="text-align: left;font-size: 14px; font-weight: bold">-->
                        <!--{{item.meta}}-->
                    <!--</el-menu-item>-->
                </el-container>
            </el-container>
        </el-container>
        <!--<el-footer >Footer</el-footer >-->
        <el-dialog title="用户密码修改" :visible.sync="userInfoDialog" size="tiny">
            <el-row>
                <el-form>
                    <el-col :span="20">
                        <el-form-item label="帐号：" :label-width="formLabelWidth">
                            <el-input type="text" disabled v-model="submitUser.account" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="用户名：" :label-width="formLabelWidth">
                            <el-input type="text" disabled v-model="submitUser.name" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="原密码：" :label-width="formLabelWidth">
                            <el-input type="password" autofocus v-model="submitUser.oldPassword" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="新密码：" :label-width="formLabelWidth">
                            <el-input v-if="!isShowPwd" type="password" autofocus v-model="submitUser.password"
                                      auto-complete="off">
                            </el-input>
                            <el-input v-else type="text" v-model="submitUser.password" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="isShowPwd"
                                     style="margin-top: 6px;margin-left: 3px;">显示密码
                        </el-checkbox>
                    </el-col>
                </el-form>
            </el-row>
            <el-alert
                    :title="errorMsg"
                    v-show="isError"
                    type="error"
                    show-icon>
            </el-alert>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="userInfoDialog = false">取 消</el-button>
                    <el-button type="success" @click="onConfirmUpdate"
                               :disabled="validateUserPwd(submitUser)">确 定</el-button>
                </span>

        </el-dialog>
        <div class="modal fade" id="logOutConfirmMsg" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" style="text-align: left">
                        <h3>提示</h3>
                    </div>
                    <div class="modal-body" style="font-size: 18px;font-family: FontAwesome">
                        <!-- 加上<form>标签可以使得modal窗口在点击按钮都自动dismiss-->
                        确认要注销登录吗？
                        <button type="button" style="margin-top: 50px;font-size: 18px" class="btn btn-danger btn-block"
                                v-on:click="onConfirmLogOut">确 定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    var _this
    $(function () {
        $('#modifyPwdDialog').on('hidden.bs.modal', function () {
            _this.onConfirmLogOut();
        })
    });
    export default {
        name: "home",
        components: {},
        data() {
            _this = this;
            return {
                system_name: SYSTEMNAME,
                currentSec: 3,
                timerDestroyed: false,
                current_time: '',
                activeIndex: "1",
                userinfo: {},
                subDepartments: [],
                isError: false,
                errorMsg: '',
                currentUserRoleScope: {},
                formLabelWidth: "100px",
                userInfoDialog: false,
                submitUser: {
                    account: '',
                    name: '',
                    oldPassword: "",
                    password: "",
                },
                isShowPwd: false,
            }
        },
        methods: {
            getPhoto() {
                return require("../assets/img/ldh.png");
            },
            goToHome() {
                _this.$router.push("/home");
            },

            validateUserPwd(userObj) {
                return isStringEmpty(userObj.password) ||
                    isStringEmpty(userObj.oldPassword);
            },

            showUserInfo() {
                _this.submitUser.account = _this.userinfo.account;
                _this.submitUser.name = _this.userinfo.name;
                _this.submitUser.password = "";
                _this.submitUser.oldPassword = "";
                _this.isShowPwd = false;
                _this.isError = false;
                _this.userInfoDialog = true;

            },

            submitNewPassword: function () {
                $.ajax({
                    url: HOST + "user/update",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        user: JSON.stringify({
                            id: _this.userinfo.id,
                            password: _this.submitUser.password,
                        }),
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            _this.userInfoDialog = false;
                            showMessage(_this, '密码修改成功', 1);
                        } else {
                            _this.errorMsg = '密码修改失败';
                            showMessage(_this, _this.errorMsg, 0);
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        showMessage(_this, error, 0);
                    }
                });
            },

            onConfirmUpdate() {
                $.ajax({
                    url: HOST + "user/requestLogin",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        account: _this.submitUser.account,
                        password: _this.submitUser.oldPassword,
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            _this.submitNewPassword();
                        } else {
                            _this.errorMsg = "原密码不正确，请重新输入!";
                            _this.isError = true;
//                            showMessage(_this, "原密码不正确，请重新输入!", 0);
                        }
                    },
                    error: function (error) {
                        _this.errorMsg = "原密码不正确，请重新输入!";
                        _this.isError = true;
//                        showMessage(_this, "原密码不正确，请重新输入!", 0);
                    }
                });
            },
            getCurrentDate: function () {
                var cdata = new Date();
                this.current_time = cdata.toLocaleTimeString("yyyy-MM-dd HH:mm:ss");
            },

            logout: function () {
                $("#logOutConfirmMsg").modal();

            },
            onConfirmLogOut: function () {
                //sessionStorage.removeItem('user');
                _this.$router.push("/login");
            },

            handleSelect(key, keyPath) {
                console.log("路径跳转:"+key)
                _this.$router.push(key)
            },

            //根据子路径找到父路径
            filterParentPath(childPath) {
                let path = "/home";//default
                for (let i = 0; i < _this.$router.options.routes.length; i++) {
                    if (!_this.$router.options.routes[i].hidden && _this.$router.options.routes[i].children.length > 0) {
                        for (let j = 0; j < _this.$router.options.routes[i].children.length; j++) {
                            if (childPath.indexOf(_this.$router.options.routes[i].children[j].path) != -1) {
                                path = _this.$router.options.routes[i].children[j].path;
                                break;
                            }
                        }
                    }
                }
                return path;
            },

            //是否显示主menu
            showMenu(path) {
                //path格式/home/contract
                let pathList = path.split("/");
                if (pathList != null && pathList.length == 3 && _this.currentUserRoleScope[pathList[2]] != null) {
                    return true;
                } else {
                    return false;
                }
            },

            fetchUserRoleScope(roleId) {
                $.ajax({
                    url: HOST + "role/detail",
                    type: 'POST',
                    dataType: 'json',
                    data: {"id": roleId},
                    success: function (data) {
                        if (data.code == 200) {
                            _this.currentUserRoleScope = JSON.parse(data.data.roleScope);
                        } else {
                            showMessage(_this, data.message, 0);
                        }
                    },
                    error: function (data) {
                        showMessage(_this, '服务器访问出错！', 0);
                    }
                })
            }

        },
        computed: {},
        filters: {},
        created: function () {
            this.userinfo = JSON.parse(sessionStorage.getItem('user'));
            this.fetchUserRoleScope(this.userinfo.roleId);
        },
        mounted: function () {
//		    setInterval(function getDate() {
//			    var date = new Date();
//			    _this.current_time = date.format("yyyy-MM-dd hh:mm:ss");
//		    }, 1000);//定时器
        },
        destroyed: function () {
            window.clearInterval(this.reduceTime)
        }
    }

</script>
<style>
    .bg {
        overflow-y: scroll;
        height: 100%;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        color: #333;
        text-align: center;
    }

    .el-tree-node__expand-icon {
      font-size: 18px;
    }

    .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        color: #1875F0;
    }


</style>
