<template>
  <div>
    <div style="float: left">
      <el-input placeholder="请输入搜索内容" v-model="key" class="input-with-select" style="max-width: 600px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div style="float: right">
      <el-button  @click="saveNewClass()">新增班级</el-button>
    </div>
    <div style="clear: both"></div>

    <el-dialog title="新增/编辑班级" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班主任" :label-width="formLabelWidth">
          <el-select v-model="form.userId" placeholder="请选择班主任">
            <el-option v-for="c in form.allTeacher" :label="c.userName" :value="c.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(form)">确 定</el-button>
      </div>
    </el-dialog>



    <el-table
        :data="tableData"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        style="width: 100%; margin-top: 20px;">
      <el-table-column
          sortable
          fixed
          prop="createTime"
          label="创建时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="班主任"
          width="180">
      </el-table-column>
      <el-table-column
          prop="className"
          label="班级">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleEdite(scope.$index, scope.row)">编辑
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
import {listClass,delteClass,listTeacher,saveClass,updateClass} from '../../../api/admin/classmanagement.js'
export default {
  name: "ClassManagement",
  data(){
    return{
      key: '',

      dialogFormVisible:false,
      form:{
        className:'',
        userId:0,
        allTeacher:[],
        id:'',
      },
      tableData:[],

      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
      },
      param:{
        id:'',
      },
      status:{
        roleId:2
      },
      tag:'123',
    }
  },
  created() {
    this.listAllClass(this.page)
    this.listAllTeacher(this.status)
  },
  methods:{

    saveNewClass(){
      this.tag='new'
      console.log(this.tag)
      this.dialogFormVisible=true

    },

    handleEdite(index,row){
      this.dialogFormVisible=true
      this.form.className=row.className
      this.form.userId=row.userName
      this.form.id=row.id
    },

    submit(form){
      if(this.tag!='new'){
        if(typeof this.form.userId =="string"){
          this.form.userId= ''
        }
        console.log(this.tag,'pppp')
        this.dialogFormVisible=false
        updateClass(form).then(resp=>{
          if(resp.data.code==200){

            this.listAllClass(this.page)
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            });
          }else {
            this.$message.error('编辑失败');
          }
        })
      }else{
        saveClass(form).then(resp=>{
          this.dialogFormVisible=false
          if(resp.data.code==200){
            this.tag='123'
            this.listAllClass(this.page)
            this.$message({
              message: '恭喜你，新增成功',
              type: 'success'
            });

          }else {
            this.$message.error('新增失败');
          }
        })
      }


    },


    listAllTeacher(status){
      listTeacher(status).then(resp=>{
        this.form.allTeacher=resp.data.resultData
        console.log(this.form.allTeacher,'8888')
      })
    },

    handleDelete(index,row){
      this.param.id=row.id
      delteClass(this.param).then(resp=>{
        if(resp.data.code==200){
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          });
          this.listAllClass(this.page)
        }else {
          this.$message.error('删除失败');
        }
      })
    },
    listAllClass(page){
      listClass(page).then(resp=>{
        this.tableData=resp.data.resultData.data
      })
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      // console.log(this.pageSize,'888')
      this.listAllClass(this.page)
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.listAllClass(this.page)
      console.log(`当前页: ${val}`);
    },

    search() {
      if (this.key === '') {
        this.listAllClass(this.page)
      } else {
        this.tableData = this.tableData.filter((item) => {
          return item.className.indexOf(this.key) !== -1 || item.userName.indexOf(this.key) !== -1
        })
      }
    }
  }
}
</script>

<style scoped>

</style>