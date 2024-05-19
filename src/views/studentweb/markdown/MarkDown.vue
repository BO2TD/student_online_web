<template>
    <div>
        <router-link to="/checkhomework">
            <el-button type="success">返回</el-button>
        </router-link>
        <div>
            <mavon-editor
                    :subfield="false"
                    :autofocus="false"
                    v-model=$store.state.HomeWork
                    ref="md"
                    style="width: 99%;"
            >
            </mavon-editor>
        </div>
    </div>

</template>

<script>
    export default {
        name: "MarkDown",
        data(){
            return{
                formData:'123'
            }
        },



    }
</script>

<style scoped>

</style>