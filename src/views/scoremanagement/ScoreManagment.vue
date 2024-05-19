<template>
    <div>
       <el-button @click="test()" type="primary"> 发布试题</el-button>
    <el-table
            :data="ScoreData"
            :default-sort = "{prop: 'date', order: 'descending'}"
            border
            style="width: 100%">
        <el-table-column
                sortable
                fixed
                prop="createTime"
                label="发布时间"
                width="180">
        </el-table-column>
        <el-table-column
                sortable
                fixed
                prop="title"
                label="试题名称"
                width="180">
        </el-table-column>
        <el-table-column
                sortable
                fixed
                prop="userName"
                label="发布人"
                width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
<!--              <el-button
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                <el-button
                        size="mini"
                        @click="handleHomework(scope.$index, scope.row)">查看已完成情况</el-button>
                <el-button
                        size="mini"
                        @click="handleNotHomwork(scope.$index, scope.row)">查看未完成情况</el-button>
            </template>
        </el-table-column>
    </el-table>



        <el-dialog title="未完成情况" :visible.sync="dialogTableVisible">
            <el-table :data="NotHomework">
                <el-table-column prop="account" label="账号" width="150"></el-table-column>
                <el-table-column prop="userName" label="姓名" width="150"></el-table-column>
                <el-table-column prop="sexName" label="性别" width="200"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="NotHomework.length">
            </el-pagination>
        </el-dialog>


        <el-dialog title="已完成情况" :visible.sync="dialogdoTableVisible">
            <el-table
                    :data="Homework"
                    style="width: 100%">
                <el-table-column
                        label="完成时间"
                        width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="replies"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handle(scope.$index, scope.row)">查看答题情况</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="Homework.length">
            </el-pagination>
        </el-dialog>



        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="ScoreData.length">
        </el-pagination>
    </div>
</template>

<script>
    import {listAllScore,listNotHomework,listHomework,deletExercises} from  '../../api/score'
    import Cookies from 'js-cookie'
    import {quclass} from "../../api/admin/queryclass";
    export default {
        name: "ScoreManagment",
        data() {
            return {
                NotHomework:[],
                Homework:[],
               ScoreData:[],
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                   userId:'',
                    roleId:'',
                    exerciseId:'',
                    classId:''
                },
                dialogTableVisible:false,
                dialogdoTableVisible:false,

            }
        },
        created() {
            this.page.userId=Cookies.get('userId')
            this.page.roleId=Cookies.get('roleId')
            this.listAllStudentsScore(this.page)

        },

        methods:{
            test(){
              this.$router.push({
                  name:'Detail',
                  data1:'test'
              })
            },
            handleHomework(index,row){
                this.page.exerciseId=row.id;
                //Vue.delete(this.page,"userId")
                this.$delete(this.page,'userId')
                listHomework(this.page).then(resp=>{
                    this.Homework=resp.data.resultData.data

                })
              this.dialogdoTableVisible=true
            },


            handleNotHomwork(index,row){
                this.page.exerciseId=row.id;
                this.page.classId=row.classId
                listNotHomework(this.page).then(resp=>{
                    this.NotHomework=resp.data.resultData.data

                })
              this.dialogTableVisible=true
            },

            handle(index,row){
                this.$router.push({
                    name:'DetailMark',
                    params:{
                        data1:row.reply,
                        data3:'888'
                    }
                })
            },
          handleDelete(index,row){
            this.params.id=row.id;
            deletExercises(this.params).then(resp=>{
              if(resp.data.code==200){
                this.$message({
                  message: '恭喜你，删除成功',
                  type: 'success'
                });
              }else{
                this.$message.error('删除失败');
              }
            })
          },
            handleEdit(index,row){
              this.$router.push({
                  name:'DetailMark',
                  params:{
                      data1:row.content
                  }
              })
            },
            handleSizeChange(size) {
                this.page.pageSize = size;
                this.listAllStudentsScore(this.page)
                // console.log(this.pageSize,'888')

                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                this.listAllStudentsScore(this.page)
                console.log(`当前页: ${pageNum}`);
            },

            listAllStudentsScore(page){
                listAllScore(page).then(resp=>{
                   this.ScoreData= resp.data.resultData.data

                })
            }
        }
    }
</script>

<style scoped>

</style>
