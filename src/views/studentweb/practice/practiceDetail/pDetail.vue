<template>
    <div class="es">
      <router-link to="/practicedetail"> <el-button >返回</el-button></router-link>
        <p>试题</p>
        <div style="width: 45%;">
            <mavon-editor
                    :subfield="false"
                    :autofocus="false"
                    v-model="paramData.reply"
                    ref="md"
                    style="width: 99%;"
            >
            </mavon-editor>
        </div>
        <p> 参考答案</p>
        <div style="width: 45%">
            <mavon-editor
                    :subfield="false"
                    :autofocus="false"
                    v-model="paramData.answer"
                    ref="md"
                    style="width: 99%;"
            >
            </mavon-editor>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pDetail",
        data(){
            return{
                paramData:{
                    reply:'',
                    answer:'',
                },
            }
        },
        created() {
            this.paramData.reply=this.$route.params.data2.reply
            this.paramData.answer=this.$route.params.data2.answer
        }
    }
</script>

<style scoped>
.es{
    display: flex;
    justify-content: space-between;
}
</style>