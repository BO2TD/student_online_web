<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>
            <el-main>
                <h1>欢迎来到学生在线学习系统教师端</h1>
                <router-view>

                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from  "./header/Header.vue"
    import Aside from "./aside/Aside"//更改按钮;
    export default {
        name: "StudentContainer",
        components: {Aside, Header}
    }
</script>

<style scoped>
    .el-container.is-vertical {
        flex-direction: column;
        height: 100%;
    }
    .el-header, .el-footer {
        margin-left: -20px;
        margin-right: -20px;
        background-color: #7b9bc5;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside[data-v-e8bb9fe4] {
        background-color: #7b9bc5;
        color: #333;
        margin-top: 10px;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
