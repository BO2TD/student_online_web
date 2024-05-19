<template>
    <div>
        <el-table
                :data="tableData"
                :default-sort="{prop: 'date', order: 'descending'}"
                border
                style="width: 100%">
            <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    fixed
                    prop="account"
                    label="账号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="studentPhone"
                    label="学生电话">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="charger"
                    label="审核人">
            </el-table-column>


            <el-table-column label="操作">
                <template slot-scope="scope" v-if="scope.row.status=='待审核'">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">同意
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">驳回
                    </el-button>
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
                :total="tableData.length">
        </el-pagination>

    </div>
</template>

<script>
    import {tapplicant,alertapplicant} from "../../api/teacher/teacherapplicant.js";
    import Cookies from 'js-cookie'
    export default {
        name: "TeacherApplicant",
        data(){
            return{
                tableData: [],
                page: {
                    page: 1, //初始页
                    pageSize: 10,    //    每页的数据
                    userId:'',
                },

                alertData:{},
                flag:true
            }
        },
        created() {
            this.page.userId=Cookies.get('userId')
            this.page.roleId = Cookies.get("roleId")
            this.listUnApplicant(this.page)
            if(this.tableData.status=='待审核'){
                this.flag=false

            }
        },
        methods: {
            handleEdit(index,row){
                this.alertData=row
                this.alertData.status=2
                alertapplicant(this.alertData).then(resp=>{
                    if(resp.data.code==200){
                        this.studentquery(this.page)
                        this.$message({
                            message: '您已同意该学生加入您的班级',
                            type: 'success'
                        });
                    }else {
                        this.$message.error('新增失败');
                    }
                })

            },

            handleDelete(index,row){
                this.alertData=row
                this.alertData.status=3
                alertapplicant(this.alertData).then(resp=>{
                    if(resp.data.code==200){
                        this.studentquery(this.page)
                        this.$message({
                            message: '您已驳回该学生加入您的班级',
                            type: 'success'
                        });
                    }else {
                        this.$message.error('新增失败');
                    }
                })

            },

            handleSizeChange(size) {
            this.page.pageSize = size;
            // console.log(this.pageSize,'888')
            this.listUnApplicant(this.page)
            console.log(`每页 ${size} 条`);
        },
        handleCurrentChange(pageNum) {
            this.page.pageNum = pageNum;
            this.listUnApplicant(this.page)
            console.log(`当前页: ${val}`);
        },

        listUnApplicant(page) {
            tapplicant(page).then(resp => {
                this.tableData = resp.data.resultData.data
            })
        },
        }
    }
</script>

<style scoped>

</style>