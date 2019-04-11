<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="padding: 20px">
        <el-tabs type="border-card" :value="activeTab">
            <el-tab-pane label="学生信息" style="min-height:800px;">

            </el-tab-pane>
            <el-tab-pane label="班级信息" style="min-height:800px;">

            </el-tab-pane>
            <el-tab-pane label="学生照片" style="min-height:800px;">
                <el-row>
                    <el-col :span="2">
                        <el-button type="primary" icon="el-icon-sort" @click="stuPicSync()">同步</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;margin-left: -25px">
                    <el-col :span="2" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">平台学生数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{platformStuNum}}</el-col>
                    <el-col :span="2" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">人像平台学生数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{facePlatformStuNum}}</el-col>
                    <el-col :span="10" style="color:red;font-size:12px;">同步之前请确认学生照片已上传至服务器指定路径</el-col>
                </el-row>
                <el-row style="margin-top: 10px"
                        v-loading="syncLogLoading"
                        element-loading-text="学生照片同步中"
                        element-loading-spinner="el-icon-loading">
                    <el-input
                            v-loading="loadingUI"
                            type="textarea"
                            :rows="30"
                            placeholder="同步日志输出..."
                            readonly
                            v-model="stuPicSyncLog">
                    </el-input>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="BusMom照片" style="min-height:800px;">
                <el-row>
                    <el-col :span="2">
                        <el-button type="primary" icon="el-icon-sort" @click="busMomPicSync()">同步</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;margin-left: -25px">
                    <el-col :span="3" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">平台BusMom数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{platformBusMomNum}}</el-col>
                    <el-col :span="3" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">人像平台BusMom数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{facePlatformBusMomNum}}</el-col>
                    <el-col :span="10" style="color:red;font-size:12px;">同步之前请确认BusMom照片已上传至服务器指定路径</el-col>
                </el-row>
                <el-row style="margin-top: 10px"
                        v-loading="syncLogLoading"
                        element-loading-text="BusMom照片同步中"
                        element-loading-spinner="el-icon-loading">
                    <el-input
                            v-loading="loadingUI"
                            type="textarea"
                            :rows="30"
                            placeholder="同步日志输出..."
                            readonly
                            v-model="busMomPicSyncLog">
                    </el-input>
                </el-row>

            </el-tab-pane>
            <el-tab-pane label="司机照片" style="min-height:800px;">
                <el-row>
                    <el-col :span="2">
                        <el-button type="primary" icon="el-icon-sort" @click="driverPicSync()">同步</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;margin-left: -25px">
                    <el-col :span="3" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">平台司机数: </el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{platformDriverNum}}</el-col>
                    <el-col :span="3" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">人像平台司机数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{facePlatformDriverNum}}</el-col>
                    <el-col :span="10" style="color:red;font-size:12px;">同步之前请确认司机照片已上传至服务器指定路径</el-col>
                </el-row>
                <el-row style="margin-top: 10px"
                        v-loading="syncLogLoading"
                        element-loading-text="司机照片同步中"
                        element-loading-spinner="el-icon-loading">
                    <el-input
                            v-loading="loadingUI"
                            type="textarea"
                            :rows="30"
                            placeholder="同步日志输出..."
                            readonly
                            v-model="driverPicSyncLog">
                    </el-input>
                </el-row>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    var _this;
    import request from '../../api/request'
    export default {
        name: "DataSync",
        components: {},
        data () {
            _this = this;
            return {

                userInfo:"",
                activeTab:"2",
                platformStuNum:0,
                platformBusMomNum:0,
                platformDriverNum:0,
                facePlatformStuNum:0,
                facePlatformBusMomNum:0,
                facePlatformDriverNum:0,
                stuPicSyncLog:"",
                busMomPicSyncLog:"",
                driverPicSyncLog:"",
                syncLogLoading:false,
                loadingUI:false
            }
        },
        methods: {
            stuPicSync() {
                _this.loadingUI = true;
                let params = new URLSearchParams();
                params.append("userName",_this.userInfo.name);
                request({
                    url: "/student/syncStuPicToFacePlatform",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        showMessage(_this, '同步学生照片完成！', 1);
                    } else {
                        showMessage(_this, '同步学生照片失败！', 0);
                    }
                    _this.loadingUI = false;
                    if(res.data.data != null || res.data.data != "") {
                        _this.stuPicSyncLog = res.data.data;
                    }
                    _this.getFacePlatformStuNum();
                }).catch(error => {
                    console.log(error);
                    _this.loadingUI = false;
                })
            },
            busMomPicSync() {
                _this.loadingUI = true;
                let params = new URLSearchParams();
                params.append("userName",_this.userInfo.name);
                request({
                    url: "/user/syncBusMomPicToFacePlatform",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        showMessage(_this, '同步BusMom照片完成！', 1);
                    } else {
                        showMessage(_this, '同步BusMom照片失败！', 0);
                    }
                    _this.loadingUI = false;
                    if(res.data.data != null || res.data.data != "") {
                        _this.busMomPicSyncLog = res.data.data;
                    }
                    _this.getFacePlatformBusMomNum();
                }).catch(error => {
                    console.log(error);
                    _this.loadingUI = false;
                })
            },
            driverPicSync() {
                _this.loadingUI = true;
                let params = new URLSearchParams();
                params.append("userName",_this.userInfo.name);
                request({
                    url: "/user/syncDriverPicToFacePlatform",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        showMessage(_this, '同步Driver照片完成！', 1);
                    } else {
                        showMessage(_this, '同步Driver照片失败！', 0);
                    }
                    _this.loadingUI = false;
                    if(res.data.data != null || res.data.data != "") {
                        _this.driverPicSyncLog = res.data.data;
                    }
                    _this.getFacePlatformDriverNum();
                }).catch(error => {
                    console.log(error);
                    _this.loadingUI = false;
                })
            },
            getPlatformStuNum() {
                let params = new URLSearchParams();
                request({
                    url: "/student/totalPlatformNumber",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.platformStuNum = res.data.data;
                    }

                }).catch(error => {
                    console.log(error)
                })
            },
            getFacePlatformStuNum() {
                let params = new URLSearchParams();
                request({
                    url: "/student/totalFaceNumber",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.facePlatformStuNum = res.data.data;
                    }

                }).catch(error => {
                    console.log(error)
                })
            },
            getFacePlatformBusMomNum() {
                let params = new URLSearchParams();
                request({
                    url: "/user/totalBusMomFaceNumber",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.facePlatformBusMomNum = res.data.data;
                    }

                }).catch(error => {
                    console.log(error)
                })
            },
            getPlatformBusMomNum() {
                let params = new URLSearchParams();
                request({
                    url: "/user/totalBusMomNumber",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.platformBusMomNum = res.data.data;
                    }

                }).catch(error => {
                    console.log(error)
                })
            },

            getFacePlatformDriverNum() {
                let params = new URLSearchParams();
                request({
                    url: "/user/totalDriverFaceNumber",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.facePlatformDriverNum = res.data.data;
                    }

                }).catch(error => {
                    console.log(error)
                })
            },
            getPlatformDriverNum() {
                let params = new URLSearchParams();
                request({
                    url: "/user/totalDriverNumber",
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.platformDriverNum = res.data.data;
                    }

                }).catch(error => {
                    console.log(error)
                })
            },

        },
        computed: {

        },

        filters: {},

        created: function () {
            this.userInfo = JSON.parse(sessionStorage.getItem('user'));
		    if (isNull(this.userInfo)) {
			    this.$router.push({path: '/login'});
			    return;
		    }

        },
        mounted: function () {
            _this.getPlatformStuNum();
            _this.getFacePlatformStuNum();
            _this.getPlatformBusMomNum();
            _this.getFacePlatformBusMomNum();
            _this.getPlatformDriverNum();
            _this.getFacePlatformDriverNum();
        }
    }
</script>
<style>

</style>
