<template>
    <div>

            <el-button type="success" @click="goOthers()">返回</el-button>

        <el-button type="success" @click="submit(homdeworkData)">提交</el-button>
        <div>
            <mavon-editor
                    :subfield="false"
                    :autofocus="false"
                    v-model="homdeworkData.content"
                    ref="md"
                    style="width: 99%;"
            >
            </mavon-editor>
        </div>
    </div>

</template>

<script>
    import Cookies from "js-cookie";
    import {doHomework,doExersize} from '../../../api/studentweb/homwork.js'
    export default {
        name: "MarkDownNotHomeWork",
        data(){
            return{
                homdeworkData:{
                    content:'',
                    homeworkId:'',
                    exerciseId:'',
                    userId:''
                },
                tag:'',
            }
        },
        created() {
            this.homdeworkData.userId=Cookies.get('userId')
            this.homdeworkData.content=this.$route.params.data1.content
            this.homdeworkData.homeworkId=this.$route.params.data1.id
            this.homdeworkData.exerciseId=this.$route.params.data1.id
            this.tag=this.$route.params.data2

        },

        methods:{
            goOthers(){
                if(this.tag='notwork'){
                    this.$router.push("/studentpractice")
                }else{
                    this.$router.push("/nohomework")
                }
            },
            submit(home){
                console.log(this.tag,'oooo')
                if(this.tag !='123'){
                    doExersize(home).then(resp=>{
                        if(resp.data.code==200){
                            this.$router.push("/practicedetail")
                            this.$message({
                                message: '恭喜你，已完成练习',
                                type: 'success'
                            });
                            this.tag='999'
                        }else{
                            this.$message.error('提交练习失败');
                        }
                    })
                }else{
                    doHomework(home).then(resp=>{
                        if(resp.data.code==200){
                            this.$router.push("/checkhomework")
                            this.$message({
                                message: '恭喜你，已完成作业',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('提交作业失败');
                        }
                    })
                }



            }
        }

    }
</script>

<style scoped>

</style>