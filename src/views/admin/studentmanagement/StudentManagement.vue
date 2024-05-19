<template>
    <div><div style="float: left">
      <el-input placeholder="请输入搜索内容" v-model="key" class="input-with-select" style="max-width: 600px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
      <div style="float: right">
        <el-button type="primary" @click="addStudent()">新增学生</el-button>
      </div>
        <div style="clear: both"></div>
        <div style="height: 20px"></div>
        <el-table
                :data="StudentData"
                :default-sort="{prop: 'date', order: 'descending'}"
                border
                style="width: 100%">
            <el-table-column
                    sortable
                    fixed
                    prop="account"
                    label="账号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sexName"
                    label="性别"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="className"
                    label="班级">
            </el-table-column>
            <el-table-column
                    prop="charger"
                    label="班主任">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="warning"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="height: 20px;"></div>


        <el-dialog title="新增学生" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
                <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="form.userEntity.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生账号" :label-width="formLabelWidth" prop="account">
                    <el-input v-model="form.userEntity.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.userEntity.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生性别" :label-width="formLabelWidth" prop="sex">
                    <el-select v-model="form.userEntity.sex" placeholder="选择学生性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择班级" :label-width="formLabelWidth" prop="className">
                    <el-select v-model="form.classId" placeholder="选择班级">
                        <el-option v-for="f in queryCla" :label="f.className" :value="f.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit(form)">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="编辑学生" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="editStudent">
                <el-form-item label="学生姓名" :label-width="formLabelWidth">
                    <el-input v-model="editStudent.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生账号" :label-width="formLabelWidth">
                    <el-input v-model="editStudent.account" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="学生性别" :label-width="formLabelWidth" prop="sex">
                    <el-select v-model="editStudent.sex" placeholder="选择学生性别">
                        <el-option v-for="f in sexAll"  :label="f.sexName" :value="f.sex"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择班级" :label-width="formLabelWidth">
                    <el-select v-model="editStudent.classId" placeholder="请选择班级">
                        <el-option v-for="f in queryCla" :label="f.className" :value="f.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false" >取 消</el-button>
                <el-button type="primary" @click="submitEdit(editStudent)">确 定</el-button>
            </div>
        </el-dialog>


        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="StudentData.length">
        </el-pagination>
    </div>
</template>

<script>
    import {astudentquery, addStudent, deleteStudent, updateStudent} from "../../../api/admin/astudent.js";
    import {quclass} from '../../../api/admin/queryclass.js'

    export default {
        name: "StudentManagement",
        data() {
            return {
                key: '',

                dialogFormVisible: false,
                dialogFormVisibleEdit: false,


                editStudent: {},
                sexAll:[
                    {
                        sex:1,
                        sexName:'女'
                    },
                    {
                        sex:0,
                        sexName:'男'
                    }
                ],

                form: {
                    userEntity: {
                        userName: '',
                        phone: '',
                        sex: '',
                        account: ''
                    },

                    classId: '',
                    roleId: 3,
                },

                rules: {
                    userName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        {required: true, message: '请输入电话', trigger: 'change'},
                        {min: 11, max: 11, message: '电话长度为11位', trigger: 'blur'}
                    ],

                    sex: [
                        {required: true, message: '选择性别', trigger: 'change'},
                    ],

                    account: [
                        {required: true, message: '请输入学号', trigger: 'change'},
                        {min: 11, max: 11, message: '学号长度位8位', trigger: 'blur'}
                    ],

                    className: [
                        {required: true, message: '选择班级', trigger: 'change'},
                    ],


                },


                queryCla: [],
                param: {
                    par: ''
                },
                formLabelWidth: '120px',
                StudentData: [],
                page: {
                    page: 1, //初始页
                    pageSize: 10, //    每页的数据
                    roleId: 3
                },

                paramId: {
                    id: '',
                }

            }
        },

        created() {
            this.studentquery(this.page)
            this.queryClass(this.param)
        },
        methods: {
            handleDelete(index) {
                this.paramId.id = index
                deleteStudent(this.paramId).then(resp => {
                    if (resp.data.code == 200) {
                        this.studentquery(this.page)
                        this.$message({
                            message: '恭喜你，删除成功 ',
                            type: 'success'
                        });

                    } else {
                        this.$message.error('删除失败');
                    }

                })
            },
            submit(data1) {
                this.dialogFormVisible = false
                addStudent(data1).then(resp => {
                     if (resp.data.code == 200) {
                        this.studentquery(this.page)
                        this.$message({
                            message: '恭喜你，新增成功',
                            type: 'success'
                        });
                        this.form.userEntity.userName=''
                        this.form.userEntity.phone=''
                        this.form.userEntity.sex=''
                        this.form.userEntity.account=''
                         this.form.classId=''

                     } else {
                        this.$message.error('新增失败');
                    }
                })


            },
            addStudent() {
                // this.form=''
                this.dialogFormVisible = true

            },
            queryClass(pa) {
                quclass(pa).then(resp => {
                    this.queryCla = resp.data.resultData
                })
            },
            submitEdit(datastudent) {
                updateStudent(datastudent).then(resp => {
                    if (resp.data.code == 200) {
                        if (resp.data.code == 200) {
                            this.$message({
                                message: '恭喜你，编辑成功 ',
                                type: 'success'
                            });
                            this.dialogFormVisibleEdit = false
                            this.studentquery(this.page)
                        } else {
                            this.$message.error('删除失败');
                        }
                    }
                })
            },
            handleEdit(index, row) {
                this.editStudent = row;
                this.dialogFormVisibleEdit = true
                //this.editStudent.classId=row.classId
                //
                // console.log(index, '1111')
                // console.log(this.editStudent, '2222')
            },

            handleSizeChange(size) {
                this.page.pageSize = size;
                this.studentquery(this.page)
                // console.log(this.pageSize,'888')
                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                this.studentquery(this.page)
                console.log(`当前页: ${pageNum}`);
            },

            studentquery(page) {
                astudentquery(page).then(resp => {
                    this.StudentData = resp.data.resultData.data
                    console.log(resp, '123')

                    // state.ClassData=resp.data.data.records
                    // this.$store.dispatch('classAction',this.ClassData)
                })
            },
            search() {
              if (this.key === '') {
                this.studentquery(this.page);
              } else {
                this.StudentData = this.StudentData.filter((item) => {
                  return item.userName.indexOf(this.key) !== -1 || item.account.indexOf(this.key) !== -1
                });
              }
            }
        },
    }
</script>

<style scoped>

</style>