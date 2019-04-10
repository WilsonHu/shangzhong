<template>
    <div style="width: 100%;height: 100%;padding: 24px">
        <el-form :model="condition" label-position="right">
            <el-row>
                <el-col :span="4">
                    <el-input :span="3" v-model="modifyForm.title"
                              placeholder="请输入标题名称" clearable
                              auto-complete="off"></el-input>
                </el-col>
                <el-col :span="2" style="margin-left: 20px">
                    <el-button
                            icon="el-icon-search"
                            size="normal"
                            type="primary"
                            @click="search">查询
                    </el-button>
                </el-col>
                <el-col :span="2" style="margin-left: 20px">
                    <el-button
                            icon="el-icon-plus"
                            size="normal"
                            type="primary"
                            @click="releaseMes">发布通知
                    </el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="well" style="background-color: white;margin-top: 20px;">
            <el-row>
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        :default-sort="{prop: 'boardTime', order: 'descending'}"
                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%; ">
                    <el-table-column
                            width="75"
                            align="center"
                            type="selection">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="boardTime"
                            sortable
                            label="发布日期">
                        <template scope="scope">
                            <div>
                                {{scope.row.sendTime}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="busNumber"
                            label="标题">

                        <template scope="scope">
                            <div>
                                {{scope.row.title}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布人"
                                     align="center"
                                     sortable
                                     prop="stationName">
                        <template scope="scope">
                            <div>
                                {{scope.row.publisher}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="readCount"
                            sortable
                            label="阅读数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            width="150">
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    icon="el-icon-edit"
                                    type="primary"
                                    @click="handleEdit(scope.row.id, scope.row)">
                            </el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.row.id, scope.row)">
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
            </el-row>
        </el-row>

        <el-dialog :visible.sync="addDialogVisible" width="50%">
            <el-row>
                <el-col :span="19" :offset="1">
                    <div v-show="activeIndex == '1'">
                        <h4>发布新消息</h4>
                        <el-form :model="addForm" label-position="top" style="margin-left: 150px">
                            <el-row style="margin-top: 10px">
                                <el-col :span="5">
                                    <el-form-item label="通知标题：">
                                        <el-input v-model="addForm.title" style="width: 400%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="发布人：">
                                        <el-input v-model="addForm.name" style="width: 400%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="5">
                                    <el-form-item label="通知详情：">
                                        <el-input type="textarea" v-model="addForm.details" rows="5"  style="width: 400%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row style="margin-top: 20px">
                            <el-col :span="10" :offset="7">
                                <el-button @click="cancel" icon="el-icon-close" type="danger">取 消</el-button>
                                <el-button type="primary" @click="onAdd" icon="el-icon-check">提交</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog :visible.sync="modifyDialogVisible" width="50%">
            <el-row>
                <el-col :span="4">
                    <el-menu :default-active="activeIndex" style="min-height: 400px">
                        <el-menu-item index="1">
                            <i class="el-icon-document"></i>
                            <span slot="title">修改信息</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>

                <el-col :span="19" :offset="1">
                    <div v-show="activeIndex == '1'">
                        <h4>修改已发布的消息</h4>
                        <el-form :model="modifyForm" label-position="top" style="margin-left: 80px">
                            <el-row style="margin-top: 10px">
                                <el-col :span="5">
                                    <el-form-item label="通知标题：">
                                        <el-input v-model="modifyForm.title" style="width: 400%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="发布人：">
                                        <el-input v-model="modifyForm.name" style="width: 400%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5">
                                    <el-form-item label="通知详情：">
                                        <el-input type="textarea" v-model="modifyForm.details" rows="5"  style="width: 400%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row style="margin-top: 20px">
                            <el-col :span="10" :offset="7">
                                <el-button @click="cancel" icon="el-icon-close" type="danger">取 消</el-button>
                                <el-button type="primary" @click="onEdit" icon="el-icon-check">保存</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    var _this;
    import {getServerBusList, getServerBusStationList} from '../../api/commonRequest'
    import request from '../../api/request'

    export default {
        name: "mesmanage",
        components: {},
        data() {
            _this = this;
            return {
                condition: {
                    keyName: ''
                },
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
                tableData: [],
                loadingUI: false,
                addDialogVisible: false,
                modifyDialogVisible:false,
                activeIndex:'1',
                addForm:{},
                modifyForm:{
                    title:'',
                    name:'',
                    details:'',

                },
                sendTime:new Date(),
                readCount:0,
                id:''
            }
        },
        methods: {
            search() {
              _this.loadingUI=true;
              let condition={
                  page:_this.currentPage,
                  size:_this.pageSize,
                  title:_this.modifyForm.title
              }
              let params=new URLSearchParams();
              if (condition){
                  let keys=Object.keys(condition);
                  for (let key of keys){
                      params.append(key,condition[key])
                  }
              }
              request({
                  url:`${HOST}messages/getMessages`,
                  method: 'post',
                  data:params
              }).then(res=>{
                 if (res.data.code==200){
                       _this.tableData=res.data.data.list;
                       _this.totalRecords=res.data.data.total;
                       _this.startRow=res.data.data.startRow;
                       console.log(_this.totalRecords)

                   } else{
                       showMessage(_this,"获取推送信息失败",0)
                   }
                   _this.loadingUI=false;
              }).catch(error=>{
                  console.log(error)
                  _this.loadingUI=false
              })
            },
            releaseMes(){
                _this.addDialogVisible = true;
                _this.activeIndex = "1";
                _this.fileList = [];
            },
            handleCurrentChange(val){
               this.currentPage=val;
               this.search();
            },
            handleEdit(index, data) {
                _this.id=index;
               _this.modifyForm.title=data.title
               _this.modifyForm.name=data.publisher;
               _this.modifyForm.details=data.content;
               _this.modifyDialogVisible=true;
               _this.activeIndex="1"

            },

            handleDelete(index, data){
                let params=new URLSearchParams();
                params.append("id",index);
                request({
                    url:`${HOST}messages/delete`,
                    method:'post',
                    data:params
                }).then(res=>{
                     if (res.data.code==200){
                         _this.$alert('删除成功','提示',{
                             confirmButtonText: '确定',
                             callback:action=>{
                                 _this.search();
                             }
                         })
                     }else{
                         showMessage(_this,"删除推送消息失败")
                     }
                }).catch(error=>{
                    showMessage(error)
                })
            },
            onAdd(){
                console.log(_this.sendTime)
                if (_this.verifyForm(_this.addForm)){
                    let modityFrom={
                        sendTime:_this.sendTime,
                        title:_this.addForm.title,
                        publisher:_this.addForm.name,
                        readCount:_this.readCount,
                        content:_this.addForm.details
                    }
                  let params=new URLSearchParams();
                   if (modityFrom){
                       let keys=Object.keys(modityFrom);
                       for (let key of keys){
                           params.append(key,modityFrom[key])
                       }
                   }

                   request({
                       url:`${HOST}messages/add`,
                       method:'post',
                       data:params
                   }).then(res=>{
                        if (res.data.code==200){
                            _this.$alert('新增成功','提示',{
                                confirmButtonText: '确定',
                                callback:action=>{
                                    _this.addDialogVisible=false;
                                    _this.search();
                                }
                            })
                        }else{
                            showMessage(_this,"推送信息新增失败")
                        }
                   }).catch(error=>{
                       showMessage(error)
                   })
                }
            },

            onEdit(){
                 if (_this.verifyForm(_this.modifyForm)){
                     let params=new URLSearchParams();
                     params.append("id",_this.id)
                     params.append("sendTime",_this.sendTime);
                     params.append("title",_this.modifyForm.title)
                     params.append("publisher",_this.modifyForm.name)
                     params.append("readCount",_this.readCount)
                     params.append("content",_this.modifyForm.details);

                     request({
                         url:`${HOST}/messages/update`,
                         method:'post',
                         data:params
                     }).then(res=>{
                         if (res.data.code==200){
                             _this.$alert('修改成功','提示',{
                                 confirmButtonText: '确定',
                                 callback:action=>{
                                     _this.modifyDialogVisible=false;
                                     _this.search();
                                 }
                             })
                         }else{
                             showMessage(_this,"修改失败")
                         }

                     })
                 }
            },
            verifyForm(formObj){
                let result=true;
                if (formObj.title==null||formObj.title==""){
                    showMessage(_this,"标题不能为空")
                    result=false;
                } else if (formObj.name==null||formObj.name==""){
                    showMessage(_this,"发布人名称不能为空")
                    result=false;
                } else if (formObj.details==null||formObj.details==""){
                    showMessage(_this,"内容不能为空")
                    result=false;
                }

                return result;
            },
            cancel(){
                _this.addForm.title='';
                _this.addForm.name='';
                _this.addForm.details='';
                _this.addDialogVisible=false
                _this.modifyDialogVisible=false

            }
        },
        mounted() {
            _this.search();
        }
    }
</script>

<style scoped>

</style>