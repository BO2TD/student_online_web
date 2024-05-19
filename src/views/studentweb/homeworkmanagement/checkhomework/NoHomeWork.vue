<template>
    <div>
        <div class="subject">
            <h1 class="dohomework">未完成作业详情</h1>
        </div>
        <div v-for="NH in NotHomeWork">
            <h2>{{NH.subjectName}}</h2>
            <span>{{NH.userName}}</span>
            <P>作业标题：{{NH.title}}</P>
<!--            <router-link to="/markdownnothomework">-->
                <div class="bt">
                    <el-button type="primary" plain  @click="addNotHomework(NH)">开始答题</el-button>
<!--                    <el-button type="primary" plain  @click="addNotHomework(NH.answer)">查看参考答案</el-button>-->
                </div>
<!--            </router-link>-->
            <el-divider>提交时间：</el-divider>
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
    import {work} from '../../../../api/studentweb/dohomework.js'
    import Cookies from 'js-cookie'
    export default {
        name: "NoHomeWork",
        data(){
            return{
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                    userId:0,
                    roleId:0,
                    classId:0
                },
                NotHomeWork:[],
            }

        },
        created() {
            this.page.userId=Cookies.get('userId')
            this.page.roleId=Cookies.get('roleId')
            this.page.classId=Cookies.get('classId')
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
                work(valid).then(resp=>{
                    this.NotHomeWork=resp.data.resultData.data
                })
            },
            addNotHomework(NotHomeWork){
                this.$router.push({
                    name:'MarkDownNotHomeWork',
                    params:{
                        data1:NotHomeWork,
                        data2:'123'
                    }
                })
                // this.$store.dispatch('addNotHomework',NotHomeWork)
            }
        }
    }
</script>

<style scoped>
.bt{
    display: flex;
    justify-content: center;
}
    .dohomework{
        display: flex;
        justify-content: center;
    }
</style>