<template>
    <div>
        <div class="subject">
        </div>
        <el-divider></el-divider>
        <div>

                <div>
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
                                        @click="handleSubmit(scope.$index, scope.row)">开始答题</el-button>

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
                            :total="ScoreData.length">
                    </el-pagination>
                </div>

<!--            <mavon-editor-->
<!--                    :subfield="false"-->
<!--                    :autofocus="false"-->
<!--                    v-model="formData"-->
<!--                    ref="md"-->
<!--                    style="width: 99%;"-->
<!--            >-->

<!--            </mavon-editor>-->
        </div>
    </div>
</template>

<script>

    import Cookies from "js-cookie";
    import {practices} from "../../../api/studentweb/practice.js";

    export default {
        name: "StudentPractice",
        data() {
            return {
                ScoreData:[],
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                    classId:'',
                    userId:''
                }
            }
        },
        created() {
            this.page.classId=Cookies.get('classId')
            this.page.userId=Cookies.get('userId')
            this.listAllStudentsScore(this.page)
        },

        methods:{
            handleSubmit(index,row){
              this.$router.push({
                  name: "MarkDownNotHomeWork",
                  params:{
                      data1:row,
                      data2:'notwork'
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
                practices(page).then(resp=>{
                    this.ScoreData= resp.data.resultData.data

                })
            }
        }

    }
</script>

<style scoped>

</style>