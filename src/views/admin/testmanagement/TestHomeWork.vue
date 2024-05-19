<template>
    <div>
        <router-link to="/testmanagement">
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
        name: "TestHomeWork"
    }
</script>

<style scoped>

</style>