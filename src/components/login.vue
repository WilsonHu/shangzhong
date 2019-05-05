<template>
    <div class="bg">
        <div style="text-align: center;padding-top: 100px;font-size: 36px;color: white;font-weight: bold">上海中学校车管理系统
        </div>
        <div class="login-container">
            <h3 class="title">登 录</h3>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="60px">

                <el-form-item label="账号:" prop="account">
                    <el-input type="text"
                              prefix-icon="el-icon-tickets"
                              v-model="ruleForm2.account" auto-complete="off" placeholder="账号"
                              @change="onChange"></el-input>
                </el-form-item>
                <!--<el-form-item label="姓名:" prop="name" >-->
                <!--<el-input type="text" disabled v-model="ruleForm2.name" auto-complete="off" ></el-input >-->
                <!--</el-form-item >-->
                <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"
                              prefix-icon="el-icon-goods"
                              v-on:input="onKeyup"></el-input>
                </el-form-item>
                <div class="alert alert-danger" v-if="isError" style="margin-top: 10px;padding: 5px;">
                    {{errorMsg}}!
                </div>
                <div style="text-align: center;margin-top: 35px">
                    <!--<el-button type="primary" style="width:35%;" @click.native.prevent="reset"-->
                    <!--&gt;重置-->
                    <!--</el-button>-->
                    <el-button type="primary" style="width:100%;" @click.native.prevent="login"
                    >登录
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script>
    var _this;
    import request from '../api/request'
    import {setToken, getToken} from '../api/auth'

    export default {
        data() {
            _this = this;
            return {
                submitUrl: "/user/requestLogin", //,
                ruleForm2: {
                    account: '',
                    name: "",
                    password: ''
                },
                rules2: {},
                checked: true,
                isError: false,
                errorMsg: '',
            }
        },
        methods: {
            validateForm() {
                this.errorMsg = '';
                var iserror = false;
                if (isStringEmpty(this.ruleForm2.account)) {
                    iserror = true;
                    this.errorMsg = '账号不能为空';
                }
                if (!iserror && isStringEmpty(this.ruleForm2.password)) {
                    iserror = true;
                    this.errorMsg = '密码不能为空';
                }
                return iserror;
            },

            onChange() {
                this.ruleForm2.name = '';
                _this.isError = this.validateForm();
            },

            onKeyup() {
                _this.isError = this.validateForm();
            },
            reset: function () {
                this.ruleForm2.account = "";
                this.ruleForm2.name = "";
                this.ruleForm2.password = "";
            },

            login: function () {
                this.isError = this.validateForm();
                if (!_this.isError) {
                    let params = new URLSearchParams();
                    params.append('account', this.ruleForm2.account);
                    params.append('password', this.ruleForm2.password);
                    request({
                        url: _this.submitUrl,
                        method: 'post',
                        data: params,
                    }).then(res => {
                        _this.isError = res.data.code != 200;
                        if (!_this.isError) {
                            sessionStorage.setItem('user', JSON.stringify(res.data.data));//res.data
                           _this.fetchUserRoleScope(JSON.stringify(res.data.data.roleId))
                            _this.$router.push("/home");
                        }
                        else {
                            _this.errorMsg = res.data.message;// '请输入正确的用户名和密码！'
                        }
                    }).catch((error => {
                        _this.errorMsg = error;
                        _this.isError = true;
                    }))
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
                            //_this.currentUserRoleScope = JSON.parse(data.data.roleScope);
                            sessionStorage.setItem("scope", data.data.roleScope);
                        } else {
                            showMessage(_this, data.message, 0);
                        }
                    },
                    error: function (data) {
                        showMessage(_this, '服务器访问出错！', 0);
                    }
                })
            },

            fetchRoleId(id){
                let params=new URLSearchParams();
                params.append('id',id);
                request({
                    url:HOST+'user/detail',
                    method: 'post',
                    data:params
                }).then(res=>{
                    sessionStorage.setItem("user",JSON.stringify(res.data.data))
                    let roleId=res.data.data.roleId
                    _this.fetchUserRoleScope(roleId)
                }).catch(error=>{
                    showMessage(error)
                })
            },

            onkeydown: function (e) {
                var ev = document.all ? window.event : e;
                if (ev.keyCode == 13) {//enter key
                    _this.login();
                }

            },
        },
        mounted: function () {
            window.addEventListener('keydown', _this.onkeydown);
            let user = JSON.parse(sessionStorage.getItem('user'));
            if (user != null) {
                _this.$router.push("/home");
            }
            let url=window.location.href;
            console.log(url);
            let mark1= url.indexOf('?');
            if(mark1!=-1) {
                let mark2= url.indexOf('#');
                let params;
                if (mark2 != -1) {
                    params = url.slice(url.indexOf('?') + 1, mark2);
                } else {
                    params = url.slice(url.indexOf('?') + 1);
                }
                let mark3= params.indexOf('=');
                console.log(params);
                let ticket = params.slice(mark3+1);
                console.log(ticket);
                $.ajax({
                    url: HOST + "user/ShzxCASLogin",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "shzxStaffCode":ticket
                    },
                    success: function (data) {
                        if(data.code==200){
                            //sessionStorage.setItem('user', JSON.stringify(data.data));//res.data
                           // _this.fetchUserRoleScope(JSON.stringify(res.data.data.roleId))
                            _this.fetchRoleId(data.data.chargeTeacher)
                            _this.$router.push("/home");
                        }else{
                            showMessage(_this,'获取登陆用户数据失败！',0)
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        showMessage(_this, error, 0);
                    }
                });
            }else {
                window.location.href=IP;
            }
        },
        destroyed: function () {
            console.log("destroyed vue");
            window.removeEventListener('keydown', _this.onkeydown);

        },
    }

</script>

<style lang="scss" scoped>
    .bg {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        height: 100%;
        /*background: url(assets/bg1.jpg) center !important;
        background-size: cover;*/
        background-image: url("../assets/img/login_bg_pic.png");
        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
        -moz-background-size: 100% 100%;
        background-size: 100% 100%;
        background-attachment: fixed;
        -webkit-font-smoothing: antialiased;
    }

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/

        background-clip: padding-box;
        background-color: #F9FAFC;
        margin: 180px auto;
        margin-top: 50px;

        width: 450px;
        padding: 60px 60px 60px 60px;
    }

    .title {
        width: 320px;
        margin-bottom: 40px;
        text-align: center;
        color: #505458;
        font-weight: bold;
    }
</style>