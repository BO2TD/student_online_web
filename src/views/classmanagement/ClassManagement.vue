<template>
    <div>
       <el-button type="primary" @click="ToTest">发布作业</el-button>
    <el-table
            :data="ClassData"
            :default-sort = "{prop: 'date', order: 'descending'}"
            border
            style="width: 100%">
        <el-table-column
                sortable
                fixed
                prop="subjectName"
                label="科目"
                width="100">
        </el-table-column>
        <el-table-column
                prop="title"
                label="作业标题"
                width="100">
        </el-table-column>
        <el-table-column
                prop="userName"
                label="发布人"
                width="100">
        </el-table-column>
        <el-table-column
                prop="createTime"
                width="180"
                label="发布时间">
        </el-table-column>
        <el-table-column
                prop="commitTime"
                width="100"
                label="完成时间">
        </el-table-column>
        <el-table-column
                prop="className"
                width="100"
                label="班级">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                <el-button
                        size="mini"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button
                        size="mini"
                        @click="homewordDo(scope.$index, scope.row)">已完成</el-button>
                <el-button
                        size="mini"
                        @click="homeworkNotDo(scope.$index, scope.row)">未完成</el-button>
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
                :total="ClassData.length">
        </el-pagination>


        <div>
            <el-dialog title="未完成学生情况" :visible.sync="dialogNotTableVisible">
                <el-table :data="DoNotHomework">
                    <el-table-column property="account" label="账号" width="200"></el-table-column>
                    <el-table-column property="userName" label="姓名" width="200"></el-table-column>
                    <el-table-column property="phone" label="电话" width="200"></el-table-column>

                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="homework.page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="homework.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="DoNotHomework.length">
                </el-pagination>
            </el-dialog>
        </div>



        <div>
            <el-dialog title="已完成学生情况" :visible.sync="dialogTableVisible">
                <el-table :data="DoHomework">
                    <el-table-column property="completionTime" label="完成日期" width="160"></el-table-column>
                    <el-table-column property="studentName" label="姓名" width="200"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="DetailStudentHomework(scope.$index, scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="homework.page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="homework.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="DoHomework.length">
                </el-pagination>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {tho,deletHomework,listDoHomework,listNotDoHomework} from '../../api/teacher/teacherhomework.js'
    import Cookies from 'js-cookie'
    export default {
        name: "ClassManagement",
        data() {
            return {
                ClassData: [],
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                    userId:'',
                    roleId:''
                },
                dialogTableVisible:false,
                dialogNotTableVisible:false,
                params:{
                    id:'',
                },
                homework:{
                    classId:'',
                    homeworkId:'',
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                },
                DoHomework:[],
                DoNotHomework:[],
            }
        },

        created() {
            this.page.roleId=Cookies.get('roleId')
            this.page.userId=Cookies.get('userId')
            this.thomework(this.page)
        },
        methods:{
            DetailStudentHomework(index,row){
              this.$router.push({
                  name:'Detail',
                  params:{
                      data2:row,
                      data1:'homework'
                  }
              })
            },
            homeworkNotDo(index,row){
                this.homework.homeworkId=row.id
                this.homework.classId=row.classId
                listNotDoHomework(this.homework).then(resp=>{
                    this.DoNotHomework=resp.data.resultData.data
                })
                this.dialogNotTableVisible=true
            },
            homewordDo(index,row){
                this.homework.homeworkId=row.id
                listDoHomework(this.homework).then(resp=>{
                    this.DoHomework=resp.data.resultData.data
                })
              this.dialogTableVisible=true
            },
            handleDetail(index,row){
              this.$router.push({
                  name:'Detail',
                  params:{
                      data2:row,
                      data1:'homework'
                  }
              })
            },
            handleDelete(index,row){
                this.params.id=row.id;
                deletHomework(this.params).then(resp=>{
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
            ToTest(){
              this.$router.push({
                  name:'Detail',
                  params:{
                      data1:'homework'
                  }
              })
            },
            handleSizeChange(size) {
                this.page.page = size;
                this.homework.page=size;
                this.homeworkNotDo(this.homework)
                this.homewordDo(this.homework)
                this.thomework(this.page)
                // console.log(this.pageSize,'888')
                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                this.homework.pageNum=pageNum;
                this.homeworkNotDo(this.homework)
                this.homewordDo(this.homework)
                this.thomework(this.page)
                console.log(`当前页: ${pageNum}`);
            },

            thomework(page){
                tho(page).then(resp=>{
                    this.ClassData=resp.data.resultData.data
                    // state.ClassData=resp.data.data.records
                    // this.$store.dispatch('classAction',this.ClassData)
                })
            }
        },

    }
</script>

<style scoped>

</style>
