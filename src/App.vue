<template>
    <div id="app">
        <router-view class="router-view" v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    export default {
        debug: true,
        name: 'app',
        data () {
            return {
                isRouterAlive:true
            }
        },
        provide(){
            return {
                reload:this.reload
            }
        },

        methods: {
            reload(){
                this.isRouterAlive=false;
                this.$nextTick(function () {
                    this.isRouterAlive=true
                })
            }
        }
    }
</script>
<style>
    body {

        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        /*font-size: 14px;*/
        -webkit-font-smoothing: antialiased;
    }

    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }
</style>
