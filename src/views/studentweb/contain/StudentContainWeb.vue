<template>
    <div>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <h1>欢迎来到学生在线学习系统学生端</h1>
                <router-view></router-view>
            </el-main>
        </el-container>

    </div>

</template>

<script>
    import Header from "../../studentweb/contain/header/Header";

    export default {
        name: "StudentContainWeb",
        components: {Header},

    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 400px;
        margin: 0;
    }

    .el-header {
        padding: 0 20px;
        box-sizing: border-box;
        flex-shrink: 0;
        background-color: #ffffff;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>