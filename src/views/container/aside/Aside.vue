<template>
  <el-row class="cn">
    <el-col :span="12">
      <el-menu
          :default-active="this.$route.path"
          background-color="#7B9BC5"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b">
        <el-menu-item index="/studentinfo">
          <i style="color: #ffffff" class="el-icon-s-management"></i>
          <span slot="title">班级管理</span>
        </el-menu-item>
        <el-menu-item index="/teacherapplicant">
          <i style="color: #ffffff" class="el-icon-chat-line-round"></i>
          <span slot="title">审核待办</span>
        </el-menu-item>

        <el-menu-item index="/video">
          <i style="color: #ffffff" class="el-icon-camera"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/stdentvideo">
          <i style="color: #ffffff" class="el-icon-location-information"></i>
          <span slot="title">打卡管理</span>
        </el-menu-item>

<!--          <template slot="title">
            <i style="color: #ffffff" class="el-icon-notebook-1"></i>
            <span slot="title">作业管理</span>
          </template>-->
          <!-- 将原始的 el-menu-item 放在 el-submenu 中 -->
          <el-menu-item index="/classmanagement">
            <i style="color: #ffffff" class="el-icon-document"></i>
            作业管理
          </el-menu-item>
<!--          <el-menu-item index="/scoremanagment">
            <i style="color: #ffffff" class="el-icon-document"></i>
            测试管理
          </el-menu-item>-->
<!--          <el-menu-item index="/coursemanagement">
            <i style="color: #ffffff" class="el-icon-document"></i>
            问答管理
          </el-menu-item>-->


        <el-menu-item index="/teacherpersonalinfo">
          <i style="color: #ffffff" class="el-icon-s-custom"></i>
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

.el-menu-item {
  background-color: #7b9bc5 !important;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
}

.cn {
  /*background-color: cadetblue;*/
}

.el-aside {
  /*background-color: #7b9bc5;*/
  color: #333;
  text-align: center;

}

element.style {
  width: 200px;
}


</style>
