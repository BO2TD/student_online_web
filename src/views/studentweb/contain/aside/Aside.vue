<template>
  <el-row class="cn">
    <el-col :span="12">
      <el-menu
          :default-active="this.$route.path"
          background-color="#7B9BC5"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b">
        <el-menu-item index="/onlinelearn">
          <i style="color: #ffffff" class="el-icon-s-management"></i>
          <span slot="title">在线学习</span>
        </el-menu-item>
        <el-menu-item index="/videohistory">
          <i style="color: #ffffff" class="el-icon-chat-line-round"></i>
          <span slot="title">学习记录</span>
        </el-menu-item>

        <el-menu-item index="/studentmanagement">
          <i style="color: #ffffff" class="el-icon-camera"></i>
          <span slot="title">班级信息</span>
        </el-menu-item>
        <el-menu-item index="/applicanthistory">
          <i style="color: #ffffff" class="el-icon-location-information"></i>
          <span slot="title">申请记录</span>
        </el-menu-item>
        <el-submenu>
          <template slot="title">
            <i style="color: #ffffff" class="el-icon-notebook-1"></i>
            <span slot="title">作业管理</span>
          </template>
           <el-submenu>
                        <template slot="title">查看作业</template>
                        <el-menu-item index="/checkhomework">已完成</el-menu-item>
                        <el-menu-item index="/nohomework">未完成</el-menu-item>
                    </el-submenu>

        </el-submenu>

        <el-menu-item index="/essentiainfo">
          <i style="color: #ffffff" class="el-icon-s-custom"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>

      </el-menu>


    </el-col>
  </el-row>
</template>


<script>
import {detailhistory} from "../../api/studentweb/studentmanagement.js";
import Cookies from 'js-cookie'
import {videohistory} from "@/api/video";

export default {
  name: "VideoHistory",
  data() {
    return {
      VideoHistory: [],
      page: {
        page: 1, //初始页
        pageSize: 10,    //    每页的数据
        userId: '',
        // roleId: ''
      },
    }
  },
  created() {
    this.page.userId = Cookies.get("userId")
    this.page.roleId = Cookies.get("roleId")
    this.detailHistory(this.page)
  },
  methods: {

    handleSizeChange(size) {
      this.page.pageSize = size;
      this.detailHistory(this.page)
      // console.log(this.pageSize,'888')
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum;
      this.detailHistory(this.page)
      console.log(`当前页: ${pageNum}`);
    },

    detailHistory(page) {
      videohistory(page).then(resp => {
        this.VideoHistory = resp.data.resultData.data;
        console.log(this.VideoHistory)
        // this.$store.dispatch('appliantHistory',this.applicantHistory)
      })
    }
  }
}
</script>

<style scoped>

</style>