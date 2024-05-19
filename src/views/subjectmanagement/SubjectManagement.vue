<template>
    <div>
    <el-table
            :data="CourseData"
            :default-sort = "{prop: 'date', order: 'descending'}"
            border
            style="width: 100%">
        <el-table-column
                sortable
                fixed
                prop="courseSn"
                label="科目ID"
                width="180">
        </el-table-column>
        <el-table-column
                prop="courseName"
                label="科目名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="courseScore"
                label="科目学分"
                width="180">
        </el-table-column>
        <el-table-column
                prop="courseDetail"
                label="详细信息">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">新增</el-button>
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                :total="CourseData.length">
        </el-pagination>
    </div>
</template>

<script>
    import {listCourse} from '../../api/course'
    export default {
        name: "SubjectManagement",
        data() {
            return {
                CourseData: [],
                page:{
                    pageNum:1, //初始页
                    pageSize:10,    //    每页的数据
                }
            }
        },
        mounted() {
            this.listAllCourse(this.page)
        },
        methods:{
            handleSizeChange(size) {
                this.page.pageSize = size;
                this.listAllCourse(this.page)
                // console.log(this.pageSize,'888')
                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                this.listAllCourse(this.page)
                console.log(`当前页: ${pageNum}`);
            },
            listAllCourse(page){
                listCourse(page).then(resp=>{
                    this.CourseData=resp.data.data.records
                })
            }
        }
    }
</script>

<style scoped>

</style>
