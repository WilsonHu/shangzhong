<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <el-container>
        <el-header style="background-color: transparent; padding: 0px;" height="90px">
            <div v-for="root in $router.options.routes" v-if="!root.hidden">
                <el-menu v-for="sub in root.children" v-if="!sub.hidden" mode="horizontal" :default-active="$route.path"
                         text-color="#909399"
                         active-text-color="#1875F0"
                         @select="handleSelect">
                    <el-menu-item v-for="item in sub.children"
                                  :index="item.path"
                                  v-if="sub.path == '/home/system' && subPathExist(item.path)"
                                  style="text-align: center; font-size: 15px; font-weight: bold;height: 90px;line-height: 90px;margin-right: 36px;margin-left: 36px ">
                        {{item.meta}}
                    </el-menu-item>
                </el-menu>
            </div>
        </el-header>
            <router-view style="margin: 0px"></router-view>
    </el-container>
</template >

<script >
    import Vue from 'vue'
    var _this

    export default {
	    name: "system",
	    components: {},
	    data () {
		    _this = this;
		    return {
			    userinfo: {},
			    activeName: "",
		    }
	    },
	    methods: {
		    handleSelect(key, keyPath) {
			    _this.activeName = key;
			    _this.$router.push(key)
		    },
		    getIndex(item, list)
		    {
			    return list.indexOf(item);
		    },
            subPathExist(path) {

                    return _this.scopeStr.indexOf(path) != -1;
            },
            fetchUserRoleScope(roleId) {
                $.ajax({
                    url: HOST + "role/detail",
                    type: 'POST',
                    dataType: 'json',
                    data: {"id": roleId},
                    success: function (data) {
                        if (data.code == 200) {
                            _this.scopeStr = data.data.roleScope;
                            var currentUserRoleScope = JSON.parse(data.data.roleScope);
                            if(currentUserRoleScope.system.length > 0) {
                                _this.$router.push(currentUserRoleScope.system[0]);
                            } else {
                                showMessage(_this, data.message, 0);
                            }

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
	    created: function () {
            this.userinfo = JSON.parse(sessionStorage.getItem('user'));
            this.scopeStr = sessionStorage.getItem("scope");
	    },
	    mounted: function () {

	    },
    }

</script >

