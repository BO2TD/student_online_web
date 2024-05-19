<template>
    <div>
        <el-table
                :data="KnowPointData"
                :default-sort = "{prop: 'date', order: 'descending'}"
                border
                style="width: 100%">
            <el-table-column
                    sortable
                    fixed
                    prop="createTime"
                    label="创建时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="知识点标题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="发布教师"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="className"
                    label="班级">
            </el-table-column>
            <el-table-column
                    prop="subjectName"
                    label="科目">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button><el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="KnowPointData.length">
        </el-pagination>
    </div>
</template>

<script>
    import {konwpoint,deletekonwpoint} from "../../../api/admin/knowpoint.js";

    export default {
        name: "KnowledgePoints",
        data() {
            return {
                KnowPointData: [],
                page:{
                    page:1, //初始页
                    pageSize:10, //    每页的数据
                    // roleId:3
                },
                param:{
                    id:''
                }
            }
        },

        created() {
            this.aknowpoint(this.page)
        },
        methods:{
            handleEdit(index,row){
              this.$router.push({
                  name:'KnowDetail',
                  params:{
                   data1:row.content
                  }

              })
            },
            handleDelete(index,row){
                this.param.id=row.id;
                deletekonwpoint(this.param).then(resp=>{
                    if(resp.data.code==200){
                        this.$message({
                            message: '恭喜你，删除成功 ',
                            type: 'success'
                        });
                        this.aknowpoint(this.page)
                    }else{
                        this.$message.error('删除失败');
                    }
                })
            },
            handleSizeChange(size) {
                this.page.pageSize = size;
                this.aknowpoint(this.page)
                // console.log(this.pageSize,'888')
                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                this.aknowpoint(this.page)
                console.log(`当前页: ${pageNum}`);
            },

            aknowpoint(page){
                konwpoint(page).then(resp=>{
                    this.KnowPointData=resp.data.resultData.data
                    console.log(resp,'123')
                    // state.ClassData=resp.data.data.records
                    // this.$store.dispatch('classAction',this.ClassData)
                })
            }
        },
    }
</script>

<style scoped>

</style>