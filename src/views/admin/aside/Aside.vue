<template>
    <el-row class="aside">
    <el-col :span="12">
        <el-menu
                :default-active="this.$route.path"
                background-color="#16242e"
                text-color="#ffffff"
                :router="true"
                active-text-color="#ffd04b">
            <el-menu-item index="/adminstudentmanagement">
                <i class="el-icon-menu"></i>
                <span slot="title">学生管理</span>
            </el-menu-item>
            <el-menu-item index="/teachermanagement" >
                <i class="el-icon-document"></i>
                <span slot="title">教师管理</span>
            </el-menu-item>
          <el-menu-item index="/adminhomework">
               <i class="el-icon-notebook-1"></i>
              <span slot="title">作业管理</span>
           </el-menu-item>
            <el-menu-item index="/subject">
                <i class="el-icon-notebook-2"></i>
               <span slot="title">科目管理</span>
           </el-menu-item>
            <el-menu-item index="/classmanagementadmin">
                <i class="el-icon-setting"></i>
                <span slot="title">班级管理</span>
            </el-menu-item>
<!--            <el-menu-item index="/testmanagement">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                <span slot="title">试题管理</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/knowledgepoints">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                <span slot="title">知识点管理</span>-->
<!--            </el-menu-item>-->
            <el-menu-item index="/adminpersonalinfo">
                <i class="el-icon-s-custom"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
        </el-menu>


    </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style scoped>


    .el-col-12 {
        width: 100%;
    }
    .el-aside {
        /*background-color: #;*/
        text-align: center;

    }

    .el-aside[data-v-9aae6930] {
        background-color: #6670bc;
        color: #741e1e;
        text-align: center;
        line-height: 200px;
    }
    .aside{
        margin-top: 10px;
    }
    .el-menu-item {
        background-color: #6670bc !important;
        font-size: 14px;
        color: #303133;
        padding: 0 20px;
        cursor: pointer;
        transition: border-color .3s,background-color .3s,color .3s;
        box-sizing: border-box;
    }

     .el-menu-item, .el-submenu__title {
         height: 56px;
         line-height: 56px;
         position: relative;
         -webkit-box-sizing: border-box;
         white-space: nowrap;
         list-style: none;
     }

</style>
