<template>
   <div>
      <router-link to="/pdetailteacher"><el-button type="primary" > 发布知识点</el-button></router-link>
       <el-table
               :data="knowData"
               style="width: 100%">
           <el-table-column type="expand">
               <template slot-scope="props">
                   <el-form label-position="left" inline class="demo-table-expand">
                       <el-form-item label="班级：">
                           <span>{{ props.row.className }}</span>
                       </el-form-item>
                       <el-form-item label="发布人：">
                           <span>{{ props.row.userName }}</span>
                       </el-form-item>
                       <el-form-item label="科目：">
                           <span>{{ props.row.subjectName }}</span>
                       </el-form-item>
                       <el-form-item label="主题：">
                           <span>{{ props.row.title }}</span>
                       </el-form-item>
                       <el-form-item label="知识点补充内容：">
                           <span>{{ props.row.content }}</span>
                       </el-form-item>
                       <el-form-item label="发布时间：">
                           <span>{{ props.row.createTime }}</span>
                       </el-form-item>
<!--                       <el-form-item label="商品描述">-->
<!--                           <span>{{ props.row.desc }}</span>-->
<!--                       </el-form-item>-->
                   </el-form>
               </template>
           </el-table-column>
           <el-table-column
                   label="详情内容"
                   prop="subjectName">
           </el-table-column>
           <el-table-column
                   label="发布时间"
                   prop="createTime">
           </el-table-column>
           <el-table-column
                   label="发布主题"
                   prop="title">
           </el-table-column>
           <el-table-column
                   label="科目"
                   prop="subjectName">
           </el-table-column>
           <el-table-column
                   label="班级"
                   prop="className">
           </el-table-column>
           <el-table-column label="操作">
               <template slot-scope="scope">
                   <el-button
                           size="mini"
                           @click="EditKnowPoint(scope.$index, scope.row)">编辑</el-button>
                   <el-button
                           size="mini"
                           type="danger"
                           @click="DeleteKnowPoint(scope.$index, scope.row)">删除</el-button>
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
               :total="knowData.length">
       </el-pagination>
   </div>
</template>

<script>
    import {listKnow,deleteKnow} from "../../api/personal.js";
    import Cookies from 'js-cookie'
    export default {
        name: "PersonalInfo",
        data(){
            return{
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                    userId:'',
                    roleId:''
                },
                knowData:[],
                param:{
                    id:'',
                }
            }
        },
        created() {
            this.page.userId=Cookies.get('userId')
            this.page.roleId=Cookies.get('roleId')
            this.listAllKnow(this.page)
        },
        methods:{
            EditKnowPoint(index,row){
              this.$router.push({
                  name:'PDetail',
                  params:{
                      data1:row
                  }
              })
            },

            DeleteKnowPoint(index,row){
                this.param.id=row.id
                deleteKnow(this.param).then(resp=>{
                    if(resp.data.code==200){
                        this.$message({
                            message: '恭喜你，删除成功 ',
                            type: 'success'
                        });
                        this.listAllKnow(this.page)
                    }else{
                        this.$message.error('删除失败');
                    }
                })
            },
            listAllKnow(page){
                listKnow(page).then(resp=>{
                    this.knowData=resp.data.resultData.data
                })
            },
            handleSizeChange(size) {
                this.page.pageSize = size;
                // console.log(this.pageSize,'888')

                console.log(`每页 ${size} 条`);
            },
            handleCurrentChange(pageNum) {
                this.page.pageNum = pageNum;
                // this.listAllStudentsScore(this.page)
                console.log(`当前页: ${pageNum}`);
            },

        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
