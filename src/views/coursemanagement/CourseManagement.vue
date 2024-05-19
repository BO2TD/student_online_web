<template>
    <div class="block">
        <el-timeline>

            <div v-for="t in shduleData">
            <el-timeline-item :timestamp=t.createTime placement="top">
                <el-card>
                    <div class="cs">
                        <span><el-tag type="success" >{{t.senderName}}提问:</el-tag></span>
                        <span >
                        <el-tag type="warning">问题来源：{{t.topic}}</el-tag>
                        </span>

                        <span ><el-tag type="success" >{{t.recipientName}}回答</el-tag></span>
                    </div>
                    <el-divider content-position="center">下面是提问记录</el-divider>
                    <div class="csc">
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="请输入内容"
                                v-model=t.content>
                        </el-input>
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="请输入内容"
                                v-model=t.restore>
                        </el-input>
                    </div>

                    <el-badge :value="count" class="item">
                        <el-button size="small" @click="restor(t)">回复</el-button>
                    </el-badge>
                </el-card>
            </el-timeline-item>
            </div>
        </el-timeline>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="shduleData.length">
        </el-pagination>
    </div>

</template>

<script>
    import {listAllShdule,addShdule} from "../../api/shdule";
    import Cookies from "js-cookie";

    export default {
        name: "CourseManagement",
        data() {
            return {
                shduleData: [],
                page:{
                    page:1, //初始页
                    pageSize:10,    //    每页的数据
                    userId:''
                },
                count:0,
            }
        },
        created() {
            this.page.userId=Cookies.get('userId')
            this.listShdule(this.page)
        },
        methods:{
            restor(shduleData){
                shduleData.status=1
                addShdule(shduleData).then(resp=>{
                    if(resp.data.code==200){
                        this.$message({
                            message: '恭喜你，回复成功 ',
                            type: 'success'
                        });
                        this.count=this.count+1
                        this.listShdule(this.page)
                    }else{
                        this.$message.error('回复失败');
                    }
                })
            },
            listShdule(page){
                listAllShdule(page).then(resp=>{
                    this.shduleData=resp.data.resultData.data
                })
            }
        },
    }
</script>

<style scoped>
.item{
    display: flex;
    justify-content: flex-end;
}
.csc{
    display: flex;
    justify-content: space-between;
}
    .cs{
        display: flex;
        justify-content: space-between;
    }
    h4{
        display: inline !important;
    }

</style>
