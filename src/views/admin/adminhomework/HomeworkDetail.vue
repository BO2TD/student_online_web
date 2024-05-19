<template>
    <div>
        <router-link to="/adminhomework">
            <el-button type="success">返回</el-button>
        </router-link>
        <div>
            <mavon-editor
                    disabled="true"
                    :subfield="false"
                    :autofocus="false"
                    v-model=this.$route.params.data1
                    ref="md"
                    style="width: 99%;"
            >
            </mavon-editor>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeworkDetail"
    }
</script>

<style scoped>

</style>