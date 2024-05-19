<template>
    <div>
        <el-button type="primary" @click="addSubject()">新增科目</el-button>
        <el-table
                :data="tableData.filter(data => !search || data.subjectName.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="科目名称"
                    prop="subjectName">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
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
                :current-page="page.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
        </el-pagination>


        <el-dialog title="新增/编辑科目" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-form-item label="科目名称" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.subjectName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubeject(form)">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import {listSubject,updateSubject,saveSubject,deleteSubject} from '../../../api/admin/subject.js'
    export default {
        name: "Subject",
        data(){
            return{
                tableData:[],
                search: '',
                page:{
                    page:1, //初始页
                    pageSize:10, //    每页的数据
                },

                dialogFormVisible: false,
                form: {
                    id:'',
                    subjectName:''
                },
                formLabelWidth: '120px',
                tag:'123'
            }
        },
        created() {
            this.listAllSubject(this.page)
        },
        methods:{
            addSubject(){
                this.dialogFormVisible=true
                this.tag='8888'
                this.form.subjectName=''

            },
            handleEdit(index, row) {
                this.tag='edit'
                console.log(this.tag)
                this.dialogFormVisible=true
                this.form.id=row.id
                this.form.subjectName=row.subjectName
            },
            confirmSubeject(form){
                if(this.tag !='edit'){
                    saveSubject(form).then(resp=>{
                        if(resp.data.code==200){
                            this.listAllSubject(this.page)
                            this.dialogFormVisible=false
                            this.tag=''
                            this.$message({
                                message: '恭喜你，新增成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('新增失败 ');
                        }
                    })
                }else{
                    updateSubject(form).then(resp=>{
                        if(resp.data.code==200){
                            this.dialogFormVisible=false
                            this.listAllSubject(this.page)
                            this.$message({
                                message: '恭喜你，编辑成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('编辑失败');
                        }
                    })
                }

            },
            listAllSubject(page){
                listSubject(page).then(resp=>{
                    this.tableData=resp.data.resultData.data
                })
            },
            handleSizeChange(size) {
                this.page.pageSize = size;
                this.homework(this.page)
                // console.log(this.pageSize,'888')
                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                this.homework(this.page)
                console.log(`当前页: ${pageNum}`);
            },

            handleDelete(index, row) {
                this.form.id=row.id
                deleteSubject(this.form).then(resp=>{
                    if(resp.data.code==200){
                        this.listAllSubject(this.page)
                        this.$message({
                            message: '恭喜你，删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('删除失败 ');
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>