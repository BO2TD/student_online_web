<template>
    <div>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <div style="height: 5px"></div>
        <el-container>
            <el-aside class="left" width="200px">
                <Aside></Aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    </div>
</template>

<script>
    import Header from  "./header/Header.vue"
    import Aside from "./aside/Aside";
    export default {
        name: "AdminManagement",
        components: {Aside, Header}
    }
</script>

<style scoped>
    .left{
        /*color: #5f9ea0;*/

    }
    .el-container.is-vertical {
        flex-direction: column;
        height: 100%;
    }
    .el-header[data-v-9aae6930], .el-footer[data-v-9aae6930] {
        margin-left: -20px;
        margin-right: -20px;
        background-color: #6670bc;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color:  #6670bc !important;
        color:  #333;
        text-align: center;
        line-height: 200px;
    }
    .aside[data-v-2c9fb0d2] {
        margin-top: 10px;
        background-color: #6670bc;
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
