<template>
    <div>
        <h1 class="ti">问答社区</h1>
        <el-divider></el-divider>
        <div v-for=" t in NotHomeWork">
            <h4 class="jk">问题来源：{{t.topic}}</h4>
            <span>{{t.senderName}}</span>
           问题描述： <p>{{t.content}}</p>
            <span>{{t.recipientName}}</span>
            问题回复：<p>{{t.restore}}</p>
<!--            <router-link to="/markdown">-->
<!--                <el-button type="primary" plain>查看详情</el-button>-->
<!--            </router-link>-->

            <el-divider>状态：{{t.status}}</el-divider>
        </div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="NotHomeWork.length">
        </el-pagination>
    </div>
</template>

<script>
    import {askandanswer} from '../../../api/studentweb/askandanswer.js'
    import Cookies from "js-cookie";
    export default {
        name: "AskAndAnswer",
        data(){
            return{
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                    userId:0,
                },
                NotHomeWork:[],
            }

        },
        created() {
            this.page.userId=Cookies.get('userId')
            this.CheckWork(this.page)
        },
        methods:{
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
            CheckWork(valid){
                askandanswer(valid).then(resp=>{
                    this.NotHomeWork=resp.data.resultData.data
                })
            }
        }
    }
</script>

<style scoped>
    h4{
        display: flex;
        justify-content: center;
    }
    .right{
        display: flex;
        justify-content: flex-end;
    }
    .ti{
        display: flex;
        justify-content: center;
    }
</style>